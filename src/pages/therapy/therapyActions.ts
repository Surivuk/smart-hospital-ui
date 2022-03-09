import { AppThunk } from '../../AppThunk';
import { therapyDataFetched } from './therapySlice';


export const fetchTherapyData = (id: string): AppThunk => async (dispatch, getState, { therapyRepository }) => {
    try {
        if (id === undefined) throw new Error("Provided therapy id is undefined")
        dispatch(therapyDataFetched(await therapyRepository.therapy(id)))
    } catch (error) {
        console.log(error.message)
    }
}