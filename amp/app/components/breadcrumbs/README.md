```js
// JS import
import Breadcrumbs from 'progressive-web-sdk/dist/components/breadcrumbs'

// SCSS import
@import 'node_modules/progressive-web-sdk/dist/components/breadcrumbs/base';
```


## Example Usage

    <div>
        <Breadcrumbs
            className="u-margin-bottom-lg"
            items={[
                {
                    text: 'Home',
                    href: 'http://www.mobify.com'
                },
                {
                    text: 'Cat',
                    href: 'http://www.mobify.com'
                },
                {
                    text: 'Food'
                }
            ]}
        />
    </div>
