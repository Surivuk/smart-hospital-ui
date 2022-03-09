import Api from "../Api";
import NetworkController from "../NetworkController";

export type Therapy = {
    id: string
    label: string
    medicaments: Medicament[]
}
export type Medicament = {
    medicamentId: string
    strength: number
    amount: number
    route: string
    frequency: string
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