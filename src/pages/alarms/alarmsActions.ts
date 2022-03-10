import { AppThunk } from '../../AppThunk';
import { alarmsFetched } from './alarmsSlice';


export const fetchAlarms = (): AppThunk => async (dispatch, getState, { alarmsRepository }) => {
    try {
        dispatch(alarmsFetched(await alarmsRepository.alarms()))
    } catch (error) {
        console.log(error.message)
    }

}