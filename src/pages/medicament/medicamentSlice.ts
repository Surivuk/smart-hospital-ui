import { createSlice } from '@reduxjs/toolkit'

interface MedicamentState {
    medicamentId: string
    strength: string
    amount: string
    route: string
    frequency: string
    added: boolean
}

const initialState: MedicamentState = {
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
        medicamentAdded: (state) => {
            state.added = true
        },
        medicamentFormInputChanged: (state, { payload }) => {
            const key: "medicamentId" | "strength" | "amount" | "route" | "frequency" = payload.type
            state[key] = payload.value
        },
        stateRestarted: () => {
            return initialState
        }
    }
})

export const { stateRestarted, medicamentFormInputChanged, medicamentAdded } = MedicamentSlice.actions
export default MedicamentSlice.reducer