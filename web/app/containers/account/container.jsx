/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import template from '../../template'

import {getFirstName, getLastName, getUserName} from './selectors'

const containerClass = 't-account'
const titleClass = `${containerClass}__title`

const Account = ({firstName, lastName, user}) => (
    <div className={containerClass}>
        <h1 className={titleClass}>My Account</h1>
        <div>Username: {user}</div>
        <div>First name: {firstName}</div>
        <div>Last name: {lastName}</div>
    </div>
)

Account.propTypes = {
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    user: PropTypes.string
}

const mapStateToProps = createPropsSelector({
    firstName: getFirstName,
    lastName: getLastName,
    user: getUserName,
})

export default template(connect(mapStateToProps)(Account))
