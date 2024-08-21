import { useState,useEffect, useRef } from "react";
import useApi from "../../hooks/APIHandler";
import { useNavigate } from "react-router-dom";
import { Box, Breadcrumbs, Button, Dialog, DialogContent, Divider, Grid, IconButton, LinearProgress, Table, TextField, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { isValidUrl } from "../../utils/Helper";
import Add from '@mui/icons-material/Add';
import Delete from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';
import RenderImage from "../../components/RenderImage";
import { Circle, Close, Dashboard, PanoramaRounded } from "@mui/icons-material";
import { set } from "react-hook-form";
import React from "react";
import ViewCompactIcon from '@mui/icons-material/ViewCompact';
import Image from "../../components/Image";

const ManagePurchaseOrder = ({onProductSelected}) => {
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
    const [htmldata,setHtmldata]=useState('');
    const [openHtml,setOpenHtml]=useState(false);
    const [modalTitle,setModalTitle]=useState('');
    const [showImages,setShowImages]=useState(false);
    const [selectedImages,setSelectedImages]=useState([]);
    const [showReviews,setShowReviews]=useState(false);
    const [showQuestions,setShowQuestions]=useState(false);
    const [selectedProductId,setSelectedProductId]=useState(null);
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

    const handleClose2=()=>{
        setOpenHtml(false);
    }

    const getProducts=async()=>{
        let order='-id';
        if(ordering.length>0){
            order=ordering[0].sort==='asc'?ordering[0].field:'-'+ordering[0].field
        }
        const result=await callApi({url:'orders/purchaseOrderList/',method:'GET',params:{
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

    const onDeleteClick=(params)=>{
        console.log(params);
    }
    const onEditClick=(params)=>{
        console.log(params);
        navigate(`/create/po/${params.row.id}`)
    }

    const showJSONData=(item,title)=>{
        setModalTitle(title)
        setJsonData(item)
        setOpen(true);        
    }

    useEffect(()=>{
        if(showImages){
            divImage.current.scrollIntoView({behavior:'smooth'})
        }
    },[selectedImages])


    const generateColumns=(data)=>{
        if(data.length>0){
            let columns=[{field:'action',headerName:'Action',width:180,sortable:false,renderCell:(params)=>{
                return <>
                    {params.row.status==='DRAFT' ?<IconButton onClick={()=>onEditClick(params)}>
                        <Edit color="primary" />
                    </IconButton>:
                    <IconButton onClick={()=>navigate(`/po/details/${params.row.id}`)}>
                        <Dashboard color="primary" />
                    </IconButton>
                    }
                    <IconButton onClick={()=>onDeleteClick(params)}>
                        <Delete color="secondary" />
                    </IconButton>
                </>
            }}];
            for(const key in data[0]){
                if(key==='image'){
                    columns.push({field:key,headerName:key.charAt(0).toUpperCase()+key.slice(1).replaceAll("_"," "),width:150,sortable:false,renderCell:(params)=>{
                        return <Box display={"flex"}><RenderImage data={params.row.image} name={params.row.name}/><IconButton onClick={()=>{ setSelectedImages(params.row.image); setShowImages(true); }}><PanoramaRounded/></IconButton></Box>
                    }})
                }
                else{
                    columns.push({field:key,headerName:key.charAt(0).toUpperCase()+key.slice(1).replaceAll("_"," "),width:200})
                }
            }
            columns=columns.map((column)=>{
                if(column.field==='additional_details'){
                    return {field:column.field,headerName:column.field.charAt(0).toUpperCase()+column.field.slice(1).replaceAll("_"," "),width:150,sortable:false,renderCell:(params)=>{
                        return <Button onClick={()=>showJSONData(params.row[column.field],column.field.charAt(0).toUpperCase()+column.field.slice(1).replaceAll("_"," "))} startIcon={<ViewCompactIcon/>} variant="contained">View</Button>
                    }}
                }
                                
                return column;
            })
            setColumns(columns);
        }
    }

    const handleSorting=(newModel)=>{
        setOrdering(newModel);
    }

    useEffect(()=>{
        getProducts();
    },[paginationModel,debounceSearch,ordering])

    return (
        <Box component={"div"} sx={{width:'100%'}}>
            {!onProductSelected &&
            <Breadcrumbs>
                <Typography variant="body2" onClick={()=>navigate('/')}>Home</Typography>
                <Typography variant="body2" onClick={()=>navigate('/manage/purchaseorder')}>Manage Purchase Order</Typography>
            </Breadcrumbs>}
            <Grid container spacing={2}>
            <Grid item xs={12} sm={showImages?8:12} lg={showImages?9:12}>
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
                {showImages && <Grid item xs={12} sm={4} lg={3} sx={{height:'600px',overflowY:'auto'}} ref={divImage}>
                        <Box m={2} display={"flex"} justifyContent={"space-between"}>
                            <Typography variant="h6">Product Images</Typography>
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

export default ManagePurchaseOrder;