// Components
import Accordion from './components/accordion/accordion'
import AccordionBase from './components/accordion/_base.scss'
import AccordionTheme from './styles/themes/amp-components/_accordion.scss'

import Breadcrumbs from './components/breadcrumbs/index'
import BreadcrumbsBase from './components/breadcrumbs/_base.scss'
import BreadcrumbsTheme from './styles/themes/amp-components/_breadcrumbs.scss'

import Button from './components/button/index'
import ButtonBase from './components/button/_base.scss'
import ButtonTheme from './styles/themes/amp-components/_button.scss'

import Field from './components/field/index'
import FieldBase from './components/field/_base.scss'
import FieldTheme from './styles/themes/amp-components/_field.scss'

import FieldRow from './components/field-row/index'
import FieldRowBase from './components/field-row/_base.scss'
import FieldRowTheme from './styles/themes/amp-components/_field-row.scss'

import {HeaderBar} from './components/header-bar/index'
import HeaderBarBase from './components/header-bar/_base.scss'
import HeaderBarTheme from './styles/themes/amp-components/_header-bar.scss'

import Icon from './components/icon/index'
import IconBase from './components/icon/_base.scss'
import IconTheme from './styles/themes/amp-components/_icon.scss'

import IconLabel from './components/icon-label/index'
import IconLabelBase from './components/icon-label/_base.scss'
import IconLabelTheme from './styles/themes/amp-components/_icon-label.scss'

import IconLabelButton from './components/icon-label-button/index'
import IconLabelButtonBase from './components/icon-label-button/_base.scss'

import Link from './components/link/index'
import LinkBase from './components/link/_base.scss'
import LinkTheme from './components/link/_theme.scss'

import List from './components/list/index'
import ListTheme from './styles/themes/amp-components/_list.scss'

import ListTile from './components/list-tile/index'
import ListTileBase from './components/list-tile/_base.scss'
import ListTileTheme from './styles/themes/amp-components/_list-tile.scss'

import Nav from './components/nav/index'
import NavBase from './components/nav/_base.scss'
import NavTheme from './styles/themes/amp-components/_nav.scss'

import NavItem from './components/nav-item/index'
import NavItemBase from './components/nav-item/_base.scss'
import NavItemTheme from './styles/themes/amp-components/_nav-item.scss'

import NavMenu from './components/nav-menu/index'
import NavMenuBase from './components/nav-menu/_base.scss'
import NavMenuTheme from './styles/themes/amp-components/_nav-menu.scss'

import ProductItem from './components/product-item/index'
import ProductItemBase from './components/product-item/_base.scss'

import ProductTile from './components/product-tile/index'
import ProductTileBase from './components/product-tile/_base.scss'
import ProductTileTheme from './styles/themes/amp-components/_product-tile.scss'

import Sheet from './components/sheet/index'
import SheetBase from './components/sheet/_base.scss'
import SheetTheme from './components/sheet/_theme.scss'

import SkipLinks from './components/skip-links/index'
import SkipLinksBase from './components/skip-links/_base.scss'
import SkipLinksTheme from './components/skip-links/_theme.scss'

import Carousel from './components/carousel/index'
import CarouselBase from './components/carousel/_base.scss'
import CarouselTheme from './styles/themes/amp-components/_carousel.scss'


// Containers
import Footer from './containers/footer/container'
import FooterStyles from './containers/footer/_container.scss'

import Header from './containers/header/container'
import HeaderStyles from './containers/header/_container.scss'

import Navigation from './containers/navigation/container'
import NavigationStyles from './containers/navigation/_container.scss'

import ProductDetails from './containers/product-details/container'
import ProductDetailsStyles from './containers/product-details/_container.scss'

import ProductList from './containers/product-list/container'
import ProductListStyles from './containers/product-list/_container.scss'



const styles = new Map()

styles.set(Accordion, [AccordionBase, AccordionTheme])
styles.set(Breadcrumbs, [BreadcrumbsBase, BreadcrumbsTheme])
styles.set(Button, [ButtonBase, ButtonTheme])
styles.set(Field, [FieldBase, FieldTheme])
styles.set(FieldRow, [FieldRowBase, FieldRowTheme])
styles.set(HeaderBar, [HeaderBarBase, HeaderBarTheme])
styles.set(Icon, [IconBase, IconTheme])
styles.set(IconLabel, [IconLabelBase, IconLabelTheme])
styles.set(IconLabelButton, [IconLabelButtonBase])
styles.set(Link, [LinkBase, LinkTheme])
styles.set(List, [ListTheme])
styles.set(ListTile, [ListTileBase, ListTileTheme])
styles.set(Nav, [NavBase, NavTheme])
styles.set(NavItem, [NavItemBase, NavItemTheme])
styles.set(NavMenu, [NavMenuBase, NavMenuTheme])
styles.set(ProductItem, [ProductItemBase])
styles.set(ProductTile, [ProductTileBase, ProductTileTheme])
styles.set(Sheet, [SheetBase, SheetTheme])
styles.set(SkipLinks, [SkipLinksBase, SkipLinksTheme])
styles.set(Carousel, [CarouselBase, CarouselTheme])


styles.set(Footer, [FooterStyles])
styles.set(Header, [HeaderStyles])
styles.set(Navigation, [NavigationStyles])
styles.set(ProductDetails, [ProductDetailsStyles])
styles.set(ProductList, [ProductListStyles])


export default styles
