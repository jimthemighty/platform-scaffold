```js
// JS, importing the SDK component
import Search from 'mobify-amp-sdk/dist/components/search'
```


## Example Usage (Inline)

    <Search
        onClickSuggestion={() => console.log('suggestion is clicked')}
        onSubmit={() => {console.log('submitted')}}
        onClose={() => {setState({
            termSuggestions: null,
            productSuggestions: null
        })}}
        onClear={() => {setState({
            termSuggestions: null,
            productSuggestions: null
        })}}
        onChange={() => {setState({
            termSuggestions: [
                {
                    href: '#',
                    children: 'test'
                },
                {
                    children: 'search'
                }
            ],
            productSuggestions: [
                {
                    isSimple: true,
                    imageProps: {
                        src: "https://librestock.com/media/thumbs/cat-984367_640.jpg",
                        width: "88px",
                        height: "88px",
                        alt: "cat"
                    },
                    title: "Product Title",
                    price: "$2000",
                    onClick: () => {console.log('clicked')}
                },
                {
                    isSimple: true,
                    imageProps: {
                        src: "https://librestock.com/media/thumbs/cat-984367_640.jpg",
                        width: "88px",
                        height: "88px",
                        alt: "cat"
                    },
                    href: '#',
                    price: "$2000",
                    title: "Product Title2"
                },
            ]

        })}}
        submitButtonProps={
            {
                className: 'a--icon-only a--secondary',
                text: 'submit'
            }
        }
        termSuggestions={state.termSuggestions}
        productSuggestions={state.productSuggestions}
    />

## Example With `isOverlay`

    initialState = {
        isOpen: false
    };

    <div>
        <Search
            onClickSuggestion={() => console.log('suggestion2 is clicked')}
            isOverlay
            isOpen={state.isOpen}
            onClose={() => {setState({
                isOpen: false,
                termSuggestions: null,
                productSuggestions: null
            })}}
            onClear={() => {setState({
                termSuggestions: null,
                productSuggestions: null
            })}}
            onSubmit={() => {console.log('submitted-2')}}
            onChange={() => {setState({
                termSuggestions: [
                    {
                        href: '#',
                        children: 'test'
                    },
                    {
                        children: 'search'
                    }
                ],
                productSuggestions: [
                    {
                        isSimple: true,
                        imageProps: {
                            src: "https://librestock.com/media/thumbs/cat-984367_640.jpg",
                            width: "88px",
                            height: "88px",
                            alt: "cat"
                        },
                        title: "Product Title",
                        price: "$2000",
                        onClick: () => {console.log('clicked')}
                    },
                    {
                        isSimple: true,
                        imageProps: {
                            src: "https://librestock.com/media/thumbs/cat-984367_640.jpg",
                            width: "88px",
                            height: "88px",
                            alt: "cat"
                        },
                        href: '#',
                        price: "$2000",
                        title: "Product Title2"
                    },
                ]
            })}}
            closeButtonProps={
                {
                    className: 'a--icon-only a--secondary',
                    text: 'close'
                }
            }
            termSuggestions={state.termSuggestions}
            productSuggestions={state.productSuggestions}
        />
        <button onClick={() => setState({isOpen: true})}>open search overlay</button>
    </div>
