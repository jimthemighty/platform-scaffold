```js
// JS import
import HeaderBar from 'amp-sdk/dist/components/header-bar/'

// SCSS import
@import '../components/header-bar/base';
```


## Example Usage

### With an image link title

        <HeaderBar>
            <Button className="t-header__link amp-header-bar__action" on={openNav}>
                <IconLabel iconName="menu" label="Menu" iconSize="medium" />
            </Button>
            <Button className="t-header__link amp-header-bar__action">
                <IconLabel iconName="search" label="Search" iconSize="medium" />
            </Button>
            <HeaderBarTitle href="/">
                <AmpImage src="/static/svg/logo.svg" width="67" height="28" layout="fixed" />
            </HeaderBarTitle>
            <Button className="t-header__link amp-header-bar__action">
                <IconLabel iconName="store" label="Stores" iconSize="medium" />
            </Button>
            <Button className="t-header__link amp-header-bar__action">
                <IconLabel iconName="cart" label="Cart" iconSize="medium" />
            </Button>
        </HeaderBar>

### With a title text link

        <HeaderBar>
            <Button className="t-header__link amp-header-bar__action" on={openNav}>
                <IconLabel iconName="menu" label="Menu" iconSize="medium" />
            </Button>
            <Button className="t-header__link amp-header-bar__action">
                <IconLabel iconName="search" label="Search" iconSize="medium" />
            </Button>
            <HeaderBarTitle href="/">
                Title Link
            </HeaderBarTitle>
            <Button className="t-header__link amp-header-bar__action">
                <IconLabel iconName="store" label="Stores" iconSize="medium" />
            </Button>
            <Button className="t-header__link amp-header-bar__action">
                <IconLabel iconName="cart" label="Cart" iconSize="medium" />
            </Button>
        </HeaderBar>

### With a static title

        <HeaderBar>
            <Button className="t-header__link amp-header-bar__action" on={openNav}>
                <IconLabel iconName="menu" label="Menu" iconSize="medium" />
            </Button>
            <Button className="t-header__link amp-header-bar__action">
                <IconLabel iconName="search" label="Search" iconSize="medium" />
            </Button>
            <HeaderBarTitle>
                Title
            </HeaderBarTitle>
            <Button className="t-header__link amp-header-bar__action">
                <IconLabel iconName="store" label="Stores" iconSize="medium" />
            </Button>
            <Button className="t-header__link amp-header-bar__action">
                <IconLabel iconName="cart" label="Cart" iconSize="medium" />
            </Button>
        </HeaderBar>

### Dialog header bar

        <HeaderBar className="c--dialog">
            <HeaderBarTitle>
                Dialog title
            </HeaderBarTitle>

            <Button className="c--blank u-link-color" icon="close" title="Close" />
        </HeaderBar>
