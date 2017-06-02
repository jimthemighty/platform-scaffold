```js
// JS import
import Sheet from 'mobify-amp-sdk/dist/components/sheet'

// SCSS import
@import 'node_modules/mobify-amp-sdk/dist/components/sheet/base';
```


## Example Usage

    @TODO ADD GENERAL EXAMPLE


## `side`

The `side` prop defines which side the sheet will open and close. The different options behave as follows:

| Value | Description |
| ----- | ----------- |
| `right` | Slides into view from the right side of the screen |
| `left` | Slides into view from the left side of the screen  |

    initialState = {
        side: 'right'
    };

    @TODO ADD EXAMPLE


## `shrinkToContent`

Passing the `shrinkToContent` prop will make the modal shrink to the size of its content. This is commonly used for modals that are very brief, such as a "Thank You!" message after submitting a form.

    @TODO ADD EXAMPLE
