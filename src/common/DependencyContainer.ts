import NetworkController from "./NetworkController"
import HospitalTreatmentRepository from "./repository/HospitalTreatmentRepository"
import MedicalCardRepository from "./repository/MedicalCardRepository"
import PatientRepository from "./repository/PatientRepository"
import TherapyRepository from "./repository/TherapyRepository"

export type Dependency = {
    patientRepository: PatientRepository
    medicalCardRepository: MedicalCardRepository
    hospitalTreatmentRepository: HospitalTreatmentRepository,
    therapyRepository: TherapyRepository
}

export default class DependencyContainer {
    public readonly dependency: Dependency

    private readonly _nwc: NetworkController = new NetworkController()

    constructor() {
        this.dependency = {
            patientRepository: new PatientRepository(this._nwc),
            medicalCardRepository: new MedicalCardRepository(this._nwc),
            hospitalTreatmentRepository: new HospitalTreatmentRepository(this._nwc),
            therapyRepository: new TherapyRepository(this._nwc)
        }
    }
}