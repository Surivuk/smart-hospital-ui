import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Medicament } from '../../common/repository/TherapyRepository';

interface TherapyState {
    local: boolean
    label: string
    medicaments: Medicament[]
    prescribed: boolean
    determined: boolean
}

const initialState: TherapyState = {
    local: false,
    label: "",
    medicaments: [],
    prescribed: false,
    determined: false
}

export const TherapySlice = createSlice({
    name: 'therapy',
    initialState,
    reducers: {
        therapyDataFetched: (state, { payload }) => {
            const { id, ...newState } = payload
            return { ...newState, local: state.local };
        },
        therapyPrescribed: (state) => {
            state.prescribed = true
        },
        therapyDetermined: (state) => {
            state.determined = true
        },
        changedToLocal: (state) => {
            state.local = true
        },
        labelChanged: (state, { payload }) => {
            state.label = payload
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

export const {
    stateRestarted,
    therapyDataFetched,
    medicamentRemoved,
    medicamentAdded,
    changedToLocal,
    therapyPrescribed,
    labelChanged,
    therapyDetermined
} = TherapySlice.actions
export default TherapySlice.reducer