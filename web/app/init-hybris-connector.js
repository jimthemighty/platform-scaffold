import {Connector} from './connectors/hybris-connector'
import {registerConnector} from 'progressive-web-sdk/dist/integration-manager'

const initConnector = () => {
    console.log('[IM.hybris-connector] Registering Hybris connector')
    registerConnector(Connector({
        /* Add configuration data here as needed.
         * This can be accessed within the connector
         */
        baseSiteId: 'apparel-uk',
        catalogId: 'apparelProductCatalog',
        catalogVersionId: 'Online',
        menuConfig: [
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
    }))
}

export default initConnector
