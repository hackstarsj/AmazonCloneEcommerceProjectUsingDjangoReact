import {useFormContext} from 'react-hook-form';
import { Box,FormControl,InputLabel,Select,MenuItem, FormControlLabel, Switch, TextField } from "@mui/material";
import { useEffect, useState } from "react";

const StepTextComponents = ({formConfig,fieldType}) => {
    const {register,formState:{errors},reset} = useFormContext();
    const [textFiels,setTextFiels]=useState(formConfig.data.text);

    useEffect(()=>{
        setTextFiels(formConfig.data.text);
        const defaultValues=formConfig.data.text.reduce((acc,field)=>{
            acc[field.name]=field.default;
            return acc;
        },{});
        reset(defaultValues);
    },[formConfig.data.text])

    return (
        <Box>
            {textFiels.map((field,index)=>(
                <TextField
                fullWidth
                margin="normal"
                required={field.required}
                key={field.name}
                label={field.label}
                error={!!errors[field.name]}
                {...register(field.name,{required:field.required})}
                defaultValue={field.default}
                placeholder={field.placeholder}
                 />
            ))}
        </Box>
    )
}
export default StepTextComponents;