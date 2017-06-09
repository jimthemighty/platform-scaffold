import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import Header from '../header/container'
import Footer from '../footer/container'
import DangerousHTML from '../../components/dangerous-html'
import Icon from '../../components/icon'
import Sheet from '../../components/sheet'

import sprite from '../../static/svg/sprite-dist/sprite.svg'

import {DATA_INIT_FUNCTION} from '../../data-integration/constants'
import {CURRENT_URL} from '../../../../web/app/containers/app/constants'

const resolver = (({dispatch, getState}) => {
    return dispatch(getState().ui.app.get(DATA_INIT_FUNCTION)(getState().ui.app.get(CURRENT_URL)))
})

const button = '<button on="tap:menu-sheet.toggle">Button</button>'

const App = ({
    children
}) => (
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

        <Icon name="user" title="User" />

        <Header />

        {children}

        <Footer />
    </body>
)

App.resolves = [resolver]


App.propTypes = {
    children: PropTypes.node
}

App.contextTypes = {
    store: PropTypes.object.isRequired
}


export default connect()(App)
