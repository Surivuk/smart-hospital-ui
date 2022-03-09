import { configureStore } from '@reduxjs/toolkit'
import DependencyContainer from './common/DependencyContainer'
import HomeReducer from "./pages/home/homeSlice"
import MedicalCardReducer from "./pages/medicalCard/medicalCardSlice"
import HospitalTreatmentReducer from "./pages/hospitalTreatment/treatmentSlice"
import TherapyReducer from "./pages/therapy/therapySlice"
import MedicamentReducer from "./pages/medicament/medicamentSlice"

export const store = configureStore({
    reducer: {
        home: HomeReducer,
        medicalCard: MedicalCardReducer,
        hospitalTreatment: HospitalTreatmentReducer,
        therapy: TherapyReducer,
        medicament: MedicamentReducer
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