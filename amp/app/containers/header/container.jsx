import React, {PropTypes} from 'react'
import {ampComponent} from 'mobify-amp-sdk/dist/amp-sdk'

// Components
import AmpImage from 'mobify-amp-sdk/dist/components/amp-image'
import Button from 'mobify-amp-sdk/dist/components/button'
import {HeaderBar, HeaderBarActions, HeaderBarTitle} from 'mobify-amp-sdk/dist/components/header-bar'
import IconLabel from 'mobify-amp-sdk/dist/components/icon-label'

// Utils
import {staticURL, canonicalURL} from '../../utils'

const Header = (props) => {

    const {navId} = props
    const openNav = `tap:${navId}.toggle`

    return (
        <header className="t-header">
            <div className="t-header__bar">
                <HeaderBar>
                    <HeaderBarActions>
                        <Button innerClassName="u-padding-0" on={openNav}>
                            <IconLabel iconName="menu" label="Menu" iconSize="medium" />
                        </Button>
                    </HeaderBarActions>
                    <HeaderBarActions>
                        <Button innerClassName="u-padding-0">
                            <IconLabel iconName="search" label="Search" iconSize="medium" />
                        </Button>
                    </HeaderBarActions>
                    <HeaderBarTitle href="/">
                        <AmpImage src={staticURL('svg/logo.svg')} width="67" height="28" layout="fixed" />
                    </HeaderBarTitle>
                    <HeaderBarActions>
                        <Button href="https://locations.merlinspotions.com/" className="t-header__link" innerClassName="u-padding-0">
                            <IconLabel iconName="store" label="Stores" iconSize="medium" />
                        </Button>
                    </HeaderBarActions>
                    <HeaderBarActions>
                        <Button href={canonicalURL('/checkout/cart')} className="t-header__link" innerClassName="u-padding-0">
                            <IconLabel iconName="cart" label="Cart" iconSize="medium" />
                        </Button>
                    </HeaderBarActions>
                </HeaderBar>
            </div>
        </header>
    )
}

Header.propTypes = {
    navId: PropTypes.string
}

export default ampComponent(Header)
