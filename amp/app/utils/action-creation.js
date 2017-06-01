/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {createAction as createReduxAction} from 'redux-actions'
import fromPairs from 'lodash.frompairs'

/**
 * createAction - Convenient action creation
 *
 * This function wraps the redux-actions `createAction` function. It takes
 * a description for the action (which must be unique!) and an array
 * of names that will be used for the parameters in the action.
 *
 * Example:
 *  const addToCart = createAction('Add to cart', ['productId', 'quantity'])
 *  dispatch(addToCart(65536, 2))
 *
 * dispatches an action with a payload of:
 *  payload: {
 *      productId: 65536,
 *      quantity: 2
 *  }
 *
 * If no parameter names are passed in, the first argument (and only
 * the first argument) to the action creator will be used directly as
 * the payload.
 *
 * ------------
 *
 * We can pass an optional meta creator function to createAction. This
 * function receives all of the arguments passed to the action
 * creator, including those used for the payload, and creates a meta
 * information object to be included in the action.
 *
 * Currently we use meta information in actions for analytics. See
 * `createActionWithAnalytics` below for a more convenient way to
 * build actions with analytics information.
 *
 * @description {string} - a unique name for the action
 * @payloadArgNames {array} (optional) - an array of parameter names
 * @metaCreator {function} (optional) - a meta creator
 */
export const createAction = (description, payloadArgNames, metaCreator) => {
    return createReduxAction(
        description,
        payloadArgNames && payloadArgNames.length
            ? (...args) => fromPairs(payloadArgNames.map((arg, idx) => [arg, args[idx]]))
            : null,
        metaCreator
    )
}

const createAnalyticsMeta = (type, payload) => ({
    analytics: {
        type,
        payload
    }
})

/**
 * createActionWithAnalytics - creates an action that embeds analytics information
 *
 * This function acts like createAction but simplifies the creation of
 * the analytics meta payload. In addition to the action description
 * and the payload argument names, it takes an analytics event type
 * string and a function for creating the analytics payload.
 *
 * The analytics payload creator receives all of the argments to the
 * action creator, including all arguments included in the payload. In
 * this way, we can use the payload information as part of the
 * analytics payload, but also include additional information that is
 * not relevant for the main action.
 *
 * Example:
 *
 *  Imagine we are running an A-B test on the colour of the add to
 *  cart button. The colour of the button is irrelevant to the actual
 *  process of adding to the cart, but it is relevant to the analytics
 *  that are tracking the results of the A-B test. We can define our
 *  action in the following way:
 *
 *  const addToCart = createActionWithAnalytics(
 *      'Add to cart',
 *      ['id', 'quantity'],
 *      'cartAdd',
 *      (id, quantity, buttonColour) => ({id, quantity, buttonColour})
 *  )
 *
 *  and then dispatch it with:
 *
 *  dispatch(addToCart(15, 1, 'red'))
 *  // or
 *  dispatch(addToCart(15, 1, 'green'))
 *
 *  This would result in an action object with the form:
 *  {
 *      type: 'Add to cart',
 *      payload: {id: 15, quantity: 1},
 *      meta: {
 *          analytics: {
 *              type: 'cartAdd',
 *              payload: {id: 15, quantity: 1, buttonColour: 'green'}
 *          }
 *      }
 *  }
 *
 * @description {string} - a unique name for the action
 * @payloadArgNames {array} (optional) - an array of parameter names
 * @analyticsType {string} - the type string for the analytics event
 * @analyticsPayloadCreator {function} - A function that returns the analytics payload.
 */

export const createActionWithAnalytics = (description, payloadArgNames, analyticsType, analyticsPayloadCreator) => {
    return createAction(
        description,
        payloadArgNames,
        (...args) => createAnalyticsMeta(
            analyticsType,
            analyticsPayloadCreator(...args)
        )
    )
}
