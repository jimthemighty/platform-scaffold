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

## Adding AMP links for PDP/PLP pages

If your project has Mobify [AMP](https://www.ampproject.org/) enabled, you can link the AMP versions of your web pages for each of your product description, listing, etc. pages by adjusting or adding to the `baseAMPUrl` and `validAMPUrls` variables within the `./web/app/ampUrls.js` file. The `baseAMPUrl` variable refers to the domain you are serving your AMP pages from, whereas each entity within the `validAMPUrls` array refer to the relative paths to your resources.

To verify that your AMP pages are being linked correctly, you can run your dev server and use the [AMP validator](https://validator.ampproject.org/) chrome plugin. The validator plugin icon will turn green on a valid AMP page, and blue on a web page that links to an AMP page, which upon clicking, should redirect you to the linked AMP page.
