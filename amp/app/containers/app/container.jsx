import React, {PropTypes} from 'react'
import Header from '../header/container'
import Footer from '../footer/container'
import DangerousHTML from '../../components/dangerous-html'

import sprite from '../../static/svg/sprite-dist/sprite.svg'

const App = ({
    children
}) => (
    <div
        id="app"
        className="t-app"
    >
        <DangerousHTML html={sprite}>
            {(htmlObj) => <div hidden dangerouslySetInnerHTML={htmlObj} />}
        </DangerousHTML>

        <svg><use role="img" xlinkHref={`#pw-user`}/></svg>

        <Header />

        {children}

        <Footer />
    </div>
)

App.propTypes = {
    children: PropTypes.node
}

export default App
