import {useState} from 'react';
import axios from 'axios';
function useApi(){
    const [error,setError]=useState("");
    const [loading,setLoading]=useState(false);
    const callApi=async({url,method="GET",body={},header={}})=>{
        setLoading(true);
        let response=null;
        header['Authorization']=localStorage.getItem('token')?`Bearer ${localStorage.getItem('token')}`:"";
        try{
            response=await axios.request({url:url,method:method,data:body,headers:header});
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