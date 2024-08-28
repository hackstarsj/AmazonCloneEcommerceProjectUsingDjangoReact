import { Box, Grid } from "@mui/material";
import CommonInputComponent from "../../../components/CommonInputComponent";
import { getFormType } from "../../../utils/Helper";
import { FormProvider, useForm } from "react-hook-form";

const PoInward=({poInwardFields})=>{
    const methods = useForm();
    return(
        <Box component={"div"} sx={{width:'100%'}}>
            <FormProvider {...methods}>
            <Grid container spacing={1}>
                {
                    getFormType().map((item,index)=>(
                        poInwardFields?.[item]?.map((field,index)=>(
                            <Grid item xs={12} lg={field.name === "additional_details" ? 12 : 3} md={field.name === "additional_details" ? 12 : 4} sm={field.name === "additional_details" ? 12 : 6} key={index}>
                                <CommonInputComponent field={field}/>
                            </Grid>
                        ))
                    ))
                }
            </Grid>
            </FormProvider>
        </Box>
    )
}
export default PoInward;