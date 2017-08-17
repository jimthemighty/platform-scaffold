/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'

import Button from 'progressive-web-sdk/dist/components/button'
import IconLabel from 'progressive-web-sdk/dist/components/icon-label'
import {HeaderBarActions} from 'progressive-web-sdk/dist/components/header-bar'
import {UI_NAME} from 'progressive-web-sdk/dist/analytics/data-objects/'

const MoreAction = ({innerButtonClassName, onClick}) => (
    <HeaderBarActions>
        <Button
            innerClassName={innerButtonClassName}
            onClick={onClick}
            data-analytics-name={UI_NAME.showSearchBar}
        >
            <IconLabel label="More" iconName="more" iconSize="medium" />
        </Button>
    </HeaderBarActions>
)

MoreAction.propTypes = {
    innerButtonClassName: PropTypes.string,
    onClick: PropTypes.func
}

export default MoreAction
