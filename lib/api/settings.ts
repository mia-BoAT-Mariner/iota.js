/* tslint:disable no-console */
import { CurlFunction } from './types'

let provider: string

export interface Settings {
    provider: string
    curl?: CurlFunction
    host?: string // deprecated
    port?: string // deprecated
    sandbox?: string // deprecated
    token?: string // deprecated
}

const defaults: Settings = {
    provider: 'http://localhost:14265',
}

export const getSettings = (): Settings => ({ provider })

export const setSettings = (settings: Partial<Settings>) => {
    if (settings.sandbox || settings.token) {
        console.warn(
            'Sandbox has been removed in favor of a more generic remote curl machine, a.k.a. powbox. See NPM package @iota/curl-remote for details.'
        )
    }

    // Check for deprecated settings
    if (settings.host) {
        console.warn(
            'Setting `host` and `port` is deprecated, please use the `provider` option instead. This option will be removed in the next version.'
        )

        const host = settings.host || 'http://localhost'
        const port = settings.port || '14265'

        provider = [host, port].join('/').replace('//', '/')
        return
    }

    if (settings.provider) {
        provider = settings.provider
        return
    }

    provider = defaults.provider
}