import { isValidUrl,getImageUrl } from "../utils/Helper";
import Image from "./Image";
import { Typography } from "@mui/material";
const RenderImage=({data,name})=>{
    return (data && data!=='' && isValidUrl(data))?<Image src={getImageUrl(data)} alt={name} style={{width:70,height:70,padding:'5px'}}/>:<Typography variant="body2" pt={3} pb={3}>No Image</Typography> 
}
export default RenderImage;