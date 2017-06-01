/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import Immutable from 'immutable'
import {handleActions} from 'redux-actions'
import {mergePayload, setCustomContent} from '../../utils/reducer-utils'
import * as integrationManagerResults from '../../integration-manager/checkout/results'

const checkoutReducer = handleActions({
    [integrationManagerResults.receiveSavedShippingAddresses]: mergePayload,
    [integrationManagerResults.receiveCheckoutLocations]: mergePayload,
    [integrationManagerResults.receiveBillingInitialValues]: mergePayload,
    [integrationManagerResults.receiveShippingInitialValues]: mergePayload,
    [integrationManagerResults.receiveCheckoutData]: mergePayload,
    [integrationManagerResults.receiveUserEmail]: mergePayload,
    [integrationManagerResults.receiveCheckoutCustomContent]: mergePayload,
    [integrationManagerResults.receiveLocationsCustomContent]: setCustomContent('locations'),
    [integrationManagerResults.receiveShippingCustomContent]: setCustomContent('shipping'),
    [integrationManagerResults.receiveShippingAddressCustomContent]: setCustomContent('shipping', 'address'),
    [integrationManagerResults.receiveBillingCustomContent]: setCustomContent('billing'),
    [integrationManagerResults.receiveBillingAddressCustomContent]: setCustomContent('billing', 'address'),
    [integrationManagerResults.receivePaymentCustomContent]: setCustomContent('payment'),
    [integrationManagerResults.receivePaymentAddressCustomContent]: setCustomContent('payment', 'address'),
    [integrationManagerResults.receiveShippingMethods]: (state, {payload}) => (
        // Using `set` here will make sure the list in the store is
        // correctly truncated.
        state.set('shippingMethods', Immutable.fromJS(payload))
    ),
    [integrationManagerResults.setDefaultShippingAddressId]: mergePayload
}, Immutable.Map())

export default checkoutReducer
