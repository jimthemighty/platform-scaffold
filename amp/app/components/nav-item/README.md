```js
// JS import
import NavItem from 'mobify-amp-sdk/dist/components/nav-item'

// SCSS import
@import 'node_modules/mobify-amp-sdk/dist/components/nav-item/base';
```


## Example Usage

Without children

    <NavItem title="Home page" path="/" />

Selected

    <NavItem title="Home page" path="/" selected />

With `hasChild`, `beforeContent`, `childIcon` and `content` props

    <NavItem
        path="/"
        beforeContent={<Icon name="user" />}
        content="Customer Service"
        hasChild={true}
        childIcon={<Icon name="chevron-right" />}
        />
