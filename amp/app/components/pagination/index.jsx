/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import classNames from 'classnames'
import {ampComponent} from 'mobify-amp-sdk/dist/amp-sdk'

// Components
import Button from 'mobify-amp-sdk/dist/components/button' // change to '../button' when move to SDK
import Icon from 'mobify-amp-sdk/dist/components/icon' // change to '../icon' when move to SDK

const Ellipsis = () => (
    <div className="a-pagination__ellipsis">...</div>
)

/**
 * Pagination is a way of breaking down large listings into smaller,
 * more digestible chunks and allowing the user to step through them in sequential
 * (or random) order.
 */
class Pagination extends React.Component {

    renderPageButton(i) {
        const pageClasses = classNames('a-pagination__page', {
            'a--active': i === this.props.currentPage
        })

        return (
            <Button
                key={i}
                className={pageClasses}
            >
                {this.props.getPageButtonMessage(i)}
            </Button>
        )
    }

    renderPageButtons(lower, upper) {
        const list = []
        for (let i = lower; i <= upper; i++) {
            list.push(this.renderPageButton(i))
        }
        return list
    }

    buildSelectOptions(pageCount) {
        return new Array(pageCount)
            .fill(undefined)
            .map((val, index) => {
                const newIndex = ++index
                const value = newIndex.toString()
                return (
                    <option value={value} key={index}>
                        {this.props.currentPage === index ?
                            this.props.getCurrentPageMessage(value, pageCount)
                        :
                            this.props.getSelectOptionMessage(value, pageCount)
                        }
                    </option>
                )
            })
    }

    render() {
        const {
            className,
            pageCount,
            pagesToShow,
            currentPage,
            firstButton,
            prevButton,
            nextButton,
            lastButton,
            isSelect,
            showPageButtons,
            showCurrentPageMessage,
            getCurrentPageMessage,
            selectIcon
        } = this.props

        let {
            pagesToShowAtEnd,
            pagesToShowAtStart
        } = this.props

        const classes = classNames('a-pagination', {
            'a--select-pagination': isSelect
        }, className)

        const visiblePages = Math.min(pagesToShow || pageCount, pageCount)
        let centerChunkLength = visiblePages - pagesToShowAtStart - pagesToShowAtEnd

        // if visible pages is equal to pagesToShowAtEnd and pagesToShowAtStart combined
        // show subset of pages without start and end
        if (visiblePages === (pagesToShowAtStart + pagesToShowAtEnd)) {
            pagesToShowAtStart = 0
            pagesToShowAtEnd = 0
            centerChunkLength = visiblePages
        }

        // Pages are 1 indexed
        let pageBeforeEnd = pageCount - pagesToShowAtEnd

        // Offset the center chunk from the start and end
        let centerChunkStart = 1 + pagesToShowAtStart
        let centerChunkEnd = Math.min(centerChunkStart + centerChunkLength - 1, pageBeforeEnd)

        // If the current page isn't visible in the center,
        // shift the center so that it is
        // Also show the value following the current page
        if (currentPage >= centerChunkEnd && centerChunkStart !== centerChunkEnd) {
            centerChunkEnd = Math.min(currentPage + 1, pageBeforeEnd)
            centerChunkStart = centerChunkEnd - centerChunkLength + 1
        } else if (currentPage > centerChunkEnd && centerChunkStart === centerChunkEnd) {
            // do not shift the center when there is 1 page in the chunk
            centerChunkStart = Math.min(currentPage, pageBeforeEnd)
            centerChunkEnd = centerChunkStart
        }

        if (pageCount < pagesToShow || centerChunkLength < 0) {
            if (centerChunkLength < 0) {
                console.error('The pagesToShow prop must be >= pagesToShowAtStart + pagesToShowAtEnd. Ignoring pagesToShowAtStart and pagesToShowAtEnd.')
            }
            pagesToShowAtStart = 0
            pagesToShowAtEnd = 0
            centerChunkStart = 1
            centerChunkEnd = pageCount
            pageBeforeEnd = pageCount
        }

        const atStart = currentPage === 1
        const atEnd = currentPage === pageCount

        return (
            <nav role="navigation" className={classes}>
                {firstButton &&
                    <Button
                        className="a-pagination__button"
                        disabled={atStart}
                        {...firstButton.props}
                    >{firstButton.text}</Button>
                }

                {prevButton &&
                    <Button
                        className="a-pagination__button"
                        disabled={atStart}
                        {...prevButton.props}
                    >{prevButton.text}</Button>
                }

                <div className="a-pagination__content">
                    {showPageButtons &&
                        <div className="a-pagination__pages">
                            {this.renderPageButtons(1, pagesToShowAtStart)}
                            {(pagesToShowAtStart && centerChunkStart > pagesToShowAtStart + 1) ? <Ellipsis key="firstEllipsis" /> : false}
                            {this.renderPageButtons(centerChunkStart, centerChunkEnd)}
                            {(pagesToShowAtEnd && centerChunkEnd < pageBeforeEnd) ? <Ellipsis key="secondEllipsis" /> : false}
                            {this.renderPageButtons(pageBeforeEnd + 1, pageCount)}
                        </div>
                    }

                    {isSelect &&
                        <div className="a-pagination__select-wrapper">
                            <select
                                className="a-pagination__select"
                                value={currentPage}
                            >
                                {this.buildSelectOptions(pageCount)}
                            </select>

                            <div className="a-pagination__select-icon">
                                <Icon name={selectIcon || 'caret-down'} />
                            </div>
                        </div>
                    }

                    {showCurrentPageMessage &&
                        <span className="a-pagination__page-count">{getCurrentPageMessage(currentPage, pageCount)}</span>
                    }
                </div>

                {nextButton &&
                    <Button
                        className="a-pagination__button"
                        disabled={atEnd}
                        {...nextButton.props}
                    >{nextButton.text}</Button>
                }
                {lastButton &&
                    <Button
                        className="a-pagination__button"
                        disabled={atEnd}
                        {...lastButton.props}
                    >{lastButton.text}</Button>
                }
            </nav>
        )
    }
}

const defaultGetCurrentPageMessage = (current, total) => (
    `Page ${current} of ${total}`
)

const defaultGetPageButtonMessage = (pageNumber) => (
    <span><span className="a-pagination__hidden-label">Page </span>{pageNumber}</span>
)

const defaultSelectOptionMessage = (current, total) => (
    `Page ${current} of ${total}`
)

Pagination.defaultProps = {
    getCurrentPageMessage: defaultGetCurrentPageMessage,
    getPageButtonMessage: defaultGetPageButtonMessage,
    getSelectOptionMessage: defaultSelectOptionMessage,
    nextButton: {
        text: 'Next'
    },
    prevButton: {
        text: 'Prev'
    },
    pagesToShowAtStart: 0,
    pagesToShowAtEnd: 0,
    showPageButtons: true,
    showCurrentPageMessage: true
}


Pagination.propTypes = {
    /**
     * The current page number.
     */
    currentPage: PropTypes.number.isRequired,

    /**
     * The number of pages shown in pagination.
     */
    pageCount: PropTypes.number.isRequired,

    /**
     * Adds values to the `class` attribute of the root element.
     */
    className: PropTypes.string,

    /**
     * The properties for First Button (It's used to go to the very first page).
     */
    firstButton: PropTypes.shape({
        text: PropTypes.string,
        props: PropTypes.object
    }),

    /**
     * This function should return a string (or node) that describes the user's current location in the pagination.
     * It will be passed the current page and total number of pages.
     */
    getCurrentPageMessage: PropTypes.func,

    /**
     * This function should return a string (or node) to be used for the page buttons.
     * It will be passed the button's page number.
     */
    getPageButtonMessage: PropTypes.func,

    /**
     * This function should return a string for the select option of pagination.
     * It will be passed the current page and total number of pages.
     */
    getSelectOptionMessage: PropTypes.func,

    /**
     * Defines if pagination is a select pagination.
     */
    isSelect: PropTypes.bool,

    /**
     * The properties for Last Button (It's used to go to the very last page).
     */
    lastButton: PropTypes.shape({
        text: PropTypes.string,
        props: PropTypes.object
    }),

    /**
     * The properties for Next Button (It's used to go to the next page).
     */
    nextButton: PropTypes.shape({
        text: PropTypes.string,
        props: PropTypes.object
    }),

    /**
     * The total number of pages to show.
     * If you provide pagesToShowAtStart or pagesToShowAtEnd, they will be subtracted from this number.
     */
    pagesToShow: PropTypes.number,

    /**
     * The number of pages to always show at the end of the pagination.
     */
    pagesToShowAtEnd: PropTypes.number,

    /**
     * The number of pages to always show at the start of the pagination.
     */
    pagesToShowAtStart: PropTypes.number,

    /**
     * The properties for Previous Button (It's used to go to the previous page).
     */
    prevButton: PropTypes.shape({
        text: PropTypes.string,
        props: PropTypes.object
    }),

    /**
     * Name of SVG icon for select drop down.
     */
    selectIcon: PropTypes.string,

    /**
     * If false, the current page message will not be shown.
     */
    showCurrentPageMessage: PropTypes.bool,

    /**
     * If false, the page buttons(numbers) will not be shown.
     */
    showPageButtons: PropTypes.bool
}

export default ampComponent(Pagination)
