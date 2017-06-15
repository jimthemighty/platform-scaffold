import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'

import Sheet from '../../components/sheet'
import Nav from '../../components/nav'
import NavMenu from '../../components/nav-menu'
import {HeaderBar, HeaderBarActions, HeaderBarTitle} from '../../components/header-bar'
import IconLabelButton from '../../components/icon-label-button'
import ListTile from '../../components/list-tile'
import Icon from '../../components/icon'
import NavigationSocialIcons from './partials/navigation-social-icons'
import {getNavigationRoot, getPath} from './selectors'


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

                <ListTile
                    href="/sign-in/"
                    className="u-bg-color-neutral-10"
                    startAction={
                        <Icon className="t-navigation__sign-in-icon" name="user" title="User" />
                    }
                >
                    Sign In
                </ListTile>

                <NavMenu root={root} path={path} />

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
    root: PropTypes.object,
    path: PropTypes.string
}

const mapStateToProps = createPropsSelector({
    root: getNavigationRoot,
    path: getPath
})

export default connect(mapStateToProps)(Navigation)
