import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {CURRENT_URL} from 'progressive-web-sdk/dist/store/app/constants'

// Components
import Link from '../../components/link'

// Selectors
import {createPropsSelector} from 'reselect-immutable-helpers'
import {getHomeCategories} from '../../../../web/app/containers/home/selectors'
import {initHomePage} from 'progressive-web-sdk/dist/integration-manager/home/commands'

import {ampComponent} from '../../amp-sdk'

const Home = ({
    categories
}) => (
    <div className="t-home">
        <h1>'Home: Categories'</h1>
        {categories.map(({title, path, isCategoryLink}, i) => <p key={i}>{ title }</p>)}
        <Link href="https://www.merlinspotions.com">To Merlinspotions.com</Link>
    </div>
)

Home.propTypes = {
    categories: PropTypes.array.isRequired
}

Home.resolves = [({dispatch, getState}) => {
    return dispatch(initHomePage(getState().app.get(CURRENT_URL)))
}]

Home.templateName = 'home'

const mapStateToProps = createPropsSelector({
    categories: getHomeCategories
})

export default ampComponent(connect(mapStateToProps)(Home))
