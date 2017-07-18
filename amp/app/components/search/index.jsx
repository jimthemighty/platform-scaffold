/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import classNames from 'classnames'
import {ampComponent} from 'mobify-amp-sdk/dist/amp-sdk'

// Components
import Button from 'mobify-amp-sdk/dist/components/button' // change to '../button' when move to SDK
import Icon from 'mobify-amp-sdk/dist/components/icon' // change to '../icon' when move to SDK
import Form from 'mobify-amp-sdk/dist/components/form' // change to '../form' when move to SDK
import Lightbox from '../lightbox/index'

const searchId = (() => {
    let i = 0
    return () => {
        return i++
    }
})()

/**
 * `Search` component that includes two variants: inline and overlay.
 * This component is commonly used in the header.
 */

class Search extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            searchValue: '',
            id: `search-${searchId()}`
        }
    }

    render() {
        const {
            accessibleLabel,
            className,
            inputProps,
            isOverlay,
            searchIcon,
            submitButtonProps,
            closeButtonProps,
            formProps,
            lightboxId
        } = this.props

        const {
            searchValue,
            id
        } = this.state

        const classes = classNames('a-search', className)

        const SearchForm = () => {
            return (
                <div className="a-search__inner">
                    <Form
                        className="a-search__form"
                        {...formProps}
                    >
                        <div className="a-search__bar">
                            <div className="a-search__icon">
                                <Icon className="a-search__icon-content" name={searchIcon} />
                            </div>

                            <div className="a-search__field">
                                <label
                                    htmlFor={id}
                                    className="u-visually-hidden"
                                >
                                    {accessibleLabel}
                                </label>

                                <input className="a-search__input"
                                    ref={(el) => { this.input = el }}
                                    id={id}
                                    value={searchValue}
                                    type="search"
                                    name="query"
                                    {...inputProps}
                                />
                            </div>

                            <div className="a-search__button-submit">
                                <Button
                                    type="submit"
                                    {...submitButtonProps}
                                />
                            </div>

                            {isOverlay &&
                                <div className="a-search__button-close">
                                    <Button
                                        {...closeButtonProps}
                                    />
                                </div>
                            }
                        </div>
                    </Form>
                </div>
            )
        }

        return (
            <div className={classes} role="search">
                {isOverlay ?
                    <Lightbox id={lightboxId}>
                        <SearchForm />
                    </Lightbox>
                :
                    <SearchForm />
                }
            </div>
        )
    }
}

Search.defaultProps = {
    accessibleLabel: 'Search',
    submitButtonProps: {
        text: 'Submit search'
    },
    closeButtonProps: {
        text: 'Close search'
    },
    searchIcon: 'search'
}


Search.propTypes = {
    /**
     * Adds text as a label for the search input, accessible
     * to screen readers, but hidden to visual users.
     */
    accessibleLabel: PropTypes.string,

    /**
     * Adds values to the `class` attribute of the root element.
     */
    className: PropTypes.string,

    /**
     * The properties for close button.
     */
    closeButtonProps: PropTypes.object,

    /**
     * The properties for form.
     */
    formProps: PropTypes.object,

    /**
     * The data for the input you wish to render.
     */
    inputProps: PropTypes.object,

    /**
     * Controls whether the search component uses an overlay layout or not.
     */
    isOverlay: PropTypes.bool,

    /**
     * A unique identifer for the lightbox.
     */
    lightboxId: PropTypes.string,

    /**
     * Icon name for search.
     */
    searchIcon: PropTypes.string,

    /**
     * The properties for submit button.
     */
    submitButtonProps: PropTypes.object
}

export default ampComponent(Search)
