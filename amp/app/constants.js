import packagejson from '../package.json'

const DEVELOPMENT_BASE_URL = packagejson.siteUrl
const STAGING_BASE_URL = 'https://amp-staging.merlinspotions.com'
const PRODUCTION_BASE_URL = 'https://amp.merlinspotions.com'

export const LIVE_BASE_URLS = {
    dev: DEVELOPMENT_BASE_URL,
    staging: STAGING_BASE_URL,
    prod: PRODUCTION_BASE_URL
}
