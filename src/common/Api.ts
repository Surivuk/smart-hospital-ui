export default abstract class Api {
    private readonly _baseUrl: string = process.env.REACT_APP_API_URL as string
    protected url(url: string) {
        return `${this._baseUrl}${url}`
    }
}