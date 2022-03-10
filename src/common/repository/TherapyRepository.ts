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
    async addMedicament(therapy: string, medicament: Medicament): Promise<void> {
        await this._nwc.request<any>({
            url: this.url(`/therapies/${therapy}/add-medicament`),
            method: "POST",
            data: { medicament }
        })
    }
    async removeMedicament(therapy: string, medicamentId: string): Promise<void> {
        await this._nwc.request<any>({
            url: this.url(`/therapies/${therapy}/remove-medicament`),
            method: "POST",
            data: { medicamentId }
        })
    }
    async prescribeTherapy(medicalCard: string, medicaments: Medicament[]) {
        await this._nwc.request<any>({
            url: this.url(`/therapies/prescribe`),
            method: "POST",
            data: { medicalCardId: medicalCard, medicaments }
        })
    }
    async determineTherapy(hospitalTreatmentId: string, label: string, medicaments: Medicament[]) {
        await this._nwc.request<any>({
            url: this.url(`/therapies/determine`),
            method: "POST",
            data: { hospitalTreatmentId, label, medicaments }
        })
    }
    async changeLabel(id: string, label: string) {
        await this._nwc.request<any>({
            url: this.url(`/therapies/${id}/change-label`),
            method: "POST",
            data: { label }
        })
    }
    async medicamentsUntil(id: string, date: string) {
        const result = await this._nwc.request<any>({
            url: this.url(`/therapies/until?treatmentId=${id}&date=${date}`),
            method: "GET",
        })
        return result.data
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