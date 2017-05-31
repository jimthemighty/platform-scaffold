#!/usr/bin/env node

/**
 * TODO: This is not fit for production - we would have to give partners
 * user accounts and permissions to change IAM roles on Mobify's
 * AWS account. This is a proof of concept that will be easy
 * to modify to run on mobify-cloud.
 */
const yargs = require('yargs');
const process = require('process');
const chalk = require('chalk');
const path = require('path');
const common = require('./common');
const child_process = require('child_process')
const fs = require('fs')

const {success, info, error, step} = common

const region = 'us-east-1'
const s3StackName = 'amp-s3-assets'
const deploymentBucket = 'amp-deployment.mobify.com'
const packagedTemplate = 'packaged.yaml'
const gitRevisionLength = 40


const _throw = (e) => {throw e}

const join = (...args) => args.join('')


/**
 * Ensure the required S3 buckets exist for deployment and hosting static assets.
 */
const createS3Buckets = ({aws, exec, domainName}) => {
    step('Creating S3 buckets')
    try {
        exec(join(
            `${aws} cloudformation deploy`,
            ` --template-file ./cloudformation-static.yaml`,
            ` --stack-name ${s3StackName}`,
            ` --region ${region}`,
            ` --parameter-overrides DomainName=${domainName}`
        ))
    } catch (e) {
        if (e.stderr) {
            const err = e.stderr.toString().trim()
            err.indexOf(`Reason: The submitted information didn't contain changes.`) >= 0 ? info(err) : _throw(e)
        } else {
            throw e
        }
    }
}

/**
 * Upload static assets to S3
 */
const syncStaticAssets = ({aws, exec, rev, staticDir}) => {
    step('Syncing static assets')
    exec(`${aws} s3 sync ${staticDir} s3://amp-static.mobify.com/${rev}`)
}

/**
 * Upload a code package to AWS Lambda.
 */
const deployApp = ({aws, exec, rev, appStackName}) => {
    step('Deploying the app')
    const staticUrl = `http://amp-static.mobify.com.s3.amazonaws.com/${rev}/`

    exec(join(
        `${aws} cloudformation package`,
        ` --template ./cloudformation.yaml`,
        ` --s3-bucket ${deploymentBucket}`,
        ` --output-template ${packagedTemplate}`,
        ` --region ${region}`
    ))

    try {
        exec(join(
            `${aws} cloudformation deploy`,
            ` --template-file ./${packagedTemplate}`,
            ` --stack-name ${appStackName}`,
            ` --region ${region}`,
            ` --capabilities CAPABILITY_IAM`,
            ` --parameter-overrides StaticUrl=${staticUrl}`
        ))
    }
    catch (e) {
        if (e.stderr) {
            const err = e.stderr.toString().trim()
            err.startsWith('No changes to deploy.') ? info(err) : _throw(e)
        } else {
            throw e
        }
    }
}

/**
 * Get the outputs of a stack as a string. The outputs are information about the
 * stack configured in the cloudformation template.
 */
const getStackOutputs = ({aws, appStackName}) => {
    const json = child_process.execSync(join(
        `${aws} cloudformation describe-stacks`,
        ` --stack-name ${appStackName}`,
        ` --region ${region}`
    )).toString()
    const obj = JSON.parse(json)
    const outputs = obj['Stacks'][0]['Outputs'].map(
        output => `${output['OutputKey']} - ${output['Description']}\n  ${output['OutputValue']}`
    )
    return outputs.join('\n\n')
}


const deploy = (argv) => {
    const aws = child_process.execSync('which aws').toString().trim()

    const {dir, businessId, siteId, environment} = argv;
    const appStackName = [businessId, siteId, environment].join('-').toLowerCase()
    const domainName = `${businessId}-${siteId}.com`.toLowerCase()

    const cwd = path.resolve(dir)
    const serverDir = path.join(cwd, 'server')
    const staticDir = path.join(cwd, 'static')

    const requiredDirs = [cwd, serverDir, staticDir]

    const allDirsExist = (requiredDirs
        .map(d => fs.statSync(d))
        .map(stat => stat.isDirectory())
        .every(x => x)
    )

    if (!allDirsExist) {
        error(`One of the required directories does not exist:\n ${requiredDirs.join('\n')}`)
        process.exit(1)
    }

    const split = cwd.split(path.sep)
    const rev = split[split.length - 1]

    if (!rev.length == gitRevisionLength) {
        error(`Expected a ${gitRevisionLength}-digit git revision for the deployment directory, found "${rev}"`)
        process.exit(1)
    }

    /**
     * Execute a subprocess with the working directory set to the deployment directory
     * and capturing stderr in order to handle errors.
     */
    const exec = (cmd) => {
        info(cmd);
        return child_process.execSync(cmd, {cwd, stdio: [process.stdin, process.stdout, 'pipe']})
    }

    const ctx = {
        exec,
        domainName,
        rev,
        staticDir,
        appStackName,
        aws
    }

    createS3Buckets(ctx)
    syncStaticAssets(ctx)
    deployApp(ctx)
    const outputs = getStackOutputs(ctx)

    success('Deployed successfully:\n')
    success(outputs)
}


const main = () => {
    const argv = (
        yargs.usage('$0')
            .alias('dir', 'd')
            .demand('dir')
            .describe('dir', 'path to the directory containing the build project')

            .alias('businessId', 'b')
            .demand('businessId')
            .describe('businessId', 'the id for the business')

            .alias('siteId', 's')
            .demand('siteId')
            .describe('siteId', 'the id for the site')

            .alias('environment', 'e')
            .demand('environment')
            .describe('environment', 'deploy to this environment')
            .choices('environment', ['staging', 'production'])

            .help()
            .argv
    )
    deploy(argv)
}


if (require.main === module) {
    main()
}
