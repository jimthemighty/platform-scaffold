/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-disable import/namespace */
/* eslint-disable import/named */
import {EVENT_ACTION, Page} from 'progressive-web-sdk/dist/analytics/data-objects/'
import {createActionWithAnalytics} from 'progressive-web-sdk/dist/utils/action-creation'
import {CURRENT_URL} from './constants'


/**
 * Action dispatched when the route changes
 * @param {string} currentURL - what's currently shown in the address bar
 * @param {string} routeName - Template name for analytic
 */
export const onRouteChanged = createActionWithAnalytics(
    'On route changed',
    [CURRENT_URL],
    EVENT_ACTION.pageview,
    (currentURL, routeName) => (new Page({[Page.TEMPLATENAME]: routeName}))
)
