import { AppThunk } from '../../AppThunk';
import { medicamentAdded, medicamentRemoved, therapyDataFetched } from './therapySlice';

export type MedicamentView = {
    medicamentId: string;
    strength: string;
    amount: string;
    route: string;
    frequency: string;
}

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
        const { local } = getState().therapy
        if (id === undefined) throw new Error("Provided therapy id is undefined")
        if (medicament === undefined) throw new Error("Provided medicament id is undefined")
        if (local === false)
            await therapyRepository.removeMedicament(id, medicament)
        dispatch(medicamentRemoved(medicament))
    } catch (error) {
        console.log(error.message)
    }
}
export const addMedicament = (): AppThunk => async (dispatch, getState) => {
    try {
        const medicament = getState().medicament
        const { medicaments } = getState().therapy
        if (medicaments.find(m => m.medicamentId === medicament.medicamentId) !== undefined)
            throw new Error("Medicament already exists")
        dispatch(medicamentAdded({
            ...medicament,
            strength: parseInt(medicament.strength),
            amount: parseInt(medicament.amount)
        }))
    } catch (error) {
        console.log(error.message)
    }
}
