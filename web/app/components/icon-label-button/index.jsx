import React from 'react'
import classNames from 'classnames'
import Button from 'progressive-web-sdk/dist/components/button'
import IconLabel from 'progressive-web-sdk/dist/components/icon-label'


const IconLabelButton = (props) => {
    const {iconName, label, className} = props
    const classes = classNames('c-icon-label-button', className)
    return (
        <Button className={classes} innerClassName="u-padding-0">
            <IconLabel label={label} iconName={iconName} />
        </Button>
    )
}


IconLabelButton.propTypes = {
    className: React.PropTypes.string,
    iconName: React.PropTypes.string,
    label: React.PropTypes.string
}


export default IconLabelButton
