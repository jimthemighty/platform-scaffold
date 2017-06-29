/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {createSelector} from 'reselect'

import {getSavedAddresses} from 'progressive-web-sdk/dist/store/checkout/shipping/selectors'
import {getShippingSavedAddressID} from '../form/selectors'

export const getSelectedSavedShippingAddress = createSelector(
    getSavedAddresses,
    getShippingSavedAddressID,
    (savedAddresses, selectedAddressID) => savedAddresses.find((address) => address.get('id') === selectedAddressID)
)
