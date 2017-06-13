```js
// JS import
import {HeaderBar, HeaderBarActions, HeaderBarTitle} from 'mobify-amp-sdk/dist/components/header-bar'

// SCSS import
@import 'node_modules/mobify-amp-sdk/dist/components/header-bar/base';
```


## Example Usage

        <HeaderBar>
            <HeaderBarActions>
                Menu
            </HeaderBarActions>

            <HeaderBarActions>
                Search
            </HeaderBarActions>

            <HeaderBarTitle>
                Logo
            </HeaderBarTitle>

            <HeaderBarActions>
                Stores
            </HeaderBarActions>

            <HeaderBarActions>
                Cart
            </HeaderBarActions>
        </HeaderBar>

## Example With Buttons and Icons for Actions and Image for Title
        <HeaderBar>
            <HeaderBarActions>
                <Button className="t-header__actions-button">
                    <IconLabel iconName="menu" label="MENU" />
                </Button>
            </HeaderBarActions>

            <HeaderBarActions>
                <Button className="t-header__actions-button">
                    <IconLabel iconName="search" label="SEARCH" />
                </Button>
            </HeaderBarActions>

            <HeaderBarTitle href="http://www.mobify.com">
                <AmpImage src="https://www.mobify.com/wp-content/uploads/logo-mobify-white.png" width="67" height="28" layout="fixed" />
            </HeaderBarTitle>

            <HeaderBarActions>
                <Button className="t-header__actions-button">
                    <IconLabel iconName="location" label="STORES" />
                </Button>
            </HeaderBarActions>

            <HeaderBarActions>
                <Button className="t-header__actions-button">
                    <IconLabel iconName="cart" label="CART" />
                </Button>
            </HeaderBarActions>
        </HeaderBar>
