/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
import {buildSearchURL} from '../config'

export const parseSearchSuggestions = ({suggestions}) => {
    let searchSuggestions = null

    if (suggestions.length) {
        searchSuggestions = suggestions.map((data) => {
            const searchTerm = data.value
            return {
                href: buildSearchURL(searchTerm),
                children: searchTerm,
                endAction: ''
            }
        })
    }

    return searchSuggestions
}
