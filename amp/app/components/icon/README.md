```js
// JS import
import Icon from 'mobify-amp-sdk/dist/components/icon'

// SCSS import
@import 'node_modules/mobify-amp-sdk/dist/components/icon/base';
```


## Example Usage

    <Icon name="cart" title="Screen Readers read me, but not the next icon" />

**Icons** should be treated like images: they should have accessible titles for
screen readers. To do so, the `title` attribute must be filled with useful text.

If no `title` is provided, the icon will be intentionally hidden from screen
readers **and** be unfocusable. In otherwords, it will be `aria-hidden: true`.


## Pre-Requisite: SVG Icon Sprite

In order for the `Icon` component to work, an SVG icon sprite must be loaded
into the page that the Icon component is used in. The icon sprite technique used
is the same as [the one described by CSS Tricks](https://css-tricks.com/svg-sprites-use-better-icon-fonts/),
combined with an [external SVG reference file](https://css-tricks.com/svg-use-with-external-reference-take-2/)
for caching.

```jsx
// It's recommended that the sprite value come from the Redux store, which will
// be update after a successful Ajax request.
const externallyLoadedSpriteXml = this.props.sprite

// Add this to the app once in a high level place, such as a global template
// wrapper like `~/app/containers/app/container.js`. This way the sprite will
// only be loaded once, and will be available across all pages and components.
<DangerousHTML html={externallyLoadedSpriteXml}>
    {(spriteString) => <div hidden dangerouslySetInnerHTML={spriteString} />}
</DangerousHTML>

// Once the above DangerousHTML is populated the sprite prop, Icon can be used
<Icon name="cart" />
```


## `size`

Icons can take in a `size` prop. Common values include `small`, `medium` and
`large`.

    <div>
        <Icon name="cart" size="small" />
        <Icon name="cart" size="medium" />
        <Icon name="cart" size="large" />
    </div>

However, you can provide any string value into `size` and use its corresponding
class to customize its appearance in any project you use. For example:

    <div>
        <Icon name="cart" size="microscopic" />
        <Icon name="cart" size="gargantuan" />
        <Icon name="cart" size="colossal" />
    </div>
