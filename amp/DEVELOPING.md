# Mobify AMP SDK Scaffold - Developer Readme


## Development Guidelines

### Naming conventions

The [UI Kit](https://github.com/mobify/progressive-mobile-ui-kit) is our spec for
building mobile  sites. We will follow its naming conventions.

If the UI Kit contains a Sheet, we will add one to each SDK. These will
not be identical, but instead be our best effort to implement the spec in
each environment.

Compatibility is communicated through imports, eg:

```JavaScript
import Sheet from 'progressive-web-sdk/sheet'   // A PWA-compatible sheet
import Sheet from 'mobify-amp-sdk/sheet'   // An AMP-compatible sheet
```

### Do we want PWA/AMP components to have the same structure?

We agreed that this is impossible for complex cases and that we do not
want to change processes for the AMP and PWA teams. They need to be
able to develop components independently.

Our plans are:

  1) Initially copy-paste PWA components into the AMP SDK and modify them to
     make them compatible with AMP.

  2) To isolate PWA and AMP components so they can be updated by either team
     independently as and when bug-fixes are necessary, or as the UI Kit evolves.

  3) The AMP team has the option of re-exporting 100% identical components
     from the PWA with this pattern:

      ```
      // inside amp/sheet.jsx
      import Sheet from 'progressive-web-sdk/sheet'
      export default Sheet
      ```

### Partner workflow from PWA to AMP

We imagine partners will

  1) Have built a PWA and will start an AMP project.

  2) Change their PWA designs based on AMP guidelines in the design docs.

  3) Adapt the Merlins AMP template in the scaffold by copy-pasting code from
     the PWA, swapping components and fixing compatibility issues.

  4) Integration Manager / Connector code will be usable unmodified.

## Configuring Mobify/Customer GA

If your AMP project has been created with the `platform-generator`, by now you should already have a Mobify GA-ID set up in the project's `package.json` file. If not, you can add a `gaAccount` field to your `./amp/package.json` file to configure your Mobify GA-ID. To further configure customer AMP GA-ID, include another field in your `package.json` file, being `ampgaAccount`, and set it to the customer GA-ID.

To test and ensure the AMP client is sending data correctly to Google Analytics for the configured GA-ID's:
- `npm run dev`, open the chrome debugger, switch to the network tab, and visit `localhost:3000/potions`
- You should see two requests fire to Google Analytics. You can search for your newly set GA-ID's to find the analytics request. If not, you have configured something incorrectly.

## Custom Domains

Mobify has purchased the domain `amp-mobify.com` which we will use to provide clients
with readable URLs for in-development projects. Mobify will set up two environments
for each client:

    [client].amp-mobify.com           // Production
    [client]-staging.amp-mobify.com   // Staging

Clients will be able to go live with the `[client].amp-mobify.com` URL, but ideally
would configure their DNS records and provide SSL certificates that would allow
us to serve AMP content from `amp.[client-domain.com]`.

This this is possible, but it is a manual configuration step. See

  - [Custom domains](http://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-custom-domains.html)
  - [Requesting certificates](http://docs.aws.amazon.com/acm/latest/userguide/gs-acm-request.html)


## Logging and CloudWatch

Since the AMP backend is a [Node.js](https://nodejs.org/en/) app deployed on AWS Lambda, all application logs
invoked by any of the ***console*** object's `log(), warn(), error()`, and `info()` methods can be found on
[Amazon CloudWatch](https://aws.amazon.com/cloudwatch/). In order to get read access to the logs, first ensure
that you have access to the AWS console for Mobify, and then ensure that you have access to Lambda, CloudWatch, and
CloudFormation. Then:

1) Login to your [AWS Console](http://console.aws.amazon.com) account, switch to [CloudFormation](https://aws.amazon.com/cloudformation/)
and choose which AMP Lambda instance you want to investigate from the displayed stack.
For [Merlins Potions](http://merlinspotions.com), we currently have `amp--mobify-merlinspotions-production`
and `amp--mobify-merlinspotions-staging`.

2) Click on your chosen lambda instance and you'll be redirected to a `stack-detail`
page. Click to expand the `Outputs` section, and you should see a link to
`LambdaFunctionConsoleUrl`; click on the URL within the value field, this will
take you to the appropriate Lambda function home page.

3) Once you're at the appropriate Lambda function home page, switch to the
monitoring tab, and click `View logs in CloudWatch`. You should now be in the right CloudWatch
page for your log group. Choose a log stream according to an expected log event, and you should be able to
see the associated logs for the Lambda instance sorted by time.

4) Each new request is wrapped with a `START` and `END` message within the list of logs.
  This should help you find what you're looking for faster.
