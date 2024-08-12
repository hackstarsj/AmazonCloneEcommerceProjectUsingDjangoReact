import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../../utils/config';

export const fetchSidebar=createAsyncThunk('data/fetchSidebar',async()=>{
    const response=await axios.get(`${config.API_URL}getMenus/`,{headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}});
    const sidebarData=response.data.data;
    const setActiveAndExpanded=(item)=>{
        if(item.module_url && window.location.pathname.indexOf(item.module_url)!==-1){
            item.active=true;
            item.expanded=true;
            return true;
        }
        if(item.submenus && item.submenus.length>0){
            return item.submenus.some(submenu=>setActiveAndExpanded(submenu));
        }
        return false;
    }

    sidebarData.forEach(item=>{
        if(setActiveAndExpanded(item)){
            item.expanded=true;
        }
    });

    return sidebarData;
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
        activateItem(state,action){
            state.items.forEach(item=>{
                item.active=false;
                item.expanded=false;
                item.submenus?.forEach(submenu=>{
                    submenu.active=false;
                    if(submenu.id===action.payload.item.id){
                        submenu.active=true;
                    }
                });

                if(item.id===action.payload.item?.id || item.id===action.payload.item?.parent_id){
                    item.active=true;
                    item.expanded=true;
                }
            });
        },
        triggerPageChange(state,action){
            state.items.forEach(item=>{
                item.active=false;
                item.expanded=false;
                item.submenus.forEach(submenu=>{
                    submenu.active=false;
                    if(submenu.module_url && window.location.pathname.indexOf(submenu.module_url)!==-1){
                        submenu.active=true;
                        item.active=true;
                        item.expanded=true;
                    }
                });

                if(item.module_url && window.location.pathname.indexOf(item.module_url)!==-1 && item.submenus.length===0){
                    item.active=true;
                    item.expanded=true;
                }
            });
        }
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

export const {expandItem,activateItem,triggerPageChange}=sidebarSlice.actions;
export default sidebarSlice.reducer;