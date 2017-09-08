/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {parseImage, getTextFrom} from '../../../utils/parser-utils'

const BANNER_SELECTOR = 'strong.logo, .home-erin, .home-t-shirts'

const homeParser = ($, $html) => {
    // TODO: fix this when we put mobile assets on desktop
    const banners = [].map.call(
        $html.find(BANNER_SELECTOR),
        (banner) => {
            const $banner = $(banner)
            const imageData = parseImage($banner.find('img'))

            if (!imageData.alt) {
                imageData.alt = getTextFrom($banner, '.title').toLowerCase()
            }

            return imageData
        }
    )

    return {banners}
}

export default homeParser
