import { AppThunk } from '../../../AppThunk';
import { alarmDataFetched } from './viewAlarmSlice';

export const fetchAlarmData = (id: string): AppThunk => async (dispatch, getState, { alarmsRepository }) => {
    try {
        if (id === undefined) throw new Error("Provided alarm id is undefined")
        const data = {
            alarm: await alarmsRepository.alarm(id),
            notifications: await alarmsRepository.alarmNotifications(id)
        }
        dispatch(alarmDataFetched(data))
    } catch (error) {
        console.log(error.message)
    }
}