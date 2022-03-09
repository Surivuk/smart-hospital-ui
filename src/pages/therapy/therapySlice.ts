import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Medicament } from '../../common/repository/TherapyRepository';

interface TherapyState {
    label: string
    medicaments: Medicament[]
}

const initialState: TherapyState = {
    label: "",
    medicaments: []
}

export const TherapySlice = createSlice({
    name: 'therapy',
    initialState,
    reducers: {
        therapyDataFetched: (state, { payload }) => {
            const { id, ...newState } = payload
            return newState;
        },
        medicamentRemoved: (state, { payload }) => {
            state.medicaments = state.medicaments.filter(m => m.medicamentId !== payload)
        },
        stateRestarted: () => {
            return initialState
        }
    }
})

export const { stateRestarted, therapyDataFetched, medicamentRemoved } = TherapySlice.actions
export default TherapySlice.reducer