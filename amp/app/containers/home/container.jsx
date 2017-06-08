import React, {PropTypes} from 'react'
import {connect} from 'react-redux'

// import components
import AmpImage from 'mobify-amp-sdk/dist/components/amp-image'
import Link from '../../components/link'

import {createPropsSelector} from 'reselect-immutable-helpers'
import {getHomeCategories} from '../../../../web/app/containers/home/selectors'

// import container styles
import containerStyles from './container.scss'

const containerClass = 't-home'

const Home = ({
    categories
}) => (
    <div className={containerClass}>
        <AmpImage src="/static/mobify.png" width="252" height="64" layout="fixed" />

        <h1>'Home: Categories'</h1>
        {categories.map(({title, path, isCategoryLink}, i) => <p key={i}>{ title }</p>)}
        <Link href="https://www.merlinspotions.com">To Merlinspotions.com</Link>
    </div>
)

Home.propTypes = {
    categories: PropTypes.array.isRequired
}

Home.templateName = 'home'



const mapStateToProps = createPropsSelector({
    categories: getHomeCategories
})


export default connect(
    mapStateToProps
)(Home)

export const styles = containerStyles.toString()
