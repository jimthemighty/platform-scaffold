/**
 * @param {Object} sizeOptions - baseOptions of current product with variantType === ApparelSizeVariantProduct
 * @example
 * {
 *	"options": [{ "code": "300717433",...}, {"code": "300717434",...}],
 *	"selected": {{ "code": "300717433",...}}
 *	"variantType": "ApparelSizeVariantProduct"
 * }
 * @param {Object} styleOptions - baseOptions of current product with variantType === ApparelStyleVariantProduct
 * @example
 * {
 *	"options": [{ "code": "122811_bright_white",...}, {"code": "122811_heather_berry",...}],
 *	"selected": {{ "code": "122811_heather_berry",...}}
 *	"variantType": "ApparelStyleVariantProduct"
 * }
 * @return {Array} - array of Variant objects
 * @example
 * [
 *    {
 *      "id": "300717433",
 *	    "values": { "ApparelSizeVariantProduct": "300717433", "ApparelStyleVariantProduct": "122811_heather_berry" },
 *    },
 *    {
 *      "id": "300717434",
 *	    "values": { "ApparelSizeVariantProduct": "300717434", "ApparelStyleVariantProduct": "122811_heather_berry" },
 *    }
 * ]
 */
export const parseStyleAndSizeBaseOptions = (sizeOptions, styleOptions) => {
    const selectedStyleVariant = styleOptions.selected.code
    return sizeOptions.options.map((option) => {
        const id = option.code
        const values = {
            [styleOptions.variantType]: selectedStyleVariant,
            [sizeOptions.variantType]: id
        }
        return {id, values}
    })
}


/**
 * @param {Array} variantOptions- variantOptions of current product (size variants)
 * @example
 * [{ "code": "300717433",...}, {"code": "300717434",...}]
 *
 * @param {Object} styleOptions- baseOptions of current product with variantType === ApparelStyleVariantProduct
 * @example
 * {
 *	"options": [{ "code": "122811_bright_white",...}, {"code": "122811_heather_berry",...}],
 *	"selected": {{ "code": "122811_heather_berry",...}}
 *	"variantType": "ApparelStyleVariantProduct"
 * }
 * @param {string} productVariantType - the type of variant product
 * @example "ApparelSizeVariantProduct"
 *
 * @return {Array} - array of Variant objects
 * @example
 * [
 *    {
 *      "id": "122811_heather_berry",
 *	    "values": { "ApparelSizeVariantProduct": "300717433", "ApparelStyleVariantProduct": "122811_heather_berry" },
 *    },
 *    {
 *      "id": "122811_heather_berry",
 *	    "values": { "ApparelSizeVariantProduct": "300717434", "ApparelStyleVariantProduct": "122811_heather_berry" },
 *    }
 * ]
 */
export const parseStyleBaseOptionAndVariantOptions = (variantOptions, styleOptions, productVariantType) => {
    const selectedStyleVariant = styleOptions.selected.code
    return variantOptions.map((option) => {
        const id = selectedStyleVariant
        const values = {
            [styleOptions.variantType]: selectedStyleVariant,
            [productVariantType]: option.code
        }
        return {id, values}
    })
}


/**
 * @param {Object} baseOptions- Style or Size baseOptions of current product
 * @example
 * {
 *	"options": [{ "code": "115195_shocking_pink",...}],
 *	"selected": {{ "code": "115195_shocking_pink",...}}
 *	"variantType": "ApparelStyleVariantProduct"
 * }
 * @return {Array} - array of Variant objects
 * @example
 * [
 *    {
 *      "id": "115195_shocking_pink",
 *	    "values": { "ApparelStyleVariantProduct": "115195_shocking_pink" },
 *    }
 * ]
 */
export const parseStyleOrSizeBaseOption = (baseOptions) => {
    return baseOptions.options.map((option) => {
        const id = option.code
        const values = {
            [baseOptions.variantType]: id
        }
        return {id, values}
    })
}

/**
 * @param {Array} variantOptions- variantOptions of current product
 * @example
 * [{ "code": "122811_heather_berry",...}, {"code": "122811_bright_white",...}]
 *
 * @param {string} productVariantType - the type of variant product
 * @example "ApparelStyleVariantProduct"
 *
 * @return {Array} - array of Variant objects
 * @example
 * [
 *    {
 *      "id": "122811_heather_berry",
 *	    "values": { "ApparelStyleVariantProduct": "122811_heather_berry" },
 *    },
 *    {
 *      "id": "122811_bright_white",
 *	    "values": { "ApparelStyleVariantProduct": "122811_bright_white" },
 *    }
 * ]
 */
export const parseVariantOptions = (variantOptions, productVariantType) => {
    return variantOptions.map((option) => {
        const id = option.code
        const values = {
            [productVariantType]: id
        }
        return {id, values}
    })
}
