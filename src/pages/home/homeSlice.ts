import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Patient } from '../../common/repository/PatientRepository'

interface HomeState {
    patients: Patient[]
}

const initialState: HomeState = {
    patients: []
}

export const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        patientsFetched: (state, { payload }) => {
            state.patients = payload
        },
    }
})

export const { patientsFetched } = homeSlice.actions
export default homeSlice.reducer