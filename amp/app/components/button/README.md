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

    <Button className="amp--secondary">Secondary Button</Button>

*Tertiary*

    <Button className="amp--tertiary">Tertiary Button</Button>

*Blank*

    <Button className="amp--blank">Blank Button</Button>

*Link style button*

    <div>
        Hello <Button className="amp--link">Link style button</Button>
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
        <Button className="amp--facebook" icon="social-facebook" title="Facebook" />
        <Button className="amp--twitter" icon="social-twitter" title="Twitter" />
        <Button className="amp--instagram" icon="social-instagram" title="Instagram" />
        <Button className="amp--pinterest" icon="social-pinterest" title="Pinterest" />
        <Button className="amp--youtube" icon="social-youtube" title="youtube" />
        <Button className="amp--google-plus" icon="social-google-plus" title="Google Plus" />
        <Button className="amp--yelp" icon="social-yelp" title="Yelp" />
    </div>

*Set in progress state to a button*

    initialState = {
        addingToCart: false
    };

    const simulateAddingToCart = () => {
        // Adding to cart
        setState({addingToCart: true})

        // Re-enable button after item has been added to cart
        setTimeout(() => {
            setState({addingToCart: false})
        }, 2000)
    };

    <Button
        disabled={state.addingToCart}
    >
        {state.addingToCart ?
            <InlineLoader text="Adding to cart" />
        :
            <span>Add to Cart</span>
        }
    </Button>
