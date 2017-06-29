```js
// JS import
import ListTile from 'mobify-amp-sdk/dist/components/list-tile'

// SCSS import
@import 'node_modules/mobify-amp-sdk/dist/components/list-tile/base';
```


## Example Usage

    <ListTile>
        This is a ListTile component
    </ListTile>


## Actions

ListTile components can have a `startAction` and/or an `endAction` prop passed to it.

    <div>
        <ListTile startAction={
            <Icon name="cart" />
        }>
            <div>ListItem with <code>startAction</code> only</div>
        </ListTile>

        <ListTile endAction={
            <Button className="a--blank" icon="lock" />
        }>
            <div>ListItem with <code>endAction</code> only</div>
        </ListTile>

        <ListTile startAction={
            <Button className="a--blank" icon="user" />
        } endAction={
            <Button className="a--blank" icon="chevron-right" />
        }>
            <div>ListItem with  <code>startAction</code> and <code>endAction</code></div>
        </ListTile>
    </div>


## `href`

    <div>
        <ListTile href="http://www.mobify.com">
            <div>ListTile with an <code>href</code> prop. Notice the change in background color!</div>
        </ListTile>

        <ListTile href="http://www.mobify.com" startAction={
            <Icon name="basket" />
        } endAction={
            <Button className="a--blank" icon="star" />
        }>
            <div>
                Notice secondary action is included in the anchor. If you wish to change this behaviour,
                see the example below.
            </div>
        </ListTile>

        <ListTile startAction={
            <Button className="a--blank u-link-color" href="http://www.mobify.com" icon="chevron-left" />
        } endAction={
            <Button className="a--blank u-link-color" href="http://www.mobify.com" icon="chevron-right" />
        }>
            Of course, elements inside can be their own anchors.
        </ListTile>
    </div>


## `includeEndActionInPrimary`

The `endAction` by default is wrapped by the `a-list-tile__primary` wrapper. We've chosen this behaviour as in most cases, clicking on the ListTile and on the endAction should have the same effect. This can be altered by applying `includeEndActionInPrimary={false}`.

    <ListTile includeEndActionInPrimary={false} href="http://www.mobify.com" endAction={
        <Button className="a--blank" icon="chevron-right" />
    }>
        <div>ListTile with the <code>endAction</code> outside of the primary container</div>
    </ListTile>
