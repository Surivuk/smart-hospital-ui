import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { MedicalCard } from '../../common/repository/MedicalCardRepository'
import { Patient } from '../../common/repository/PatientRepository'

interface MedicalCardState {
    patient: Patient | undefined,
    medicalCard: MedicalCard | undefined
}

const initialState: MedicalCardState = {
    patient: undefined,
    medicalCard: undefined
}

export const medicalCardSlice = createSlice({
    name: 'medicalCard',
    initialState,
    reducers: {
        patientFetched: (state, { payload }) => {
            state.patient = payload
        },
        medicalCardFetched: (state, { payload }) => {
            state.medicalCard = payload
        },
        stateRestarted: () => {
            return initialState 
        }
    }
})

export const { patientFetched, medicalCardFetched, stateRestarted } = medicalCardSlice.actions
export default medicalCardSlice.reducer