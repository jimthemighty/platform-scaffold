import React, {PropTypes} from 'react'
import {connect} from 'react-redux'

// import components
import Sheet from '../../components/sheet'
import AmpImage from 'mobify-amp-sdk/dist/components/amp-image'
import DangerousHTML from '../../components/dangerous-html'

// import container styles
import containerStyles from './container.scss'

import * as appActions from './actions'
import * as selectors from './selectors'

const containerClass = 't-home'

class Home extends React.Component {

    componentDidMount() {
        this.props.fetchSvgSprite()
    }

    render() {
        const {
            links,
            sprite,
            title
        } = this.props

        return (
            <div className={containerClass}>
                {/* Move Sprite to "App container" so that way available on all containers */}
                <DangerousHTML html={sprite}>
                    {(htmlObj) => <div hidden dangerouslySetInnerHTML={htmlObj} />}
                </DangerousHTML>
                {/* END Move Sprite to "App container" so that way available on all containers */}

                <Sheet id="menu-sheet" className="t-menu-sheet" >
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Sign in</a></li>
                        <li><a href="#">Potions</a></li>
                        <li><a href="#">Spellbooks</a></li>
                        <li><a href="#">Ingredients</a></li>
                        <li><a href="#">Supplies</a></li>
                        <li><a href="#">Charms</a></li>
                        <li><a href="#">New Arrivals</a></li>
                        <div dangerouslySetInnerHTML={{__html: '<li on="tap:menu-sheet.close"> Close</li>'}} />
                    </ul>
                </Sheet>

                <div dangerouslySetInnerHTML={{__html: '<button on="tap:menu-sheet.toggle">Button</button>'}} />

                <AmpImage src="/static/mobify.png" width="252" height="64" layout="fixed" />

                <h1>{title}</h1>
                {links.map((linkText, i) => <p key={i}>{ linkText }</p>)}
            </div>
        )
    }
}

Home.propTypes = {
    fetchSvgSprite: PropTypes.func,
    /**
     * An array of links
     */
    links: PropTypes.array,
    /**
     * The SVG icon sprite needed in order for all Icons to work
     */
    sprite: PropTypes.string,
    /**
     * A title
     */
    title: PropTypes.string
}

const mapStateToProps = (state) => ({
    links: state.links,
    title: `Home! - ${state.title}` || '',
    className: containerClass,
    sprite: selectors.getSvgSprite
})

const mapDispatchToProps = {
    fetchSvgSprite: appActions.fetchSvgSprite,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)

export const styles = containerStyles.toString()
