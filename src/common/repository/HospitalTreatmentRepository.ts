import Api from "../Api";
import NetworkController from "../NetworkController";

export type HospitalTreatment = {
    therapies: { id: string, label: string, createdAt: string }[]
    createdAt: string
}

export default class HospitalTreatmentRepository extends Api {
    constructor(private readonly _nwc: NetworkController) { super() }

    async hospitalTreatments(id: string): Promise<HospitalTreatment> {
        const result = await this._nwc.request<any>({
            url: this.url(`/hospital-treatments/${id}`),
            method: "GET"
        });
        return this.map(result.data);
    }


    private map({ therapies, createdAt }: any): HospitalTreatment {
        return {
            therapies: therapies.map((t: any) => ({ id: t.therapyId, label: t.label, createdAt: t.createdAt })),
            createdAt
        }
    }
}