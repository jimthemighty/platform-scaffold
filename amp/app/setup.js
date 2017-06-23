import ReactInjection from 'react-dom/lib/ReactInjection'

/**
 * Whitelist non-standard attributes frequently used with AMP. This must be done once,
 * before any rendering happens. Keep this list small.
 */
export const whitelistAttributes = () => {
    ReactInjection.DOMProperty.injectDOMPropertyConfig({
        isCustomAttribute: (attributeName) => (
            ['on', 'expanded'].indexOf(attributeName) >= 0 || attributeName.match('-')
        )
    })
}
