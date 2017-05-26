import Page from '../../components/page/'
import {connect} from 'react-redux'
import containerStyles from './container.scss'

const containerClass = 't-pdp'

const mapStateToProps = (state) => ({
    links: state.links,
    title: `PDP! - ${state.title}` || '',
    className: containerClass
})


const mapDispatchToProps = {}


export const PDP = connect(
    mapStateToProps,
    mapDispatchToProps
)(Page)


export const styles = containerStyles.toString()
