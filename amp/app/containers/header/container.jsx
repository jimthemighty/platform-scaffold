import React, {PropTypes} from 'react'

import HeaderBar from '../../components/header-bar/'
import IconLabel from '../../components/icon-label'
import Link from '../../components/link'
// import Search from 'progressive-web-sdk/dist/components/search'
// import HeaderTitle from './partials/header-title'

const Header = () => {
    //
    // const searchIcon = <Icon name="search" title="Submit search" />
    // const clearIcon = <Icon name="close" title="Clear search field" />

    return (
        <header className="t-header" id="header">
            <HeaderBar>
                <IconLabel iconName="menu" label="menu" size="" />
                <IconLabel label="search" />
                <IconLabel label="stores" />
                <IconLabel label="cart" />
            </HeaderBar>
        </header>
    )
}


export default Header
