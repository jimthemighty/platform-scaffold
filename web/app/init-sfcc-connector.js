import {Connector} from 'progressive-web-sdk/dist/connectors/sfcc-connector'
import {registerConnector} from 'progressive-web-sdk/dist/integration-manager'
import {SIGNED_IN_NAV_ITEM_TYPE, GUEST_NAV_ITEM_TYPE} from './modals/navigation/constants'

const initConnector = () => {
    registerConnector(Connector({
        siteID: '2017refresh',
        clientID: '5640cc6b-f5e9-466e-9134-9853e9f9db93',
        signedInNavType: SIGNED_IN_NAV_ITEM_TYPE,
        guestNavType: GUEST_NAV_ITEM_TYPE
    }))
}

export default initConnector
