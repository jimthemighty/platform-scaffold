import {Connector} from './connectors/hybris-connector'
import {registerConnector} from 'progressive-web-sdk/dist/integration-manager'

const initConnector = () => {
    console.log('[IM.hybris-connector] Registering Hybris connector')
    registerConnector(Connector({
        baseSiteId: 'apparel-uk',
        catalogId: {
            electronics: 'electronicsProductCatalog',
            'apparel-uk': 'apparelProductCatalog'
        },
        catalogVersionId: 'Online',
        menuConfig: {
            'apparel-uk': [
                {
                    id: 'categories',
                    displayAsNode: false
                },
                {
                    id: 'collections',
                    displayAsNode: true,
                },
                {
                    id: 'brands',
                    displayAsNode: true
                }
            ]
        },
        qualifiers: {
            'apparel-uk': {
                ApparelSizeVariantProduct: 'size',
                ApparelStyleVariantProduct: 'style',
            },
            electronics: {
                ElectronicsColorVariantProduct: 'color',
            }
        },
        variants: {
            'apparel-uk': {
                size: 'ApparelSizeVariantProduct',
                style: 'ApparelStyleVariantProduct',
            },
            electronics: {
                color: 'ElectronicsColorVariantProduct',
            }
        },
        imagesSizes: {
            product: 'product',
            thumbnail: 'thumbnail',
            zoom: 'zoom',
        },
        imagesTypes: {
            gallery: 'GALLERY',
            primary: 'PRIMARY',
        },
    }))
}

export default initConnector
