import React, {PropTypes} from 'react'
import Immutable from 'immutable'
import {connect} from 'react-redux'
import * as actions from './actions'

import FooterNewsletterSubscription from './partials/footer-newsletter-subscription'
import FooterSocialIcons from './partials/footer-social-icons'
import FooterNavigation from './partials/footer-navigation'

const social = [
    ['http://www.facebook.com/#TODO', 'static/img/facebook.svg', 'Facebook'],
    ['http://www.twitter.com/#TODO', 'static/img/twitter.svg', 'Twitter'],
    ['http://plus.google.com/#TODO', 'static/img/googleplus.svg', 'Google+'],
    ['http://www.youtube.com/#TODO', 'static/img/youtube.svg', 'Youtube'],
]

class Footer extends React.Component {
    constructor(props) {
        super(props)

        this.onSubmitNewsletter = this.onSubmitNewsletter.bind(this)
    }

    onSubmitNewsletter(data) {
        const method = this.props.footer.getIn(['newsletter', 'method'], '')
        const action = this.props.footer.getIn(['newsletter', 'action'], '')
        this.props.dispatch(actions.signUpToNewsletter(action, method, data))
    }

    shouldComponentUpdate(nextProps) {
        return !Immutable.is(this.props.footer, nextProps.footer)
    }

    render() {
        const {footer} = this.props
        const navigation = footer.get('navigation')
        const newsletter = footer.get('newsletter')


        return (
            <footer className="t-footer">
                <FooterNewsletterSubscription newsletter={newsletter} onSubmit={this.onSubmitNewsletter} />
                <FooterSocialIcons social={social} />
                <FooterNavigation navigation={navigation} />
            </footer>
        )
    }
}

Footer.propTypes = {
    /**
     * Redux dispatch function
     */
    dispatch: PropTypes.func,
    /**
     * Slice into the global app state
     */
    footer: PropTypes.object
}


const mapStateToProps = (state) => {
    return {
        footer: state.footer,
    }
}

const mapDispatchToProps = (dispatch) => {

}


export default connect(
    mapStateToProps
)(Footer)
