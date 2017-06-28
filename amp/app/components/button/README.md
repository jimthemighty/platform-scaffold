```js
// JS import
import Button from 'mobify-amp-sdk/dist/components/button'

// SCSS import
@import 'node_modules/mobify-amp-sdk/dist/components/button/base';
```


## Example Usage

    <Button>Primary (default) Button</Button>

## Button Modifiers

*Secondary*

    <Button className="a--secondary">Secondary Button</Button>

*Tertiary*

    <Button className="a--tertiary">Tertiary Button</Button>

*Blank*

    <Button className="a--blank">Blank Button</Button>

*Link style button*

    <div>
        Hello <Button className="a--link">Link style button</Button>
    </div>

*Disabled*

    <Button disabled>Disabled Button</Button>

## Other Button Usages

*`type="submit"`*

    <Button type="submit">Submit Type Button</Button>

*Anchor Type*

    <Button href="foo/bar">Anchor Type Button</Button>

*Icon, with invisible (yet accessible) text*

    <Button icon="cart" title="Icon Button with hidden, but accessible text"></Button>

*Icon, with visible text*

    <Button icon="cart" title="icon Button with visible text" showIconText></Button>

*Icon, with invisible (yet accessible) text AND visible text*

    <Button icon="cart" title="Hidden text!">Icon Button with hidden, but accessible text, and normal text</Button>

*Social buttons*

    <div>
        <Button className="a--facebook" icon="social-facebook" title="Facebook" />
        <Button className="a--twitter" icon="social-twitter" title="Twitter" />
        <Button className="a--instagram" icon="social-instagram" title="Instagram" />
        <Button className="a--pinterest" icon="social-pinterest" title="Pinterest" />
        <Button className="a--youtube" icon="social-youtube" title="youtube" />
        <Button className="a--google-plus" icon="social-google-plus" title="Google Plus" />
        <Button className="a--yelp" icon="social-yelp" title="Yelp" />
    </div>
