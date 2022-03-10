import { AppThunk } from '../../AppThunk';
import { alarmActivated, alarmDeactivated, alarmDeleted, alarmsFetched } from './alarmsSlice';


export const fetchAlarms = (): AppThunk => async (dispatch, getState, { alarmsRepository }) => {
    try {
        dispatch(alarmsFetched(await alarmsRepository.alarms()))
    } catch (error) {
        console.log(error.message)
    }
}
export const deactivateAlarm = (id: string): AppThunk => async (dispatch, getState, { alarmsRepository }) => {
    try {
        if (id === undefined) throw new Error("Provided alarm id is undefined")
        await alarmsRepository.deactivateAlarm(id)
        dispatch(alarmDeactivated(id))
    } catch (error) {
        console.log(error.message)
    }
}
export const activateAlarm = (id: string): AppThunk => async (dispatch, getState, { alarmsRepository }) => {
    try {
        if (id === undefined) throw new Error("Provided alarm id is undefined")
        await alarmsRepository.activateAlarm(id)
        dispatch(alarmActivated(id))
    } catch (error) {
        console.log(error.message)
    }
}
export const deleteAlarm = (id: string): AppThunk => async (dispatch, getState, { alarmsRepository }) => {
    try {
        if (id === undefined) throw new Error("Provided alarm id is undefined")
        await alarmsRepository.deleteAlarm(id)
        dispatch(alarmDeleted(id))
    } catch (error) {
        console.log(error.message)
    }
}