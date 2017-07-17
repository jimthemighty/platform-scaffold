/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import Button from 'progressive-web-sdk/dist/components/button'
import {getWishlistShareURL} from '../../../store/user/selectors'


const WishlistShareButton = ({
    shareURL
}) => (
    <div className="u-padding-top-md u-padding-bottom-md">
        <Button
            title="Share Wish List"
            icon="share"
            showIconText={true}
            href={shareURL}
            className="u-color-brand u-text-letter-spacing-normal u-width-full"
        />
    </div>
)


WishlistShareButton.propTypes = {
    shareURL: PropTypes.string
}

const mapStateToProps = createPropsSelector({
    shareURL: getWishlistShareURL
})

export default connect(
    mapStateToProps
)(WishlistShareButton)
