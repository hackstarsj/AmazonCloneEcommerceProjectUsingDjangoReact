import {useFormContext} from 'react-hook-form';
import { Box,FormControl,InputLabel,Select,MenuItem, FormControlLabel, Switch, TextField } from "@mui/material";

const StepFileComponents = ({formConfig,fieldType}) => {
    const {register} = useFormContext();
    const fileFields=formConfig.data.file;
    return (
        <Box>
            {fileFields.map((field,index)=>(
                <Box component={"div"} className='fileInput'>
                    <label>{field.label}</label>
                    <input type='file' {...register(field.name,{required:field.required})} />
                 </Box>
            ))}
        </Box>
    )
}
export default StepFileComponents;