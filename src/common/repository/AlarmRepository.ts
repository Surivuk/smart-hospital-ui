import Api from "../Api";
import NetworkController from "../NetworkController";

export type Alarm = {
    id: string,
    hospitalTreatment: string
    name: string
    trigger: {
        key: string
        value: string
        operator: string
    },
    active: boolean
}
export type AlarmNotification = {
    alarm: string
    dataType: string
    dataValue: string
    createdAt: string
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
    async alarmNotifications(id: string): Promise<AlarmNotification[]> {
        const result = await this._nwc.request<any>({
            url: this.url(`/alarming/${id}/notifications`),
            method: "GET"
        });
        return result.data;
    }
    async alarm(id: string): Promise<Alarm> {
        const result = await this._nwc.request<any>({
            url: this.url(`/alarming/${id}`),
            method: "GET"
        });
        return result.data;
    }
    async createAlarm(treatmentId: string, name: string, trigger: { key: string, value: string, operator: string }): Promise<void> {
       await this._nwc.request<any>({
            url: this.url(`/alarming`),
            method: "POST",
            data: {
                doctorId: "e931a246-e339-4bdf-8906-b18370293948",
                treatmentId: treatmentId,
                name,
                trigger
            }
        });
    }
    async activateAlarm(id: string): Promise<void> {
        await this._nwc.request<any>({
            url: this.url(`/alarming/${id}/activate`),
            method: "POST"
        });
    }
    async deactivateAlarm(id: string): Promise<void> {
        await this._nwc.request<any>({
            url: this.url(`/alarming/${id}/deactivate`),
            method: "POST"
        });
    }
    async deleteAlarm(id: string): Promise<void> {
        await this._nwc.request<any>({
            url: this.url(`/alarming/${id}`),
            method: "DELETE"
        });
    }
}