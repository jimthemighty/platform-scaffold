import process from 'process'

/**
 * Prepend the static URL to a static asset path. The path must be relative to
 * the 'static' directory, eg.
 *
 * For the file at `app/static/images/mobify.png` use staticURL('images/mobify.png')
 */
export const staticURL = (path) => (process.env.STATIC_URL || '/static/') + path
