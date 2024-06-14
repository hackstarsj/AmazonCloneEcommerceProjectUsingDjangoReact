import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "../reducer/sidebardata";
const store=configureStore({
    reducer:{
        sidebardata:sidebarReducer
    }
});

export default store;