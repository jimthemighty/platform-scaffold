import HeaderBarPlugin from 'progressive-app-sdk/plugins/headerBarPlugin'
import CounterBadgeController from 'progressive-app-sdk/controllers/counterBadgeController'
import BackboneEvents from 'vendor/backbone-events'
import Astro from 'progressive-app-sdk/astro-full'
import ImageViewPlugin from 'progressive-app-sdk/plugins/imageViewPlugin'

import CartModalController from './cartModalController'
import DoubleIconsPlugin from '../plugins/doubleIconsPlugin'

import baseConfig from '../config/baseConfig'
import cartConfig from '../config/cartConfig'

const TabHeaderController = function(headerBar, counterBadgeController) {
    this.viewPlugin = headerBar
    this.counterBadgeController = counterBadgeController
}

TabHeaderController.init = async function() {
    const headerBar = await HeaderBarPlugin.init()
    const counterBadgeController = await CounterBadgeController.init(cartConfig.cartIcon.imageUrl, 'headerId', {})
    const doubleIcons = await DoubleIconsPlugin.init()
    const searchIcon = await ImageViewPlugin.init()
    const counterBadgePlugin = await counterBadgeController.generatePlugin()
    await searchIcon.setImagePath(cartConfig.searchIcon.imageUrl)

    await doubleIcons.setRightIcon(counterBadgePlugin)
    await doubleIcons.setLeftIcon(searchIcon)

    await headerBar.setRightPlugin(doubleIcons, 'headerId')
    await headerBar.setCenterIcon(baseConfig.logoUrl, 'logo')
    await headerBar.setTextColor(baseConfig.colors.whiteColor)
    await headerBar.setBackgroundColor(baseConfig.colors.primaryColor)
    await headerBar.setOpaque()

    let tabHeaderController = new TabHeaderController(headerBar, counterBadgeController)
    tabHeaderController = Astro.Utils.extend(tabHeaderController, BackboneEvents)

    headerBar.on('click:back', () => {
        tabHeaderController.back()
    })

    doubleIcons.on('click:doubleIcons_right', async () => {
        const cartModalController = await CartModalController.init()
        cartModalController.show()
    })

    return tabHeaderController
}

TabHeaderController.prototype.back = function() {
    this.trigger('back')
}

TabHeaderController.prototype.updateCounter = function(count) {
    this.counterBadgeController.updateCounterValue(count)
}

export default TabHeaderController
