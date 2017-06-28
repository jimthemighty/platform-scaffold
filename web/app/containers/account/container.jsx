/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import template from '../../template'

import {getTitle, getLink} from './selectors'
import SkeletonText from 'progressive-web-sdk/dist/components/skeleton-text'
// import * as accountActions from './actions'

const containerClass = 't-account'
const titleClass = `${containerClass}__title`

const Account = ({title, links}) => (
    <div className={containerClass}>
        { title ?
            <h1 className={titleClass}>{title}</h1>
        :
            <SkeletonText lines={1} type="h1" width="100px" />
        }
        <ul>
            {links.map((link, idx) => {
                return (
                    <li key={idx}>{link.text}</li>
                )
            })}
        </ul>
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

const mapDispatchToProps = {
    // setTitle: accountActions.setTitle
}

export default template(connect(
    mapStateToProps,
    mapDispatchToProps
)(Account))
