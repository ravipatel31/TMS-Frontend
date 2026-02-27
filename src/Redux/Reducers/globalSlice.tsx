import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface globalvalues  {
    currentPage:string
    isMobileVerify:boolean
    userDetails:any
    seletedOption:string
}

const initialState:globalvalues = {
    currentPage:'',
    isMobileVerify:false,
    userDetails:null,
    seletedOption:"horse"

}
const globalSlice = createSlice({
    name:'global',
    initialState,
    reducers:{
        setcurrentPage(state,action:PayloadAction<string>){
            state.currentPage = action.payload
        },
        setisMobileVerify(state,action:PayloadAction<boolean>){
            state.isMobileVerify = action.payload
        },
        setuserDetails(state,action:PayloadAction<any>){
            state.userDetails = action.payload
        },
        setSelectedOption(state,action:PayloadAction<string>){
            state.seletedOption = action.payload
        }
    }

})
export const {setcurrentPage, setisMobileVerify, setuserDetails, setSelectedOption} = globalSlice.actions
export default globalSlice.reducer 