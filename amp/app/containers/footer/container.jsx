import React from 'react'

// Partials
import FooterNavigation from './partials/footer-navigation'
import {ampComponent} from 'mobify-amp-sdk/dist/amp-sdk'

const Footer = () => {
    return (
        <footer className="t-footer">
            <FooterNavigation />
        </footer>
    )
}

export default ampComponent(Footer)
