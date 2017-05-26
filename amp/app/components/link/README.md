```js
// JS import
import Link from 'progressive-web-sdk/dist/components/link'

// SCSS import
@import 'node_modules/progressive-web-sdk/dist/components/link/link';
```


If the SDK `Router` component is used, the list of routes is
automatically used to make decisions in the Link component.


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

*With an onClick handler*

    <Link text="Click me!" onClick={(e) => {
        alert('Clicked'), e.preventDefault()
    }} />
