/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import template from '../../template'

import {getTitle, getText} from './selectors'
// import * as accountInfoActions from './actions'

const AccountInfo = ({title, text}) => (
    <div className="t-account-info">
        <h1 className="t-account-info__title">{title}</h1>
        {text.map((paragraph, idx) => <p key={idx}>{paragraph}</p>)}
    </div>
)

AccountInfo.propTypes = {
    text: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string
}

const mapStateToProps = createPropsSelector({
    text: getText,
    title: getTitle
})

const mapDispatchToProps = {
    // setTitle: accountInfoActions.setTitle
}

export default template(connect(
    mapStateToProps,
    mapDispatchToProps
)(AccountInfo))
