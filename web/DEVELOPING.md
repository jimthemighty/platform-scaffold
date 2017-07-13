# Mobify Progressive Web Scaffold Developer Readme

## Developing against `develop` of the Progressive Web SDK

If you are wanting to improve or add a library/component in the [Progressive Web SDK](https://github.com/mobify/progressive-web-sdk),
you will need to clone the SDK (note: it is not open on Github).

```
git clone git@github.com:mobify/progressive-web-sdk.git
cd progressive-web-sdk
npm link
npm install # REQUIRED!!
npm run dev:build # Some assets required by the scaffold build are only created by this command (/dist/*)
```

Then navigate back to this directory and run:
```
cd ../platform-scaffold/web
npm link progressive-web-sdk
npm run dev
```

## Running CircleCI using an in-progress SDK branch

Occasionally when you are developing a feature in the SDK it may be useful to have CircleCI do a full build using your branch of the SDK. 

***Note**: If you only need to build and test locally, you should use `npm link` instead of the process outlined here.*

To do this you can use a custom npm [distribution tag](https://docs.npmjs.com/cli/dist-tag). The basic process is that you will mark the `package.json` with the next patch version but as a prerelease and then publish it using a distribution tag named after your SDK branch. 

### Getting started

To get started with an SDK branch that you want to test with the scaffold you'll need to do some setup once. After that you can make changes to the SDK branch, publish, and test in the scaffold *without* redoing this work.

1. [**SDK**] Check out your branch of the SDK

2. [**SDK**] Run `npm view progressive-web-sdk version` to check the latest published version of the SDK

3. [**SDK**] If the `package.json` version is the same as Step #2, bump the *patch* version:

   ```sh
   npm version patch --no-git-tag-version
   git add package*.json
   git commit -m "Test version $(node -e "console.log(require('./package.json').version)")"   
   ```
   
4. [**SDK**] Make sure the version in `package.json` is suffixed with your SDK branch name. Open `package.json` in your text editor and append a dash and your branch name behind the version. For example:

   ```json
       "version": "0.17.3"
   ```
   
   Would become:
   
   ```json
       "version": "0.17.3-non-pwa-messaging"
   ```

5. [**Scaffold**] Update the scaffold `package.json` so that the `"progressive-web-sdk"` dependency is tracking your distribution tag instead of the default:
   
   ```json
   "devDependencies": {
       ...
       "progressive-web-sdk": "0.17.3@your-branch-name"
       ...
   }
   ```
   
   *Note: once you update the scaffold to track your distribution tag, it will automatically install the latest version published against that tag, which is why this step only needs to be done once during setup.*
   
### Testing SDK changes

As you make changes to your SDK branch, you can test them in the scaffold using the following steps:

1. [**SDK**] Update the pre-release version: 

   ```sh
   npm version prerelease --no-git-tag-version
   git add package*.json
   git commit -m "Test version $(node -e "console.log(require('./package.json').version)")"
   ```
   
   The version that npm prints should be what you specified in Step #4 of the *Getting Started* section but with an added `.X` number behind it. Eg. `0.17.3-non-pwa-messaging.0` (the first pre-release of your distribution tag).

2. [**SDK**] Publish your SDK branch under a distribution tag named after the branch:
   ```sh
   npm publish --tag $(git branch | grep \* | cut -d ' ' -f2-)
   ```
  
3. [**Scaffold**] Commit a change and push so that CircleCI runs a build (or just go to the CircleCI dashboard and hit **Rebuild** on the most recent build of your scaffold branch. CircleCI will install the distribution tag version of the progressive-web-sdk package, which is your in-progress work.

*Final note. This will leave these "beta" distribution tags sitting around in the npm registry but that is probably safe as you can't use it unless you specifically install it by tag name. We could investigate `npm unpublish` if we're concerned about that.*
  
## Swapping Integration Managers

Note: This should make its way into the Tutorial eventually, but this is here for now.

### Running against custom Merlin's connector:

1. Open `app/main.jsx`.
2. Import the Merlin's connector:

```javascript
import initConnector from './init-merlins-connector'
// import initConnector from './init-sfcc-connector'
// import initConnector from './init-stub-connector'
```

3. Open Preview using the following link:

https://preview.mobify.com/?url=https%3A%2F%2Fwww.merlinspotions.com%2F&site_folder=https%3A%2F%2Flocalhost%3A8443%2Floader.js&disabled=0&domain=&scope=0

### Running against Salesforce Commerce Cloud:

1. Open `app/main.jsx`.
2. Import the SFCC connector:

```javascript
// import initConnector from './init-merlins-connector'
import initConnector from './init-sfcc-connector'
// import initConnector from './init-stub-connector'
```

3. Open Preview using the following link:

https://preview.mobify.com/?url=https%3A%2F%2Fmobify-tech-prtnr-na03-dw.demandware.net%2Fon%2Fdemandware.store%2FSites-2017refresh-Site%2Fdefault%2FHome-Show&site_folder=https%3A%2F%2Flocalhost%3A8443%2Floader.js&disabled=0&domain=&scope=1
