import axios from "axios";

export class HttpError extends Error {
    constructor(
        public readonly status: string,
        public readonly statusText: string,
        public readonly data: any
    ) {
        super(`[HttpError] - Status: ${status}, StatusText: "${statusText}", data: ${data}`)
    }
}
export type HttpResult<T> = {
    status: number;
    data: T
}
export type HttpRequest = {
    url: string,
    method: "GET" | "POST" | "DELETE",
    data?: any,
    headers?: { [key: string]: string }
}

export default class NetworkController {
    async request<T>({ url, method, data, headers }: HttpRequest): Promise<HttpResult<T>> {
        try {
            const result = await axios({
                url,
                method,
                data,
                headers
            })
            return { status: result.status, data: result.data };
        } catch (error) {
            const { status, statusText, data } = error.response
            throw new HttpError(status, statusText, data)
        }
    }
}