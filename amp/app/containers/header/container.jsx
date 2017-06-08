import React from 'react'

import AmpImage from 'mobify-amp-sdk/dist/components/amp-image'
import {HeaderBar, HeaderBarTitle} from '../../components/header-bar'
import IconLabel from '../../components/icon-label'
import Link from '../../components/link'

const Header = () => {
    return (
        <header className="t-header" id="header">
            <HeaderBar>
                <Link href="www.merlinspotions.com" className="t-header__link amp-header-bar__action" role="navigation">
                    <IconLabel iconName="menu" label="Menu" iconSize="medium" />
                </Link>
                <Link href="www.merlinspotions.com" className="t-header__link amp-header-bar__action">
                    <IconLabel iconName="search" label="Search" iconSize="medium" />
                </Link>
                <HeaderBarTitle href="/">
                    <AmpImage src="/static/svg/logo.svg" width="67" height="28" layout="fixed" />
                </HeaderBarTitle>
                <Link href="www.merlinspotions.com" className="t-header__link amp-header-bar__action">
                    <IconLabel iconName="store" label="Stores" iconSize="medium" />
                </Link>
                <Link href="www.merlinspotions.com" className="t-header__link amp-header-bar__action">
                    <IconLabel iconName="cart" label="Cart" iconSize="medium" />
                </Link>
            </HeaderBar>
        </header>
    )
}


export default Header
