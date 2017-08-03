/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'

import SkeletonText from 'progressive-web-sdk/dist/components/skeleton-text'

const OrderBlock = ({
    date,
    total,
    status,
}) => (
    <div className="u-padding-md">
        {date ?
            <p>
                <strong>Date: </strong>
                {date}
            </p>
        :
            <SkeletonText width="40%" style={{lineHeight: '20px', display: 'block'}} />
        }
        {total ?
            <p>
                <strong>Total: </strong>
                {total}
            </p>
        :
            <SkeletonText width="40%" style={{lineHeight: '20px', display: 'block'}} />
        }
        {status ?
            <p>
                <strong>Status: </strong>
                {status}
            </p>
        :
            <SkeletonText width="50%" style={{lineHeight: '20px', display: 'block'}} />
        }
    </div>
)

OrderBlock.propTypes = {
    date: PropTypes.string,
    status: PropTypes.string,
    total: PropTypes.string
}

export default OrderBlock
