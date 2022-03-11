import { AppThunk } from '../../AppThunk';
import { labelChanged, medicamentAdded, medicamentRemoved, therapyDataFetched, therapyDetermined, therapyPrescribed, therapyRemoved } from './therapySlice';

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
        if (id === undefined) throw new Error("Provided therapy id is undefined")
        if (medicament === undefined) throw new Error("Provided medicament id is undefined")
        await therapyRepository.removeMedicament(id, medicament)
        dispatch(medicamentRemoved(medicament))
    } catch (error) {
        console.log(error.message)
    }
}
export const removeMedicamentLocally = (medicament: string): AppThunk => async (dispatch, getState) => {
    try {
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
export const prescribeTherapy = (id: string): AppThunk => async (dispatch, getState, { therapyRepository }) => {
    try {
        if (id === undefined) throw new Error("Provided medical card id is undefined")
        const { medicaments } = getState().therapy
        await therapyRepository.prescribeTherapy(id, medicaments)
        dispatch(therapyPrescribed())
    } catch (error) {
        console.log(error.message)
    }
}
export const determineTherapy = (id: string): AppThunk => async (dispatch, getState, { therapyRepository }) => {
    try {
        if (id === undefined) throw new Error("Provided hospital treatment id is undefined")
        const { medicaments, label } = getState().therapy
        await therapyRepository.determineTherapy(id, label, medicaments)
        dispatch(therapyDetermined())
    } catch (error) {
        console.log(error.message)
    }
}
export const changeTherapyLabel = (id: string, newLabel: string): AppThunk => async (dispatch, getState, { therapyRepository }) => {
    try {
        if (id === undefined) throw new Error("Provided therapy id is undefined")
        await therapyRepository.changeLabel(id, newLabel)
        dispatch(labelChanged(newLabel))
    } catch (error) {
        console.log(error.message)
    }
}
export const removeTherapy = (id: string, therapy: string): AppThunk => async (dispatch, getState, { hospitalTreatmentRepository }) => {
    try {
        if (id === undefined) throw new Error("Provided hospital treatment id is undefined")
        if (id === undefined) throw new Error("Provided therapy id is undefined")
        await hospitalTreatmentRepository.removeTherapy(id, therapy)
        dispatch(therapyRemoved())
    } catch (error) {
        console.log(error.message)
    }
}
