import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    email : "",
    name : "",
}

const userSlice = createSlice({
    name : "user",
    initialState,
    reducers: {
        login:(state , action)=>{
            state.email = action.email,
            state.name = action.name
        },
        logout:(state, action)=>{
            state.email = "";
            state.name = "";
        }
    }
});

export const {login, logout} = userSlice.actions;
export default userSlice.reducer;