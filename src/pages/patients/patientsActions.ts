import { AppThunk } from '../../AppThunk';
import { patientsFetched } from './patientsSlice';

export const fetchPatients = (): AppThunk => async (dispatch, getState, { patientRepository }) => {
    try {
        dispatch(patientsFetched(await patientRepository.patients()))
    } catch (error) {
        console.log(error.message)
    }

}