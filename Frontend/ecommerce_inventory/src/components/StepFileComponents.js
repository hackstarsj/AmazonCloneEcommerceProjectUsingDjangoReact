import {useFormContext} from 'react-hook-form';
import { Box,FormControl,InputLabel,Select,MenuItem, FormControlLabel, Switch, TextField,Alert } from "@mui/material";
import FileInputComponent from './FileInputComponents';

const StepFileComponents = ({formConfig }) => {
    return (
        <Box>
            {formConfig?.data?.file?.map((field,index)=>(
                <FileInputComponent field={field} key={index} />
            ))}
        </Box>
    )
}
export default StepFileComponents;