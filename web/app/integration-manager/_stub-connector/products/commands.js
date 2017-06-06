import {receiveProductDetailsProductData, receiveProductDetailsUIData} from '../../products/results'
import {urlToPathKey} from 'progressive-web-sdk/dist/utils/utils'
import {receiveFormInfo} from '../actions'

export const initProductDetailsPage = (url) => (dispatch) => {
    const pathKey = urlToPathKey(url)

    const image = {
        src: '//via.placeholder.com/350x350',
        alt: 'Product 1'
    }

    const exampleData = {
        [pathKey]: {
            price: '$10.00',
            available: true,
            href: window.location.href,
            thumbnail: image,
            title: 'Product 1',
            images: [image, image],
            id: '1',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        }
    }

    const exampleUIData = {
        [pathKey]: {
            breadcrumbs: [{
                href: '/',
                text: 'Home'
            }, {
                href: window.location.href,
                text: 'Product 1'
            }],
            itemQuantity: 1
        }
    }

    const exampleFormData = {
        [pathKey]: {
            submitUrl: 'submit',
            method: 'POST',
            uenc: '',
            hiddenInputs: {}
        }
    }

    // For more information on the shape of the expected data, see ../../products/types
    dispatch(receiveProductDetailsProductData(exampleData))
    dispatch(receiveProductDetailsUIData(exampleUIData))
    dispatch(receiveFormInfo(exampleFormData))
    return Promise.resolve()
}

export const getProductVariantData = (variationSelections, variants, categoryIds) => (dispatch) => Promise.resolve()
