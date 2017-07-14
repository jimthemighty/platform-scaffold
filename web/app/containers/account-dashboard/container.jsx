/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import template from '../../template'

import ListTile from 'progressive-web-sdk/dist/components/list-tile'
import List from 'progressive-web-sdk/dist/components/list'
import Icon from 'progressive-web-sdk/dist/components/icon'

const DashboardLinks = ({link: {text, href}}) => {
    return (
        <ListTile
            className="t-account-dashboard__link"
            href={href}
            endAction={<Icon name="chevron-right" />}
        >
            <div>{text}</div>
        </ListTile>
    )
}

DashboardLinks.propTypes = {
    link: PropTypes.shape({
        href: PropTypes.string,
        text: PropTypes.string
    })
}


const AccountDashboard = () => {
    const links = [
        {
            text: 'Account Information',
            href: '/customer/account/edit/'
        },
        {
            text: 'Address Book',
            href: '/customer/address/'
        },
        {
            text: 'My Orders',
            href: '/sales/order/history/'
        },
        {
            text: 'My Wish List',
            href: '/wishlist/'
        },
        {
            text: 'My Subscriptions',
            href: '/newsletter/manage/'
        }
    ]

    return (
        <div className="t-account-dashboard">
            <h1 className="t-account-dashboard__title u-padding-md u-text-uppercase">My Dashboard</h1>
            <List className="u-bg-color-neutral-00 u-border-bottom u-border-top">
                {links.map((link, idx) => <DashboardLinks link={link} key={idx} />)}
            </List>
        </div>
    )
}


export default template(connect()(AccountDashboard))
