import { Save } from "@mui/icons-material";
import { Box, Button, Divider, FormControlLabel, Grid, Switch, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import useApi from "../../hooks/APIHandler";
import { set } from "react-hook-form";
import { toast } from "react-toastify";

const ManageUserPermission = ({id}) => {

    const [allowAll,setAllowAll]=useState(false);
    const [permissions,setPermissions]=useState([])
    const {error,loading,callApi}=useApi();
    const theme=useTheme();

    const savePermission=async()=>{
        let response=await callApi({url:`auth/userpermission/${id}/`,method:'POST',body:permissions});
        console.log(response);
        toast.success("Permission Updated Successfully");
        await fetchPermission();
    }

    const fetchPermission=async()=>{
        let response=await callApi({url:`auth/userpermission/${id}/`});
        setPermissions(response.data.data);
    }

    useEffect(()=>{
        fetchPermission();
    },[])

    const changePermission=(index)=>{
        let temp=[...permissions];
        temp[index].is_permission=temp[index].is_permission===1?0:1;
        temp[index].children.map((child)=>{
            child.is_permission=temp[index].is_permission;
        })
        setPermissions(temp);
    }

    const changePermissionChild=(parent_id,child_id,value)=>{
        let temp=[...permissions];
        temp.forEach((permission)=>{
            if(permission.module_id==parent_id){
                permission.children.forEach((child)=>{
                    if(child.module_id==child_id){
                        child.is_permission=value===0?1:0;
                    }
                });

                permission.is_permission=permission.children.some(submodule=>submodule.is_permission===1)?1:0;
            }

        })
        setPermissions(temp);
    }

    const toggleAllPermission=()=>{
        let temp=[...permissions];
        temp.map((permission)=>{
            permission.is_permission=!allowAll;
            permission.children.map((child)=>{
                child.is_permission=!allowAll;
            })
        })
        setPermissions(temp);
        setAllowAll(!allowAll);
    }

    return <Box component={"div"} sx={{width:'100%'}}>
            <Box display={"flex"} justifyContent={"space-between"}>
                <Typography variant="h5" mb={2}>User Permission </Typography>
                <Box>
                    <FormControlLabel control={<Switch checked={allowAll} onChange={()=>{toggleAllPermission()}}/>} label="Allow All"/>
                    <Button startIcon={<Save/>} variant="contained" onClick={()=>{ savePermission() }}>Save</Button>
                </Box>
                </Box>  
                <Divider sx={{mb:2}}/>

                <Grid container spacing={2}>
                {
                    permissions.map((permission,index)=>{
                        return <React.Fragment>
                            <Grid key={permission.id} item xs={12} lg={12} display={"flex"} justifyContent={"space-between"} sx={{background:theme.palette.background.paper}}>
                                <Typography variant="body1">{permission.module_name}</Typography>
                                <Switch checked={permission.is_permission} onChange={()=>{ changePermission(index) }}/>
                        </Grid>
                        {
                            permission.children.map((child,index)=>(
                                <Grid key={permission.id} item xs={12} lg={12} display={"flex"} justifyContent={"space-between"} sx={{background:theme.palette.background.default}}>
                                    <Typography variant="body1">{child.module_name}</Typography>
                                    <Switch checked={child.is_permission} onChange={()=>{ changePermissionChild(child.parent_id_id,child.module_id,child.is_permission) }}/>
                                </Grid>
                            ))
                        }
                        <Grid item xs={12}>
                                <Divider/>
                        </Grid>
                        </React.Fragment>
                    })
                }
                </Grid>
    </Box>

}
export default ManageUserPermission;