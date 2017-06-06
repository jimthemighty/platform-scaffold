import {receiveProductDetailsProductData, receiveProductDetailsUIData} from '../../products/results'
import {urlToPathKey} from 'progressive-web-sdk/dist/utils/utils'

export const initProductDetailsPage = (url) => (dispatch) => {
    const pathKey = urlToPathKey(url)

    const image = {
        src: '//via.placeholder.com/350x350',
        alt: 'Product 1',
        isMain: true
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

    return new Promise((resolve) => {
        // For more information on the shape of the expected data, see ../../products/types
        dispatch(receiveProductDetailsProductData(exampleData))
        resolve()
    })
}

export const getProductVariantData = (variationSelections, variants, categoryIds) => (dispatch) => Promise.resolve()
