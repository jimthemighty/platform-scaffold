import {Connector} from './integration-manager/_stub-connector'
import {registerConnector} from './integration-manager'

const initConnector = () => {
    registerConnector(Connector())
}

export default initConnector
