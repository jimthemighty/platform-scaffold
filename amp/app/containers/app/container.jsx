import React, {PropTypes} from 'react'
import Header from '../header/container'
import Footer from '../footer/container'
import DangerousHTML from '../../components/dangerous-html'
import SkipLinks from '../../components/skip-links'
import Button from '../../components/button'
import Navigation from '../navigation/container'
import sprite from '../../static/svg/sprite-dist/sprite.svg'

import {connect} from 'react-redux'

const App = ({
    children
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

                    <Button id="some-id" on="tap:menu-sheet.toggle" class="ZOO-BOO">Open Menu</Button>
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
}


const mapStateToProps = (state) => ({

})

export default connect(
    mapStateToProps
)(App)
