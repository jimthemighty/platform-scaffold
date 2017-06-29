```js
// JS import
import {Accordion, AccordionItem} from 'mobify-amp-sdk/dist/components/accordion'

// SCSS import
@import 'node_modules/mobify-amp-sdk/dist/components/accordion/base';
```


## Example Usage

    <Accordion>
        <AccordionItem header="Accordion Item #1">
            <div>
                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
            </div>
        </AccordionItem>
        <AccordionItem header="Accordion Item #2">
            <div className="u-margin-bottom-lg">Lorem Ipsum dolor sit amet</div>
            <Accordion>
                <AccordionItem header="Accordion Nested Item #1" closeIconName="x">
                    Lorem Ipsum
                </AccordionItem>
                <AccordionItem header="Accordion Nested Item #2" closeIconName="x">
                    Lorem Ipsum
                </AccordionItem>
            </Accordion>
        </AccordionItem>
    </Accordion>

## Using different icons

    <Accordion>
        <AccordionItem
            header="Accordion Item #1"
            openIconName="caret-bottom"

            closeIconName="caret-top"
            iconPosition="end"
        >
            <div>
                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
            </div>
        </AccordionItem>
        <AccordionItem
            header="Accordion Item #2"
            openIconName="caret-bottom"

            closeIconName="caret-top"
            iconPosition="end"
        >
            <div>
                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
            </div>
        </AccordionItem>
    </Accordion>
