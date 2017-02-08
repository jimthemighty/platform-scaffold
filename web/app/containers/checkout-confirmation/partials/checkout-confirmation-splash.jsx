import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {getAssetUrl} from 'progressive-web-sdk/dist/asset-utils'
import * as selectors from '../selectors'

import {Grid, GridSpan} from '../../../components/grid'
import Image from 'progressive-web-sdk/dist/components/image'

const CheckoutConfirmationSplash = (props) => {
    const {
        emailAddress,
        orderNumber
    } = props

    return (
        <div className="t-checkout-confirmation__splash u-bg-color-neutral-00 u-border-light-bottom">
            <Grid className="u-center-piece">
                <GridSpan
                    className="t-checkout-confirmation__splash-image"
                    tablet={{span: 6, pre: 1, post: 1}}
                    desktop={{span: 2, post: 3}}
                >
                    <div className="u-text-align-center u-padding-lg u-text-line-height-0">
                        <Image src={getAssetUrl('static/img/checkout/confirmed.png')} alt="Sparkling checkmark, signifying completion" height="57px" width="99px" />
                    </div>
                </GridSpan>

                <GridSpan
                    className="t-checkout-confirmation__splash-message"
                    tablet={{span: 6, pre: 1, post: 1}}
                    desktop={{span: 4, pre: 3}}
                >
                    <div className="t-checkout-confirmation__thanks u-padding-bottom-lg">
                        <h1 className="u-margin-bottom-md u-text-lighter u-text-all-caps">
                            <strong>Thanks,</strong> order confirmed
                        </h1>

                        <div className="u-text-content">
                            <p>We’ve sent you an email confirmation along with your order receipt.</p>
                            <p>Your order # is: <strong>{orderNumber}</strong>.</p>
                            <p>Email: <strong>{emailAddress}</strong></p>
                        </div>
                    </div>
                </GridSpan>
            </Grid>
        </div>
    )
}

CheckoutConfirmationSplash.propTypes = {
    emailAddress: PropTypes.string,
    orderNumber: PropTypes.string,
}

const mapStateToProps = createStructuredSelector({
    emailAddress: selectors.getEmailAddress,
    orderNumber: selectors.getOrderNumber
})

export default connect(mapStateToProps)(CheckoutConfirmationSplash)
