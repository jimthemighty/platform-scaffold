import React, {PropTypes} from 'react'
import classNames from 'classnames'
import {ampComponent} from '../../amp-sdk'

/**
 * An AMP lightbox
 */
const AmpLightbox = ({className, children, id}) => {
    const classes = classNames('c-amp-lightbox', {
        //
    }, className)
    return (
        <amp-lightbox id={id} layout="nodisplay" class={classes}>
            {children}
        </amp-lightbox>
    )
}

AmpLightbox.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    id: PropTypes.string
}

export default ampComponent(AmpLightbox)
