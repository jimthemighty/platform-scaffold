import React from 'react'

import Sheet from '../../components/sheet'
import ListTile from '../../components/list-tile'
import NavigationSocialIcons from './partials/navigation-social-icons'

const Navigation = (props) => {
    return (
        <Sheet id="menu-sheet" className="t-navigation" headerContent="Header" footerContent="Footer">
            <ListTile href="#">Home</ListTile>
            <ListTile href="#">Sign in</ListTile>
            <ListTile href="#">Potions</ListTile>
            <ListTile href="#">Spellbooks</ListTile>
            <ListTile href="#">Ingredients</ListTile>
            <ListTile href="#">Supplies</ListTile>
            <ListTile href="#">Charms</ListTile>
            <ListTile href="#">New Arrivals</ListTile>

            <NavigationSocialIcons />

            <div className="t-navigation__copyright u-padding-md">
                <p>© 2017 Mobify Research & Development Inc. All rights reserved.</p>
            </div>
        </Sheet>
    )
}

export default Navigation
