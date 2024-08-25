import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    id:"",
    name:'',
}

const userSlice= createSlice({
    name:"user",
    initialState,
    reducers:{
        loginAction:(state,action)=>{
            state.id = action.payload.id;
            state.name = action.payload.name;
        },
        logoutAction:(state)=>{
            state.id = "";
            state.name="";
        }
    }
});

export const {loginAction , logoutAction} = userSlice.actions;
export default userSlice;