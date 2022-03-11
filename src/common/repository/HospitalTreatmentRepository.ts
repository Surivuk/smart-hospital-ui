import Api from "../Api";
import NetworkController from "../NetworkController";

export type HospitalTreatment = {
    therapies: { id: string, label: string, createdAt: string }[]
    diagnosis: string
    monitoring: string
    patient: string
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
        await this._nwc.request<any>({
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
    async openTreatment(medicalCardId: string, diagnosis: string): Promise<void> {
        await this._nwc.request<any>({
            url: this.url(`/hospital-treatments`),
            method: "POST",
            data: { medicalCardId, diagnosis }
        })
    }


    private map({ therapies, closed, diagnosis, patient, monitoring, createdAt }: any): HospitalTreatment {
        return {
            therapies: therapies.map((t: any) => ({ id: t.therapyId, label: t.label, createdAt: new Date(t.createdAt).toLocaleString() })),
            monitoring,
            diagnosis,
            patient,
            closed,
            createdAt
        }
    }
}