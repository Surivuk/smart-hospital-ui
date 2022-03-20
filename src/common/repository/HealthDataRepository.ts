import Api from "../Api";
import NetworkController from "../NetworkController";

export type HealthData = {
    PI: "1"
    SPO2: "95"
    diastolic: "82"
    pulse: "66"
    systolic: "130"
    temperature: "36"
    timestamp: "3/10/2022, 2:16:54 PM"
}

export default class HealthDataRepository extends Api {

    async healthData(date: string, treatment: string): Promise<HealthData[]> {
        const result = await this._nwc.request<any>({
            url: this.url(`/health-center/${treatment}?date=${date}`),
            method: "GET"
        });
        return this.map(result.data.reverse());
    }

    private map(data: any[]): any[] {
        const result: any[] = []
        const map = new Map<string, any[]>()
        data.forEach(d => {
            const time = this.time(d.timestamp)
            const { timestamp, ...nData } = d;
            const item = map.get(time)
            if (item !== undefined)
                item.push(nData)
            else
                map.set(time, [nData])
        })
        map.forEach((row, key) => {
            const value: any = {}
            row.forEach(r => {
                const type = r.type.startsWith("diastolic") ? "diastolic" : r.type.startsWith("systolic") ? "systolic" : r.type
                value[type] = r.value
            })
            result.push({
                ...value,
                timestamp: key
            })
        })
        return result
    }

    private time(value: string) {
        const date = new Date(parseInt(value));
        // date.setSeconds(0);
        date.setMilliseconds(0)
        return date.toLocaleString()
    }
}