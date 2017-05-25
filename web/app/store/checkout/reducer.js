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
    [setDefaultShippingAddressId]: mergePayload
}, Immutable.Map())

export default checkoutReducer
