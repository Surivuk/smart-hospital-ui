import { AppThunk } from '../../AppThunk';
import { closedTreatment, openedTreatment, monitoringUpdated, treatmentDataFetched } from './treatmentSlice';


export const fetchHospitalTreatmentData = (id: string): AppThunk => async (dispatch, getState, { hospitalTreatmentRepository }) => {
    try {
        if (id === undefined) throw new Error("Provided treatment id is undefined")
        dispatch(treatmentDataFetched(await hospitalTreatmentRepository.hospitalTreatment(id)))
    } catch (error) {
        console.log(error.message)
    }
}
export const openHospitalTreatmentView = (id: string): AppThunk => async (dispatch, getState, { socket }) => {
    try {
        socket.on(`hospital-treatment/${id}/data`, (data) => {
            dispatch(monitoringUpdated(JSON.parse(data)))
        })
    } catch (error) {
        console.log(error.message)
    }
}
export const closeHospitalTreatmentView = (id: string): AppThunk => async (dispatch, getState, { socket }) => {
    try {
        socket.off(`hospital-treatment/${id}/data`)
    } catch (error) {
        console.log(error.message)
    }
}
export const closeHospitalTreatment = (id: string): AppThunk => async (dispatch, getState, { hospitalTreatmentRepository }) => {
    try {
        if (id === undefined) throw new Error("Provided treatment id is undefined.")
        await hospitalTreatmentRepository.closeHospitalTreatments(id)
        dispatch(closedTreatment())
    } catch (error) {
        console.log(error.message)
    }
}
export const openTreatment = (id: string): AppThunk => async (dispatch, getState, { hospitalTreatmentRepository }) => {
    try {
        if (id === undefined) throw new Error("Provided medicalCard id is undefined.")
        const { diagnosis } = getState().hospitalTreatment
        await hospitalTreatmentRepository.openTreatment(id, diagnosis)
        dispatch(openedTreatment())
    } catch (error) {
        console.log(error.message)
    }
}