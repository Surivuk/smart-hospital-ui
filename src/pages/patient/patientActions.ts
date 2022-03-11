import { AppThunk } from '../../AppThunk';
import { patientAdded } from './patientSlice';

export const addPatient = (): AppThunk => async (dispatch, getState, { patientRepository }) => {
    try {
        const { firstName, lastName, gender, birthYear } = getState().patient
        await patientRepository.addPatient(firstName, lastName, gender, birthYear)
        dispatch(patientAdded())
    } catch (error) {
        console.log(error.message)
    }
}