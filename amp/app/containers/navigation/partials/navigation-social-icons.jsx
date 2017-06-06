import React from 'react'
// import {getAssetUrl} from 'progressive-web-sdk/dist/asset-utils'
import AmpImage from 'mobify-amp-sdk/dist/components/amp-image'

const social = [
    ['http://www.facebook.com/#TODO', '../../../../static/facebook.svg', 'Facebook'],
    ['http://www.twitter.com/#TODO', '../../../../static/svg/twitter.svg', 'Twitter'],
    ['http://plus.google.com/#TODO', '../../../../static/svg/googleplus.svg', 'Google+'],
    ['http://www.youtube.com/#TODO', '../../../../static/svg/youtube.svg', 'Youtube'],
]

const NavigationSocialIcons = () => {
    return (
        <div className="t-navigation__social">
            <div className="u-flexbox u-justify-center">
                {social.map(([url, icon, title]) =>
                    <a href={url} className="t-navigation__social-link" key={url}>
                        <AmpImage
                            src={icon}
                            alt={title}
                            height="32"
                            width="32"
                            layout="fixed"
                        />
                    </a>
                )}
            </div>
        </div>
    )
}

export default NavigationSocialIcons
