/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import template from '../../template'
import {createPropsSelector} from 'reselect-immutable-helpers'

import {getTitle} from './selectors'

const AccountAddress = ({title}) => (
    <div className="t-account-address">
        <h1 className="t-account-address__title">{title}</h1>
        <div>This is a newly generated page called: AccountAddress</div>
    </div>
)

AccountAddress.propTypes = {
    title: PropTypes.string
}

const mapStateToProps = createPropsSelector({
    title: getTitle
})

const mapDispatchToProps = {}

export default template(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(AccountAddress)
)
