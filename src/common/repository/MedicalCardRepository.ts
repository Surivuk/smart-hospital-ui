import Api from "../Api";
import NetworkController from "../NetworkController";

export type MedicalCard = {
    id: string;
    events: { id: string, createdAt: string, type: string }[];
    createdAt: string;
}

export default class MedicalCardRepository extends Api {
    constructor(private readonly _nwc: NetworkController) { super() }

    async medicalCard(id: string): Promise<MedicalCard[]> {
        const result = await this._nwc.request<any[]>({
            url: this.url(`/medical-cards/${id}`),
            method: "GET"
        })
        return this.map(result.data)
    }


    private map({ id, createdAt, hospitalTreatments, examinations, therapies }: any): any {
        return {
            id,
            createdAt: new Date(createdAt).toLocaleString(),
            events: this.insertionSort([
                ...hospitalTreatments.map((e: any) => ({id: e.treatmentId, createdAt: new Date(e.createdAt).getTime(), type: "hospital-treatments" })),
                ...examinations.map((e: any) => ({ id: e.examinationId, createdAt: new Date(e.createdAt).getTime(), type: "examinations" })),
                ...therapies.map((e: any) => ({ id: e.therapyId, createdAt: new Date(e.createdAt).getTime(), type: "therapies" })),
            ])
                .map(e => ({ ...e, createdAt: new Date(e.createdAt).toLocaleString() }))
                .reverse()
        }
    }

    private insertionSort(inputArr: any[]) {
        let n = inputArr.length;
        for (let i = 1; i < n; i++) {
            let current = inputArr[i];
            let j = i - 1;
            while ((j > -1) && (current.createdAt < inputArr[j].createdAt)) {
                inputArr[j + 1] = inputArr[j];
                j--;
            }
            inputArr[j + 1] = current;
        }
        return inputArr;
    }
}