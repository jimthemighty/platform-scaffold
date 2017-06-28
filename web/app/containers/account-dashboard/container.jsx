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
import Icon from 'progressive-web-sdk/dist/components/icon'


const containerClass = 't-account-dashboard'
const titleClass = 't-account-dashboard__title u-padding-md'

const Account = ({title, links}) => (
    <div className={containerClass}>
        { title ?
            <h1 className={titleClass}>{title}</h1>
        :
            <SkeletonText className="u-padding-md" lines={1} type="h1" width="100px" />
        }
        <div className="u-bg-color-neutral-00 u-border-bottom u-border-top">
            {links.map((link, idx) => {
                return (
                    <ListTile
                        key={idx}
                        href={link.href}
                        endAction={<Icon name="chevron-right" />}
                        className="t-account-dashboard__link"
                    >
                        {link.text}
                    </ListTile>
                )
            })}
        </div>
    </div>
)

Account.propTypes = {
    links: PropTypes.array,
    title: PropTypes.string
}

const mapStateToProps = createPropsSelector({
    title: getTitle,
    links: getLink
})

export default template(connect(mapStateToProps)(Account))
