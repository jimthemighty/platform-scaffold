import HeaderBar from './header-bar'
import HeaderBarActions from './header-bar-actions'
import HeaderBarTitle from './header-bar-title'
import {ampComponent} from 'mobify-amp-sdk/dist/amp-sdk'

const _HeaderBar = ampComponent(HeaderBar)

export {_HeaderBar as HeaderBar, HeaderBarActions, HeaderBarTitle}
