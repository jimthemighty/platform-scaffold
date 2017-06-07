import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import Header from '../header/container'
import Footer from '../footer/container'
import DangerousHTML from '../../components/dangerous-html'
import Icon from '../../components/icon'

import sprite from '../../static/svg/sprite-dist/sprite.svg'

import {CURRENT_URL} from '../../../../web/app/containers/app/constants'
import {initProductDetailsPage} from '../../../../web/app/integration-manager/products/commands'

const resolver = (({dispatch, getState}) => {
    return dispatch(initProductDetailsPage(getState().ui.app.get(CURRENT_URL)))
})
class App extends React.Component {
    componentDidMount() {
        resolver({
            dispatch: this.context.store.dispatch,
            getState: this.context.store.getState
        })

        if (super.componentDidMount) {
            super.componentDidMount()
        }
    }

    render() {
        const {
            children,
        } = this.props

        return (
            <div
                id="app"
                className="t-app"
            >
                <DangerousHTML html={sprite}>
                    {(htmlObj) => <div hidden dangerouslySetInnerHTML={htmlObj} />}
                </DangerousHTML>

                <Icon name="user" title="User" />

                <Header />

                {children}

                <Footer />
            </div>
        )
    }
}

App.resolves = [resolver]


App.propTypes = {
    children: PropTypes.node
}

App.contextTypes = {
    store: PropTypes.object.isRequired
}


export default connect()(App)
