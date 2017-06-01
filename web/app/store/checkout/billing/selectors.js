/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import Immutable from 'immutable'
import {createGetSelector} from 'reselect-immutable-helpers'
import {getCheckout} from '../../selectors'

export const getBillingAddress = createGetSelector(getCheckout, 'billingAddress', Immutable.Map())

export const getBillingAddressCustomContent = createGetSelector(getBillingAddress, 'custom')
