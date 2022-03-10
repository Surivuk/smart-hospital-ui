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
    }
})

export const { alarmsFetched } = alarmsSlice.actions
export default alarmsSlice.reducer