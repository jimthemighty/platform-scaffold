import memoryStorage from 'store/storages/memoryStorage'

import {registerConnector} from 'progressive-web-sdk/dist/integration-manager'

import {Connector} from '../../../../web/app/connectors/_sfcc-connector'
import ampPackageJson from '../../../package.json'

export const initConnector = (config) => {
    registerConnector(Connector({
        storageType: memoryStorage,
        siteBaseURL: ampPackageJson.siteUrl,
        ...config
    }))
    return Promise.resolve()
}
