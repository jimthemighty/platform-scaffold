const plpParser = ($, $html) => {
    const $products = $html.find('.item.product-item')
    const products = $.makeArray($products).map((product) => {
        const $product = $(product)
        return {
            name: $product.find('.product-item-name').text(),
            href: $product.find('.product-item-link').attr('href'),
            image: {
                src: $product.find('.product-image-photo').attr('x-src'),
                alt: $product.find('.product-image-photo').attr('alt')
            },
            price: $product.find('.price').text()
        }
    })

    return {
        title: $html.find('.page-title').text().trim(),
        numItems: $html.find('#toolbar-amount .toolbar-number').text(),
        products: products
    }
}

export default plpParser
