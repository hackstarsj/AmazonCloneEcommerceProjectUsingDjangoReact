import {useFormContext} from 'react-hook-form';
import { Box,FormControl,InputLabel,Select,MenuItem, FormControlLabel, Switch, TextField,Alert, Typography, IconButton, LinearProgress } from "@mui/material";
import useApi from '../hooks/APIHandler';
import { useEffect,useState } from 'react';
import DescriptionIcon from '@mui/icons-material/Description';
import { Delete } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import { checkIsJson, getFileMimeTypeFromFileName, getFileNameFromUrl } from '../utils/Helper';

const FileInputComponent = ({field}) => {
    const {register,formState:{errors},watch,setValue,resetField} = useFormContext();
    const {callApi,loading}=useApi();
    const [selectedFiles,setSelectedFiles]=useState([]);
    const [filePreviews,setFilePreviews]=useState([]);
    const [fileUploaded,setFileUploaded]=useState(false);
    const [oldFiles,setOldFiles]=useState(Array.isArray(field.default)?field.default:[])
    const [oldFilePreviews,setOldFilePreviews]=useState([]);
    const [newFilesUrl,setNewFilesUrl]=useState([])

    useEffect(()=>{
        if(oldFiles.length>0){
            const preview=oldFiles.map((file,index)=>({
                url:new URL(file),
                name:getFileNameFromUrl(file),
                type:getFileMimeTypeFromFileName(getFileNameFromUrl(file)).split('/')[0]
            }))

            setOldFilePreviews(preview);
        }
    },[oldFiles])

    const handleDeleteImage=(index)=>{
        // Delete File Actual
        const updatedFiles=[...selectedFiles]
        updatedFiles.splice(index,1);
        setSelectedFiles(updatedFiles);

        //Delete File preview
        const updatedPreviews=[...filePreviews];
        updatedPreviews.splice(index,1);
        setFilePreviews(updatedPreviews);

        setFileUploaded(false);
    }

    const handleDeleteImageOld=(index)=>{
        // Delete File Actual
        const updatedFiles=[...oldFiles]
        updatedFiles.splice(index,1);
        setOldFiles(updatedFiles);

        //Delete File preview
        const updatedPreviews=[...oldFilePreviews];
        updatedPreviews.splice(index,1);
        setOldFilePreviews(updatedPreviews);

    }

    useEffect(()=>{
        buildFileUrls();
    },[oldFiles,newFilesUrl])
    
    const buildFileUrls=()=>{
        const finalUrl=[...oldFiles,...newFilesUrl];
        if(finalUrl.length>0){
            setValue(field.name,finalUrl);
        }
        else{
            resetField(field.name);
        }
    }

    const uploadFiles=async()=>{
        try{
            const formData=new FormData();
            selectedFiles.forEach((file,index)=>{
                formData.append(`file${index}`,file);
            })

            const response=await callApi({url:'uploads/',method:'post',body:formData,header:{'Content-Type':'multipart/form-data'}});
            setNewFilesUrl(response?.data?.urls);
            toast.success(response?.data?.message);
            setFileUploaded(true);
        }
        catch(err){
            toast.error(err?.message);   
        }
    }

    const deleteAllFiles=()=>{
        setSelectedFiles([]);
        setFilePreviews([]);
        setFileUploaded(false);
    }

    useEffect(()=>{
        if(!selectedFiles.length && watch(field.name) && Array.from(watch(field.name)).filter((item)=>item instanceof File).length>0){
            console.log(watch(field.name));
            const fileArray=Array.from(watch(field.name)).filter((item)=>item instanceof File) || [];
            setSelectedFiles(fileArray);
            const preview=fileArray.map((file,index)=>({
                url:URL.createObjectURL(file),
                name:file.name,
                type:file.type.split('/')[0]
            }))
            console.log(preview);
            setFilePreviews(preview);
            setFileUploaded(false);
        }
        buildFileUrls();
    },[watch(field.name)]);

    return (
        <>
        {
            filePreviews.length>0 && filePreviews.map((file,index)=>(
                <Box key={index} sx={{display:'flex',alignItems:'center',mb:2}}>
                    {
                        file.type==='image'?<img src={file.url} alt={file.name} style={{width:'60px',height:'60px'}} />:<DescriptionIcon sx={{width:'60px',height:'60px'}} />
                    }
                   <Typography variant='body1' p={1} sx={{width:'230px',wordWrap:'break-word'}}>{file.name}</Typography>
                   <IconButton onClick={()=>handleDeleteImage(index)} sx={{color:'red'}}>
                        <Delete/>
                   </IconButton>
                </Box>
            ))
        }
        {!filePreviews.length && 
            <Box p={1} mb={1}>
                    <Typography variant='title'>{field.label}</Typography>
                    <Box component={"div"} className='fileInput' mt={1}>
                        <input type='file' multiple {...register(field.name,{required:field.required})} />
                    </Box>
            </Box>
        }
        {
            selectedFiles.length>0 && !fileUploaded && (
                loading?<LinearProgress sx={{width:'100%',mb:2}}/>:
                <Box mt={2} display="flex" justifyContent="space-between" mb={2}>
                    <Button onClick={uploadFiles} variant='contained' color='primary'>Upload Files</Button>
                    <Button onClick={deleteAllFiles} color='primary' variant='contained'>Delete All Files</Button>
                </Box>
            )
        }
        {
            oldFilePreviews.length>0 && <Typography mt={2} variant='h6'>Modify Old Files</Typography>
        }
        {
            oldFilePreviews.length>0 && oldFilePreviews.map((file,index)=>(
                <Box key={index} sx={{display:'flex',alignItems:'center',mb:2}}>
                    {
                        file.type==='image'?<img src={file.url} alt={file.name} style={{width:'60px',height:'60px'}} />:<DescriptionIcon sx={{width:'60px',height:'60px'}} />
                    }
                    <Typography variant='body1' p={1} sx={{width:'230px',wordWrap:'break-word'}}>{file.name}</Typography>
                    <IconButton onClick={()=>handleDeleteImageOld(index)} sx={{color:'red'}}>
                        <Delete/>
                    </IconButton>
                </Box>
            ))
        }
        {
            !!errors[field.name] && <Alert variant="outlined" severity='error' sx={{marginTop:'10px',marginBottom:'10px'}}>
                This Field is Required and Upload the Files if Already Selected
            </Alert>
        }


        </>
    )
}
export default FileInputComponent;