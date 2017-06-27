/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import template from '../../template'

import {getTitle, getText} from './selectors'
// import * as accountActions from './actions'

const containerClass = 't-account'
const titleClass = `${containerClass}__title`

const Account = ({title, text}) => (
    <div className={containerClass}>
        <h1 className={titleClass}>{title}</h1>
        {text.map((paragraph, idx) => <p key={idx}>{paragraph}</p>)}
    </div>
)

Account.propTypes = {
    text: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string
}

const mapStateToProps = createPropsSelector({
    text: getText,
    title: getTitle
})

const mapDispatchToProps = {
    // setTitle: accountActions.setTitle
}

export default template(connect(
    mapStateToProps,
    mapDispatchToProps
)(Account))
