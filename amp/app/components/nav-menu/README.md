```js
// JS import
import Nav from 'mobify-amp-sdk/dist/components/nav'

// SCSS import
@import 'mobify-amp-sdk/dist/components/nav/base';
```


## Example Usage
    const root = {title: 'Store', path: '/', children: [
        {title: 'Footwear', path: '/footwear/'},
        {title: 'Accessories', path: '/accessories/'},
        {title: 'My Account', path: '/my-account/', type: 'custom'}
    ]}

    <NavMenu root={root} path="/" />
