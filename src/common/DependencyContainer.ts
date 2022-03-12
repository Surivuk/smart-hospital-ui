import NetworkController from "./NetworkController"
import HospitalTreatmentRepository from "./repository/HospitalTreatmentRepository"
import MedicalCardRepository from "./repository/MedicalCardRepository"
import PatientRepository from "./repository/PatientRepository"
import TherapyRepository from "./repository/TherapyRepository"
import { io, Socket } from "socket.io-client";
import AlarmRepository from "./repository/AlarmRepository"
import HealthDataRepository from "./repository/HealthDataRepository"
import ExaminationRepository from "./repository/ExaminationRepository"

export type Dependency = {
    patientRepository: PatientRepository
    medicalCardRepository: MedicalCardRepository
    hospitalTreatmentRepository: HospitalTreatmentRepository,
    therapyRepository: TherapyRepository
    alarmsRepository: AlarmRepository,
    healthDataRepository: HealthDataRepository,
    examinationRepository: ExaminationRepository
    socket: Socket
}

export default class DependencyContainer {
    public readonly dependency: Dependency

    private readonly _nwc: NetworkController = new NetworkController()

    constructor(env: any) {
        const socket = io(env.REACT_APP_API_URL);
        socket.on("connect", () => {
            console.log("Connected...")
        })


        this.dependency = {
            patientRepository: new PatientRepository(env, this._nwc),
            medicalCardRepository: new MedicalCardRepository(env, this._nwc),
            hospitalTreatmentRepository: new HospitalTreatmentRepository(env, this._nwc),
            therapyRepository: new TherapyRepository(env, this._nwc),
            alarmsRepository: new AlarmRepository(env, this._nwc),
            healthDataRepository: new HealthDataRepository(env, this._nwc),
            examinationRepository: new ExaminationRepository(env, this._nwc),
            socket: socket
        }
    }
}