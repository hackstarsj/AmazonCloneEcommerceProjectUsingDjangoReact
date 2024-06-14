import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchSidebar=createAsyncThunk('data/fetchSidebar',async()=>{
    const response=await axios.get('http://localhost:8000/api/getMenus/');
    return response.data.data;
});

const sidebarSlice=createSlice({
    name:'data',
    initialState:{
        items:[],
        status:'idle',
        error:null
    },
    reducers:{
        expandItem(state,action){
            const item=state.items.find(item=>item.id==action.payload.id)
            if(item){
                item.expanded=!item.expanded;
            }
        },
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchSidebar.pending,(state,action)=>{
            state.status='loading';
        }).
        addCase(fetchSidebar.fulfilled,(state,action)=>{
            state.status='success';
            state.items=action.payload;
        }).
        addCase(fetchSidebar.rejected,(state,action)=>{
            state.status='failed';
            state.error=action.error.message;
        });
    }
});

export const {expandItem}=sidebarSlice.actions;
export default sidebarSlice.reducer;