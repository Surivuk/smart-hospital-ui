import { createSlice } from '@reduxjs/toolkit'
import { HealthData } from '../../common/repository/HealthDataRepository'
import { Medicament } from '../../common/repository/TherapyRepository'

function nowDate() {
    const now = new Date()
    const m = `${now.getMonth() + 1}`
    const d = `${now.getDate()}`
    return `${now.getFullYear()}-${m.length === 1 ? `0${m}` : m}-${d.length === 1 ? `0${d}` : d}`
}

interface HealthDataState {
    healthData: HealthData[]
    medicaments: Medicament[],
    selectedDate: string
}

const initialState: HealthDataState = {
    healthData: [],
    medicaments: [],
    selectedDate: nowDate()
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