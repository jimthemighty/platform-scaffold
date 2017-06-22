import {shallow} from 'enzyme'

/**
 * Shallow render a HOC and return the wrapper for the original component
 * which is what we usually want in tests.
 *
 * See https://github.com/airbnb/enzyme/issues/539
 */
export const shallowHOC = (component) => (
    shallow(component)
        .first()
        .shallow()
)

