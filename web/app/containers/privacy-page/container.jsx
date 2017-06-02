/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'

import {getTitle, getText} from './selectors'
import * as privacyPageActions from './actions'

import SkeletonText from 'progressive-web-sdk/dist/components/skeleton-text'

const containerClass = 't-privacy-page'
const titleClass = `${containerClass}__title`

const PrivacyPage = ({title, text}) => (
    <div className={containerClass}>
        { title ?
            <h1 className={titleClass}>{title}</h1>
        :
            <SkeletonText lines={1} type="h1" width="100px" />
        }
        {text.map((paragraph, idx) => <p key={idx}>{paragraph}</p>)}
    </div>
)

PrivacyPage.propTypes = {
    text: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string
}

const mapStateToProps = createPropsSelector({
    text: getText,
    title: getTitle
})

const mapDispatchToProps = {
    changeTitle: privacyPageActions.changeTitle
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PrivacyPage)
