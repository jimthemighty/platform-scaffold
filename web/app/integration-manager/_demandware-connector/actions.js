import {createAction} from 'progressive-web-sdk/dist/utils/action-creation'

// Add other actions here that are specific to this connector.
// Actions that are returned out of the connector and reduced
// by the app should go into ./results.js

// Example.
export const exampleAction = createAction('Some Demandware-specific action')
