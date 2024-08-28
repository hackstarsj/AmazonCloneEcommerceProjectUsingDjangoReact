import { Box, Divider, Typography } from "@mui/material";
import DynamicTableComponent from "../../../components/DynamicTableComponent";

const PoLogs=({data})=>{
    return(
        <Box>
            <Typography variant="h6">Po Logs</Typography>
            <Divider sx={{mt:2,mb:2}}/>
            <DynamicTableComponent data={data} jsonColumns={['additional_details']}/>
        </Box>
    )
}
export default PoLogs;