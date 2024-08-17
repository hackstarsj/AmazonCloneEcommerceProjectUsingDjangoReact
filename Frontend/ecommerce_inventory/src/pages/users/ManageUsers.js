import React, { useState,useEffect, useRef } from "react";
import useApi from "../../hooks/APIHandler";
import { useNavigate } from "react-router-dom";
import { Autocomplete, Box, Breadcrumbs, Button, Collapse, Dialog, DialogContent, Divider, Grid, Icon, IconButton, LinearProgress, Rating, Switch, TextField, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { formatText, isValidUrl } from "../../utils/Helper";
import Add from '@mui/icons-material/Add';
import Delete from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';
import ExpandLessRounded from '@mui/icons-material/ExpandLessRounded';
import ExpandMoreRounded from '@mui/icons-material/ExpandMoreRounded';
import RenderImage from "../../components/RenderImage";
import { AddCircle, Circle, Close, PanoramaRounded, SaveAltRounded, SecurityOutlined, ViewCompact } from "@mui/icons-material";
import Image from "../../components/Image";
import { Controller, FormProvider, useForm } from "react-hook-form";
import FileInputComponent from "../../components/FileInputComponents";
import ManageUserPermission from "./ManageUserPermission";

const ManageUsers = ({onSupplierSelect}) => {
    const [data,setData]=useState([]);
    const [columns,setColumns]=useState([]);
    const [paginationModel,setPaginationModel]=useState({
        page:0,
        pageSize:5
    })
    const [totalItems,setTotalItems]=useState(0);
    const [searchQuery,setSearchQuery]=useState("");
    const [debounceSearch,setDebounceSearch]=useState("");
    const [ordering,setOrdering]=useState([{field:'id',sort:'desc'}]);
    const [showImages,setShowImages]=useState(false);
    const [showAddReviews,setShowAddReviews]=useState(false);
    const [selectedImages,setSelectedImages]=useState([]);
    const [filterFields,setFilterFields]=useState([]);
    const [userList,setUserList]=useState([]);
    const [showAdvanceSearch,setShowAdvanceSearch]=useState(false);
    const [aFilterFields,setAFilterFields]=useState(onSupplierSelect?{'role':'Supplier'}:{});
    const {error,loading,callApi}=useApi();  
    const [jsonData,setJsonData]=useState([]);
    const [open,setOpen]=useState(false);
    const [modalTitle,setModalTitle]=useState('');
    const [openPermission,setOpenPermission]=useState(false);
    const [openPermissionUserId,setOpenPermissionUserId]=useState(null);
  
    const divImage=useRef();
    const navigate=useNavigate();
    const methods=useForm();
    const {register,watch,setValue,formState:{errors},control,reset}=methods;

    useEffect(()=>{
        const timer=setTimeout(()=>{
            setDebounceSearch(searchQuery);
        },1000)

        return ()=>{
            clearTimeout(timer);
        }
    },[searchQuery])

    const onSubmitAddReview=async(data)=>{
        // const result=await callApi({url:`products/createProductReview/`,method:'POST',body:data});
        // if(result){
        //     reset()
        //     getReviews();
        //     setShowAddReviews(false);
        // }
    }

    

    const getUsers=async()=>{
        let order='-id';
        if(ordering.length>0){
            order=ordering[0].sort==='asc'?ordering[0].field:'-'+ordering[0].field
        }
        const result=await callApi({url:`auth/userlist/`,method:'GET',params:{
            page:paginationModel.page+1,
            pageSize:paginationModel.pageSize,
            search:debounceSearch,
            ordering:order,
            ...aFilterFields
        }})
        if(result){
            setData(result.data.data.data);
            setTotalItems(result.data.data.totalItems);
            generateColumns(result.data.data.data);
            setFilterFields(result.data.data.filterFields);
        }
    }

    const toggleStatus=async(id,status)=>{
        const result=await callApi({url:`auth/updateuser/${id}/`,method:'PATCH',body:{account_status:status}});
        if(result){
           await getUsers();
        }
    }

    const showJSONData=(data,title)=>{
        setModalTitle(title)
        setJsonData(data)
        setOpen(true);        

    }

    const generateColumns=(data)=>{
        if(data.length>0){
            const columns=[{
                field:'Action',
                headerName:'Action',
                width:onSupplierSelect?150:100,
                renderCell:(params)=>{
                    return <>
                    {onSupplierSelect &&
                    <IconButton onClick={()=>onSupplierSelect(params.row)}><Add/></IconButton>}
                    <IconButton onClick={()=>navigate(`/form/users/${params.row.id}`)}>
                        <Edit color="primary" />
                    </IconButton>
                    <IconButton onClick={()=>{ setOpenPermissionUserId(params.row.id); setOpenPermission(true); }}><SecurityOutlined color="primary"/></IconButton>
                </>
                }
            }];
            for(const key in data[0]){
                if(key==='profile_pic'){
                    columns.push({field:'profile_pic',headerName:'Profile',width:150,sortable:false,renderCell:(params)=>{
                        return <Box display={"flex"}><RenderImage data={params.row.profile_pic} name={params.row.username}/></Box>
                    }})
                }
                else if(key==='account_status'){
                    columns.push({field:'account_status',headerName:'Status',width:150,renderCell:(params)=>{
                        return params.row.account_status==='Active'?<Switch checked={true} onClick={()=>toggleStatus(params.row.id,"Inactive")}/>:<Switch checked={false} onClick={()=>toggleStatus(params.row.id,"Active")}/>
                    }})
                }
                else if(key==="addition_details"){
                    columns.push({field:"addition_details",headerName:"Additional Details",width:150,sortable:false,renderCell:(params)=>{
                        return <Button onClick={()=>showJSONData(params.row.addition_details,"Additional")} startIcon={<ViewCompact/>} variant="contained">View</Button>
                    }})
                }
                else if(key==="social_media_links"){
                    columns.push({field:"social_media_links",headerName:"Social Links",width:150,sortable:false,renderCell:(params)=>{
                        return <Button onClick={()=>showJSONData(params.row.social_media_links,"Social Links")} startIcon={<ViewCompact/>} variant="contained">View</Button>
                    }})
                }
                else{
                    columns.push({field:key,headerName:key.charAt(0).toUpperCase()+key.slice(1).replaceAll("_"," "),width:150})
                }
            }
            setColumns(columns);
        }
    }

    const handleSorting=(newModel)=>{
        setOrdering(newModel);
    }

    const onSubmitFilter=(data)=>{
        const filterData=Object.fromEntries(
            Object.entries(data).filter(([key,value])=>value!=="")
        )
        setAFilterFields(filterData);
    }

    useEffect(()=>{
        if(showImages || showAddReviews){
            divImage.current.scrollIntoView({behavior:'smooth'})
        }
    },[selectedImages,showAddReviews])

    const resetFilter=()=>{
        let fields={}
        for(const field of filterFields){
            fields[field.key]=null;
        }
        methods.reset(fields);
        setAFilterFields({});
    }

    useEffect(()=>{
        getUsers();
    },[paginationModel,debounceSearch,ordering,aFilterFields])

    return (
        <Box component={"div"} sx={{width:'100%'}}>
            {!onSupplierSelect &&
            <Box display={"flex"} justifyContent={"space-between"}>
                <Breadcrumbs>
                    <Typography variant="body2" onClick={()=>navigate('/')}>Home</Typography>
                    <Typography variant="body2" onClick={()=>navigate('/manage/users')}>Manage (Customer/Supplier/Admin/Staff)</Typography>
                </Breadcrumbs>
                <Button startIcon={<AddCircle/>} variant="contained" onClick={()=>{ navigate('/form/users') }}>Add Users</Button>
            </Box>}
            <Grid container spacing={2}>
                <Grid item xs={12} sm={(showImages || showAddReviews)?8:12} lg={(showImages || showAddReviews)?9:12}>
            <Grid container spacing={2}>
                <Grid item xs={12} lg={9} md={8} sm={7}>
                    <TextField label="Search" variant="outlined" fullWidth onChange={(e)=>setSearchQuery(e.target.value)} margin="normal"/>
                </Grid>
                <Grid item xs={12} lg={3} md={4} sm={5}> 
                    {showAdvanceSearch?<Button sx={{mt:{lg:3,sm:3,md:3},mb:{xs:3}}} variant="outlined" fullWidth onClick={()=>setShowAdvanceSearch(false)} startIcon={<ExpandLessRounded/>}>Hide Advance Search</Button>:<Button sx={{mt:{lg:3,sm:3,md:3},mb:{xs:3}}} fullWidth variant="outlined" onClick={()=>setShowAdvanceSearch(true)} startIcon={<ExpandMoreRounded/>}>Advance Search</Button>}
                </Grid>
            </Grid>
            <Collapse in={showAdvanceSearch}>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmitFilter)}>
            <Grid container spacing={2} mb={2}> 
            {
                filterFields.length>0 && filterFields.map((field,index)=>(
                    <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                        {field.option?<Autocomplete
                    sx={{ mt: 2 }}
                    {...register(field.key)}
                    options={field.option}
                    getOptionLabel={(option) => option.value}
                    value={field.option.find(option => option.id === watch(field.key)) || null}
                    onChange={(event, newValue) => {
                    setValue(field.key, newValue ? newValue.id : '');
                    }}
                    renderInput={(params) => (
                    <TextField
                        {...params}
                        label={formatText(field.key)}
                        variant="outlined"
                    />
                    )}
                />:<TextField label={formatText(field.key)} variant="outlined" fullWidth margin="normal" {...register(field.key)}/>}
                    </Grid>
                ))
            }
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <Button variant="contained" fullWidth type="submit">Apply Filter</Button>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <Button variant="contained" fullWidth type="button" onClick={()=>resetFilter()}>Reset Filter</Button>
            </Grid>
            </Grid>
            </form>
            </FormProvider>
            </Collapse>
            <DataGrid
                rows={data}
                columns={columns}
                rowHeight={75}
                autoHeight={true}
                sortingOrder={['asc','desc']}
                sortModel={ordering}
                onSortModelChange={handleSorting}
                paginationMode="server"
                initialState={{
                    ...data.initialState,
                    pagination:{paginationModel:paginationModel}
                }}
                pageSizeOptions={[5,10,20]}
                pagination
                rowCount={totalItems}
                loading={loading}
                rowSelection={false}
                onPaginationModelChange={(pagedetails)=>{
                    setPaginationModel({
                        page:pagedetails.page,
                        pageSize:pagedetails.pageSize
                    
                    })
                }}
                slots={
                    {

                        loadingOverlay:LinearProgress,
                        toolbar:GridToolbar,
                    }
                }

                />
                </Grid>
                    {showImages && <Grid item xs={12} sm={4} lg={3} sx={{height:'600px',overflowY:'auto'}} ref={divImage}>
                        <Box m={2} display={"flex"} justifyContent={"space-between"}>
                            <Typography variant="h6">Review Images</Typography>
                            <IconButton onClick={()=>setShowImages(false)}><Close/></IconButton>
                        </Box>
                        <Divider/>
                         {
                            selectedImages.length>0 && selectedImages.map((image,index)=>(
                                <Box key={index} display="flex" justifyContent="center" alignItems="center" p={1}>
                                    <Image src={image} style={{width:'100%'}} />
                                </Box>
                            ))
                         }
                    </Grid>}
                    {showAddReviews && <Grid item xs={12} sm={4} lg={3} sx={{height:'600px',overflowY:'auto'}} ref={divImage}>
                        <Box m={2} display={"flex"} justifyContent={"space-between"}>
                            <Typography variant="h6">Add Reviews</Typography>
                            <IconButton onClick={()=>setShowAddReviews(false)}><Close/></IconButton>
                        </Box>
                        <Divider/>
                        <FormProvider {...methods}>
                            <form onSubmit={methods.handleSubmit(onSubmitAddReview)}>
                                <TextField label="Review" sx={{marginBottom:'15px'}} variant="outlined" fullWidth margin="normal" {...register('reviews',{required:true})} error={!!errors['reviews']} helperText={!!error['reviews'] && 'This Field is Required'}/>
                                <Controller
                                    name="rating"
                                    control={control}
                                    required={true}
                                    defaultValue={0}
                                    render={({field})=>(
                                        <Rating {...field} name="rating" sx={{marginBottom:'15px'}} defaultValue={0} precision={1}/>
                                    )}
                                />
                                {
                                    !!errors['rating'] && <Typography variant="caption" color="error">This Field is Required</Typography>
                                }
                                <Autocomplete   
                                    mb={2}
                                    {...register('review_user_id',{required:true})}
                                    options={userList}
                                    getOptionLabel={(option)=>option.value}
                                    defaultValue={userList.find(option=>option.id===watch('review_user_id')) || null}
                                    onChange={(event,newValue)=>{
                                        setValue("review_user_id",newValue?newValue.id:'')
                                    }}
                                    renderInput={(params)=>(
                                        <TextField
                                        {...params}
                                        sx={{marginBottom:'15px'}}
                                        label={"Review User"}
                                        variant='outlined'
                                        error={!!errors["review_user_id"]}
                                        helperText={!!errors["review_user_id"] && 'This Field is Required'}
                                        />
                                        )}
                                    />
                                 <FileInputComponent field={{name:"review_images",required:true,label:'Review Images'}}/>
                                <Button sx={{marginBottom:'15px'}} variant="contained" type="submit" fullWidth startIcon={<SaveAltRounded/>}>Add Review</Button>

                            </form>
                        </FormProvider>
                        <Divider/>
                    </Grid>}
                </Grid>
                <Dialog open={open} fullWidth={true} maxWidth={"lg"} onClose={()=>setOpen(false)} aria-labelledby="form-dialog-title">
                        <DialogContent>
                            <Typography variant="h5" mb={2}>{modalTitle} Details </Typography>
                            <Divider />
                             {
                                jsonData.map((item,index)=>(
                                    <React.Fragment key={index}>
                                       <Typography  mt={2}><Circle sx={{fontSize:'12px',marginRight:'10px'}} /> {item.key} - {item.value}</Typography>
                                        <Divider/>
                                    </React.Fragment>
                                ))
                             }
                        </DialogContent>
                </Dialog>
                <Dialog open={openPermission} fullWidth={true} maxWidth={"lg"} onClose={()=>setOpenPermission(false)} aria-labelledby="form-dialog-title">
                        <DialogContent>
                            <ManageUserPermission id={openPermissionUserId}/>
                        </DialogContent>
                </Dialog>
        </Box>
    )
}

export default ManageUsers