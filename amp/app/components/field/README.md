```js
// JS import
import Form from 'mobify-amp-sdk/dist/components/form';
import FieldRown from 'mobify-amp-sdk/dist/components/field-row';
import Field from 'mobify-amp-sdk/dist/components/field';

// SCSS import
@import 'node_modules/mobify-amp-sdk/dist/components/field/base';
```


## Example Usage

### Basic

    <Form>
        <FieldRow>
            <Field
                label="Email"
                idForLabel="email" >

                <input type="email" name="email" required />

            </Field>
        </FieldRow>
    </Form>


### With optional attributes

    <Form>
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
    </Form>


### Disabled field styles

    <Form>
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
    </Form>


### With validation errors

    <Form>
        <FieldRow>
            <Field
                label="Email"
                idForLabel="email"
                error="This is an invalid email address"
            >

                <input type="email" name="email" value="not-an-email-address" required onChange={()=>{}} />

            </Field>
        </FieldRow>
    </Form>

## Redux Select Example
    <Form>
        <FieldRow>
            <Field>
                <select disabled>
                    <option>1</option>
                    <option>2</option>
                </select>
            </Field>
        </FieldRow>
    </Form>
