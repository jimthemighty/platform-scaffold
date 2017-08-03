/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'

import SkeletonText from 'progressive-web-sdk/dist/components/skeleton-text'

const OrderBlock = ({
    date,
    total,
    shipTo,
    status,
}) => (
    <div className="u-padding-md">
        <dl className="u-margin-0">
            {date ?
                <div className="u-flexbox">
                    <dt className="u-flex u-margin-0 u-text-weight-regular u-color-neutral-50">Date</dt>
                    <dd className="u-flex">{date}</dd>
                </div>
            :
                <SkeletonText width="40%" style={{lineHeight: '20px', display: 'block'}} />
            }
            {shipTo ?
                <div className="u-flexbox">
                    <dt className="u-flex u-margin-0 u-text-weight-regular u-color-neutral-50">Ship to</dt>
                    <dd className="u-flex">{shipTo}</dd>
                </div>
            :
                <SkeletonText width="40%" style={{lineHeight: '20px', display: 'block'}} />
            }
            {total ?
                <div className="u-flexbox">
                    <dt className="u-flex u-margin-0 u-text-weight-regular u-color-neutral-50">Order total</dt>
                    <dd className="u-flex">{total}</dd>
                </div>
            :
                <SkeletonText width="40%" style={{lineHeight: '20px', display: 'block'}} />
            }
            {status ?
                <div className="u-flexbox">
                    <dt className="u-flex u-margin-0 u-text-weight-regular u-color-neutral-50">Status</dt>
                    <dd className="u-flex">{status}</dd>
                </div>
            :
                <SkeletonText width="50%" style={{lineHeight: '20px', display: 'block'}} />
            }
        </dl>
    </div>
)

OrderBlock.propTypes = {
    date: PropTypes.string,
    shipTo: PropTypes.string,
    status: PropTypes.string,
    total: PropTypes.string
}

export default OrderBlock
