/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import * as commands from './commands'
import * as reducer from './reducer'
import merge from 'lodash.merge'

let registeredConnector = {}

export const registerConnector = (connector) => {
    registeredConnector = connector
    commands.register(connector.commands)
    reducer.register(connector.reducer)
}

export const registerConnectorExtension = (extension) => {
    registeredConnector.commands = merge(
        registeredConnector.commands,
        {
            ...extension.commandOverrides,
            custom: extension.commands
        }
    )

    commands.registerCustom(registeredConnector.commands.custom)
}

// this isn't necessary, just useful
export {commands, reducer}
