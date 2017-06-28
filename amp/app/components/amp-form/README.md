```js
// JS import
import AmpForm from 'mobify-amp-sdk/dist/components/dangerous-html'
```


## Example Usage

    <AmpForm method="POST" action-xhr="https://www.merlinspotions.com/newsletter/subscriber/new/" target="_top">
        <FieldRow>
            <Field>
                <input
                    type="email"
                    placeholder="Enter your email..."
                    name="email"
                />
            </Field>

            <Button
                type="submit"
                className="a--tertiary u-margin-0 u-text-uppercase"
                disabled={submitting || disabled}>
                Submit
            </Button>
        </FieldRow>
    </AmpForm>
