import {createSlice} from "@reduxjs/toolkit";

const initialState ={
    number : 0
};

const countSlice = createSlice({
    name:"count",
    initialState,
    reducers : {
        increamemt:(state , action)=>{
            state.number += 1;
        },
        decreament: (state, action)=>{
            state.number -= 1;
        },
        increamemtByAmount: (state , action)=>{
            state.number += action.payload;
        }
    }
});


export const {increamemt , decreament , increamemtByAmount} = countSlice.actions;

export default countSlice.reducer;