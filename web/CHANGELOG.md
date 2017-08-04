## To be released
- Add Edit, Delete, and Add to account addresses [#892](https://github.com/mobify/platform-scaffold/pull/892)
- Add view wishlist page to app [#891](https://github.com/mobify/platform-scaffold/pull/891)
    - Add initWishlist page commands to SFCC, merlins and stub connectors
- Bump Lighthouse to version 2.2.1 [889](https://github.com/mobify/platform-scaffold/pull/889)
- Add product variation support to Merlin's connector [#800](https://github.com/mobify/platform-scaffold/pull/800)
- Add account pages
    - Account Dashboard[#834](https://github.com/mobify/platform-scaffold/pull/834)
    - Account Addresses[#886](https://github.com/mobify/platform-scaffold/pull/886)
- Handling `product_search` SFCC API request not necessarily having `image` object in the response [#888](https://github.com/mobify/platform-scaffold/pull/888)
- Added a verification that time to First Interactive is below a given threshold. [896](https://github.com/mobify/platform-scaffold/pull/896)
- Added pagination to PLP and search result page [825](https://github.com/mobify/platform-scaffold/pull/825)
- Add Redux Form plugin to track form validation errors [897](https://github.com/mobify/platform-scaffold/pull/897)
- Fix onboarding carousel [#909](https://github.com/mobify/platform-scaffold/pull/909)
- Update pageview analytics instrumentation [#916](https://github.com/mobify/platform-scaffold/pull/916)
- Update the Mobify V8 tag [#923](https://github.com/mobify/platform-scaffold/pull/923)

## 0.17.3 (July 7, 2017)
- Moved a pair of browser storage detection methods to SDK [#850](https://github.com/mobify/platform-scaffold/pull/850)
- Dismissal config is via DefaultAsk prop now [#863](https://github.com/mobify/platform-scaffold/pull/863)
  - The latest changes in the SDK introduce a breaking change to Push Messaging
    component configuration. The visits to wait upon dismissal prop is now
    configured on the DefaultAsk (or any other component implementing push
    messaging) via the deferOnDismissal prop
- Several a11y fixes to improve Lighthouse score [#862](https://github.com/mobify/platform-scaffold/pull/862)
- Fixed race condition in `loader.js` related to messaging `Promise` [#861](https://github.com/mobify/platform-scaffold/pull/861) and [#855](https://github.com/mobify/platform-scaffold/pull/855)
- Added default values to selectors of custom Integration Manager data [#857](https://github.com/mobify/platform-scaffold/pull/857)
- [Amp] Started using the `<Link>` component from the SDK [#856](https://github.com/mobify/platform-scaffold/pull/856)
- [Amp] Fixed up style paths to work with SDK components [#853](https://github.com/mobify/platform-scaffold/pull/853)
- [Amp] Fixed up path to chevron assets [#852](https://github.com/mobify/platform-scaffold/pull/852)

## 0.17.2 (June 30, 2017)
- Upgrade SDK to 0.16.0
- Bug fixes, analytics improvements and more!

## 0.17.1 (June 23, 2017)
- Update Progressive Web SDK to 0.15.5 [#807](https://github.com/mobify/platform-scaffold/pull/807)
- Add `messaging:testmessage` command to `web/package.json` [#735](https://github.com/mobify/platform-scaffold/pull/735)

## 0.17.0 (June 6, 2017)
- Introduce the [Integration Manager](https://docs.mobify.com/progressive-web/latest/guides/integration-manager/)
- Rename all files containing JSX to have a .jsx file extension [#525](https://github.com/mobify/platform-scaffold/pull/525)
- Fix PLP to successfully display no results message if there are no products [#525](https://github.com/mobify/platform-scaffold/pull/525)
- Update SDK version to 0.15.0 [#627](https://github.com/mobify/platform-scaffold/pull/627)
- Add `analyze-build` npm script [#575](https://github.com/mobify/platform-scaffold/pull/575)
- Utility styles change: remove `!important`, wrap utility styles with id, and `@import` bottom of stylesheet file [#604](https://github.com/mobify/platform-scaffold/pull/604)
- Add Messaging commands to `web/package.json` [#670](https://github.com/mobify/platform-scaffold/pull/670)

## 0.16.4 (May 18, 2017)
- Fix lighthouse tests by ignoring certificate errors in Chrome

## 0.16.3 (May 17, 2017)
- Release updated README.md to support Windows (for upcoming training)

## 0.16.2
- Update dependencies, including babel, jsdom, jest, and more.

## 0.16.1
- Use "Mobify Development Server" certificate for HTTPS local development [#491](https://github.com/mobify/platform-scaffold/pull/461)
- Dependency updates and code splitting [#465](https://github.com/mobify/platform-scaffold/pull/465)

## 0.16.0 (March 15, 2017)
- Renamed repo from `progressive-web-scaffold` to `platform-scaffold`
- More performance updates (i.e. defer font loading, lazy load images etc.)
- Redesign preloader
- Fixes for bugs, typoes
- Add documentation (i.e. Linting configuration)
- Remove Selector Utils

## 0.15.1 (March 14, 2017)
- More performance improvements (i.e. fonts, script loading tweaks, etc.)

## 0.15.0 (March 10, 2017)
- Fix for add-to-cart when Magento Full Page Cache is enabled [#406](https://github.com/mobify/progressive-web-scaffold/pull/406)
- Performance improvements (i.e. code splitting, etc.)

## 0.14.0 (March 3, 2017)
- Add support for Progressive Mobile Apps

## 0.13.1 (March 1, 2017)
- Fix for cart fetch when Magento backend has full page cache enabled

## 0.13.0 (February 24, 2017)
- Updated to v0.13.0 of the SDK [#361](https://github.com/mobify/progressive-web-scaffold/pull/361)
- Rename app-provider.jsx to router.jsx [#354](https://github.com/mobify/progressive-web-scaffold/pull/354)
- Rename raw to unwrapped in templates.jsx [#354](https://github.com/mobify/progressive-web-scaffold/pull/354)

## 0.12.0 (February 24, 2017)
- Update to latest SDK
- Refactor application to use architecture 2.0
- Parse content for Checkout pages
- Implement functionality for Checkout pages
- Add option to analyze bundle after build. Set `MOBIFY_ANALYZE` environment variable to `true` before running any build. Eg. `MOBIFY_ANALYZE=true npm run prod:build`
- Rename plp and pdp containers to product-list and product-details
- Rename product-list component in checkout to order-summary

## 0.11.0 (February 10, 2017)
- Upgrade to the latest SDK
- Get new generators to match the architecture 2.0

## 0.10.1 (February 7, 2017)
- Optimize the homepage carousel images
- Disable a few CircleCI features that broke in January
- Add `cache_directories` for the node_modules directory to circle.yml

## 0.10.0 (January 8, 2017)
- Implement the Progressive Checkout UI components
- Fix inconsistencies between the generator and best practices

## 0.9.1 (November 14, 2016)
- Use SDK version 0.10.4

## 0.9.0 (November 14, 2016)
- Use SDK version 0.10.3
- Build the homepage, PLPs, PDPs and login for Merlin's Potions

## 0.8.0 (November 2, 2016)
- Use SDK version 0.9.0

## 0.7.2 (October 27, 2016)
- Use SDK version 0.8.3
- Update react-styleguidist to 4.1.0
- Include webpack-dev-server@1.14.1 and webpack-hot-middleware@2.13.0 to workaround styleguidist problems
- Add IconLabelButton component
- Add NavItem component
- Implement global navigation menu
- Remove progressive-web-sdk module from Babel transpiling
- Add yarn lockfile

## 0.7.1 (October 26, 2016)
- ACTUALLY bump SDK version to 0.8.1

## 0.7.0 (October 24, 2016)
- Use SDK version 0.8.1

## 0.6.0 (October 13, 2016)
- Use SDK version 0.7.0

## 0.5.4 (October 11, 2016)
- Use SDK version 0.6.6

## 0.5.3 (October 6, 2016)
- Use SDK version 0.6.5
- Fix Jest tests when importing modules that themselves import .svg assets
- Rename `build` npm script to `prod:build`
- Adds Nightwatch checkout flow smoke test scaffolding; smoke-test npm script

## 0.5.2 (September 29, 2016)
- Use SDK version 0.6.3
- Use SDK polyfill (which includes es6-promise polyfill)
- Remove react-hot-loader [#106](https://github.com/mobify/progressive-web-scaffold/pull/106)
- Add npm script alias for generating form components [#105](https://github.com/mobify/progressive-web-scaffold/pull/105)

## 0.5.1 (September 25, 2016)
- Use SDK version 0.6.1

## 0.5.0 (September 22, 2016)
- Add SkipLinks and corresponding nightwatch tests
- Make Merlin's Potions the initial URL for local Nightwatch tests

## 0.4.0 (September 20, 2016)
- Include charset attribute on main script tag
- Fix issue with hot-loader errors
- Display SDK components in the project's styleguide

## 0.3.0 (September 19, 2016)
- Moved /static folder into /app to fix CSS url pathing issues

## 0.2.0 (September 16, 2016)
- Updated login form example to use FormFields
- Added example of using loadScripts for injecting scripts from desktop

## 0.1.1 (September 15, 2016)
- Use SDK version 0.4.4

## 0.1.0 (September 14, 2016)
- Add PostCSS (Autoprefixer) and CSS minification
- Move Styleguidist's webpack settings to the `/webpack` directory
- Use SDK version 0.4.3 (test framework AVA replaced with Jest, Analytics utils)
- Project utils.js now contains makeRequest method

## 0.0.4 (August 31, 2016)
- Add configuration for building in specific cache manifest files into the main
  and loader build files

## 0.0.3 (August 26, 2016)
- use SDK version 0.1.1

## 0.0.2
- use SDK version 0.0.11
- Add icons
- Update how jQuery is used
- Use the router from the SDK

##0.0.1
- Initial scaffold
