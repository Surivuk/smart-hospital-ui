import NetworkController from "./NetworkController"
import HospitalTreatmentRepository from "./repository/HospitalTreatmentRepository"
import MedicalCardRepository from "./repository/MedicalCardRepository"
import PatientRepository from "./repository/PatientRepository"
import TherapyRepository from "./repository/TherapyRepository"
import { io, Socket } from "socket.io-client";
import AlarmRepository from "./repository/AlarmRepository"
import HealthDataRepository from "./repository/HealthDataRepository"

export type Dependency = {
    patientRepository: PatientRepository
    medicalCardRepository: MedicalCardRepository
    hospitalTreatmentRepository: HospitalTreatmentRepository,
    therapyRepository: TherapyRepository
    alarmsRepository: AlarmRepository,
    healthDataRepository: HealthDataRepository,
    socket: Socket
}

export default class DependencyContainer {
    public readonly dependency: Dependency

    private readonly _nwc: NetworkController = new NetworkController()

    constructor() {
        const socket = io(process.env.REACT_APP_API_URL as string);
        socket.on("connect", () => {
            console.log("Connected...")
        })


        this.dependency = {
            patientRepository: new PatientRepository(this._nwc),
            medicalCardRepository: new MedicalCardRepository(this._nwc),
            hospitalTreatmentRepository: new HospitalTreatmentRepository(this._nwc),
            therapyRepository: new TherapyRepository(this._nwc),
            alarmsRepository: new AlarmRepository(this._nwc),
            healthDataRepository: new HealthDataRepository(this._nwc),
            socket: socket
        }
    }
}