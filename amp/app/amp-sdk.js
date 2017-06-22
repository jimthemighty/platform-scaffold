/**
 * Code that might be good to move into the AMP-SDK repository...
 */
import React from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'

const getDisplayName = (Component) => Component.displayName || Component.name || 'Component'

const noop = () => undefined


/**
 * Higher-order component that tracks calls to components' render() methods on
 * the server-side so that script/css dependencies can be included on the page,
 * as needed.
 */
export const ampComponent = (WrappedComponent) => {
    const AmpComponent = (props, context) => {
        const trackRender = context.trackRender || noop
        trackRender(AmpComponent)
        return <WrappedComponent {...props} />
    }
    AmpComponent.displayName = `AmpComponent(${getDisplayName(WrappedComponent)})`
    AmpComponent.contextTypes = {
        trackRender: React.PropTypes.func
    }
    return hoistNonReactStatics(AmpComponent, WrappedComponent)  // connect() does this too
}


/**
 * Root component for an AMP application. Exposes the `trackRender` function
 * through context which is used to embed script/css dependencies for rendered
 * components.
 */
export class AmpContext extends React.Component {
    getChildContext() {
        return {trackRender: this.props.trackRender}
    }
    render() {
        return this.props.children
    }
}

AmpContext.propTypes = {
    children: React.PropTypes.element,
    trackRender: React.PropTypes.func
}

AmpContext.childContextTypes = {
    trackRender: React.PropTypes.func
}
