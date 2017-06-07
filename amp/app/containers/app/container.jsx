import React, {PropTypes} from 'react'
import Header from '../header/container'
import Footer from '../footer/container'
import DangerousHTML from '../../components/dangerous-html'
import SkipLinks from '../../components/skip-links'
import Navigation from '../navigation/container'
import Sheet from '../../components/sheet'

import sprite from '../../static/svg/sprite-dist/sprite.svg'

import {connect} from 'react-redux'

const App = ({
    children,
    buttontest
}) => {

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
        <div
            id="app"
            className="t-app"
        >

            <Sheet id="menu-sheet" headerContent={<div>Header</div>} footerContent={<div>Footer</div>}>
                <ul>
                    <li><a href="/todo/">Home</a></li>
                    <li><a href="/todo/">Sign in</a></li>
                    <li><a href="/todo/">Potions</a></li>
                    <li><a href="/todo/">Spellbooks</a></li>
                    <li><a href="/todo/">Ingredients</a></li>
                    <li><a href="/todo/">Supplies</a></li>
                    <li><a href="/todo/">Charms</a></li>
                    <li><a href="/todo/">New Arrivals</a></li>
                    <DangerousHTML html={button}>
                        {(htmlObj) => <div dangerouslySetInnerHTML={htmlObj} />}
                    </DangerousHTML>
                </ul>
            </Sheet>

            <DangerousHTML html={button}>
                {(htmlObj) => <div dangerouslySetInnerHTML={htmlObj} />}
            </DangerousHTML>

            <DangerousHTML html={sprite}>
                {(htmlObj) => <div hidden dangerouslySetInnerHTML={htmlObj} />}
            </DangerousHTML>

            <SkipLinks items={skipLinksItems} />

            <div id="app-wrap" className="t-app__wrapper u-flexbox u-direction-column">
                <div id="app-header" className="u-flex-none" role="banner">
                    <Header />

                    <Navigation />
                </div>

                <main id="app-main" className="u-flex" role="main">
                    {children}

                    <DangerousHTML html={buttontest}>
                        {(htmlObj) => <div dangerouslySetInnerHTML={htmlObj} />}
                    </DangerousHTML>
                </main>

                <div id="app-footer" className="u-flex-none">
                    <Footer />
                </div>
            </div>
        </div>
    )
}


App.propTypes = {
    buttontest: PropTypes.string,
    children: PropTypes.node,
    /**
     * The react-router history object
     */
    // history: PropTypes.object
}


const mapStateToProps = (state) => ({
    buttontest: '<button on="tap:menu-sheet.toggle">Button</button>'
})

export default connect(
    mapStateToProps
)(App)
