# Integration Manager

The Integration Manager (IM) provides an API to back-end services that your PWA
can interact with. This helps to isolate network calls from the rest of your
app. It also provides an abstraction to make it easier when re-platforming your
app against a new e-commerce service (maybe you're using a home-grown solution
and it's time to move to an "enterprise" solution like Hybris or Salesforce
Commerce Cloud).

The IM API is composed of a series of Command actions. This forms the API that
you can call from the app to interact with the service you are building against.
The full list of commands is listed to the right (click to see full
documentation).

Commands that are designed to be called when a template loads follow a naming
convention of `initMyPage` (eg. [`initHomePage`](global.html#initHomePage)).

## API Reference

The API reference is generated from JSDoc comments embedded right in the source
files. You can view the documentation directly inline in any `commands.js` file.
Alternatively, you can run the documentation generator and then view it in your
browser:

```sh
$ npm run im:docs && open app/integration-manager/docs/index.html
```