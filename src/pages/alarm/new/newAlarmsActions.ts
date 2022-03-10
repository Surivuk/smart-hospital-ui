import { AppThunk } from '../../../AppThunk';
import { alarmCreated, activeHospitalTreatmentsFetched } from './newAlarmSlice';

export const fetchAlarmData = (): AppThunk => async (dispatch, getState, { hospitalTreatmentRepository }) => {
    try {
        dispatch(activeHospitalTreatmentsFetched(await hospitalTreatmentRepository.activeHospitalTreatments()))
    } catch (error) {
        console.log(error.message)
    }
}
export const createAlarm = (): AppThunk => async (dispatch, getState, { alarmsRepository }) => {
    try {
        const { hospitalTreatmentId, key, value, operator, name } = getState().newAlarm
        await alarmsRepository.createAlarm(hospitalTreatmentId, name, { key, value, operator })
        dispatch(alarmCreated())
    } catch (error) {
        console.log(error.message)
    }
}