import {Connector} from './integration-manager/_merlins-connector'
import connectorExtension from './connector-extension'
import {registerConnector, registerConnectorExtension} from './integration-manager'

const configure = () => {
    registerConnector(Connector())
    registerConnectorExtension(connectorExtension)
}

export default configure
