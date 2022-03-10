import Api from "../Api";
import NetworkController from "../NetworkController";

export type HospitalTreatment = {
    therapies: { id: string, label: string, createdAt: string  }[]
    patient: string,
    closed: boolean
    createdAt: string
}

export default class HospitalTreatmentRepository extends Api {
    constructor(private readonly _nwc: NetworkController) { super() }

    async hospitalTreatment(id: string): Promise<HospitalTreatment> {
        const result = await this._nwc.request<any>({
            url: this.url(`/hospital-treatments/${id}`),
            method: "GET"
        });
        console.log(this.map(result.data))
        return this.map(result.data);
    }
    async activeHospitalTreatments(): Promise<HospitalTreatment[]> {
        const result = await this._nwc.request<any>({
            url: this.url(`/hospital-treatments`),
            method: "GET"
        });
        return result.data.filter((t: any) => t.closed === false);
    }
    async closeHospitalTreatments(id: string): Promise<void> {
        const result = await this._nwc.request<any>({
            url: this.url(`/hospital-treatments/${id}/close`),
            method: "POST"
        });
    }
    async removeTherapy(id: string, therapyId: string): Promise<void> {
        await this._nwc.request<any>({
            url: this.url(`/hospital-treatments/${id}/remove-therapy`),
            method: "POST",
            data: { therapyId }
        })
    }


    private map({ therapies, closed, patient, createdAt }: any): HospitalTreatment {
        return {
            therapies: therapies.map((t: any) => ({ id: t.therapyId, label: t.label, createdAt: t.createdAt })),
            patient,
            closed,
            createdAt
        }
    }
}