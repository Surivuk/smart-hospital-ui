import { AppThunk } from '../../AppThunk';
import { treatmentDataFetched } from './treatmentSlice';


export const fetchHospitalTreatmentData = (id: string): AppThunk => async (dispatch, getState, { hospitalTreatmentRepository }) => {
    try {
        if(id === undefined) throw new Error("Provided treatment id is undefined")
        dispatch(treatmentDataFetched(await hospitalTreatmentRepository.hospitalTreatments(id)))
    } catch (error) {
        console.log(error.message)
    }
}