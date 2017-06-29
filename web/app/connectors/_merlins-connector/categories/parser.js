/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {getTextFrom, parseProductID} from '../../../utils/parser-utils'

/* eslint-disable newline-per-chained-call */

export const parseCategoryId = ($, $html) => {
    const className = $html.find('li[class*="category"]').attr('class')
    const classMatch = /category(\d+)/.exec(className)
    if (classMatch) {
        return classMatch[1]
    }
    return null
}

export const parseCategoryTitle = ($, $html) => getTextFrom($html, '.page-title')

const REGEX_NON_NUM = /\D/g
const REGEX_NON_ALPHA_NUM = /\W/g
const REGEX_DASH = /-/g

const priceParser = (value) => {
    const values = value.split('-')
    const floor = parseInt(values[0]) || 0
    let ceiling = parseInt(values[1]) || Infinity

    // Sometimes you get values like `0-10` and `10-20`. The ceiling of one
    // price should not overlap with the floor of another.
    ceiling = ceiling - 0.01
    // We're choosing to subtract from the ceiling because a value of `0-10` is
    // otherwise labelled `$0 - $9.99` elsewhere. This aligns the values to match.

    return {floor, ceiling}
}

export const priceFilterParser = ($, $html) => {
    const $filters = $html.find('.filter-options .filter-options-item')
    const filters = []

    // eslint-disable-next-line array-callback-return
    $filters.map((idx, filter) => {
        const filterObject = {}

        filterObject.label = $(filter).find('.filter-options-title').text()
        filterObject.ruleset = filterObject.label.toLowerCase()

        const kindArray = []
        $(filter).find('.filter-options-content .item').map((idx, kind) => {
            const $kind = $(kind)
            
            const searchKey = $kind.find('a')[0].search
            let query = searchKey
            let criteria = ''
            let label = $kind.text()
            const $count = $kind.find('.count').remove()
            const count = $count.text().replace(REGEX_NON_NUM, '')

            if ($kind.has('.price').length > 0) {
                const price = query.split('=')[1]
                criteria = priceParser(price) // priceParser('10-20')
                label = $kind.text().trim() // '$10.00 - $19.99'

                // Replace `-` with `to` to prevent the replacement of non alpha-num
                // characters from obfuscating the meaning of the query. For
                // example, prevent `price10-20` from becoming `price1020`, because
                // what would that mean: 10-20, 0-1020 or 1020-Infinity?
                // 'price10to20'
                query = query.replace(REGEX_DASH, 'to').replace(REGEX_NON_ALPHA_NUM, '')
            }

            kindArray.push({
                count, // 2
                criteria,
                label,
                ruleset: 'price', // we only have one ruleset at the moment
                query,
                searchKey
            })
        })
        filterObject.kinds = kindArray
        filters.push(filterObject)
    })

    return filters
}


const categoryProductsParser = ($, $html) => {
    const $numItems = $html.find('#toolbar-amount .toolbar-number').first()

    const productIds = $
          .makeArray($html.find('.item.product-item'))
          .map((product) => parseProductID($(product)))

    return {
        itemCount: $numItems.length > 0 ? parseInt($numItems.text(), 10) : 0,
        products: productIds
    }
}

export const parseSortOptions = ($, $html) => {
    const $select = $html.find('select.sorter-options').first()
    const sortOptions = []
    $select.children().each((index, option) => {
        sortOptions.push({
            id: option.value,
            label: option.text
        })
    })
    return sortOptions
}

export default categoryProductsParser
