import {useFormContext} from 'react-hook-form';
import { Box,FormControl,InputLabel,Select,MenuItem, FormControlLabel, Switch, TextField } from "@mui/material";

const StepTextComponents = ({formConfig,fieldType}) => {
    const {register} = useFormContext();
    const textFiels=formConfig.data.text;
    return (
        <Box>
            {textFiels.map((field,index)=>(
                <TextField
                fullWidth
                margin="normal"
                key={field.name}
                label={field.label}
                {...register(field.name,{required:field.required})}
                defaultValue={field.default}
                placeholder={field.placeholder}
                 />
            ))}
        </Box>
    )
}
export default StepTextComponents;