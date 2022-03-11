import { AppThunk } from '../../AppThunk';
import { examinationCreated, examinationFetched } from './examinationSlice';

export const fetchExamination = (id: string): AppThunk => async (dispatch, getState, { examinationRepository }) => {
    try {
        if (id === undefined) throw new Error("Provided examination id is undefined")
        dispatch(examinationFetched(await examinationRepository.examination(id)))
    } catch (error) {
        console.log(error.message)
    }
}
export const createExamination = (id: string): AppThunk => async (dispatch, getState, { examinationRepository }) => {
    try {
        if (id === undefined) throw new Error("Provided medical card id is undefined")
        const { diagnosis: diagnose } = getState().examination
        await examinationRepository.createExamination(id, diagnose)
        dispatch(examinationCreated())
    } catch (error) {
        console.log(error.message)
    }
}