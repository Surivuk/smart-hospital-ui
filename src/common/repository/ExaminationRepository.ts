import Api from "../Api";
import NetworkController from "../NetworkController";

export type Examination = {
    id: string,
    diagnosis: string
    createdAt: boolean
}

export default class ExaminationRepository extends Api {
    constructor(private readonly _nwc: NetworkController) { super() }

    async examination(id: string): Promise<Examination[]> {
        const result = await this._nwc.request<any>({
            url: this.url(`/examinations/${id}`),
            method: "GET"
        });
        return result.data;
    }
    async createExamination(medicalCardId: string, diagnosis: string): Promise<void> {
        await this._nwc.request<any>({
            url: this.url(`/examinations`),
            method: "POST",
            data: {
                doctorId: "e931a246-e339-4bdf-8906-b18370293948",
                medicalCardId,
                diagnosis
            }
        });
    }
}