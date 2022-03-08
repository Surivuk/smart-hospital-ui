import { IosShare } from '@mui/icons-material'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface TreatmentState {
    therapies: { id: string, label: string, createdAt: string }[],
    monitoring: {
        SPO2: string
        "systolic-blood-pressure": string
        "diastolic-blood-pressure": string
        PI: string
        pulse: string
        temperature: string
        timestamp: string
    }
}

const initialState: TreatmentState = {
    therapies: [],
    monitoring: {
        SPO2: "-",
        "systolic-blood-pressure": "-",
        "diastolic-blood-pressure": "-",
        PI: "-",
        pulse: "-",
        temperature: "-",
        timestamp: "-"
    }
}

export const TreatmentCardSlice = createSlice({
    name: 'treatment',
    initialState,
    reducers: {
        treatmentDataFetched: (state, { payload }) => {
            state.therapies = payload.therapies;
        },
        monitoringUpdated: (state, { payload }) => {
            const key: "SPO2" | "PI" | "pulse" | "temperature" | "systolic-blood-pressure" | "diastolic-blood-pressure"  = payload.type
            state.monitoring[key] = payload.value
            state.monitoring["timestamp"] = new Date(payload.timestamp).toLocaleString()
        },
        stateRestarted: () => {
            return initialState
        }
    }
})

export const { treatmentDataFetched, stateRestarted, monitoringUpdated } = TreatmentCardSlice.actions
export default TreatmentCardSlice.reducer