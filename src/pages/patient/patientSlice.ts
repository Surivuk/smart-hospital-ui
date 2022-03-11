import { createSlice } from '@reduxjs/toolkit'

interface PatientState {
    firstName: string
    lastName: string
    gender: string
    birthYear: string
    added: boolean
}

const initialState: PatientState = {
    firstName: "",
    lastName: "",
    gender: "",
    birthYear: "",
    added: false
}

export const patientSlice = createSlice({
    name: 'patient',
    initialState,
    reducers: {
        dataChanged: (state, { payload }) => {
            const key: "firstName" | "lastName" | "gender" | "birthYear" = payload.type
            state[key] = payload.value
        },
        patientAdded: (state) => {
            state.added = true
        },
        stateRestarted: () => {
            return initialState
        },
    }
})

export const { dataChanged, patientAdded, stateRestarted } = patientSlice.actions
export default patientSlice.reducer