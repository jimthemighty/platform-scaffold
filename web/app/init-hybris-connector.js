import {Connector} from './connectors/hybris-connector'
import {registerConnector} from 'progressive-web-sdk/dist/integration-manager'

const initConnector = () => {
    console.log('[IM.hybris-connector] Registering Hybris connector')
    registerConnector(Connector({
        /* Add configuration data here as needed.
         * This can be accessed within the connector
         */
    }))
}

export default initConnector
