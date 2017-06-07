/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import template from '../../template'

import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'

import {getTitle} from './selectors'

import SkeletonText from 'progressive-web-sdk/dist/components/skeleton-text'

const containerClass = 't-privacy-page'
const titleClass = `${containerClass}__title`

const PrivacyPage = ({title}) => (
    <div className={containerClass}>
        TEST
        { title ?
            <h1 className={titleClass}>{title}</h1>
        :
            <SkeletonText lines={1} type="h1" width="100px" />
        }
    </div>
)

PrivacyPage.propTypes = {
    title: PropTypes.string
}

const mapStateToProps = createPropsSelector({
    title: getTitle
})

export default template(connect(mapStateToProps)(PrivacyPage))
