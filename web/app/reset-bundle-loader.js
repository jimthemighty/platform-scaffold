/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
import {shouldPreview, loadPreview} from 'progressive-web-sdk/dist/utils/preview-utils'
// shouldPreview() returns true if the appropriate cookie is set to
// enable preview, and we're not already running in preview.
if (shouldPreview()) {
    // If preview is required, this will load the preview script.
    loadPreview()
}
