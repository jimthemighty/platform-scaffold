```js
// JS import
import Link from '../components/link'

// SCSS import
@import '../components/link/base';
```

## Example Usage

*With child text*

    <Link href="http://mobify.com/">Mobify</Link>

*With child elements*

    <Link href="http://mobify.com/">
        <i>MOBIFY!</i>
    </Link>

*With prop text*

    <Link href="http://google.com/" text="Go to Google" />

*With no href*

    <Link text="No URL provided" />
