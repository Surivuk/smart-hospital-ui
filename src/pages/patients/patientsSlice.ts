import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Patient } from '../../common/repository/PatientRepository'

interface HomeState {
    patients: Patient[]
}

const initialState: HomeState = {
    patients: []
}

export const patientsSlice = createSlice({
    name: 'patients',
    initialState,
    reducers: {
        patientsFetched: (state, { payload }) => {
            state.patients = payload
        },
    }
})

export const { patientsFetched } = patientsSlice.actions
export default patientsSlice.reducer