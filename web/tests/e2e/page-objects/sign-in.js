/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

const selectors = {
    registeredEmail: 'input[name="username"]',
    registeredPassword: 'input[name="password"][type="password"]',
    login: '.t-login__signin-panel button[type="submit"]',
    dashboard: '.t-account-dashboard'
}

const SignIn = function(browser) {
    this.browser = browser
    this.selectors = selectors
}

SignIn.prototype.signIn = function() {
    this.browser
        .waitForElementVisible(selectors.registeredEmail)
        .setValue(selectors.registeredEmail, 'mobifyautomation@gmail.com')
        .waitForElementVisible(selectors.registeredPassword)
        .setValue(selectors.registeredPassword, 'p4ssword')
        .waitForElementVisible(selectors.login)
        .click(selectors.login)
        .waitForElementVisible(selectors.dashboard)
    return this
}

export default SignIn
