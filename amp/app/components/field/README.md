```js
// JS import
import AmpForm from 'mobify-amp-sdk/dist/components/amp-form';
import FieldRown from 'mobify-amp-sdk/dist/components/field-row';
import Field from 'mobify-amp-sdk/dist/components/field';

// SCSS import
@import 'node_modules/mobify-amp-sdk/dist/components/field/base';
```


## Example Usage

### Basic

    <AmpForm>
        <FieldRow>
            <Field
                label="Email"
                idForLabel="email" >

                <input type="email" name="email" required />

            </Field>
        </FieldRow>
    </AmpForm>


### With optional attributes

    <AmpForm>
        <FieldRow>
            <Field
                label="Email"
                idForLabel="email"
                hint="Won't be displayed to other users"
                caption="Must be an @mobify.com email address"
            >

                <input type="email" name="email" placeholder="Placeholder text" required />

            </Field>
        </FieldRow>
    </AmpForm>


### Disabled field styles

    <AmpForm>
        <FieldRow>
            <Field
                label="Email"
                idForLabel="email"
                hint="Won't be displayed to other users"
                caption="Must be an @mobify.com email address"
            >
                <input type="email" name="email" disabled required />
            </Field>
        </FieldRow>

        <FieldRow>
            <Field label="Sign up to the newsletter?">
                <input type="checkbox" disabled />
            </Field>
        </FieldRow>

        <FieldRow>
            <Field label="Sign up to the newsletter?">
                <input checked type="checkbox" disabled />
            </Field>
        </FieldRow>

        <FieldRow>
            <Field label="Sign up to the newsletter?">
                <input type="radio" disabled />
            </Field>
        </FieldRow>

        <FieldRow>
            <Field label="Sign up to the newsletter?">
                <input checked type="radio" disabled />
            </Field>
        </FieldRow>
    </AmpForm>


### With validation errors

    <AmpForm>
        <FieldRow>
            <Field
                label="Email"
                idForLabel="email"
                error="This is an invalid email address"
            >

                <input type="email" name="email" value="not-an-email-address" required onChange={()=>{}} />

            </Field>
        </FieldRow>
    </AmpForm>

## Redux Select Example
    <AmpForm>
        <FieldRow>
            <Field>
                <select disabled>
                    <option>1</option>
                    <option>2</option>
                </select>
            </Field>
        </FieldRow>
    </AmpForm>
