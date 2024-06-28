import {useState} from 'react';
import axios from 'axios';
import config from '../utils/config';
function useApi(){
    const [error,setError]=useState("");
    const [loading,setLoading]=useState(false);
    const callApi=async({url,method="GET",body={},header={},params={}})=>{
        let gUrl=config.API_URL+url;
        setLoading(true);
        let response=null;
        header['Authorization']=localStorage.getItem('token')?`Bearer ${localStorage.getItem('token')}`:"";
        try{
            response=await axios.request({params:params,url:gUrl,method:method,data:body,headers:header});
        }
        catch(err){
            setError(err)
        }
        setLoading(false);
        return response;
    }
    return {callApi,error,loading};
}
export default useApi;