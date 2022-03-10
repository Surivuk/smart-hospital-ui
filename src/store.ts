import { configureStore } from '@reduxjs/toolkit'
import DependencyContainer from './common/DependencyContainer'
import PatientsReducer from "./pages/patients/patientsSlice"
import MedicalCardReducer from "./pages/medicalCard/medicalCardSlice"
import HospitalTreatmentReducer from "./pages/hospitalTreatment/treatmentSlice"
import TherapyReducer from "./pages/therapy/therapySlice"
import MedicamentReducer from "./pages/medicament/medicamentSlice"
import AlarmsReducer from "./pages/alarms/alarmsSlice"

export const store = configureStore({
    reducer: {
        patients: PatientsReducer,
        medicalCard: MedicalCardReducer,
        hospitalTreatment: HospitalTreatmentReducer,
        therapy: TherapyReducer,
        medicament: MedicamentReducer,
        alarms: AlarmsReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            thunk: {
                extraArgument: { ...new DependencyContainer().dependency }
            }
        })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch