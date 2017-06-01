import {makeRequest} from '../../utils/fetch-utils'
import {getAssetUrl} from '../../utils/asset-utils'
import {createAction} from '../../utils/action-creation'

export const updateSvgSprite = createAction('Updated SVG sprite', ['sprite'])


/**
 * Until the day that the `use` element's cross-domain issues are fixed, we are
 * forced to fetch the SVG Sprite's XML as a string and manually inject it into
 * the DOM. See here for details on the issue with `use`:
 * @URL: https://bugs.chromium.org/p/chromium/issues/detail?id=470601
 */
export const fetchSvgSprite = () => (dispatch) => {
    const spriteUrl = getAssetUrl('static/svg/sprite-dist/sprite.svg')
    return makeRequest(spriteUrl)
        .then((response) => response.text())
        .then((text) => dispatch(updateSvgSprite(text)))
}
