import {receiveProductDetailsProductData, receiveProductDetailsUIData} from '../../products/results'
import {setCurrentURL} from '../../results'
import {urlToPathKey} from 'progressive-web-sdk/dist/utils/utils'
import {makeSfccRequest} from '../utils'
import {parseProductDetails, getCurrentProductID, getProductHref} from '../parsers'
import {API_END_POINT_URL} from '../constants'

export const fetchPdpData = (url) => (dispatch) => {
    const productURL = `${API_END_POINT_URL}/products/${getCurrentProductID(url)}?expand=prices,images,variations`
    const productPathKey = urlToPathKey(url)
    const options = {
        method: 'GET'
    }
    return makeSfccRequest(productURL, options)
        .then((response) => response.json())
        .then((responseJSON) => {
            const productDetailsData = {
                ...parseProductDetails(responseJSON),
                href: productPathKey
            }
            const productDetailsMap = {
                [productPathKey]: productDetailsData
            }
            productDetailsData.variants.forEach(({id}) => {
                productDetailsMap[getProductHref(id)] = productDetailsData
            })
            dispatch(receiveProductDetailsProductData(productDetailsMap))
            dispatch(receiveProductDetailsUIData({[productPathKey]: {itemQuantity: responseJSON.step_quantity}}))

            // since the pathname will always be master, the productHref will
            // only === pathname when landing on master page
            if (getProductHref(productDetailsData.id) === window.location.pathname) {
                const {variants, initialValues} = productDetailsData
                const defaultVariant = getInitialSelectedVariant(variants, initialValues)
                const currentProductHref = defaultVariant.id

                dispatch(setCurrentURL(getProductHref(currentProductHref)))
                dispatch(fetchPdpData(getProductHref(currentProductHref)))
            }
        })
}

export const getProductVariantData = (selections, variants, categoryIds) => (dispatch) => {
    if (categoryIds.some((id) => !selections[id])) {
        return Promise.resolve()
    }

    for (const {values, id} of variants) {
        if (categoryIds.every((id) => selections[id] === values[id])) {
            const currentProductHref = getProductHref(id)
            dispatch(setCurrentURL(currentProductHref))

            return dispatch(fetchPdpData(currentProductHref))
        }
    }

    return Promise.resolve()
}
