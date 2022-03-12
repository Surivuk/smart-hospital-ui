import { configureStore } from '@reduxjs/toolkit'
import DependencyContainer, { Dependency } from './common/DependencyContainer'
import PatientsReducer from "./pages/patients/patientsSlice"
import MedicalCardReducer from "./pages/medicalCard/medicalCardSlice"
import HospitalTreatmentReducer from "./pages/hospitalTreatment/treatmentSlice"
import TherapyReducer from "./pages/therapy/therapySlice"
import MedicamentReducer from "./pages/medicament/medicamentSlice"
import AlarmsReducer from "./pages/alarms/alarmsSlice"
import NewAlarmReducer from "./pages/alarm/new/newAlarmSlice"
import ViewAlarmReducer from "./pages/alarm/view/viewAlarmSlice"
import HealthDataReducer from "./pages/healthData/healthDataSlice"
import ExaminationReducer from "./pages/examination/examinationSlice"
import PatientReducer from "./pages/patient/patientSlice"

let _dependency!: Dependency
export const dependency = () => _dependency

export const store = (env: any) => {
    const container = new DependencyContainer(env)
    _dependency = container.dependency
    return configureStore({
        reducer: {
            patients: PatientsReducer,
            patient: PatientReducer,
            medicalCard: MedicalCardReducer,
            hospitalTreatment: HospitalTreatmentReducer,
            therapy: TherapyReducer,
            medicament: MedicamentReducer,
            alarms: AlarmsReducer,
            newAlarm: NewAlarmReducer,
            viewAlarm: ViewAlarmReducer,
            healthData: HealthDataReducer,
            examination: ExaminationReducer
        },
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware({
                thunk: {
                    extraArgument: { ..._dependency }
                }
            })
    })
}

export type Store = ReturnType<typeof store>
let storeType: Store
export type RootState = ReturnType<typeof storeType.getState>
export type AppDispatch = typeof storeType.dispatch