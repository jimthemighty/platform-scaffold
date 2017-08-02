/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import SkeletonBlock from 'progressive-web-sdk/dist/components/skeleton-block'
import Card from '../../../components/card'

import {getOrderItems} from '../../../store/user/orders/selectors'

const OrderItems = ({
    items
}) => (
    <div className="">
        {items ?
            items.map(({itemName, price, quantity}) => (
                <Card header={itemName} key={itemName}>
                    <div className="u-flexbox">
                        <div className="u-flex">
                            Ordered: {quantity}
                        </div>
                        <div className="u-text-align-end u-flex">
                            {price}
                        </div>
                    </div>
                </Card>
            ))
        :
            <SkeletonBlock height="34px" />
        }
    </div>
)


OrderItems.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        itemName: PropTypes.string,
        linePrice: PropTypes.string,
        itemPrice: PropTypes.string,
        quantity: PropTypes.string
    }))
}

const mapStateToProps = createPropsSelector({
    items: getOrderItems
})

export default connect(
    mapStateToProps
)(OrderItems)
