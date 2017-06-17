import {getTextFrom} from '../../../utils/parser-utils'

const getAvailabilityFrom = ($content) => {
    const availability = getTextFrom($content, '.product-info-stock-sku [title="Availability"]')
    return availability.toLowerCase() === 'in stock'
}

export const myProductDetailsParser = ($, $html) => {
    const $mainContent = $html.find('.page-main')

    const image = {
        src: '//via.placeholder.com/350x350',
        alt: 'Jason\'s product'
    }

    return {
        id: $mainContent.find('#product_addtocart_form input[name="product"]').val(),
        title: getTextFrom($mainContent, '.page-title-wrapper.product .page-title > span'),
        price: getTextFrom($mainContent, '.product-info-price .price-wrapper .price'),
        description: getTextFrom($mainContent, '.product.info.detailed .product.attibute.description p'),
        available: getAvailabilityFrom($mainContent),
        images: [image, image],
        thumbnail: image
    }
}
