import {
  Button,
  Dialog,
  DialogContent,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { formatIfDateTime, formatText } from "../utils/Helper";
import { Circle, Dashboard } from "@mui/icons-material";
import React, { useState } from "react";

const DynamicTableComponent = ({ data,jsonColumns=[] }) => {
    const [modalTitle,setModalTitle]=useState('');
    const [jsonData,setJsonData]=useState([]);
    const [open,setOpen]=useState(false);

    const showJSONData=(data,title)=>()=>{
        setModalTitle(title)
        setJsonData(data)
        setOpen(true);        
    }

  return (
    <>
    <TableContainer component={Paper}>
      <Table sx={{ whiteSpace: "nowrap" }}>
        <TableHead>
          <TableRow>
            {data &&
              Object.keys(data[0]).map((key, index) => (
                <TableCell key={index}>
                  <b>{formatText(key)}</b>
                </TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.map((item, index) => (
              <TableRow key={index}>
                {Object.keys(item).map((key, index) =>
                  jsonColumns.includes(key) ? (
                    <TableCell>
                      <Button onClick={showJSONData(item[key],formatText(key.replaceAll('details','')))} variant="contained" startIcon={<Dashboard />}>
                        {formatText(key.replaceAll('details',''))} Details
                      </Button>
                    </TableCell>
                  ) : (
                    <TableCell key={index}>
                      {formatIfDateTime(item[key])}
                    </TableCell>
                  )
                )}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Dialog open={open} fullWidth={true} maxWidth={"lg"} onClose={()=>setOpen(false)} aria-labelledby="form-dialog-title">
            <DialogContent>
                <Typography variant="h5" mb={2}>{modalTitle} Details </Typography>
                <Divider />
                    {
                    jsonData?.map((item,index)=>(
                        <React.Fragment key={index}>
                            <Typography  mt={2}><Circle sx={{fontSize:'12px',marginRight:'10px'}} /> {item.key} - {item.value}</Typography>
                            <Divider/>
                        </React.Fragment>
                    ))
                    }
            </DialogContent>
    </Dialog>
    </>
  );
};
export default DynamicTableComponent;
