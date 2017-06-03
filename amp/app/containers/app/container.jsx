import React, {PropTypes} from 'react'
import Header from '../header/container'
import Footer from '../footer/container'

const App = ({
    children
}) => (
    <div
        id="app"
        className="t-app"
    >
        <Header />

        {children}

        <Footer />
    </div>
)

App.propTypes = {
    children: PropTypes.node
}

export default App
