import { Box, Button, Divider, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { formatIfDateTime, formatText, skipPoFields } from "../../../utils/Helper";
import { Dashboard } from "@mui/icons-material";
import DynamicTableComponent from "../../../components/DynamicTableComponent";

const PoDetailView = ({data}) => {
    return (
        <Box>
        <Grid container spacing={1}>
            {Object.keys(data).map((key,index)=>(
                !(skipPoFields().includes(key)) &&
                <Grid item xs={12} lg={3} md={4} sm={6} key={index}>
                    <Box sx={{border:'1px solid grey',p:'15px'}}>
                        <Typography variant="body1"><b>{formatText(key)}</b></Typography>
                        <Typography variant="body2">{formatIfDateTime(data[key]) || 'NA'}</Typography>
                    </Box>
                </Grid>
            ))}
        </Grid>
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Typography variant="h6" sx={{mt:2}}>Additional Details</Typography>
            </Grid>
            {
                data?.additional_details && data?.additional_details?.map((item,index)=>(
                    <Grid item xs={12} lg={3} md={4} sm={6} key={index}>
                        <Box sx={{border:'1px solid grey',p:'15px'}}>
                            <Typography variant="body1"><b>{formatText(item['key'])}</b></Typography>
                            <Typography variant="body2">{formatIfDateTime(item['value']) || 'NA'}</Typography>
                        </Box>
                    </Grid>
                ))
            }
            <Grid item xs={12}>
                <Divider sx={{mt:2,mb:2}}/>
            </Grid>
        </Grid>
        <Divider sx={{mt:2,mb:2}}/>
        <Typography variant="h6" sx={{mt:2}}>Po Order Items</Typography>
        <Divider sx={{mt:2,mb:2}}/>
        <DynamicTableComponent data={data?.items} jsonColumns={['additional_details']}/>
        </Box>
    );
}
export default PoDetailView;