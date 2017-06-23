/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'

import Button from 'progressive-web-sdk/dist/components/button'
import IconLabel from 'progressive-web-sdk/dist/components/icon-label'
import {HeaderBarActions} from 'progressive-web-sdk/dist/components/header-bar'
import {UI_NAME} from 'progressive-web-sdk/dist/analytics/data-objects/'

const NavigationAction = ({innerButtonClassName, onClick}) => (
    <HeaderBarActions>
        <div role="navigation">
            <Button
                id="header-navigation"
                innerClassName={innerButtonClassName}
                onClick={onClick}
                data-analytics-name={UI_NAME.showMenu}
            >
                <IconLabel label="Menu" iconName="menu" iconSize="medium" />
            </Button>
        </div>
    </HeaderBarActions>
)

NavigationAction.propTypes = {
    innerButtonClassName: PropTypes.string,
    onClick: PropTypes.func
}

export default NavigationAction
