# Mobify AMP SDK Scaffold - Developer Readme


## Development Guidelines

### Naming conventions

The [UI Kit](https://github.com/mobify/progressive-mobile-ui-kit) is our spec for
building mobile  sites. We will follow its naming conventions.

If the UI Kit contains a Sheet, we will add one to each SDK. These will
not be identical, but instead be our best effort to implement the spec in
each environment.

Compatibility is communicated through imports, eg:

    ```
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