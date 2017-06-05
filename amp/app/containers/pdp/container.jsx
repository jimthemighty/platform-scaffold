import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import AmpImage from 'mobify-amp-sdk/dist/components/amp-image'
import AmpLightbox from '../../components/amp-lightbox'
import containerStyles from './container.scss'

import {createPropsSelector} from 'reselect-immutable-helpers'
import {getProductDescription, getProductTitle} from '../../../../web/app/store/products/selectors'

const containerClass = 't-pdp'

const PDP = ({description, title}) => {
    return (
        <div className={containerClass}>
            <div dangerouslySetInnerHTML={{__html: '<button on="tap:my-lightbox">Open lightbox</button>'}} />
            <AmpLightbox id="my-lightbox">
                <AmpImage src="https://media.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif" width="500" height="500" />
            </AmpLightbox>
            <AmpImage src="/static/mobify.png" width="252" height="64" layout="fixed" />

            <h1>{title}</h1>
            <p>{description}</p>
        </div>
    )
}

PDP.propTypes = {
    /**
     * A description <-- not a good comment!
     */
    description: PropTypes.string,
    /**
     * A title <-- not a good comment!
     */
    title: PropTypes.string
}

PDP.templateName = 'pdp'

const mapStateToProps = createPropsSelector({
    description: getProductDescription,
    title: getProductTitle
})


export default connect(
    mapStateToProps
)(PDP)

export const styles = containerStyles.toString()
