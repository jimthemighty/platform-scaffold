/* eslint-env jquery, jest, node */
import {jquerifyHtmlFile} from 'progressive-web-sdk/dist/test-utils'
import {isURL} from 'validator'
import {productDetailsParser, productDetailsUIParser} from './parsers'

/* eslint-disable max-nested-callbacks */

describe('the ProductDetails product parser', () => {
    const $content = jquerifyHtmlFile(`${__dirname}/product-details-example.html`)
    const parsedContent = productDetailsParser($, $content)

    it('extracts the title from the page', () => {
        expect(parsedContent.title).toBe('Eye Of Newt')
    })

    it('extracts the price from the page', () => {
        expect(parsedContent.price).toBe('$12.00')
    })

    it('extracts carousel items from the page', () => {
        const items = parsedContent.carouselItems
        expect(items.length).toBe(3)

        items.forEach((item, idx) => {
            ['thumb', 'img', 'full'].forEach((prop) => {
                expect(isURL(item[prop])).toBe(true)
                expect(item[prop]).toMatch(/\.png$/)
            })
            expect(item.position).toBe(`${idx + 1}`)
        })
    })

    it('extracts the description from the page', () => {
        expect(typeof parsedContent.description).toBe('string')
    })
})

describe('the ProductDetails UI parser', () => {
    const $content = jquerifyHtmlFile(`${__dirname}/product-details-example.html`)
    const parsedContent = productDetailsUIParser($, $content)

    test('extracts form info from the add-to-cart form', () => {
        expect(isURL(parsedContent.formInfo.submitUrl)).toBe(true)
        expect(parsedContent.formInfo.method).toBe('post')
        Object.keys(parsedContent.formInfo.hiddenInputs).forEach((key) => {
            expect(typeof parsedContent.formInfo.hiddenInputs[key]).toBe('string')
        })
    })
})
