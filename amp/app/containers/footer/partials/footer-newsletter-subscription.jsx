import React, {PropTypes} from 'react'

// Partials
import NewsletterForm from './newsletter-form'

const FooterNewsletterSubscription = ({onSubmit}) => {
    return (
        <div className="t-footer__newsletter u-padding-md u-padding-top-lg u-padding-bottom-lg">
            <div>
                <h2 className="u-h4 u-margin-bottom-md u-text-uppercase">
                    Subscribe to Newsletter
                </h2>

                <NewsletterForm onSubmit={onSubmit} />
            </div>
        </div>
    )
}

FooterNewsletterSubscription.propTypes = {
    onSubmit: PropTypes.func
}

export default FooterNewsletterSubscription
