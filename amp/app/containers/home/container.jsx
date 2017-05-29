import Page from '../../components/page/'
import {connect} from 'react-redux'
import containerStyles from './container.scss'

const containerClass = 't-home'

const mapStateToProps = (state) => ({
    links: state.links,
    title: `Home! - ${state.title}` || '',
    className: containerClass
})


const mapDispatchToProps = {}


export const Home = connect(
    mapStateToProps,
    mapDispatchToProps
)(Page)


export const styles = containerStyles.toString()
