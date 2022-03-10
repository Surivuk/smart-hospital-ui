import Api from "../Api";
import NetworkController from "../NetworkController";

export type Alarm = {
    id: string,
    operator: string
    trigger: {
        key: string
        value: string
        operator: string
    },
    active: boolean
}

export default class AlarmRepository extends Api {
    constructor(private readonly _nwc: NetworkController) { super() }

    async alarms(): Promise<Alarm[]> {
        const result = await this._nwc.request<any>({
            url: this.url(`/alarming?doctorId=e931a246-e339-4bdf-8906-b18370293948`),
            method: "GET"
        });
        return result.data;
    }
}