import { IosShare } from '@mui/icons-material'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { MedicalCard } from '../../common/repository/MedicalCardRepository'
import { Patient } from '../../common/repository/PatientRepository'
import { Therapy } from '../../common/repository/TherapyRepository'

interface TreatmentState {
    therapies: { id: string, label: string, createdAt: string }[]
    createdAt: string
}

const initialState: TreatmentState = {
    therapies: [],
    createdAt: ""
}

export const TreatmentCardSlice = createSlice({
    name: 'treatment',
    initialState,
    reducers: {
        treatmentDataFetched: (state, { payload }) => {
            return payload;
        },
        // medicalCardFetched: (state, { payload }) => {
        //     state.medicalCard = payload
        // },
        stateRestarted: () => {
            return initialState
        }
    }
})

export const { treatmentDataFetched, stateRestarted } = TreatmentCardSlice.actions
export default TreatmentCardSlice.reducer