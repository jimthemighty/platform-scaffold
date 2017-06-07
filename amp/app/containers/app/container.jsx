import React, {PropTypes} from 'react'
import Header from '../header/container'
import Footer from '../footer/container'
import DangerousHTML from '../../components/dangerous-html'
import Icon from '../../components/icon'
import Sheet from '../../components/sheet'

import sprite from '../../static/svg/sprite-dist/sprite.svg'

const App = ({
    children
}) => {
    const button = '<button on="tap:menu-sheet.toggle">Button</button>';
    return (
        <body
            id="root"
            className="t-app"
        >

            <Sheet id="menu-sheet" headerContent={<div>Header</div>} footerContent={<div>Footer</div>}>
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Sign in</a></li>
                    <li><a href="#">Potions</a></li>
                    <li><a href="#">Spellbooks</a></li>
                    <li><a href="#">Ingredients</a></li>
                    <li><a href="#">Supplies</a></li>
                    <li><a href="#">Charms</a></li>
                    <li><a href="#">New Arrivals</a></li>
                    <DangerousHTML html={button}>
                        {(htmlObj) => <div dangerouslySetInnerHTML={htmlObj}/>}
                    </DangerousHTML>
                </ul>
            </Sheet>

            <DangerousHTML html={button}>
                {(htmlObj) => <div dangerouslySetInnerHTML={htmlObj}/>}
            </DangerousHTML>

            <DangerousHTML html={sprite}>
                {(htmlObj) => <div hidden dangerouslySetInnerHTML={htmlObj}/>}
            </DangerousHTML>

            <Icon name="user" title="User"/>

            <Header />

            {children}

            <Footer />
        </body>
    )
}

App.propTypes = {
    children: PropTypes.node
}

export default App
