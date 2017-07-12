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

Occasionally when you are developing a feature in the SDK it may be useful to have CircleCI do a full build using your branch of the SDK. To do this you will need to publish a custom version of the `progressive-web-sdk` node module based on your branch:

1. Check out your branch of the SDK
2. Ensure that the SDK's `package.json` is newer than the currently published version (you double-check what is "latest" [here](https://www.npmjs.com/package/progressive-web-sdk).). Bump the *patch* up if you need to.
   For example: if npmjs.com shows the SDK being at v0.17.2 you would change the `package.json`'s version to be 0.17.3.
3. Run `npm publish --tag betaX` (where "`X`" is an increasing integer as you test)
4. Update the scaffold `package.json` so that the `"progressive-web-sdk"` dependency is specified as follows:
  ```json
  "devDependencies": {
      ...
      "progressive-web-sdk": "0.17.0@betaX"
      ...
  }
  ```
  _**Note**: The version used in this step must match the version specified in step #2 and the tag used in step #3!_
5. Commit the change and push so that CircleCI runs a build. CircleCI will install the "beta" version of the progressive-web-sdk npm module which is your in-progress work.

This will leave these "beta" npm modules sitting around in the npm registry but that is probably safe as you can't use it unless you specifically install it by tag name. We could investigate `npm unpublish` if we're concerned about that. 
  
## Swapping Integration Managers

Note: This should make it's way into the Tutorial eventually, but this is here for now.

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
