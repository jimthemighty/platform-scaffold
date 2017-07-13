import React, {PropTypes} from 'react'
import {ampComponent} from 'mobify-amp-sdk/dist/amp-sdk'

import sprite from '../../static/svg/sprite-dist/sprite.svg'

// Partials
import Header from '../header/container'
import Footer from '../footer/container'
import Navigation from '../navigation/container'
import ProductListFilterModal from '../product-list/partials/product-list-filter-modal'

// Components
import SkipLinks from 'mobify-amp-sdk/dist/components/skip-links'

const App = ({children}) => {

    const skipLinksItems = [
        // Customize your list of SkipLinks here. These are necessary to
        // achieve compliance with WCAG 2.0's guideline 2.4.1: "Bypass
        // Blocks". Compliance is required under some laws, such as the ADA
        // (Americans with Disabilities Act). For more details, see here:
        //
        // @URL: https://www.w3.org/TR/WCAG20-TECHS/G1.html
        {target: '#app-main', label: 'Skip to content'},
        {target: '#header-navigation', label: 'Skip to main navigation'},
        {target: '#app-footer', label: 'Skip to footer'},
    ]

    // Important note: dont remove or rename "app" in body ID because we need this ID to work with sharing styles from PWA.
    const appId = 'app'

    // IDs for Sheet components
    const navId = 'main-nav'
    const filterSheetId = 'filter-sheet'

    return (
        <body
            id={appId}
            className="t-app"
        >
            <div hidden dangerouslySetInnerHTML={{__html: sprite}} />

            <Navigation id={navId} />
            <ProductListFilterModal sheetId={filterSheetId} />

            <SkipLinks items={skipLinksItems} />

            <div id="app-wrap" className="t-app__wrapper u-flexbox u-direction-column">
                <div id="app-header" className="u-flex-none" role="banner">
                    <Header navId={navId} />
                </div>

                <main id="app-main" className="u-flex" role="main">
                    {children}
                </main>

                <div id="app-footer" className="u-flex-none">
                    <Footer />
                </div>
            </div>
        </body>
    )
}

App.propTypes = {
    children: PropTypes.node
}

export default ampComponent(App)
