import {Connector} from './integration-manager/_merlins-connector'
import connectorExtension from './connector-extension'
import {registerConnector, registerConnectorExtension} from './integration-manager'
import {jqueryResponse} from 'progressive-web-sdk/dist/jquery-response'

const initConnector = () => {
    registerConnector(Connector({
        jqueryResponse
    }))
    registerConnectorExtension(connectorExtension)
}

export default initConnector
