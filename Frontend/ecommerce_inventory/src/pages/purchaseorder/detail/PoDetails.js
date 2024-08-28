import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect } from "react";
import { Box, Breadcrumbs, Divider, Tab, Tabs, Typography } from "@mui/material";
import useApi from "../../../hooks/APIHandler";
import PoDetailView from "./PoDetailView";
import PoInward from "./PoInward";
import PoInwardHistory from "./PoInwardHistory";
import PoLogs from "./PoLogs";


const PoDetails = () => {
    const [value, setValue] = React.useState('po_details');
    const {loading,error,callApi}=useApi();
    const [poDetail,setPoDetail]=React.useState({});
    const [poInwardFields,setPoInwardFields]=React.useState([]);
    const navigate=useNavigate();
    const id=useParams().id;
    if(!id){
        navigate('/manage/purchaseorder');
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    const getPoDetails=async()=>{
        let response=await callApi({url:`orders/PurchaseOrderView/${id}/`});
        setPoDetail(response?.data?.data?.data);
        setPoInwardFields(response?.data?.data?.poInwardFields);
    }

    useEffect(()=>{
        getPoDetails();
    },[])

    return  <Box component={"div"} sx={{width:'100%'}}>
        <Breadcrumbs>
            <Typography variant="body2" onClick={()=>navigate('/')}>Home</Typography>
            <Typography variant="body2" onClick={()=>navigate('/manage/purchaseorder')}>Manage Purchase Order</Typography>
            <Typography variant="body2" onClick={()=>navigate(`/po/details/${id}`)}>PO Detail</Typography>
        </Breadcrumbs>
        <Divider sx={{mt:1,mb:1}}/>
        <Tabs value={value} onChange={handleChange}   sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}        >
            <Tab label="PO Details" value="po_details" sx={{ flexGrow: 1 }}/>
            <Tab label="PO Inward" value="po_inward" sx={{ flexGrow: 1 }}/>
            <Tab label="PO Inward History" value="po_inward_history"  sx={{ flexGrow: 1 }}/>
            <Tab label="PO Logs" value="po_logs" sx={{ flexGrow: 1 }}/>
        </Tabs>
        <Divider sx={{mt:1,mb:1}}/>
        <Box component={"div"} sx={{width:'100%',height:'100%',padding:2}}>
            {value==='po_details' && <PoDetailView data={poDetail}/>}
            {value==='po_inward' && <PoInward data={poDetail} poInwardFields={poInwardFields}/>}
            {value==='po_inward_history' && <PoInwardHistory data={poDetail?.po_inwarded}/>}
            {value==='po_logs' && <PoLogs data={poDetail?.po_logs}/>}
        </Box>
    </Box>

}
export default PoDetails;