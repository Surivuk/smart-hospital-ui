import { AppThunk } from '../../AppThunk';
import { medicalCardFetched, patientFetched } from './medicalCardSlice';

export const fetchMedicalCardData = (id: string): AppThunk => async (dispatch, getState, { patientRepository, medicalCardRepository }) => {
    try {
        if (id.length === 0) throw new Error("Provide id is empty")
        dispatch(patientFetched(await patientRepository.patient(id)))
        dispatch(medicalCardFetched(await medicalCardRepository.medicalCard(id)))
    } catch (error) {
        console.log(error.message)
    }
}