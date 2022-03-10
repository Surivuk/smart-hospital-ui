import { AppThunk } from '../../AppThunk';
import { monitoringUpdated, treatmentDataFetched } from './treatmentSlice';


export const fetchHospitalTreatmentData = (id: string): AppThunk => async (dispatch, getState, { hospitalTreatmentRepository }) => {
    try {
        if (id === undefined) throw new Error("Provided treatment id is undefined")
        dispatch(treatmentDataFetched(await hospitalTreatmentRepository.hospitalTreatment(id)))
    } catch (error) {
        console.log(error.message)
    }
}
export const openHospitalTreatment = (id: string): AppThunk => async (dispatch, getState, { socket }) => {
    try {
        socket.on(`hospital-treatment/${id}/data`, (data) => {
            dispatch(monitoringUpdated(JSON.parse(data)))
        })
    } catch (error) {
        console.log(error.message)
    }
}
export const closeHospitalTreatment = (id: string): AppThunk => async (dispatch, getState, { socket }) => {
    try {
        socket.off(`hospital-treatment/${id}/data`)
    } catch (error) {
        console.log(error.message)
    }
}