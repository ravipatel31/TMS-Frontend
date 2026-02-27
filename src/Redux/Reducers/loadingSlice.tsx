import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface loadingslice {
    loading: boolean

}

const initialState: loadingslice = {
    loading: false

}

const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        setshowloading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload
        },
    }

})

export const { setshowloading } = loadingSlice.actions
export default loadingSlice.reducer

