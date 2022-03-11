import { createSlice } from '@reduxjs/toolkit'

interface ExaminationState {
    diagnosis: string,
    medicalCardId: string,
    created: boolean,
}

const initialState: ExaminationState = {
    diagnosis: "",
    medicalCardId: "",
    created: false,
}

export const examinationSlice = createSlice({
    name: 'examination',
    initialState,
    reducers: {
        examinationFetched: (state, { payload }) => {
            state.diagnosis = payload.diagnosis
            state.medicalCardId = payload.medicalCardId
        },
        dataChanged: (state, { payload }) => {
            const key: "diagnosis" | "medicalCardId" = payload.type
            state[key] = payload.value
        },
        examinationCreated: (state) => {
            state.created = true
        },
        stateRestarted: () => {
            return initialState
        }
    }
})

export const { stateRestarted, examinationFetched, dataChanged, examinationCreated } = examinationSlice.actions
export default examinationSlice.reducer