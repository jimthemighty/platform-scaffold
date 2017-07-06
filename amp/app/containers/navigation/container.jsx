import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import URL from 'url'
import {canonicalURL} from '../../utils'

// Components
import Sheet from '../../components/sheet'
import Nav from '../../components/nav'
import NavMenu from '../../components/nav-menu'
import NavItem from '../../components/nav-item'
import {HeaderBar, HeaderBarActions, HeaderBarTitle} from '../../components/header-bar'
import IconLabelButton from '../../components/icon-label-button'
import Icon from '../../components/icon'

// Partials
import NavigationSocialIcons from './partials/navigation-social-icons'
import {ampComponent} from 'mobify-amp-sdk/dist/amp-sdk'

// Selectors
import {getNavigationRoot, getPath} from './selectors'

const pathnameMatch = (url, pathname) => Boolean(url && URL.parse(url).pathname === pathname)

const itemFactory = (type, componentProps) => {
    // Login has a special nav item
    if (pathnameMatch(componentProps.href, '/customer/account/login/')) {
        return <SignInListItem {...componentProps} href={canonicalURL(componentProps.href)} />
    }
    return <NavItem {...componentProps} href={canonicalURL(componentProps.href)} />
}

const SignInListItem = (props) => (
    <NavItem {...props}
        className="u-bg-color-neutral-10"
        beforeContent={
            <Icon className="t-navigation__sign-in-icon" name="user" title="User" />
        }
    />
)

const Navigation = (props) => {
    const {id, root, path} = props
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

                <NavMenu root={root} path={path} itemFactory={itemFactory} />

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
    id: PropTypes.string,
    path: PropTypes.string,
    root: PropTypes.object
}

const mapStateToProps = createPropsSelector({
    root: getNavigationRoot,
    path: getPath
})

export default ampComponent(
    connect(mapStateToProps)(Navigation)
)
