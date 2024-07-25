import { useState,useEffect, useRef } from "react";
import useApi from "../../hooks/APIHandler";
import { useNavigate } from "react-router-dom";
import { Box, Breadcrumbs, Button, Dialog, DialogContent, Divider, Grid, IconButton, LinearProgress, Switch, Table, TextField, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { isValidUrl } from "../../utils/Helper";
import Add from '@mui/icons-material/Add';
import Delete from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';
import RenderImage from "../../components/RenderImage";
import { AddCardOutlined, AddCircleOutlineRounded, AddOutlined, Circle, Close, Dashboard, GridViewOutlined, PanoramaRounded } from "@mui/icons-material";
import { set } from "react-hook-form";
import React from "react";
import ViewCompactIcon from '@mui/icons-material/ViewCompact';
import Image from "../../components/Image";
import RackAndShelfCard from "./RackAndShelfCard";
import DynamicForm from "../DynamicForm";

const ManageWarhouse = () => {
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
    const {error,loading,callApi}=useApi();
    const [jsonData,setJsonData]=useState([]);
    const [open,setOpen]=useState(false);
    const [modalTitle,setModalTitle]=useState('');
    const [showAddRackAndShelf,setShowAddRackAndShelf]=useState(false);
    const [showViewRackAndShelf,setShowViewRackAndShelf]=useState(false);
    const [selectedRackAndShelfList,setSelectedRackAndShelfList]=useState([]);
    const [selectedRackShelfId,setSelectedRackShelfId]=useState(null);
    const divImage=useRef();

    const navigate=useNavigate();

    useEffect(()=>{
        const timer=setTimeout(()=>{
            setDebounceSearch(searchQuery);
        },1000)

        return ()=>{
            clearTimeout(timer);
        }
    },[searchQuery])

    const handleClose=()=>{
        setOpen(false);
    }


    const getWarehouse=async()=>{
        let order='-id';
        if(ordering.length>0){
            order=ordering[0].sort==='asc'?ordering[0].field:'-'+ordering[0].field
        }
        const result=await callApi({url:'inventory/warehouse/',method:'GET',params:{
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

    const onEditClick=(params)=>{
        console.log(params);
        navigate(`/form/warehouse/${params.row.id}`)
    }
    const onAddClick=(params)=>{
        console.log(params);
        navigate('/form/warehouse')
    }


    const showJSONData=(item,title)=>{
        setModalTitle(title)
        setJsonData(item)
        setOpen(true);        
    }

    useEffect(()=>{
        if(showAddRackAndShelf || showViewRackAndShelf){
            divImage.current.scrollIntoView({behavior:'smooth'})
        }
    },[showAddRackAndShelf,showViewRackAndShelf])

    const toggleStatus=async(id,status)=>{
        const result=await callApi({url:`inventory/toggleWarehouse/${id}/`,method:'PATCH',body:{status:status}});
        if(result){
            getWarehouse();
        }
    }

    const generateColumns=(data)=>{
        if(data.length>0){
            let columns=[{field:'action',headerName:'Action',width:180,sortable:false,renderCell:(params)=>{
                return <>
                    <IconButton onClick={()=>onAddClick(params)}>
                        <Add color="light" />
                    </IconButton>
                    <IconButton onClick={()=>onEditClick(params)}>
                        <Edit color="primary" />
                    </IconButton>
                </>
            }}];
            for(const key in data[0]){
                if(key==='rack_shelf_floor'){
                    columns.push({field:"rack_shelf_floor",headerName:"Rack Shelf & Floor",width:150,sortable:false,renderCell:(params)=>{
                        return <Box display={"flex"} mt={2}>
                            <IconButton onClick={()=>{setSelectedRackAndShelfList(params.row.rack_shelf_floor);setShowViewRackAndShelf(true);setShowAddRackAndShelf(false)}}><GridViewOutlined color="primary"/></IconButton>
                            <IconButton onClick={()=>{setSelectedRackShelfId(null);setShowViewRackAndShelf(false);setShowAddRackAndShelf(true)}}><AddCircleOutlineRounded color="primary"/></IconButton>
                        </Box>
                    }})
                }
                else if(key==="additional_details"){
                    columns.push({field:"additional_details",headerName:"Additional Details",width:150,sortable:false,renderCell:(params)=>{
                        return <Button onClick={()=>showJSONData(params.row.additional_details,"Additional")} startIcon={<ViewCompactIcon/>} variant="contained">View</Button>
                    }})
                }
                else if(key==="status"){
                    columns.push({field:"status",headerName:"Status",width:100,sortable:false,renderCell:(params)=>{
                        return params.row.status==="ACTIVE"?<Switch checked={true} onClick={()=>toggleStatus(params.row.id,"INACTIVE")}/>:<Switch checked={false} onClick={()=>toggleStatus(params.row.id,"ACTIVE")}/>
                    }})
                }
                else{
                    columns.push({field:key,headerName:key.charAt(0).toUpperCase()+key.slice(1).replaceAll("_"," "),width:200})
                }
            }
            setColumns(columns);
        }
    }

    const handleSorting=(newModel)=>{
        setOrdering(newModel);
    }

    const onEditClickRackAndShelf=(id)=>{
        console.log(id);
        setSelectedRackShelfId(id);
        setShowViewRackAndShelf(false);
        setShowAddRackAndShelf(true);
    }

    const onSaveEvent=async()=>{
        setShowAddRackAndShelf(false);
        setSelectedRackShelfId(null);
        await getWarehouse();
    }

    useEffect(()=>{
        getWarehouse();
    },[paginationModel,debounceSearch,ordering])

    return (
        <Box component={"div"} sx={{width:'100%'}}>
            <Box display={"flex"} justifyContent={"space-between"} mb={3}>
            <Breadcrumbs mt={2}>
                <Typography variant="body2" onClick={()=>navigate('/')}>Home</Typography>
                <Typography variant="body2" onClick={()=>navigate('/manage/warehouse')}>Manage Warehouse</Typography>
            </Breadcrumbs>
            <Button variant="contained" onClick={()=>navigate('/form/warehouse')} startIcon={<AddOutlined/>}>Add Warehouse</Button>
            </Box>
            <Grid container spacing={2}>
            <Grid item xs={12} sm={(showAddRackAndShelf || showViewRackAndShelf)?7:12} lg={(showAddRackAndShelf || showViewRackAndShelf)?8:12}>
            <TextField label="Search" variant="outlined" fullWidth onChange={(e)=>setSearchQuery(e.target.value)} margin="normal"/>
            <DataGrid
                rows={data}
                columns={columns}
                autoHeight={true}
                rowHeight={75}
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
                {showAddRackAndShelf && <Grid item xs={12} sm={5} lg={4} sx={{height:'600px',overflowY:'auto'}} ref={divImage}>
                        <Box m={2} display={"flex"} justifyContent={"space-between"}>
                            <Typography variant="h6">{selectedRackShelfId?'Edit':'Add'} Rack Shelf & Floor</Typography>
                            <IconButton onClick={()=>setShowAddRackAndShelf(false)}><Close/></IconButton>
                        </Box>
                        <Divider/>
                        <DynamicForm formNameVar="rackShelfFloor" idVar={selectedRackShelfId} onSaveEvent={onSaveEvent}/>
                         
                </Grid>}
                {showViewRackAndShelf && <Grid item xs={12} sm={5} lg={4} sx={{height:'600px',overflowY:'auto'}} ref={divImage}>
                        <Box m={2} display={"flex"} justifyContent={"space-between"}>
                            <Typography variant="h6">Rack Shelf & Floor List</Typography>
                            <IconButton onClick={()=>setShowViewRackAndShelf(false)}><Close/></IconButton>
                        </Box>
                        <Divider/>
                        {
                            selectedRackAndShelfList.map((item,index)=>(
                                <RackAndShelfCard key={index} item={item} onEditClick={onEditClickRackAndShelf}/>
                            ))
                        }
                         
                </Grid>}
                </Grid>
                <Dialog open={open} fullWidth={true} maxWidth={"lg"} onClose={handleClose} aria-labelledby="form-dialog-title">
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

        </Box>
    )
}

export default ManageWarhouse;