import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HealthData } from '../../common/repository/HealthDataRepository'
import { Medicament } from '../../common/repository/TherapyRepository'

interface HealthDataState {
    healthData: HealthData[]
    medicaments: Medicament[],
    selectedDate: string
}

const initialState: HealthDataState = {
    healthData: [],
    medicaments: [],
    selectedDate: new Date().toISOString().slice(0, 10)
}

export const HealthDataSlice = createSlice({
    name: 'healthData',
    initialState,
    reducers: {
        dataFetched: (state, { payload }) => {
            state.healthData = payload
        },
        medicamentsFetched: (state, { payload }) => {
            state.medicaments = payload
        },
        dateChanged: (state, { payload }) => {
            state.selectedDate = payload
        },
        stateRestarted: () => {
            return initialState
        }
    }
})

export const { stateRestarted, dataFetched, dateChanged, medicamentsFetched } = HealthDataSlice.actions
export default HealthDataSlice.reducer