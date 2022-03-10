import { IosShare } from '@mui/icons-material'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface TreatmentState {
    therapies: { id: string, label: string, createdAt: string }[],
    closed: boolean;
    monitoring: {
        SPO2: string
        "systolic-blood-pressure": string
        "diastolic-blood-pressure": string
        PI: string
        pulse: string
        temperature: string
        timestamp: string
    }
    closedView: boolean
}

const initialState: TreatmentState = {
    therapies: [],
    closed: false,
    monitoring: {
        SPO2: "-",
        "systolic-blood-pressure": "-",
        "diastolic-blood-pressure": "-",
        PI: "-",
        pulse: "-",
        temperature: "-",
        timestamp: "-"
    },
    closedView: false
}

export const TreatmentCardSlice = createSlice({
    name: 'treatment',
    initialState,
    reducers: {
        treatmentDataFetched: (state, { payload }) => {
            state.therapies = payload.therapies;
            state.closed = payload.closed
        },
        monitoringUpdated: (state, { payload }) => {
            const key: "SPO2" | "PI" | "pulse" | "temperature" | "systolic-blood-pressure" | "diastolic-blood-pressure" = payload.type
            state.monitoring[key] = payload.value
            state.monitoring["timestamp"] = new Date(payload.timestamp).toLocaleString()
        },
        closedTreatment: (state) => {
            state.closedView = true
        },
        stateRestarted: () => {
            return initialState
        }
    }
})

export const { treatmentDataFetched, stateRestarted, monitoringUpdated, closedTreatment } = TreatmentCardSlice.actions
export default TreatmentCardSlice.reducer