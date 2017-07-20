/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import {ampComponent} from 'mobify-amp-sdk/dist/amp-sdk'
import {APP_ID, MAIN_NAV, FILTER_SHEET} from './constants'
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

    return (
        <body
            id={APP_ID}
            className="t-app"
        >
            <div hidden dangerouslySetInnerHTML={{__html: sprite}} />

            <Navigation id={MAIN_NAV} />
            <ProductListFilterModal sheetId={FILTER_SHEET} />

            <SkipLinks items={skipLinksItems} />

            <div id="app-wrap" className="t-app__wrapper u-flexbox u-direction-column">
                <div id="app-header" className="u-flex-none" role="banner">
                    <Header navId={MAIN_NAV} />
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
