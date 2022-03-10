import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Alarm } from '../../common/repository/AlarmRepository'

interface AlarmsState {
    alarms: Alarm[]
}

const initialState: AlarmsState = {
    alarms: []
}

export const alarmsSlice = createSlice({
    name: 'alarms',
    initialState,
    reducers: {
        alarmsFetched: (state, { payload }) => {
            state.alarms = payload
        },
        alarmActivated: (state, { payload }) => {
            state.alarms = state.alarms.map(alarm => {
                if (alarm.id === payload)
                    return { ...alarm, active: true }
                return alarm
            })
        },
        alarmDeactivated: (state, { payload }) => {
            state.alarms = state.alarms.map(alarm => {
                if (alarm.id === payload)
                    return { ...alarm, active: false }
                return alarm
            })
        },
        alarmDeleted: (state, { payload }) => {
            state.alarms = state.alarms.filter(alarm => alarm.id !== payload)
        },
    }
})

export const { alarmsFetched, alarmActivated, alarmDeactivated, alarmDeleted } = alarmsSlice.actions
export default alarmsSlice.reducer