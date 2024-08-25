import {configureStore} from "@reduxjs/toolkit";
import countSlice from "./countSlice";
import userSlice from "./userSlice";

const store = configureStore({
    reducer:{
        counter : countSlice,
        user : userSlice
    }
});

export default store;