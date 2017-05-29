// import {submitForm} from '../../utils'
const UPDATE_ITEM_URL = '/checkout/cart/updatePost/'
import {getCart} from '../../integration-manager/cart/commands'
import {makeFormEncodedRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'

const getCookieValue = (cookieName) => {
    const result = document.cookie.replace(new RegExp(`(?:(?:^|.*;\\s*)${cookieName}\\s*\\=\\s*([^;]*).*$)|^.*$`), '$1')
    return result
}

const submitForm = (url, data, options) => {
    // The form_key is a session-level value. If there is
    // a form_key cookie, that trumps all!
    const formKey = getCookieValue('form_key')
    if (formKey) {
        data.form_key = formKey
    }

    return makeFormEncodedRequest(url, data, options)
}


export const updateItemQuantity = (itemId, itemQuantity) => {
    return (dispatch) => {
        const requestData = {
            update_cart_action: 'update_qty'
        }

        requestData[`cart[${itemId}][qty]`] = itemQuantity

        return submitForm(UPDATE_ITEM_URL, requestData, {method: 'POST'})
            .then(() => dispatch(getCart()))
    }
}
