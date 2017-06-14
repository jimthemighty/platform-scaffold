import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {staticURL} from '../../utils'

// import components
import AmpImage from 'mobify-amp-sdk/dist/components/amp-image'
import Link from '../../components/link'

// import container styles
import containerStyles from './container.scss'

const containerClass = 't-home'

const Home = ({
    links,
    title
}) => (
    <div className={containerClass}>
        <AmpImage src={staticURL("mobify.png")} width="252" height="64" layout="fixed" />

        <h1>{title}</h1>
        {links.map((linkText, i) => <p key={i}>{ linkText }</p>)}
        <Link href="https://www.merlinspotions.com">To Merlinspotions.com</Link>
    </div>
)

Home.propTypes = {
    /**
     * An array of links
     */
    links: PropTypes.array,
    /**
     * A title
     */
    title: PropTypes.string
}

Home.templateName = 'home'

const mapStateToProps = (state) => ({
    links: state.links,
    title: `Home! - ${state.title}` || '',
    className: containerClass
})

export default connect(
    mapStateToProps
)(Home)

export const styles = containerStyles.toString()
