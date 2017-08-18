/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {getRegions} from '../config'
import {parseDeliveryCountries} from './parsers'
import {makeApiRequest} from '../utils'
import {receiveCheckoutLocations} from 'progressive-web-sdk/dist/integration-manager/checkout/results'

export const populateLocationsData = () => (dispatch) => {
    return makeApiRequest(`/deliverycountries`, {method: 'GET'})
        .then((response) => {
            if (response.status !== 200) {
                throw new Error('Unable to get delivery countries')
            } else {
                return response.json()
            }
        })
        .then((responseJSON) => {
            const countries = parseDeliveryCountries(responseJSON)
            dispatch(receiveCheckoutLocations({countries, regions: getRegions()}))
        })
        .catch((err) => {
            console.log('Error retrieving delivery countries', err)
            throw new Error('Unable to get delivery countries')
        })
}
