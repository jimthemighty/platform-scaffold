import {Connector} from './integration-manager/_sfcc-connector'
import connectorExtension from './connector-extension'
import {registerConnector, registerConnectorExtension} from './integration-manager'

const initConnector = () => {
    registerConnector(Connector({
        siteID: '2017refresh',
        clientID: '5640cc6b-f5e9-466e-9134-9853e9f9db93'
    }))
    registerConnectorExtension(connectorExtension)
}

export default initConnector
