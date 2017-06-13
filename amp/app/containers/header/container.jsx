import React, {PropTypes} from 'react'

import AmpImage from 'mobify-amp-sdk/dist/components/amp-image'
import Button from '../../components/button'
import {HeaderBar, HeaderBarActions, HeaderBarTitle} from '../../components/header-bar'
import IconLabel from '../../components/icon-label'

const Header = (props) => {

    const {navId} = props
    const openNav = `tap:${navId}.toggle`

    return (
        <header className="t-header">
            <HeaderBar>
                <HeaderBarActions>
                    <Button innerClassName="t-header__actions-button" on={openNav}>
                        <IconLabel iconName="menu" label="Menu" iconSize="medium" />
                    </Button>
                </HeaderBarActions>
                <HeaderBarActions>
                    <Button innerClassName="t-header__actions-button">
                        <IconLabel iconName="search" label="Search" iconSize="medium" />
                    </Button>
                </HeaderBarActions>
                <HeaderBarTitle href="/">
                    <AmpImage src="/static/svg/logo.svg" width="67" height="28" layout="fixed" />
                </HeaderBarTitle>
                <HeaderBarActions>
                    <Button innerClassName="t-header__actions-button">
                        <IconLabel iconName="store" label="Stores" iconSize="medium" />
                    </Button>
                </HeaderBarActions>
                <HeaderBarActions>
                    <Button innerClassName="t-header__actions-button">
                        <IconLabel iconName="cart" label="Cart" iconSize="medium" />
                    </Button>
                </HeaderBarActions>
            </HeaderBar>
        </header>
    )
}

Header.propTypes = {
    navId: PropTypes.string
}

export default Header
