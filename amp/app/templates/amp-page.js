const ampPage = ({title, canonicalURL, body, css, ampScriptIncludes, fontServe}) => (
    /*eslint-disable */
    `
    <!doctype html>
    <html amp lang="en" class="wf-active">
        <head>
            <!-- Standard AMP markup -->
            <meta charset="utf-8">
            <script async src="https://cdn.ampproject.org/v0.js"></script>
            <title>${title}</title>
            <link rel="canonical" href="${canonicalURL}" />

            <!-- Font Serve: Insert <link rel="styleshet" href="/path/to/font-serve"> in <head> tag. It will only work with Typography.com, Fonts.com, Google Fonts, or Font Awesome. For more information, please read: https://www.ampproject.org/docs/guides/responsive/custom_fonts. If you want to use custom font then please use <AmpFont> component. @TODO add/fix component name when we add it. -->
            ${fontServe}

            <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1, user-scalable=no">
            <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>

            <!-- AMP Component JS includes go here -->
            ${ampScriptIncludes}

            <!-- Page styles -->
            <style amp-custom>
                ${css}
            </style>
        </head>
        ${body}
    </html>
    `
    /*eslint-enable */
)


export default ampPage
