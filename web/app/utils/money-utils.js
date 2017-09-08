/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
export const formatPrice = (price) => {
    if (!price) {
        price = 0
    }

    if (price < 0) {
        return `-$${(price * -1).toFixed(2)}`
    }
    return `$${price.toFixed(2)}`
}

const DOLLAR_SIGN = /\$/

// replacing $ sign with empty string to compare the price
export const parsePrice = (formattedPrice, currencySymbol = DOLLAR_SIGN) => {
    return parseFloat(formattedPrice.replace(currencySymbol, ''))
}
