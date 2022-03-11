import { AppThunk } from '../../AppThunk';
import { medicamentAdded, medicamentsFetched } from './medicamentSlice';

export const fetchMedicaments = (): AppThunk => async (dispatch, getState, { therapyRepository }) => {
    try {
        dispatch(medicamentsFetched(await therapyRepository.medicaments()))
    } catch (error) {
        console.log(error.message)
    }
}
export const addMedicament = (id: string): AppThunk => async (dispatch, getState, { therapyRepository }) => {
    try {
        if (id === undefined) throw new Error("Provided therapy id is undefined")
        const { medicamentId, strength, amount, route, frequency } = getState().medicament
        await therapyRepository.addMedicament(id, {
            medicamentId,
            strength: parseInt(strength),
            amount: parseInt(amount),
            route,
            frequency
        })
        dispatch(medicamentAdded())
    } catch (error) {
        console.log(error.message)
    }
}