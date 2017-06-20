// Components
import AmpLightbox from '../components/amp-lightbox/index'
import AmpLightboxBase from '../components/amp-lightbox/_base.scss'
import AmpLightboxTheme from '../components/amp-lightbox/_theme.scss'

import Breadcrumbs from '../components/breadcrumbs/index'
import BreadcrumbsBase from '../components/breadcrumbs/_base.scss'
import BreadcrumbsTheme from '../components/breadcrumbs/_theme.scss'

import Button from '../components/button/index'
import ButtonBase from '../components/button/_base.scss'

import Field from '../components/field/index'
import FieldBase from '../components/field/_base.scss'
import FieldTheme from '../components/field/_theme.scss'

import FieldRow from '../components/field-row/index'
import FieldRowBase from '../components/field-row/_base.scss'
import FieldRowTheme from '../components/field-row/_theme.scss'

import {HeaderBar} from '../components/header-bar/index'
import HeaderBarBase from '../components/header-bar/_base.scss'
import HeaderBarTheme from '../components/header-bar/_theme.scss'

import Icon from '../components/icon/index'
import IconBase from '../components/icon/_base.scss'
import IconTheme from '../components/icon/_theme.scss'

import IconLabel from '../components/icon-label/index'
import IconLabelBase from '../components/icon-label/_base.scss'
import IconLabelTheme from '../components/icon-label/_theme.scss'

import IconLabelButton from '../components/icon-label-button/index'
import IconLabelButtonBase from '../components/icon-label-button/_base.scss'

import Link from '../components/link/index'
import LinkBase from '../components/link/_base.scss'
import LinkTheme from '../components/link/_theme.scss'

import ListTile from '../components/list-tile/index'
import ListTileBase from '../components/list-tile/_base.scss'
import ListTileTheme from '../components/list-tile/_theme.scss'

import Nav from '../components/nav/index'
import NavBase from '../components/nav/_base.scss'

import NavItem from '../components/nav-item/index'
import NavItemBase from '../components/nav-item/_base.scss'
import NavItemTheme from '../components/nav-item/_theme.scss'

import NavMenu from '../components/nav-menu/index'
import NavMenuBase from '../components/nav-menu/_base.scss'
import NavMenuTheme from '../components/nav-menu/_theme.scss'

import ProductItem from '../components/product-item/index'
import ProductItemBase from '../components/product-item/_base.scss'

import ProductTile from '../components/product-tile/index'
import ProductTileBase from '../components/product-tile/_base.scss'

import Sheet from '../components/sheet/index'
import SheetBase from '../components/sheet/_base.scss'
import SheetTheme from '../components/sheet/_theme.scss'

import SkipLinks from '../components/skip-links/index'
import SkipLinksBase from '../components/skip-links/_base.scss'
import SkipLinksTheme from '../components/skip-links/_theme.scss'


// Containers
import Footer from '../containers/footer/container'
import FooterStyles from '../containers/footer/_container.scss'

import Header from '../containers/header/container'
import HeaderStyles from '../containers/header/_container.scss'

import Navigation from '../containers/navigation/container'
import NavigationStyles from '../containers/navigation/_container.scss'

import ProductDetails from '../containers/product-details/container'
import ProductDetailsStyles from '../containers/product-details/_container.scss'

import ProductList from '../containers/product-list/container'
import ProductListStyles from '../containers/product-list/_container.scss'



const styles = new Map()

styles.set(AmpLightbox, [AmpLightboxBase, AmpLightboxTheme])
styles.set(Breadcrumbs, [BreadcrumbsBase, BreadcrumbsTheme])
styles.set(Button, [ButtonBase])
styles.set(Field, [FieldBase, FieldTheme])
styles.set(FieldRow, [FieldRowBase, FieldRowTheme])
styles.set(HeaderBar, [HeaderBarBase, HeaderBarTheme])
styles.set(Icon, [IconBase, IconTheme])
styles.set(IconLabel, [IconLabelBase, IconLabelTheme])
styles.set(IconLabelButton, [IconLabelButtonBase])
styles.set(Link, [LinkBase, LinkTheme])
styles.set(ListTile, [ListTileBase, ListTileTheme])
styles.set(Nav, [NavBase])
styles.set(NavItem, [NavItemBase, NavItemTheme])
styles.set(NavMenu, [NavMenuBase, NavMenuTheme])
styles.set(ProductItem, [ProductItemBase])
styles.set(ProductTile, [ProductTileBase])
styles.set(Sheet, [SheetBase, SheetTheme])
styles.set(SkipLinks, [SkipLinksBase, SkipLinksTheme])


styles.set(Footer, [FooterStyles])
styles.set(Header, [HeaderStyles])
styles.set(Navigation, [NavigationStyles])
styles.set(ProductDetails, [ProductDetailsStyles])
styles.set(ProductList, [ProductListStyles])


export default styles
