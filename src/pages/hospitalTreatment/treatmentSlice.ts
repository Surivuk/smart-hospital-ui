import { createSlice } from '@reduxjs/toolkit'

interface TreatmentState {
    therapies: { id: string, label: string, createdAt: string }[],
    closed: boolean;
    diagnosis: string
    monitoringDevice: string
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
    opened: boolean;
}

const initialState: TreatmentState = {
    therapies: [],
    closed: false,
    diagnosis: "",
    monitoringDevice: "",
    monitoring: {
        SPO2: "-",
        "systolic-blood-pressure": "-",
        "diastolic-blood-pressure": "-",
        PI: "-",
        pulse: "-",
        temperature: "-",
        timestamp: "-"
    },
    closedView: false,
    opened: false
}

export const TreatmentCardSlice = createSlice({
    name: 'treatment',
    initialState,
    reducers: {
        treatmentDataFetched: (state, { payload }) => {
            state.therapies = payload.therapies;
            state.closed = payload.closed
            state.diagnosis = payload.diagnosis
            state.monitoringDevice = payload.monitoring
        },
        monitoringUpdated: (state, { payload }) => {
            const key: "SPO2" | "PI" | "pulse" | "temperature" | "systolic-blood-pressure" | "diastolic-blood-pressure" = payload.type
            state.monitoring[key] = payload.value
            state.monitoring["timestamp"] = new Date(payload.timestamp).toLocaleString()
        },
        diagnosisChanged: (state, { payload }) => {
            state.diagnosis = payload
        },
        closedTreatment: (state) => {
            state.closedView = true
        },
        openedTreatment: (state) => {
            state.opened = true
        },
        stateRestarted: () => {
            return initialState
        }
    }
})

export const { treatmentDataFetched, stateRestarted, monitoringUpdated, closedTreatment, openedTreatment, diagnosisChanged } = TreatmentCardSlice.actions
export default TreatmentCardSlice.reducer