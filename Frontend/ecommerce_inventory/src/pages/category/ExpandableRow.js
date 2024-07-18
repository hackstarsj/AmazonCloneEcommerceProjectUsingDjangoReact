import { width } from "@mui/system"
import { Box, Collapse, Typography } from "@mui/material"
import { DataGrid, GridRow, GridToolbar } from "@mui/x-data-grid"
import { IconButton } from "@mui/material"
import { Add, Delete, Edit, Panorama, PanoramaRounded } from "@mui/icons-material"
import RenderImage from "../../components/RenderImage"

const ExpanableRow=({row,props,onEditClick,onDeleteClick,setShowImages,setSelectedImages})=>{
    let columns=[]
    if(row.children && row.children.length>0){
        columns=Object.keys(row.children[0]).map(key=>({
            field:key,
            headerName:key.charAt(0).toUpperCase()+key.slice(1).replaceAll("_"," "),
            width:150,
        })).filter((item)=>item.field!=='children').filter((item)=>item.field!=='image');

        columns.push({field:'image',headerName:'Image',width:150,sortable:false,renderCell:(params)=>{
            return <Box display={"flex"}><RenderImage data={params.row.image} name={params.row.name}/><IconButton onClick={()=>{ setShowImages && setShowImages(true); setSelectedImages && setSelectedImages(params.row.image)  }}><PanoramaRounded/></IconButton></Box>
        }});
        columns=[{field:'action',headerName:'Action',width:180,sortable:false,renderCell:(params)=>{
            return <>
                <IconButton onClick={()=>onEditClick(params)}>
                    <Edit color="primary" />
                </IconButton>
                <IconButton onClick={()=>onDeleteClick(params)}>
                    <Delete color="secondary" />
                </IconButton>
            </>
        }},...columns]
    }

    return <>
           <Box sx={{display:'flex',alignItems:'center'}}>
                <GridRow {...props}/>
           </Box>
           <Collapse in={row?.open?row.open:false} timeout={"auto"} unmountOnExit>
                <Box margin={1}>
                        {
                            row.children && row.children.length>0?
                            <DataGrid 
                              rows={row.children}
                              columns={columns}
                              hideFooter
                              rowHeight={75}
                              autoHeight
                              rowSelection={false}
                              slots={{
                                toolbar:GridToolbar
                              }}
                              />
                            :(
                                <Typography variant="body2" align="center" textAlign={"center"}>No Children Items</Typography>
                            )
                        }
                </Box>
           </Collapse>
            </>
}

export default ExpanableRow;