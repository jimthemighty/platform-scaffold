# Mobify AMP SDK Scaffold

## Setup

Run `npm install`

## Run

Start the development server with `npm run dev` and go to localhost:3000.


## Development Guidelines

We had a bit of back-and-forth about how AMP relates to the PWA and
decided on these guidelines.

### Naming conventions

The UI Kit is our spec for building mobile sites. We will follow its naming
conventions.

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
