let connector = {}

export const register = (commands) => {
    connector = commands
}

/**
 * Initializes the connector during app startup. This command dispatched
 * be called before any other integration manager commands are.
 */
export const initApp = () => connector.initApp()
