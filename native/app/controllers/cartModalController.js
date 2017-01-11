import Promise from 'bluebird'

import AnchoredLayoutPlugin from 'astro/plugins/anchoredLayoutPlugin'
import ModalViewPlugin from 'astro/plugins/modalViewPlugin'
import NavigationPlugin from 'astro/plugins/navigationPlugin'

// import CartController from './cartController'
import CartHeaderController from './cartHeaderController'
import CartConfig from '../config/cartConfig'

const CartModalController = function(modalView, navigationView) {
    this.isShowing = false
    this.viewPlugin = modalView
    this.navigationView = navigationView
}

CartModalController.init = async function() {
    const [
        modalView,
        anchoredLayout,
        navigationView,
        cartHeaderController,
    ] = await Promise.all([
        ModalViewPlugin.init(),
        AnchoredLayoutPlugin.init(),
        NavigationPlugin.init(),
        CartHeaderController.init(),
    ])

    await anchoredLayout.addTopView(cartHeaderController.viewPlugin)
    await anchoredLayout.setContentView(navigationView)
    await navigationView.navigateToUrl(CartConfig.url, {}, {})
    await navigationView.setHeaderBar(cartHeaderController.viewPlugin)

    await modalView.setContentView(anchoredLayout)                // load the view in to the modal

    const cartModalController = new CartModalController(modalView, navigationView)

    cartHeaderController.registerCloseEvents(() => {
        cartModalController.hide()
    })

    cartHeaderController.viewPlugin.on('click:back', () => {
        cartModalController.back()
    })

    return cartModalController
}

CartModalController.prototype.show = async function() {
    if (this.isShowing) {
        return
    }
    this.isShowing = true
    this.viewPlugin.show({animated: true})
}

CartModalController.prototype.hide = async function() {
    this.isShowing = false
    await this.navigationView.popToRoot({})
    await this.viewPlugin.hide({animated: true})
}

CartModalController.prototype.isActiveItem = function() {
    return this.isShowing
}

CartModalController.prototype.back = function() {
    this.navigationView.back()
}

CartModalController.prototype.navigate = function(url, headerOptions, webViewOptions) {
    this.navigationView.navigateToUrl(url, headerOptions, webViewOptions)
}

export default CartModalController
