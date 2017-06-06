import {receiveHomeData} from '../../results'

export const initHomePage = (url) => (dispatch) => {
    console.log('[Stub Connector] Called initHomePage stub')
    
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

    // We need to receive the carousel data async for it to work correctly
    return Promise.resolve()
        .then(() => dispatch(receiveHomeData(exampleData)))
}
