import React from 'react'

// Partials
import FooterNewsletterSubscription from './partials/footer-newsletter-subscription'
import FooterNavigation from './partials/footer-navigation'

const Footer = () => {
    return (
        <footer className="t-footer">
            <FooterNewsletterSubscription />
            <FooterNavigation />
        </footer>
    )
}

export default Footer
