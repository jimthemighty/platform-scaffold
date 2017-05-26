import Page from '../../components/page/'
import {connect} from 'react-redux'
import containerStyles from './container.scss'

const containerClass = 't-plp'

const mapStateToProps = (state) => ({
    links: state.links,
    title: `PLP! - ${state.title}` || '',
    className: containerClass
})


const mapDispatchToProps = {}


export const PLP = connect(
    mapStateToProps,
    mapDispatchToProps
)(Page)


export const styles = containerStyles.toString()
