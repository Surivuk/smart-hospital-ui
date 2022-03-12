import NetworkController from "./NetworkController"

export default abstract class Api {
    private readonly _baseUrl: string
    constructor(env: any, protected readonly _nwc: NetworkController) {
        this._baseUrl = env.REACT_APP_API_URL
    }

    protected url(url: string) {
        return `${this._baseUrl}${url}`
    }
}