import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Day } from "date-fns";
import dayjs, { Dayjs } from "dayjs";

export interface globalvalues  {
    seletedDate: Date | Dayjs | null | string
    selecetdTrack : string
}

const initialState:globalvalues = {
    seletedDate:dayjs().toISOString(),
    selecetdTrack:'Track1'

}
const dashboardSlice = createSlice({
    name:'global',
    initialState,
    reducers:{
        setSelecetdDate(state,action:PayloadAction<Date | Dayjs | null>){
            state.seletedDate = action.payload
        },
        setSelectedTrack(state,action:PayloadAction<string>){
            state.selecetdTrack = action.payload
        },
        
    }

})
export const {setSelecetdDate,setSelectedTrack} = dashboardSlice.actions
export default dashboardSlice.reducer 