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
import { AddCircle, Close, EditNote, PanoramaRounded, SaveAltRounded } from "@mui/icons-material";
import Image from "../../components/Image";
import { Controller, FormProvider, useForm } from "react-hook-form";
import FileInputComponent from "../../components/FileInputComponents";

const ManageQuestions = ({product_id}) => {
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
    const [showAddQuestions,setShowAddQuestions]=useState(false);
    const [editId,setEditId]=useState(null);
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

    const onSubmitAddQuestion=async(data)=>{
        let result=null;
        if(editId){
            result=await callApi({url:`products/updateProductQuestion/${product_id}/${editId}/`,method:'PATCH',body:data});
            setEditId(null);
        }
        else{
            result=await callApi({url:`products/createProductQuestion/${product_id}/`,method:'POST',body:data});
        }
        if(result){
            reset()
            getQuestions();
            setShowAddQuestions(false);
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

    const getQuestions=async()=>{
        let order='-id';
        if(ordering.length>0){
            order=ordering[0].sort==='asc'?ordering[0].field:'-'+ordering[0].field
        }
        const result=await callApi({url:`products/productQuestions/${product_id}/`,method:'GET',params:{
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
        const result=await callApi({url:`products/updateProductQuestion/${product_id}/${id}/`,method:'PATCH',body:{status:status}});
        if(result){
            getQuestions();
        }
    }

    const editQuestion=(row)=>{
        setValue('question',row.question);
        setValue('answer',row.answer);
        setEditId(row.id);
        setShowAddQuestions(true);
    }

    const generateColumns=(data)=>{
        if(data.length>0){
            const columns=[{
                field:'action',
                headerName:'Action',
                width:100,
                renderCell:(params)=>{
                    return (
                        <Box display="flex" justifyContent="center" alignItems="center" mt={3}>
                            <IconButton onClick={()=>editQuestion(params.row)}><Edit color="primary"/></IconButton>
                        </Box>
                    )
                }
            }];
            for(const key in data[0]){
                if(key==='status'){
                    columns.push({field:key,headerName:key.charAt(0).toUpperCase()+key.slice(1).replaceAll("_"," "),width:150,renderCell:(params)=>{
                        return params.row.status==='ACTIVE'?<Button variant="contained" color="success" onClick={()=>toggleStatus(params.row.id,"INACTIVE")}>ACTIVE</Button>:<Button variant="contained" color="error" onClick={()=>toggleStatus(params.row.id,"ACTIVE")}>INACTIVE</Button>
                    }})
                }
                else if(key==="question"){
                    columns.push({field:"question",headerName:key.charAt(0).toUpperCase()+key.slice(1).replaceAll("_"," "),width:300})
                }
                else if(key==="answer"){
                    columns.push({field:"answer",headerName:key.charAt(0).toUpperCase()+key.slice(1).replaceAll("_"," "),width:300})
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
        if(showAddQuestions){
            divImage.current.scrollIntoView({behavior:'smooth'})
        }
    },[showAddQuestions])

    useEffect(()=>{
        getQuestions();
    },[paginationModel,debounceSearch,ordering])

    return (
        <Box component={"div"} sx={{width:'100%'}}>
            <Box display={"flex"} justifyContent={"space-between"}>
                <Typography variant="h5" mb={2}>Product Questions </Typography>
                <Button startIcon={<AddCircle/>} variant="contained" onClick={()=>{ setShowAddQuestions(true);setEditId(null); }}>Add Questions</Button>
            </Box>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={(showAddQuestions)?7:12} lg={(showAddQuestions)?9:12}>
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
                    {showAddQuestions && <Grid item xs={12} sm={5} lg={3} sx={{height:'600px',overflowY:'auto'}} ref={divImage}>
                        <Box m={2} display={"flex"} justifyContent={"space-between"}>
                            <Typography variant="h6">{editId?'Edit':'Add'} Question & Answer</Typography>
                            <IconButton onClick={()=>setShowAddQuestions(false)}><Close/></IconButton>
                        </Box>
                        <Divider/>
                        <FormProvider {...methods}>
                            <form onSubmit={methods.handleSubmit(onSubmitAddQuestion)}>
                                <TextField label="Question" sx={{marginBottom:'15px'}} variant="outlined" fullWidth margin="normal" {...register('question',{required:true})} error={!!errors['question']} helperText={!!error['question'] && 'This Field is Required'}/>
                                <TextField label="Answer" sx={{marginBottom:'15px'}} variant="outlined" fullWidth margin="normal" {...register('answer',{required:true})} error={!!errors['answer']} helperText={!!error['answer'] && 'This Field is Required'}/>
                                <Button sx={{marginBottom:'15px'}} variant="contained" type="submit" fullWidth startIcon={<SaveAltRounded/>}>{editId?'Update':'Add'} Question & Answer</Button>

                            </form>
                        </FormProvider>
                        <Divider/>
                    </Grid>}
                </Grid>
        </Box>
    )
}

export default ManageQuestions