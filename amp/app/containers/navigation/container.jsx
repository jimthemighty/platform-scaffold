import React, {PropTypes} from 'react'

import Sheet from '../../components/sheet'
import Nav from '../../components/nav'
import NavMenu from '../../components/nav-menu'
import {HeaderBar, HeaderBarActions, HeaderBarTitle} from '../../components/header-bar'
import IconLabelButton from '../../components/icon-label-button'
import ListTile from '../../components/list-tile'
import Icon from '../../components/icon'
import NavigationSocialIcons from './partials/navigation-social-icons'


const root = {title: 'Store', path: '/', children: [
    {title: 'Men\'s Clothing', path: '/mens-clothing/', children: [
        {title: 'Casual Shirts', path: '/mens-clothing/casual-shirts/'},
        {title: 'Coats and Jackets', path: '/mens-clothing/coats-and-jackets/'},
        {title: 'Jeans', path: '/mens-clothing/jeans/'},
        {title: 'Polos', path: '/mens-clothing/polos/'},
        {title: 'Shorts', path: '/mens-clothing/shorts/'},
    ]},
    {title: 'Footwear', path: '/footwear/'},
    {title: 'Accessories', path: '/accessories/'},
    {title: 'For the Home', path: '/for-the-home/'},
    {title: 'My Account', path: '/my-account/', type: 'custom'},
    {title: 'Wish List', path: '/wish-list/', type: 'custom'},
    {title: 'Gift Registry', path: '/gift-registry/', type: 'custom'},
]}


const Navigation = (props) => {
    const {id} = props
    const closeNav = `tap:${id}.toggle`

    return (
        <Sheet id={id} className="t-navigation">
            <Nav>
                <HeaderBar>
                    <HeaderBarTitle className="u-flex u-padding-start u-text-align-start">
                        <h2 className="u-text-family-header u-text-uppercase">
                            <span className="u-text-weight-extra-light">Menu</span>
                        </h2>
                    </HeaderBarTitle>

                    <HeaderBarActions>
                        <IconLabelButton iconName="close" label="close" on={closeNav} />
                    </HeaderBarActions>
                </HeaderBar>

                <ListTile
                    href="/sign-in/"
                    className="u-bg-color-neutral-10"
                    startAction={
                        <Icon className="t-navigation__sign-in-icon" name="user" title="User" />
                    }
                >
                    Sign In
                </ListTile>

                <NavMenu root={root} />

                <div>
                    <NavigationSocialIcons />
                    <div className="t-navigation__copyright u-padding-md">
                        <p>© 2017 Mobify Research & Development Inc. All rights reserved.</p>
                    </div>
                </div>
            </Nav>
        </Sheet>
    )
}

Navigation.propTypes = {
    id: PropTypes.string
}

export default Navigation
