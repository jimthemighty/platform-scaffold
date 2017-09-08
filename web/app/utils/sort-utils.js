/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {parsePrice} from './money-utils'

export const sortLib = {
    // sort by name
    name: (a, b) => {
        // getting name of products
        const nameA = a.get('title')
        const nameB = b.get('title')

        if (nameA < nameB) {
            return -1
        }
        if (nameA > nameB) {
            return 1
        }
        return 0
    },

    // sort by price
    price: (a, b) => (parsePrice(a.get('price')) - parsePrice(b.get('price'))),

    // sort by postition (default)
    position: () => 0
}
