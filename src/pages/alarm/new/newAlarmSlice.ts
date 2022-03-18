import { createSlice } from '@reduxjs/toolkit'

interface NewAlarmState {
    activeHospitalTreatments: { key: string, value: string }[]
    operators: { key: string, value: string }[]
    keys: { key: string, value: string }[]
    hospitalTreatmentId: string
    name: string
    key: string
    value: string
    operator: string
    created: boolean
}

const initialState: NewAlarmState = {
    activeHospitalTreatments: [],
    operators: [
        { key: "<", value: "lower then (<)" },
        { key: "=", value: "equal (=)" },
        { key: ">", value: "grater then (>)" },
    ],
    keys: [
        { key: "SPO2", value: "Saturation (SPO2)" },
        { key: "systolic-blood-pressure", value: "Systolic Blood Pressure" },
        { key: "diastolic-blood-pressure", value: "Diastolic Blood pressure" },
        { key: "PI", value: "Percussion Index (PI)" },
        { key: "temperature", value: "Temperature" },
        { key: "pulse", value: "Puls" },
    ],
    hospitalTreatmentId: "",
    name: "",
    key: "SPO2",
    value: "",
    operator: "=",
    created: false
}

export const newAlarmSlice = createSlice({
    name: 'newAlarm',
    initialState,
    reducers: {
        activeHospitalTreatmentsFetched: (state, { payload }) => {
            state.activeHospitalTreatments = payload.map((t: any) => ({ key: t.id, value: `Treatment for ${t.patient}` }))
        },
        dataChanged: (state, { payload }) => {
            const key: "hospitalTreatmentId" | "key" | "value" | "operator" | "name" = payload.type
            state[key] = payload.value
        },
        alarmCreated: (state) => {
            state.created = true
        },
        stateRestarted: () => {
            return initialState
        }
    }
})

export const { stateRestarted, dataChanged, alarmCreated, activeHospitalTreatmentsFetched } = newAlarmSlice.actions
export default newAlarmSlice.reducer