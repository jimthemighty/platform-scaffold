import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import Header from '../header/container'
import Footer from '../footer/container'
import Button from '../../components/button'
import SkipLinks from '../../components/skip-links'
import Navigation from '../navigation/container'
import sprite from '../../static/svg/sprite-dist/sprite.svg'

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

    const navId = 'main-nav'

    // Important note: dont remove or rename "app" in body ID because we need this ID to work with sharing styles from PWA.
    const appId = 'app'

    return (
        <body id={appId} className="t-app">
            <div hidden dangerouslySetInnerHTML={{__html: sprite}} />

            <Navigation id={navId} />

            <Button icon="cart" title="Hidden text!" on="click=trigger:whatever" />

            {/* TODO REMOVE TOGGLE NAV WHEN ADD HEADER */}
            <div dangerouslySetInnerHTML={{__html: `<button on="tap:${navId}.toggle">Toggle Nav</button>`}} />

            <SkipLinks items={skipLinksItems} />

            <div id="app-wrap" className="t-app__wrapper u-flexbox u-direction-column">
                <div id="app-header" className="u-flex-none" role="banner">
                    <Header />
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


export default connect()(App)
