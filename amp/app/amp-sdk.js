/**
 * Code that might be good to move into the AMP-SDK repository...
 */
import React from 'react'

const getDisplayName = (Component) => (
    Component.displayName || Component.name || 'Component'
)

const noop = () => undefined


/**
 * Higher-order component that tracks calls to a component's render() method.
 * This only makes sense for server-side rendering.
 */
export const ampComponent = (WrappedComponent) => {
    const AmpComponent = (props, context) => {
        const trackRender = context.trackRender || noop
        trackRender(AmpComponent)
        return <WrappedComponent {...props} />
    }
    AmpComponent.displayName = `AmpComponent(${getDisplayName(WrappedComponent)})`

    // TODO: Proper fix
    if (WrappedComponent.templateName) {
        AmpComponent.templateName = WrappedComponent.templateName
    }

    if (WrappedComponent.resolves) {
        AmpComponent.resolves = WrappedComponent.resolves
    }

    AmpComponent.contextTypes = {
        trackRender: React.PropTypes.func
    }

    return AmpComponent
}


/**
 * Wraps the AMP app and shares context, ie. to enable tracking js-dependencies.
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
