import { AppThunk } from '../../AppThunk';
import { dataFetched, medicamentsFetched, dateChanged } from './healthDataSlice';

export const fetchData = (id: string): AppThunk => async (dispatch, getState, { healthDataRepository }) => {
    try {
        if (id === undefined) throw new Error("Provided treatment id is undefined")
        const { selectedDate } = getState().healthData
        dispatch(dataFetched(await healthDataRepository.healthData(selectedDate, id)))
    } catch (error) {
        console.log(error.message)
    }
}
export const fetchMedicaments = (id: string, timestamp: string): AppThunk => async (dispatch, getState, { therapyRepository }) => {
    try {
        if (id === undefined) throw new Error("Provided treatment id is undefined")
        dispatch(medicamentsFetched(await therapyRepository.medicamentsUntil(id, timestamp)))
    } catch (error) {
        console.log(error.message)
    }
}
export const changeDate = (id: string, date: string): AppThunk => async (dispatch, getState) => {
    try {
        dispatch(dateChanged(date))
        dispatch(fetchData(id))
    } catch (error) {
        console.log(error.message)
    }
}