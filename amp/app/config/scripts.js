import AmpForm from '../components/amp-form/index'
import AmpLightbox from '../components/amp-lightbox/index'
import Analytics from '../components/analytics/index'
import Sheet from '../components/sheet/index'


const config = new Map()

config.set(AmpForm, [
    '<script async custom-element="amp-form" src="https://cdn.ampproject.org/v0/amp-form-0.1.js"></script>'
])

config.set(AmpLightbox, [
    '<script async custom-element="amp-lightbox" src="https://cdn.ampproject.org/v0/amp-lightbox-0.1.js"></script>'
])

config.set(Analytics, [
    '<script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>'
])

config.set(Sheet, [
    '<script async custom-element="amp-sidebar" src="https://cdn.ampproject.org/v0/amp-sidebar-0.1.js"></script>'
])

export default config
