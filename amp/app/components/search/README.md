```js
// JS, importing the SDK component
import Search from 'mobify-amp-sdk/dist/components/search'
```


## Example Usage (Inline)

    <Search
        submitButtonProps={
            {
                className: 'a--icon-only a--secondary',
                text: 'submit'
            }
        }
    />

## Example With `isOverlay`

    <div>
        <Search
            isOverlay
            lightboxId='lightbox-id'
            closeButtonProps={{
                className: 'a--icon-only a--secondary',
                text: 'close'
            }}
        />
        <button on="tap:lightbox-id">Open Search Overlay</button>
    </div>
