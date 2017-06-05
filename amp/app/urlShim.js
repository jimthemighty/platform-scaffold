import url from 'url'

class URLPolyfill {
    constructor(uri) {
        this.stuff = url.parse(uri)
    }
}

export default URLPolyfill
