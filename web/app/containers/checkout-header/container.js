import React from 'react'

import Button from 'progressive-web-sdk/dist/components/button'
import {HeaderBar, HeaderBarTitle} from 'progressive-web-sdk/dist/components/header-bar'
import {Icon} from 'progressive-web-sdk/dist/components/icon'
import {isRunningInAstro} from '../../utils/astro-integration'

const CheckoutHeader = function(props) {
    const canSignIn = true
    if (isRunningInAstro) {
        return null
    }
    return (
        <div>
            <header className="t-checkout-header">
                <HeaderBar className="t-checkout-header__bar">
                    <HeaderBarTitle className="u-flex-none u-padding-start u-text-align-start">
                        <h2 className="t-checkout-header__title u-heading-family u-text-uppercase">
                            <span className="u-text-lighter">MERLIN'S</span> CHECKOUT
                                </h2>
                    </HeaderBarTitle>

                    <Icon name="lock" size="medium" className="u-flex-none" />

                    {canSignIn &&
                    <div className="u-flex u-text-align-end">
                        <Button
                            href="/customer/account/login/"
                            innerClassName="u-color-neutral-10"
                                    >
                            <Icon name="user" className="u-margin-end-sm" />
                            <span>Sign in</span>
                        </Button>
                    </div>
                            }
                </HeaderBar>
            </header>
        </div>
    )
}

export default CheckoutHeader
