```js
// JS import
import Form from 'mobify-amp-sdk/dist/components/form'
import FieldRow from 'mobify-amp-sdk/dist/components/field-row'

// SCSS import
@import 'node_modules/mobify-amp-sdk/dist/components/field-row/base';
```


## Example Usage

    <Form>
        <FieldRow>
            <Field label="Credit Card Number">
                <input type="number" name="cc-number"/>
            </Field>
        </FieldRow>
        <FieldRow>
            <Field label="Expiration Date">
                <input type="text" name="exp-date" />
            </Field>
            <Field label="CVV">
                <input type="number" name="cvv" maxLength={3} />
            </Field>
        </FieldRow>
    </Form>
