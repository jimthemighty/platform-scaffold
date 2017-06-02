```js
// JS import
import DangerousHTML from 'mobify-amp-sdk/dist/components/dangerous-html'
```


## Example Usage

    <DangerousHTML html="<strong>A string of<br />HTML</strong>">
        {(htmlObj) => <div dangerouslySetInnerHTML={htmlObj} />}
    </DangerousHTML>
