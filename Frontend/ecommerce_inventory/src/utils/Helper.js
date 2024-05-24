import {jwtDecode} from "jwt-decode";
export const isAuthenticated=()=>{
    const token=localStorage.getItem("token");
    if(!token){
        return false;
    }

    try{
        const decodedToken=jwtDecode(token);
        const currentTime=Date.now()/1000;
        console.log(decodedToken);
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