import {Connector} from './connectors/_merlins-connector'
import connectorExtension from './connector-extension'
import {registerConnector} from 'progressive-web-sdk/dist/integration-manager'
import {jqueryResponse} from 'progressive-web-sdk/dist/jquery-response'

const initConnector = () => {
    registerConnector(Connector({
        jqueryResponse
    }), connectorExtension)
}

export default initConnector
