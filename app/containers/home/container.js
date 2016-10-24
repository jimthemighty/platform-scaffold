import React, {PropTypes} from 'react'
import {connect} from 'react-redux'

import Carousel from 'progressive-web-sdk/dist/components/carousel'
import CarouselItem from 'progressive-web-sdk/dist/components/carousel/carousel-item'
import {Icon} from 'progressive-web-sdk/dist/components/icon'
import Image from 'progressive-web-sdk/dist/components/image'
import ListTile from 'progressive-web-sdk/dist/components/list-tile'
import SkeletonBlock from 'progressive-web-sdk/dist/components/skeleton-block'
import SkeletonText from 'progressive-web-sdk/dist/components/skeleton-text'

import {getAssetUrl} from 'progressive-web-sdk/dist/asset-utils'

const Home = ({banners, categories}) => {
    return (
        <div className="container">
            {banners.length > 1 &&
                <Carousel allowLooping={true}>
                    {banners.map(({src, href, alt}, key) => { // TODO: fix this when we put mobile assets on desktop
                        return (
                            <CarouselItem href={href} key={key}>
                                <Image
                                    src={getAssetUrl(`static/img/homepage_carousel/${key}.png`)}
                                    alt={alt}
                                    hidePlaceholder={true}
                                    loadingIndicator={<SkeletonBlock height="84vw" />}
                                />
                            </CarouselItem>
                        )
                    })}
                </Carousel>
            }
            {banners.length === 0 &&
                // The ratio of the banner image width:height is 1:.84.
                // Since the banner will be width=100%, we can use 84vw to predict the banner height.
                <SkeletonBlock height="84vw" />
            }
            <div className="c-card u-margin-all">
                {categories.length > 1 && categories.map(({href, text}, key) => {
                    const image = (<Image
                        src={getAssetUrl(`static/img/categories/${text.trim().toLowerCase()}.png`)}
                        alt={text}
                        height="60px"
                        width="60px"
                        className="u-margin-end-lg"
                    />)
                    const icon = (<Icon
                        name="chevron-right"
                        style={{height: '3vh', width: '3vh'}}
                        className="u-color-brand"
                    />)
                    return (
                        <ListTile
                            className="c-card__section u-padding-lg"
                            href={href}
                            startAction={image}
                            endAction={icon}
                            includeEndActionInPrimary={true}
                            key={key}
                        >
                            <div className="c-card__text u-text-light u-text-all-caps">SHOP</div>
                            <div className="c-card__text u-text-lg u-text-all-caps">{text}</div>
                        </ListTile>
                    )
                })}

                {categories.length === 0 &&
                    [0, 1, 2, 3].map((idx) => {
                        return (
                            <ListTile
                                className="c-card__section u-padding-lg"
                                startAction={<SkeletonBlock height="60px" width="60px" className="u-margin-end-lg" />}
                                key={idx}
                            >
                                <SkeletonText className="c-card__text" lines={2} />
                            </ListTile>
                        )
                    })
                }
            </div>
        </div>
    )
}

Home.propTypes = {
    banners: PropTypes.array.isRequired,
    categories: PropTypes.array.isRequired
}

const mapStateToProps = (state) => {
    return {
        ...state.home.toJS()
    }
}

export default connect(
    mapStateToProps
)(Home)
