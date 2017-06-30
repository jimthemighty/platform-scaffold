/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import template from '../../template'

import {getTitle, getLink} from './selectors'
import SkeletonText from 'progressive-web-sdk/dist/components/skeleton-text'
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
            {text ?
                <div>{text}</div>
            :
                <SkeletonText
                    style={{lineHeight: '20px', height: '10px'}}
                    width="100px"
                />
            }
        </ListTile>
    )
}

DashboardLinks.propTypes = {
    link: PropTypes.shape({
        href: PropTypes.string,
        text: PropTypes.string
    })
}


const AccountDashboard = ({title, links}) => (
    <div className="t-account-dashboard">
        {title ?
            <h1 className="t-account-dashboard__title u-padding-md u-text-uppercase">{title}</h1>
        :
            <SkeletonText className="u-padding-md" lines={1} type="h1" width="100px" />
        }
        <List className="u-bg-color-neutral-00 u-border-bottom u-border-top">
            {links.map((link, idx) => <DashboardLinks link={link} key={idx} />)}
        </List>
    </div>
)

AccountDashboard.propTypes = {
    links: PropTypes.array,
    title: PropTypes.string
}

const mapStateToProps = createPropsSelector({
    title: getTitle,
    links: getLink
})

export default template(connect(mapStateToProps)(AccountDashboard))
