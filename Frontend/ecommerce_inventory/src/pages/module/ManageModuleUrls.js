import { Autocomplete, Box, Breadcrumbs, Button, Grid, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useApi from "../../hooks/APIHandler";
import React, { useEffect, useState } from "react";
import { Add, Save } from "@mui/icons-material";
import { toast } from "react-toastify";

const ManageModuleUrls = () => {
    const navigate=useNavigate();
    const {error,loading,callApi}=useApi();
    const [moduleUrls,setModuleUrls]=useState([]);
    const [urlList,setUrlList]=useState([]);
    const [moduleList,setModuleList]=useState([]);

    const fetchModuleUrls=async()=>{
        let response=await callApi({url:'moduleUrls/'});
        setModuleList(response.data.data.modules);
        setUrlList(response.data.data.project_urls);
        setModuleUrls(response.data.data.moduleUrls);
    }

    useEffect(()=>{
        fetchModuleUrls();
    },[])

    const addMore=()=>{
        setModuleUrls([...moduleUrls,{url:'',module:0}]);
    }

    const saveUrls=async()=>{
        console.log(moduleUrls);
        let response=await callApi({url:'moduleUrls/',method:'post',body:moduleUrls});
        console.log(response);
        toast.success(response.data.message);
        fetchModuleUrls();
    }

    const changeModule=(moduleId,index)=>{
        let newModuleUrls=[...moduleUrls];
        newModuleUrls[index].module=moduleId;
        setModuleUrls(newModuleUrls);
    }

    const onChangeUrl=(url,index)=>{
        let newModuleUrls=[...moduleUrls];
        newModuleUrls[index].url=url;
        setModuleUrls(newModuleUrls)
    }

    return <Box>
        <Breadcrumbs>
            <Typography variant="body2" onClick={()=>navigate('/')}>Home</Typography>
            <Typography variant="body2" onClick={()=>navigate('/manage/moduleUrls/')}>Manage Module Urls</Typography>
        </Breadcrumbs>
        <Grid container spacing={2} mt={2}>
                {
                    moduleUrls.map((moduleUrl,index)=>(
                        <React.Fragment key={index}>
                            <Grid item xs={12} sm={6} md={6} lg={6}>
                                <Autocomplete   
                                    freeSolo
                                    options={urlList}
                                    onChange={(event,newValue)=>{
                                        onChangeUrl(newValue,index);
                                    }}
                                    value={moduleUrl.url}
                                    onInputChange={(event,newValue)=>{
                                        onChangeUrl(newValue,index);
                                    }}
                                    renderInput={(params)=>(
                                        <TextField
                                        {...params}
                                        label={"Enter Url"}
                                        variant='outlined'
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={6}>
                            <Autocomplete   
                                    options={moduleList}
                                    getOptionLabel={(option)=>option.module_name}
                                    defaultValue={moduleList.find(option=>option.id===moduleUrl.module) || moduleList.find(option=>option?.id===0)}
                                    onChange={(event,newValue)=>{
                                        changeModule(newValue?.id,index);
                                    }}
                                    renderInput={(params)=>(
                                        <TextField
                                        {...params}
                                        label={"Select Module"}
                                        variant='outlined'
                                        />
                                    )}
                                    />
                            </Grid>
                        </React.Fragment>
                    ))
                }
        </Grid>
        <Grid container spacing={2} mt={2}>
            <Grid item xs={12} lg={6} md={6} sm={6}>
                <Button variant="contained" onClick={addMore} startIcon={<Add/>} fullWidth>Add More</Button>
            </Grid>
            <Grid item xs={12} lg={6} sm={6} md={6}>
                <Button variant="contained" onClick={saveUrls} startIcon={<Save/>} fullWidth>Save Urls</Button>
            </Grid>
        </Grid>
    </Box>
}
export default ManageModuleUrls;