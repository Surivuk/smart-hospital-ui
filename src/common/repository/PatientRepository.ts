import Api from "../Api";
import NetworkController from "../NetworkController";

export type Patient = {
    id: string
    name: string
    birthYear: number
    gender: string
}

export default class PatientRepository extends Api {
    constructor(private readonly _nwc: NetworkController) { super() }

    async patients(): Promise<Patient[]> {
        const result = await this._nwc.request<any[]>({
            url: this.url("/patients"),
            method: "GET"
        })
        return result.data.map((patient: any) => this.map(patient))
    }
    async patient(id: string): Promise<Patient> {
        const result = await this._nwc.request<any>({
            url: this.url(`/patients/${id}`),
            method: "GET"
        })
        return this.map(result.data)
    }
    async addPatient(firstName: string, lastName: string, gender: string, birthYear: string): Promise<void> {
        await this._nwc.request<any>({
            url: this.url(`/patients`),
            method: "POST",
            data: {
                firstName,
                lastName,
                gender,
                birthYear
            }
        })
    }

    private map({ id, firstName, lastName, birthYear, gender }: any): Patient {
        return {
            id: id,
            name: `${firstName} ${lastName}`,
            birthYear,
            gender
        }
    }
}