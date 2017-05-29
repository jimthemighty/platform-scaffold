# Integration Manager

This folder contains the Integration Manager. Currently this includes two
connector implementations: a Demo Merlin's Connector and a Salesforce Commerce
Cloud (SFCC) Connector.

**Note**: Much of the code in this folder will be moving to the Web SDK shortly!

## API Reference

The API reference is generated from JSDoc comments embedded right in the source
files. You can view the documentation directly inline in any `commands.js` file.
Alternatively, you can run the documentation generator and then view it in your
browser:

```sh
$ npm run im:docs && open app/integration-manager/docs/index.html
```
