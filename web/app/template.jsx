import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {onRouteChanged} from 'progressive-web-sdk/dist/store/app/actions'
import {unlockScroll} from './containers/app/actions'
import {removeAllNotifications} from 'progressive-web-sdk/dist/store/notifications/actions'
import {incrementPageCount} from 'progressive-web-sdk/dist/store/push-messaging/actions'

import {PERFORMANCE_METRICS} from 'progressive-web-sdk/dist/analytics/data-objects/'
import {trackPerformance} from 'progressive-web-sdk/dist/analytics/actions'

import {trigger as astroTrigger} from './utils/astro-integration'

import {getURL, getPath} from './utils/utils'

const getDisplayName = (WrappedComponent) => {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

const template = (WrappedComponent) => {
    class Template extends React.Component {
        constructor(props) {
            super(props)

            this.WrappedComponent = WrappedComponent
        }

        dispatchRouteChange({dispatch, location, route}) {
            const url = getURL(location)

            dispatch(onRouteChanged(url, route.routeName))
            dispatch(incrementPageCount())

            if (route.fetchAction) {
                dispatch(route.fetchAction(route.fetchUrl || url, route.routeName))
            }

            dispatch(removeAllNotifications())
            dispatch(unlockScroll())
        }

        componentWillMount() {
            trackPerformance(PERFORMANCE_METRICS.templateWillMount)
            this.dispatchRouteChange(this.props)
        }

        componentDidMount() {
            trackPerformance(PERFORMANCE_METRICS.templateDidMount)
            astroTrigger('pwa-navigated', {
                url: getURL(this.props.location),
                source: 'componentDidMount'
            })
        }

        componentWillUpdate() {
            trackPerformance(PERFORMANCE_METRICS.templateWillMount)
        }

        componentWillReceiveProps(nextProps) {
            if (getPath(this.props.location) !== getPath(nextProps.location)) {
                this.dispatchRouteChange(nextProps)
                this.props.dispatch(removeAllNotifications())
            }
        }

        componentDidUpdate() {
            trackPerformance(PERFORMANCE_METRICS.templateDidMount)
            astroTrigger('pwa-navigated', {
                url: getURL(this.props.location),
                source: 'componentDidUpdate'
            })
        }

        render() {
            return (<WrappedComponent {...this.props} />)
        }
    }
    Template.WrappedComponent = WrappedComponent
    Template.displayName = `Template(${getDisplayName(WrappedComponent)})`
    Template.propTypes = {
        dispatch: PropTypes.func,
        location: PropTypes.object
    }

    return connect()(Template)
}

export default template
