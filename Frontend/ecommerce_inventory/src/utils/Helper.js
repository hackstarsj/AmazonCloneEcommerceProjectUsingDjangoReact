import {jwtDecode} from "jwt-decode";
import StepSelectComponents from '../components/StepSelectComponents';
import StepSwitchComponents from '../components/StepSwitchComponents';
import StepTextAreaComponents from '../components/StepTextAreaComponents';
import StepJsonComponents from '../components/StepJsonComponents';
import StepFileComponents from '../components/StepFileComponents';
import StepTextComponents from '../components/StepTextComponents';


export const isAuthenticated=()=>{
    const token=localStorage.getItem("token");
    if(!token){
        return false;
    }

    try{
        const decodedToken=jwtDecode(token);
        const currentTime=Date.now()/1000;
        console.log(decodedToken);
        if(decodedToken.exp<currentTime){
            localStorage.removeItem("token");
        }
        return decodedToken.exp>currentTime
    }
    catch(err){
        return false;
    }
}

export const getUser=()=>{
    const token=localStorage.getItem("token");
    if(!token){
        return null;
    }
    try{
        const decodedToken=jwtDecode(token);
        return decodedToken;
    }
    catch(err){
        return null;
    }
}

export const isValidUrl=(url)=>{
    try{
        new URL(url);
        return true;
    }
    catch(e){
        return false;
    }
}

export const getFormTypes=()=>{
    return [
        {component:StepSelectComponents,label:"Basic Details",fieldType:'select'},
        {component:StepSwitchComponents,label:"Checklist",fieldType:'checkbox'},
        {component:StepTextComponents,label:"General Information",fieldType:'text'},
        {component:StepTextAreaComponents,label:"Detailed Information",fieldType:'textarea'},
        {component:StepJsonComponents,label:"Additional Details",fieldType:'json'},
        {component:StepFileComponents,label:"Documents & Files",fieldType:'file'},
    ]
}