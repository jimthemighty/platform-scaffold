```js
// JS import
import HeaderBar from 'amp-sdk/dist/components/header-bar/'

// SCSS import
@import '../components/header-bar/base';
```


## Example Usage

### With an image link title

        <HeaderBar>
            <Link>
                <IconLabel iconName="menu" label="Menu" iconSize="" />
            </Link>

            <Link>
                <IconLabel iconName="search" label="Search" iconSize="" />
            </Link>

            <HeaderBarTitle href="http://www.mobify.com">
                <img src="https://cdn-www.mobify.com/wp-content/themes/sparkjoy-mobify-v8/library/images/logo-mobify-white.png" alt="Mobify Logo" height="28" />
            </HeaderBarTitle>

            <Link>
                <IconLabel iconName="cart" label="Cart" iconSize="" />
            </Link>
        </HeaderBar>

### With a title text link

        <HeaderBar>
            <Link>
                <IconLabel iconName="menu" label="Menu" iconSize="" />
            </Link>

            <Link>
                <IconLabel iconName="search" label="Search" iconSize="" />
            </Link>

            <HeaderBarTitle href="http://www.mobify.com">
                Title Link
            </HeaderBarTitle>

            <Link>
                <IconLabel iconName="cart" label="Cart" iconSize="" />
            </Link>
        </HeaderBar>

### With a static title

        <HeaderBar>
            <Link>
                <IconLabel iconName="menu" label="Menu" iconSize="" />
            </Link>

            <Link>
                <IconLabel iconName="search" label="Search" iconSize="" />
            </Link>

            <HeaderBarTitle>
                Title Link
            </HeaderBarTitle>

            <Link>
                <IconLabel iconName="cart" label="Cart" iconSize="" />
            </Link>
        </HeaderBar>

### Custom content in title

        <HeaderBar>
            <HeaderBarTitle className="u-h4">
                <div className="u-flexbox u-align-center u-width-full">
                    <Link href="http://www.mobify.com" className="u-flex">
                        <img className="u-align-middle" src="https://cdn-www.mobify.com/wp-content/themes/sparkjoy-mobify-v8/library/images/logo-mobify-white.png" alt="Mobify Logo" height="28" />
                    </Link>

                    <div className="u-flex-none">
                        <span className="u-align-middle">Secure Checkout</span>
                        <Icon className="u-margin-start u-align-middle" name="lock" size="medium" />
                    </div>
                </div>
            </HeaderBarTitle>
        </HeaderBar>

### Dialog header bar

        <HeaderBar className="c--dialog">
            <HeaderBarTitle>
                Dialog title
            </HeaderBarTitle>

            <Button className="c--blank u-link-color" icon="close" title="Close" />
        </HeaderBar>
