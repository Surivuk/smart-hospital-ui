import Api from "../Api";
import NetworkController from "../NetworkController";

export type Therapy = {
    id: string
    label: string
    medicaments: {
        medicamentId: string
        strength: 1000,
        amount: 2,
        route: string
        frequency: string
    }[]

}

export default class PatientRepository extends Api {
    constructor(private readonly _nwc: NetworkController) { super() }

    async therapies(): Promise<Therapy[]> {
        const result = await this._nwc.request<any[]>({
            url: this.url("/therapies"),
            method: "GET"
        })
        return result.data;
    }
    async therapy(id: string): Promise<Therapy> {
        const result = await this._nwc.request<any>({
            url: this.url(`/therapies/${id}`),
            method: "GET"
        })
        return result.data;
    }

    // private map({ id, firstName, lastName, birthYear, gender }: any): Patient {
    //     return {
    //         id: id,
    //         name: `${firstName} ${lastName}`,
    //         birthYear,
    //         gender
    //     }
    // }
}