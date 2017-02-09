import {getCheckoutConfigObject} from '../../utils/magento-utils'

const appParser = ($html) => {
    let isLoggedIn = !!$html.find('.customer-welcome').length
    if (!isLoggedIn) {
        // We may be on a checkout page so
        const config = getCheckoutConfigObject($html)
        isLoggedIn = config ? config.customerData.constructor !== Array : isLoggedIn
    }
    return {
        isLoggedIn
    }
}

export default appParser
