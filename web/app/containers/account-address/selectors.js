/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {createSelector} from 'reselect'
import {getUi} from '../../store/selectors'
import {getAllAddresses, getDefaultAddress} from '../../store/user/selectors'

import {createGetSelector} from 'reselect-immutable-helpers'

export const getAccountAddress = createSelector(
    getUi,
    ({accountAddress}) => accountAddress
)

export const getAddressID = createGetSelector(getAccountAddress, 'addressID')

export const getIsEditing = createGetSelector(getAccountAddress, 'isEdit')

export const getAddressFromId = createSelector(
    getAddressID,
    getAllAddresses,
    (addressId, addresses) => {
        const address = addresses.find((address) => address.get('id') === addressId)

        if (address) {
            address.set('addressName', address.get('id'))
        }
        return address ? address.set('name', address.get('fullname') || address.get('firstname') + address.get('lastname')) : {}
    })

export const getIsDefaultAddressFromId = createSelector(
    getAddressID,
    getDefaultAddress,
    (addressId, address) => {
        return (
            address && address.id === addressId)
    })
