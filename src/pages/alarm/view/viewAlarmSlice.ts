import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AlarmNotification } from '../../../common/repository/AlarmRepository'

interface ViewAlarmState {
    notifications: AlarmNotification[]
    hospitalTreatment: string
    medicalCard: string
    name: string
    key: string
    value: string
    operator: string
}

const initialState: ViewAlarmState = {
    notifications: [],
    hospitalTreatment: "",
    medicalCard: "",
    name: "",
    key: "",
    value: "",
    operator: "",
}

export const viewAlarmSlice = createSlice({
    name: 'viewAlarm',
    initialState,
    reducers: {
        alarmDataFetched: (state, { payload }) => {
            const { alarm, notifications } = payload
            state.hospitalTreatment = alarm.hospitalTreatment
            state.medicalCard = alarm.medicalCard
            state.name = alarm.name
            state.key = alarm.trigger.key
            state.operator = alarm.trigger.operator
            state.value = alarm.trigger.value
            state.notifications = notifications.reverse()
        },
        stateRestarted: () => {
            return initialState
        }
    }
})

export const { stateRestarted, alarmDataFetched } = viewAlarmSlice.actions
export default viewAlarmSlice.reducer