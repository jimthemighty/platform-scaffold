import React from 'react'
import template from '../../template'

// Partials
import HomeCarousel from './partials/home-carousel'
import HomeCategories from './partials/home-categories'

const Home = () => {
    return (
        <div className="t-home__container">
            <HomeCarousel />
            <HomeCategories />
        </div>
    )
}


export default template(Home)
