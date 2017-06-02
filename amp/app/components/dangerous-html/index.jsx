import React, {PropTypes} from 'react'
import classNames from 'classnames'

// The DangerousHTML component isn't intended to be something the user interacts with directly
// It should just act as an invisible wrapped that catches clicks that bubble up from its children
// As a result, it doesn't make sense for the DangerousHTML component to have semantics
/* eslint-disable jsx-a11y/onclick-has-focus, jsx-a11y/onclick-has-role */

/**
 * `DangerousHTML` is a wrapper for the `dangerouslySetInnerHTML` prop on React
 * components. The purpose of that is to include markup from another source within
 * the React tree. That source can be a string, an AJAX response, etc.
 *
 * A feature of `DangerousHTML` is that it prevents successive re-rendering of
 * elements that use dangerouslySetInnerHTML. Check that the html string has
 * changed before attempting to render.
 *
 * It is worth noting that we recommend you avoid using `DangerousHTML` if at all
 * possible. It's named this way for a reason, so **use with caution**.
 *
 * For example usecases where `DangerousHTML` can be used, see the
 * [Leveraging Existing Page Content guide](/dev/guides/leveraging-existing-page-content).
 */
class DangerousHTML extends React.Component {
    constructor(props) {
        super(props)

        this.processHTML = this.processHTML.bind(this)
    }

    render() {
        const {children, className} = this.props
        const html = this.processHTML(this.props.html)

        const classes = classNames('amp-dangerous-html', className)

        /* Disable this eslint a11y rule, because it's meant to catch bubbled
         * click events */
        /* eslint-disable jsx-a11y/no-static-element-interactions */
        return (
            <div
                className={classes}
            >
                {children({__html: html})}
            </div>
        )
        /* eslint-enable jsx-a11y/no-static-element-interactions */
    }

    /**
     * HTML transformations, current steps:
     * - enable external resources if specified
     */
    processHTML(html) {
        if (this.props.enableExternalResources && typeof window.Capture !== 'undefined') {
            html = window.Capture.enable(html, this.props.externalResourcesPrefix)
        }

        return html
    }
}

DangerousHTML.propTypes = {
    /**
     * A function callback with an argument of `htmlObj` that returns a React
     * element. Example: `(htmlObj) => <div dangerouslySetInnerHTML={htmlObj} />`
     */
    children: PropTypes.func.isRequired,

    /**
     * A string representation of some HTML. Example: `<strong>A string of HTML</strong>`
     */
    html: PropTypes.string.isRequired,

    /**
     * Adds values to the `class` attribute of the root element
     */
    className: PropTypes.string,

    /**
     * Enable external resources (like images), that were previously disabled by capture.js
     */
    enableExternalResources: PropTypes.bool,

    /**
     * Prefix used for external resources. Look at capture.js for more details
     */
    externalResourcesPrefix: PropTypes.string
}

DangerousHTML.defaultProps = {
    enableBrowserHistoryForLinks: true,
    enableExternalResources: false,
    externalResourcesPrefix: 'x-'
}

export default DangerousHTML
