import React, {PropTypes} from 'react'
import * as ampSDK from '../../amp-sdk'

const EngagementEngineTag = ({templateName, projectSlug}) => {
    /* eslint-disable max-len */
    const engagementConfig = {
        vars: {
            projectSlug,
            templateName
        },
        requests: {
            _host: 'https://engagement-collector.mobify.net',
            _dimensions: '%22platform%22%3a%22AMP%22%2c%22client_id%22%3a%22${clientId(sandy-client-id)}%22%2c%22title%22%3a%22${title}%22%2c%22location%22%3a%22${sourceUrl}%22%2c%22page%22%3a%22${sourcePath}%22%2c%22src_location%22%3a%22${ampdocUrl}%22%2c%22referrer%22%3a%22${documentReferrer}%22%2c%22templateName%22%3a%22${templateName}%22',
            _basePrefix: '${_host}/s.gif?slug=${projectSlug}&timestamp_local=${timestamp}&channel=web&dimensions=%7b${_dimensions}%7d',
            pageview: '${_basePrefix}&data=%7b%22action%22%3a%22pageview%22%7d',
            pageload: '${_basePrefix}&data=%7b%22category%22%3a%22timing%22%2c%22action%22%3a%22load%22%2c%22value%22%3a${pageLoadTime}%7d',
            pagedcl: '${_basePrefix}&data=%7b%22category%22%3a%22timing%22%2c%22action%22%3a%22DOMContentLoaded%22%2c%22value%22%3a${contentLoadTime}%7d'
        },
        triggers: {
            pageview: {
                on: 'visible',
                request: 'pageview'
            },
            pageload: {
                on: 'visible',
                request: 'pageload'
            },
            pagedcl: {
                on: 'visible',
                request: 'pagedcl'
            }
        },
        transport: {
            beacon: false,
            xhrpost: false,
            image: true
        }
    }

    return (
        <amp-analytics>
            <script type="application/json"
                dangerouslySetInnerHTML={{__html: JSON.stringify(engagementConfig)}} />
        </amp-analytics>
    )
}

const GoogleAnalyticsTag = ({templateName, gaAccount}) => {
    const gaConfig = {
        vars: {
            account: gaAccount
        },
        extraUrlParams: {
            cd1: templateName
        },
        triggers: {
            pageview: {
                on: 'visible',
                request: 'pageview'
            },
            outboundLinks: {
                on: 'click',
                selector: 'a, form',
                request: 'event',
                vars: {
                    eventCategory: 'outbound',
                    eventAction: 'click',
                    eventLabel: '${outboundLink}'
                }
            }
        }
    }

    return (
        <amp-analytics type="googleanalytics">
            <script type="application/json"
                dangerouslySetInnerHTML={{__html: JSON.stringify(gaConfig)}} />
        </amp-analytics>
    )
}

/**
 * Analytics
 */
const Analytics = (props) => (
    <div>
        {props.projectSlug && <EngagementEngineTag {...props} /> }
        {props.gaAccount && <GoogleAnalyticsTag {...props} /> }
    </div>
)

Analytics.propTypes = {
    templateName: PropTypes.string.isRequired,

    gaAccount: PropTypes.string,
    projectSlug: PropTypes.string
}

export default ampSDK.ampComponent(
    Analytics,
    '<script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>'
)
