/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import {getWishlistItemCount, getWishlistTitle} from '../../../store/user/selectors'


const WishlistHeader = ({
    itemCount,
    title
}) => (
    <h1 className="t-wishlist__title">{title} ({itemCount})</h1>
)


WishlistHeader.propTypes = {
    itemCount: PropTypes.number,
    title: PropTypes.string
}

const mapStateToProps = createPropsSelector({
    itemCount: getWishlistItemCount,
    title: getWishlistTitle,
})

export default connect(
    mapStateToProps
)(WishlistHeader)
