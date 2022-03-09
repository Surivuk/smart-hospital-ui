import { AppThunk } from '../../AppThunk';
import { medicamentRemoved, therapyDataFetched } from './therapySlice';


export const fetchTherapyData = (id: string): AppThunk => async (dispatch, getState, { therapyRepository }) => {
    try {
        if (id === undefined) throw new Error("Provided therapy id is undefined")
        dispatch(therapyDataFetched(await therapyRepository.therapy(id)))
    } catch (error) {
        console.log(error.message)
    }
}
export const removeMedicament = (id: string, medicament: string): AppThunk => async (dispatch, getState, { therapyRepository }) => {
    try {
        if (id === undefined) throw new Error("Provided therapy id is undefined")
        if (medicament === undefined) throw new Error("Provided medicament id is undefined")
        await therapyRepository.removeMedicament(id, medicament)
        dispatch(medicamentRemoved(medicament))
    } catch (error) {
        console.log(error.message)
    }
}
