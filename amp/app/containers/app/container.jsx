import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import Header from '../header/container'
import Footer from '../footer/container'
import DangerousHTML from '../../components/dangerous-html'

import * as selectors from './selectors'

const App = ({
    children,
    sprite
}) => {

    return (
        <div
            id="app"
            className="t-app"
            >
            <DangerousHTML html={sprite}>
                {(htmlObj) => <div hidden dangerouslySetInnerHTML={htmlObj} />}
            </DangerousHTML>

            <Header />

            {children}

            <Footer />
        </div>
    )
}

App.propTypes = {
    children: PropTypes.node,
    /**
     * The SVG icon sprite needed in order for all Icons to work
     */
    fetchSvgSprite: PropTypes.func,
    sprite: PropTypes.string
}

const mapStateToProps = (state) => ({
    sprite: selectors.getSvgSprite
})

export default connect(
    mapStateToProps
)(App)
