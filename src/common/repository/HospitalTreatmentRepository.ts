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

    async hospitalTreatment(id: string): Promise<HospitalTreatment> {
        const result = await this._nwc.request<any>({
            url: this.url(`/hospital-treatments/${id}`),
            method: "GET"
        });
        let monitorId = ""
        try {
            const monitor = (await this._nwc.request<any>({
                url: this.url(`/monitoring?treatmentId=${id}`),
                method: "GET"
            })).data;
            monitorId = monitor.id
        }
        catch { }

        return this.map({ ...result.data, monitoring: monitorId });
    }
    async activeHospitalTreatments(): Promise<HospitalTreatment[]> {
        const treatments = await this._nwc.request<any>({
            url: this.url(`/hospital-treatments`),
            method: "GET"
        });
        const patients = (await this._nwc.request<any[]>({
            url: this.url(`/patients`),
            method: "GET"
        })).data;
        return treatments.data
            .filter((t: any) => t.closed === false)
            .map((t: any) => {
                const patient = patients.find((p: any) => p.id === t.medicalCard)
                if (patient === undefined) return t;
                return { ...t, patient: `${patient.firstName} ${patient.lastName} (${patient.birthYear})` };
            })
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