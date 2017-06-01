/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import Immutable from 'immutable'
import {handleActions} from 'redux-actions'
import {mergePayload, setCustomContent} from '../../utils/reducer-utils'
import {receiveSavedShippingAddresses} from './actions'
import * as integrationManagerResults from '../../integration-manager/checkout/results'
import {setDefaultShippingAddressId} from './shipping/actions'

const checkoutReducer = handleActions({
    [receiveSavedShippingAddresses]: mergePayload,
    [integrationManagerResults.receiveCheckoutLocations]: mergePayload,
    [integrationManagerResults.receiveBillingAddress]: mergePayload,
    [integrationManagerResults.receiveShippingAddress]: mergePayload,
    [integrationManagerResults.receiveCheckoutData]: mergePayload,
    [integrationManagerResults.receiveUserEmail]: mergePayload,
    [integrationManagerResults.receiveCheckoutCustomContent]: mergePayload,
    [integrationManagerResults.receiveLocationsCustomContent]: setCustomContent('locations'),
    [integrationManagerResults.receiveShippingCustomContent]: setCustomContent('shipping'),
    [integrationManagerResults.receiveShippingAddressCustomContent]: setCustomContent('shipping', 'address'),
    [integrationManagerResults.receiveBillingCustomContent]: setCustomContent('billing'),
    [integrationManagerResults.receiveBillingAddressCustomContent]: setCustomContent('billing', 'address'),
    [integrationManagerResults.receiveShippingMethods]: (state, {payload}) => (
        // Using `set` here will make sure the list in the store is
        // correctly truncated.
        state.set('shippingMethods', Immutable.fromJS(payload))
    ),
    [setDefaultShippingAddressId]: mergePayload
}, Immutable.Map())

export default checkoutReducer
