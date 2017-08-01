import {Connector} from './connectors/_sfcc-connector'
import {registerConnector} from 'progressive-web-sdk/dist/integration-manager'

const initConnector = () => {
    registerConnector(Connector({
        siteID: '2017refresh',
        clientID: '5640cc6b-f5e9-466e-9134-9853e9f9db93',
        dataAPIClientID: 'c191c969-c0e6-4ef3-83e6-879ce82a841c',
        clientPassword: '#qi$f7%&rtP9HoxhM*YxDj$0SOsRfu',
        businessManagerUser: 'public-data-api-access',
        businessManagerPassword: 'ym$1FEAsf2Wc'
    }))
}

export default initConnector
