#!/usr/bin/env node
const child_process = require('child_process')

const main = () => {
    process.chdir('../web');
    child_process.execSync('npm i', {stdio: [process.stdin, process.stdout, 'pipe']})
}

if (require.main === module) {
    main()
}
