import { useState,useEffect, useRef } from "react";
import useApi from "../../hooks/APIHandler";
import { useNavigate } from "react-router-dom";
import { Autocomplete, Box, Breadcrumbs, Button, Divider, Grid, IconButton, LinearProgress, Rating, TextField, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { isValidUrl } from "../../utils/Helper";
import Add from '@mui/icons-material/Add';
import Delete from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';
import ExpandLessRounded from '@mui/icons-material/ExpandLessRounded';
import ExpandMoreRounded from '@mui/icons-material/ExpandMoreRounded';
import RenderImage from "../../components/RenderImage";
import { AddCircle, Close, PanoramaRounded, SaveAltRounded } from "@mui/icons-material";
import Image from "../../components/Image";
import { Controller, FormProvider, useForm } from "react-hook-form";
import FileInputComponent from "../../components/FileInputComponents";

const ManageReviews = ({product_id}) => {
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
    const [userList,setUserList]=useState([]);
    const {error,loading,callApi}=useApi();    
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
        const result=await callApi({url:`products/createProductReview/${product_id}/`,method:'POST',body:data});
        if(result){
            reset()
            getReviews();
            setShowAddReviews(false);
        }
    }

    const getUserList=async()=>{
        const result=await callApi({url:'auth/users/',method:'GET'});
        if(result){
            setUserList(result.data.data.map(item=>({id:item.id,value:item.email})));
        }
    
    }

    useEffect(()=>{
        getUserList();
    },[])

    const getReviews=async()=>{
        let order='-id';
        if(ordering.length>0){
            order=ordering[0].sort==='asc'?ordering[0].field:'-'+ordering[0].field
        }
        const result=await callApi({url:`products/productReviews/${product_id}/`,method:'GET',params:{
            page:paginationModel.page+1,
            pageSize:paginationModel.pageSize,
            search:debounceSearch,
            ordering:order
        }})
        if(result){
            setData(result.data.data.data);
            setTotalItems(result.data.data.totalItems);
            generateColumns(result.data.data.data);
        }
    }

    const toggleStatus=async(id,status)=>{
        const result=await callApi({url:`products/updateProductReview/${product_id}/${id}/`,method:'PATCH',body:{status:status}});
        if(result){
            getReviews();
        }
    }

    const generateColumns=(data)=>{
        if(data.length>0){
            const columns=[];
            for(const key in data[0]){
                if(key==='review_images'){
                    columns.push({field:'review_images',headerName:'Review Images',width:150,sortable:false,renderCell:(params)=>{
                        return <Box display={"flex"}><RenderImage data={params.row.review_images} name={params.row.review}/><IconButton onClick={()=>{ setSelectedImages(params.row.review_images); setShowImages(true);setShowAddReviews(false) }}><PanoramaRounded/></IconButton></Box>
                    }})
                }
                else if(key==='rating'){
                    columns.push({field:'rating',headerName:'Rating',width:180,sortable:false,renderCell:(params)=>{
                        return <Box display={"flex"} mt={3}><Rating value={params.row.rating} readOnly/><Typography> ({params.row.rating})</Typography></Box>
                    }})
                }
                else if(key==='status'){
                    columns.push({field:key,headerName:key.charAt(0).toUpperCase()+key.slice(1).replaceAll("_"," "),width:150,renderCell:(params)=>{
                        return params.row.status==='ACTIVE'?<Button variant="contained" color="success" onClick={()=>toggleStatus(params.row.id,"INACTIVE")}>ACTIVE</Button>:<Button variant="contained" color="error" onClick={()=>toggleStatus(params.row.id,"ACTIVE")}>INACTIVE</Button>
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

    useEffect(()=>{
        if(showImages || showAddReviews){
            divImage.current.scrollIntoView({behavior:'smooth'})
        }
    },[selectedImages,showAddReviews])

    useEffect(()=>{
        getReviews();
    },[paginationModel,debounceSearch,ordering])

    return (
        <Box component={"div"} sx={{width:'100%'}}>
            <Box display={"flex"} justifyContent={"space-between"}>
                <Typography variant="h5" mb={2}>Product Reviews </Typography>
                <Button startIcon={<AddCircle/>} variant="contained" onClick={()=>{ setShowAddReviews(true);setShowImages(false) }}>Add Reviews</Button>
            </Box>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={(showImages || showAddReviews)?8:12} lg={(showImages || showAddReviews)?9:12}>
            <TextField label="Search" variant="outlined" fullWidth onChange={(e)=>setSearchQuery(e.target.value)} margin="normal"/>
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
        </Box>
    )
}

export default ManageReviews