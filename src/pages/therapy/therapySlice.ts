import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Medicament } from '../../common/repository/TherapyRepository';

interface TherapyState {
    local: boolean
    label: string
    medicaments: Medicament[]
}

const initialState: TherapyState = {
    local: false,
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
        changedToLocal: (state) => {
            state.local = true
        },
        medicamentRemoved: (state, { payload }) => {
            state.medicaments = state.medicaments.filter(m => m.medicamentId !== payload)
        },
        medicamentAdded: (state, { payload }) => {
            state.medicaments.push(payload)
        },
        stateRestarted: () => {
            return initialState
        }
    }
})

export const { stateRestarted, therapyDataFetched, medicamentRemoved, medicamentAdded, changedToLocal } = TherapySlice.actions
export default TherapySlice.reducer