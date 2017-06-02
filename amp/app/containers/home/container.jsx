import React, {PropTypes} from 'react'
import {connect} from 'react-redux'

// import components
import Sheet from '../../components/sheet'
import AmpImage from 'mobify-amp-sdk/dist/components/amp-image'
import Link from '../../components/link'
import DangerousHTML from '../../components/dangerous-html'

// import container styles
import containerStyles from './container.scss'

const containerClass = 't-home'

const Home = ({
    links,
    title,
    buttontest
}) => {
    return (
        <div className={containerClass}>
            <Sheet id="menu-sheet" headerContent="Header" footerContent="Footer">
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Sign in</a></li>
                    <li><a href="#">Potions</a></li>
                    <li><a href="#">Spellbooks</a></li>
                    <li><a href="#">Ingredients</a></li>
                    <li><a href="#">Supplies</a></li>
                    <li><a href="#">Charms</a></li>
                    <li><a href="#">New Arrivals</a></li>
                    <DangerousHTML html={buttontest}>
                        {(htmlObj) => <div dangerouslySetInnerHTML={htmlObj} />}
                    </DangerousHTML>
                </ul>
            </Sheet>

            <DangerousHTML html={buttontest}>
                {(htmlObj) => <div dangerouslySetInnerHTML={htmlObj} />}
            </DangerousHTML>

            <AmpImage src="/static/mobify.png" width="252" height="64" layout="fixed" />

            <h1>{title}</h1>
            {links.map((linkText, i) => <p key={i}>{ linkText }</p>)}
            <Link href="https://www.merlinspotions.com">To Merlinspotions.com</Link>
        </div>
    )
}

Home.propTypes = {
    buttontest: PropTypes.string,
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
    className: containerClass,
    buttontest: '<button on="tap:menu-sheet.toggle">Button</button>'
})

export default connect(
    mapStateToProps
)(Home)

export const styles = containerStyles.toString()
