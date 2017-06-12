import React, {PropTypes} from 'react'

import AmpImage from 'mobify-amp-sdk/dist/components/amp-image'
import Button from '../../components/button'
import {HeaderBar, HeaderBarTitle} from '../../components/header-bar'
import IconLabel from '../../components/icon-label'

const Header = (props) => {

    const {navId} = props
    const openNav = `tap:${navId}.toggle`

    return (
        <header className="t-header" id="header">
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
        </header>
    )
}

Header.propTypes = {
    navId: PropTypes.string
}

export default Header
