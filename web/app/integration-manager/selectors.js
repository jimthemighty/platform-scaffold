/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import * as appSelectors from '../containers/app/selectors'

export const getIntegrationManager = ({integrationManager}) => integrationManager

export const getCartURL = appSelectors.getCartURL
export const getCheckoutShippingURL = appSelectors.getCheckoutShippingURL
