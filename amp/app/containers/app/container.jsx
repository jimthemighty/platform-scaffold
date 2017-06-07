import React, {PropTypes} from 'react'
import Header from '../header/container'
import Footer from '../footer/container'
import DangerousHTML from '../../components/dangerous-html'
import Sheet from '../../components/sheet'
import SkipLinks from '../../components/skip-links'
import Button from '../../components/button'
import Navigation from '../navigation/container'
import sprite from '../../static/svg/sprite-dist/sprite.svg'

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
        <body
            id="root"
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

                    <Button id="some-id" on="tap:menu-sheet.toggle" class="ZOO-BOO">Open Menu</Button>
                </ul>
            </Sheet>

            <SkipLinks items={skipLinksItems} />

            <DangerousHTML html={sprite}>
                {(htmlObj) => <div hidden dangerouslySetInnerHTML={htmlObj} />}
            </DangerousHTML>

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
        </body>
    )
}

App.propTypes = {
    children: PropTypes.node
}

export default App
