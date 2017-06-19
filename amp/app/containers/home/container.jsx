import React, {PropTypes} from 'react'
import {connect} from 'react-redux'

// import components
import Link from '../../components/link'

import {createPropsSelector} from 'reselect-immutable-helpers'
import {getHomeCategories} from '../../../../web/app/containers/home/selectors'
import {initHomePage} from '../../../../web/app/integration-manager/home/commands'
import {CURRENT_URL} from '../../../../web/app/containers/app/constants'

const containerClass = 't-home'
import {ampComponent} from '../../amp-sdk'

const Home = ({
    categories
}) => (
    <div className={containerClass}>
        <h1>'Home: Categories'</h1>
        {categories.map(({title, path, isCategoryLink}, i) => <p key={i}>{ title }</p>)}
        <Link href="https://www.merlinspotions.com">To Merlinspotions.com</Link>
    </div>
)

Home.propTypes = {
    categories: PropTypes.array.isRequired
}

Home.resolves = [({dispatch, getState}) => {
    return dispatch(initHomePage(getState().ui.app.get(CURRENT_URL)))
}]

Home.templateName = 'home'

const mapStateToProps = createPropsSelector({
    categories: getHomeCategories
})


export default ampComponent(
    connect(mapStateToProps)(Home)
)
