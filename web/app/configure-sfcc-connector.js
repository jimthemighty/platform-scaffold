import {Connector} from './integration-manager/_sfcc-connector'
import {registerConnector} from './integration-manager'

const configure = () => {
    registerConnector(Connector({
        siteID: '2017refresh',
        clientID: '5640cc6b-f5e9-466e-9134-9853e9f9db93'
    }))
}

export default configure
