import process from 'process'
import packagejson from '../package.json'

/**
 * Prepend the static URL to a static asset path. The path must be relative to
 * the 'static' directory, eg.
 *
 * For the file at `app/static/images/mobify.png` use staticURL('images/mobify.png')
 */
export const staticURL = (path) => (process.env.STATIC_URL || '/static/') + path


/**
 * Returns the path of the given URL if it looks like the URL is one that can
 * be rendered as an AMP page, else returns the original.
 *
 * Examples:
 *
 *   https://www.merlinspotions.com/potions.html -> /potions.html
 *   https://www.example.com/potions.html -> https://www.example.com/potions.html
 *
 */
export const pathFromURL = (url) => {
    return url.startsWith(packagejson.siteUrl) ? url.substring(packagejson.siteUrl.length) : url
}
