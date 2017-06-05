import {receiveHomeData} from '../../results'

export const initHomePage = (url) => (dispatch) => {
    const exampleData = {
        banners: [{
            src: '//via.placeholder.com/400x200',
            alt: 'Placeholder Image'
        }, {
            src: '//via.placeholder.com/400x200',
            alt: 'Placeholder Image'
        }, {
            src: '//via.placeholder.com/400x200',
            alt: 'Placeholder Image'
        }]
    }

    return new Promise((resolve) => {
        setTimeout(() => {
            dispatch(receiveHomeData(exampleData))
            resolve()
        })
    })
}
