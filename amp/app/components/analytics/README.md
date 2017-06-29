```js
// JS import
import Analytics from 'mobify-amp-sdk/dist/components/analytics'
```

There should only be one of these in a page.

## Example Usage

*With Google Analytics*

    <Analytics templateName='template name' gaAccount="UA-something" />

*With With Engagement Engine*

    <Analytics templateName='template name' projectSlug="mobify-cloud-slug" />

*With both Google Analytics and Engagement Engine*

    <Analytics templateName='template name' projectSlug="mobify-cloud-slug" gaAccount="UA-something" />
