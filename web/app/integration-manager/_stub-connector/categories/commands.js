import {receiveCategoryContents} from '../../categories/results'
import {receiveProductListProductData} from '../../products/results'
import {urlToPathKey} from 'progressive-web-sdk/dist/utils/utils'

export const initProductListPage = (url, routeName) => (dispatch) => {
    const thumbnail = {
        src: '//via.placeholder.com/350x350',
        alt: 'Product Image'
    }

    const sharedData = {
        price: '$10.00',
        available: true,
        images: [thumbnail],
        thumbnail
    }

    const exampleProductData = {
        '/product1.html': {
            id: '1',
            title: 'Product 1',
            href: '/product1.html',
            ...sharedData
        },
        '/product2.html': {
            id: '2',
            title: 'Product 2',
            href: '/product2.html',
            ...sharedData
        },
        '/product3.html': {
            id: '3',
            title: 'Product 3',
            href: '/product3.html',
            ...sharedData
        }
    }

    const exampleCategoryData = {
        itemCount: 3,
        products: [
            '/product1.html',
            '/product2.html',
            '/product3.html'
        ]
    }

    const pathKey = urlToPathKey(url)

    // For more information on the shape of the expected data, see ../../products/types
    dispatch(receiveProductListProductData(exampleProductData))
    // For more information on the shape of the expected data, see ../../categories/types
    dispatch(receiveCategoryContents(pathKey, exampleCategoryData))
    return Promise.resolve()
}
