/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import template from '../../template'

import {getUserName, getTitle} from './selectors'

const containerClass = 't-account'
const titleClass = `${containerClass}__title`

const Account = ({user, title}) => (
    <div className={containerClass}>
        <div>TEST ACCOUNT PAGE User = {user}</div>
        <h1 className={titleClass}>{title}</h1>
    </div>
)

Account.propTypes = {
    title: PropTypes.string,
    user: PropTypes.string
}

const mapStateToProps = createPropsSelector({
    user: getUserName,
    title: getTitle
})

export default template(connect(mapStateToProps)(Account))
