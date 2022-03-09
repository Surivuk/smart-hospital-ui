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
            const {id, ...newState} = payload
            return newState;
        },
        // monitoringUpdated: (state, { payload }) => {
        //     const key: "SPO2" | "PI" | "pulse" | "temperature" | "systolic-blood-pressure" | "diastolic-blood-pressure"  = payload.type
        //     state.monitoring[key] = payload.value
        //     state.monitoring["timestamp"] = new Date(payload.timestamp).toLocaleString()
        // },
        stateRestarted: () => {
            return initialState
        }
    }
})

export const { stateRestarted, therapyDataFetched } = TherapySlice.actions
export default TherapySlice.reducer