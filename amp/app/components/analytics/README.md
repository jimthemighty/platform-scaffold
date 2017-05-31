```js
// JS import
import Analytics from '../components/analytics'
```

There should only be one of these in a template. Usually this will be included
at a higher level than a page template (main.js).

## Example Usage

*With Google Analytics*

    <Analytics templateName='template name' gaAccount="UA-something" />

*With With Engagement Engine*

    <Analytics templateName='template name' projectSlug="mobify-cloud-slug" />

*With both Google Analytics and Engagement Engine*

    <Analytics templateName='template name' projectSlug="mobify-cloud-slug" gaAccount="UA-something" />
