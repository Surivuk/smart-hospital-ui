import { createSlice } from '@reduxjs/toolkit'

interface MedicamentState {
    medicaments: { key: string, value: string }[]
    medicamentId: string
    strength: string
    amount: string
    route: string
    frequency: string
    added: boolean
}

const initialState: MedicamentState = {
    medicaments: [],
    medicamentId: "",
    strength: "",
    amount: "",
    route: "",
    frequency: "",
    added: false
}

export const MedicamentSlice = createSlice({
    name: 'medicament',
    initialState,
    reducers: {
        medicamentsFetched: (state, { payload }) => {
            state.medicaments = payload.map((m: any) => ({ key: m.id, value: m.name }))
        },
        medicamentAdded: (state) => {
            state.added = true
        },
        medicamentFormInputChanged: (state, { payload }) => {
            const key: "medicamentId" | "strength" | "amount" | "route" | "frequency" = payload.type
            state[key] = payload.value
        },
        stateRestarted: (state) => {
            return { ...initialState, medicaments: state.medicaments }
        }
    }
})

export const { stateRestarted, medicamentFormInputChanged, medicamentAdded, medicamentsFetched } = MedicamentSlice.actions
export default MedicamentSlice.reducer