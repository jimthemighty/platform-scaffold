import React from 'react'
import {isRunningInAstro} from '../../utils/astro-integration'

import FooterNewsletterSubscription from './partials/footer-newsletter-subscription'
import FooterSocialIcons from './partials/footer-social-icons'
import FooterNavigation from './partials/footer-navigation'

const Footer = () => {
    if (isRunningInAstro) {
        return null
    }

    return (
        <footer className="t-footer">
            <FooterNewsletterSubscription />
            <FooterSocialIcons />
            <FooterNavigation />
        </footer>
    )
}

export default Footer
