import { configureStore } from '@reduxjs/toolkit'
import DependencyContainer from './common/DependencyContainer'
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

const container = new DependencyContainer()
export const dependency = container.dependency

export const store = configureStore({
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
                extraArgument: { ...dependency }
            }
        })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch