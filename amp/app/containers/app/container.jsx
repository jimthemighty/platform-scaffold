import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import Header from '../header/container'
import Footer from '../footer/container'

import {CURRENT_URL} from '../../../../web/app/containers/app/constants'
import {initProductDetailsPage} from '../../../../web/app/integration-manager/products/commands'
import {onRouteChanged} from '../../../../web/app/containers/app/actions'
import {resolve} from 'react-redux-resolve'

@resolve(({dispatch, getState}) => {
    return dispatch(initProductDetailsPage(getState().ui.app.get(CURRENT_URL)))
})
class App extends React.Component {
    render() {
        const {
            children,
        } = this.props

        return (
            <div>
                <Header />
                {children}
                <Footer />
            </div>
        )
    }
}

App.propTypes = {
    children: PropTypes.node
}


export default connect()(App)
