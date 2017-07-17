import React from 'react'
import {ampComponent} from 'mobify-amp-sdk/dist/amp-sdk'

// Partials
import FooterNavigation from './partials/footer-navigation'

const Footer = () => {
    return (
        <footer className="t-footer">
            <FooterNavigation />
        </footer>
    )
}

export default ampComponent(Footer)
