import {useFormContext} from 'react-hook-form';
import { Box,FormControl,InputLabel,Select,MenuItem } from "@mui/material";

const StepSelectComponents = ({formConfig,fieldType}) => {
    const {register} = useFormContext();
    const selectFields=formConfig.data.select;
    return (
        <Box>
            {selectFields.map((field,index)=>(
                <FormControl fullWidth margin="normal" key={field.name}>
                    <InputLabel>{field.label}</InputLabel>
                    <Select 
                    {...register(field.name,{required:field.required})}
                    defaultValue={field.default}
                    label={field.label}>
                            {
                                field.options.map((option,index)=>
                                    <MenuItem key={option.id} value={option.id}>{option.value}</MenuItem>
                                )
                            }
                    </Select>
                </FormControl>
            ))}
        </Box>
    )
}
export default StepSelectComponents;