/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* global MESSAGING_ENABLED */
/* eslint-disable import/namespace */
/* eslint-disable import/named */
import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import classNames from 'classnames'
import WebFont from 'webfontloader'
import {isRunningInAstro} from '../../utils/astro-integration'

import {initApp} from 'progressive-web-sdk/dist/integration-manager/app/commands'

import {hidePreloader} from 'progressive-web-sdk/dist/preloader'
import DangerousHTML from 'progressive-web-sdk/dist/components/dangerous-html'
import SkipLinks from 'progressive-web-sdk/dist/components/skip-links'
import {removeNotification} from 'progressive-web-sdk/dist/store/notifications/actions'
import Header from '../../containers/header/container'
import Footer from '../../containers/footer/container'
import MiniCart from '../../containers/mini-cart/container'
import Navigation from '../../containers/navigation/container'
import NativeConnector from '../native-connector/container'
import * as appActions from '../app/actions'
import * as selectors from './selectors'
import {getNotifications} from '../../store/selectors'
import {getPageFetchError, hasFetchedCurrentPath} from 'progressive-web-sdk/dist/store/offline/selectors'

import PushMessagingController from 'progressive-web-sdk/dist/components/push-messaging-controller'
import DefaultAsk from 'progressive-web-sdk/dist/components/default-ask'

import NotificationManager from '../../components/notification-manager'

import {registerPreloadCallbacks} from '../templates'

// Offline support
import Offline from '../offline/container'
import OfflineBanner from '../offline/partials/offline-banner'
import OfflineModal from '../offline/partials/offline-modal'

class App extends React.Component {
    constructor(props) {
        super(props)

        this.hidePreloaderWhenCSSIsLoaded = this.hidePreloaderWhenCSSIsLoaded.bind(this)
    }

    componentDidMount() {
        this.hidePreloaderWhenCSSIsLoaded()
        this.props.fetchSvgSprite()
        this.props.initApp()
        WebFont.load({
            google: {
                families: ['Oswald:200,400']
            }
        })

        // Lazy load other containers when browser is at the end of frame
        // to prevent jank
        registerPreloadCallbacks()
    }

    hidePreloaderWhenCSSIsLoaded() {
        if (window.Progressive.stylesheetLoaded) {
            hidePreloader()

            // Only after we loaded the CSS can confidently unhide the app.
            // This is necessary, because showing the app by default might show
            // a flash of an ugly, unstyled app until the CSS finally loads.
            this.props.toggleHideApp(false)
        } else {
            setTimeout(this.hidePreloaderWhenCSSIsLoaded, 100)
        }
    }

    render() {
        const {
            children,
            history,
            fetchError,
            fetchPage,
            hasFetchedCurrentPath,
            notifications,
            removeNotification,
            sprite,
            hideApp
        } = this.props

        const routeProps = children.props.route
        const CurrentHeader = routeProps.Header || Header
        const CurrentFooter = routeProps.Footer || Footer

        const reload = () => fetchPage(routeProps.fetchAction, window.location.href, routeProps.routeName)

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

        const appClassNames = classNames('t-app', `t-app--${routeProps.routeName}`)

        const messagingEnabled = MESSAGING_ENABLED  // replaced at build time

        return (
            <div
                id="app"
                className={appClassNames}
                style={{display: hideApp ? 'none' : 'initial'}}
            >
                <DangerousHTML html={sprite}>
                    {(htmlObj) => <div hidden dangerouslySetInnerHTML={htmlObj} />}
                </DangerousHTML>

                <SkipLinks items={skipLinksItems} />

                <div id="app-wrap" className="t-app__wrapper u-flexbox u-direction-column">
                    {isRunningInAstro && <NativeConnector />}

                    {messagingEnabled && [
                        <PushMessagingController key="controller" dimScreenOnSystemAsk visitsToWaitIfDismissed={1} />,
                        <DefaultAsk key="ask" showOnPageCount={2} />
                    ]}

                    <div id="app-header" className="u-flex-none" role="banner">
                        <CurrentHeader headerHasSignIn={routeProps.headerHasSignIn} />

                        {
                            // Only display banner when we are offline and have content to show
                            fetchError && hasFetchedCurrentPath && <OfflineBanner />
                        }

                        <OfflineModal reload={reload} />

                        {notifications &&
                            <NotificationManager
                                notifications={notifications}
                                actions={{removeNotification}}
                            />
                        }

                        <Navigation history={history} />

                        <MiniCart />
                    </div>

                    {
                        // Display main content if we have no network errors or
                        // if we've already got the content in the store
                        (!fetchError || hasFetchedCurrentPath) ?
                            <div>
                                <main id="app-main" className="u-flex" role="main">
                                    {this.props.children}
                                </main>

                                <div id="app-footer" className="u-flex-none">
                                    <CurrentFooter />
                                </div>
                            </div>
                        :
                            <Offline reload={reload} location={children.props.location} route={routeProps} />
                    }
                </div>
            </div>
        )
    }
}

App.propTypes = {
    children: PropTypes.element.isRequired,
    fetchError: PropTypes.string,
    fetchPage: PropTypes.func,
    fetchSvgSprite: PropTypes.func,
    hasFetchedCurrentPath: PropTypes.bool,
    hideApp: PropTypes.bool,
    /**
     * The react-router history object
     */
    history: PropTypes.object,
    /**
    * Calls a command in the integration manager that initializes some app data
    */
    initApp: PropTypes.func,
    notifications: PropTypes.array,
    removeNotification: PropTypes.func,
    /**
     * The SVG icon sprite needed in order for all Icons to work
     */
    sprite: PropTypes.string,
    toggleHideApp: PropTypes.func,
}

const mapStateToProps = createPropsSelector({
    notifications: getNotifications,
    fetchError: getPageFetchError,
    hasFetchedCurrentPath,
    sprite: selectors.getSvgSprite,
    hideApp: selectors.getHideApp
})

const mapDispatchToProps = {
    removeNotification,
    fetchSvgSprite: appActions.fetchSvgSprite,
    toggleHideApp: appActions.toggleHideApp,
    fetchPage: (fetchAction, url, routeName) => fetchAction(url, routeName),
    initApp
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
