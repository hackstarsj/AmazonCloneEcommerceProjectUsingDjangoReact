import {
  Box,
  Breadcrumbs,
  Button,
  Dialog,
  DialogContent,
  Divider,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import useApi from "../../hooks/APIHandler";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { getFormType } from "../../utils/Helper";
import CommonInputComponent from "../../components/CommonInputComponent";
import ManageUsers from "../users/ManageUsers";
import ManageProducts from "../products/ManageProducts";
import { Add, CheckCircle, Close, Delete, Save } from "@mui/icons-material";
import JsonInputComponent from "../../components/JsonInputComponent";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const CreatePurchaseOrder = () => {
  const { error, loading, callApi } = useApi();
  const {id}=useParams();
  const [poFields, setPoFields] = useState([]);
  const [poItemFields, setPoItemFields] = useState([]);
  const [fieldType, setFieldType] = useState(getFormType());
  const [supplierEmail, setSupplierEmail] = useState("");
  const [supplierId, setSupplierId] = useState("");
  const [openSelectSupplier, setOpenSelectSupplier] = useState(false);
  const [openSelectProduct, setOpenSelectProduct] = useState(false);
  const [openAddAdditionalDetails,setOpenAddAdditionalDetails]=useState(false);
  const [selectedPoItemIndex,setSelectedPoItemIndex]=useState(null)
  const methods = useForm();
  const navigate=useNavigate();


  const getFormFields = async () => {
    const idVar= id ? id+"/" : '';
    const response = await callApi({ url: `orders/purchaseOrder/${idVar}` });
    if (response && response.status === 200) {
      setPoFields(response.data.data.poFields);
      setPoItemFields(response.data.data.poItemFields);
      setSupplierEmail(response.data.data?.poData?.supplier_email);
      setSupplierId(response.data.data?.poData?.supplier_id);
      methods.setValue('supplier_id',response.data.data?.poData?.supplier_id);
      methods.setValue('items',response.data.data?.poItems);
    }
  };

  useEffect(() => {
    getFormFields();
  }, []);

  const deleteItem=(index)=>{
    let items=methods.watch('items');
    items=items.filter((item,i)=>i!==index);
    methods.setValue('items',items);
  }

  const getPoItems = () => {
    return methods?.watch('items')?.map((item, index) => (
      <TableRow>
        <TableCell><IconButton onClick={()=>deleteItem(index)}><Delete color="error"/></IconButton></TableCell>
        <TableCell>{item && 'sku' in item?item?.sku:''}</TableCell>
        {fieldType.map((fieldT, index2) =>
          poItemFields?.[fieldT].map((field, index3) => {
            let tempField = { ...field };
            tempField["default"] = item[tempField?.name];
            tempField["name"] = `items[${index}].${tempField.name}`;
            return (
              methods.watch('discount_type')!=='ITEM DISCOUNT' && (field.name==='discount_type' || field.name==='discount_amount')?<input type='hidden' name={tempField.name} {...methods.register(tempField.name)} value={field.name==='discount_type'?'NO DISCOUNT':0}/>:
              <TableCell>
                {field.label === "Additional Details" ? (
                  <Button variant="contained" color="primary" onClick={()=>{
                    setOpenAddAdditionalDetails(true)
                    setSelectedPoItemIndex(index)
                  }}>
                    Additional Details
                  </Button>
                ) :field.label==='Product Id'?<><Typography variant="body2">
                    {item.product_name}
                </Typography>
                <input type="hidden" name={tempField.name} value={item.product_id} {...methods.register(tempField.name)}/>
                </>: (
                  <CommonInputComponent field={tempField} sx={{ width: 200 }} />
                )}
              </TableCell>
            );
          })
        )}
      </TableRow>
    ));
  };

  const onProductSelected = (data) => {
    if(methods?.watch('items')?.filter((item)=>item.product_id===data.id).length>0){
        toast.error("Product Already Added")
        return;
    }
    methods?.setValue('items',[
      ...methods?.watch('items'),
      {
        sku:data.sku,
        product_id: data.id,
        product_name: data.name,
        quantity_ordered: 1,
        buying_price: data.initial_buying_price,
        selling_price: data.initial_selling_price,
      },
    ]);
    setOpenSelectProduct(false);
  };

  const onSubmit=async(data)=>{
    if(!methods.watch('supplier_id')){
        toast.error("Please Select Supplier")
        return;
    }
    if(!methods.watch('items') || methods.watch("items").length===0){
        toast.error("Please Select Atleast 1 Product")
        return;
    }
    const idVar= id ? id+"/" : '';
    const response = await callApi({ url: `orders/purchaseOrder/${idVar}`,method:'POST',body:data});
    if(response?.status===201){
        setSupplierEmail('')
        setSupplierId('')
        methods.reset();
        toast.success(response.data.message);
        if(id){
          navigate('/manage/purchaseorder')
        }
    }
  }

  const createOrder=async(e,status)=>{
    console.log(methods.formState.errors);
    e.preventDefault();
    methods.setValue("status",status)
    if(status==="DRAFT"){
        methods.clearErrors()
       await methods.trigger()
    }
    methods.handleSubmit(onSubmit)();
  }

  return (
    <Box>
      <FormProvider {...methods}>
        <form>
          <Box display="flex" justifyContent={"space-between"}>
            <Breadcrumbs>
              <Typography variant="body2">Home</Typography>
              <Typography variant="body2">Create Purchase Order</Typography>
            </Breadcrumbs>
          </Box>
          <Typography variant="h6" mt={2}>
            Purchase Order Details
          </Typography>
          <Grid container spacing={2} mt={2} mb={2}>
            {fieldType?.map((field, index) =>
              poFields?.[field]?.map((field1, index1) =>
                field1.name === "supplier_id" ? (
                  <Grid item xs={12} lg={3} md={4} sm={6}>
                    {supplierEmail === "" || !supplierEmail? (
                      <Button
                        type="button"
                        onClick={() => setOpenSelectSupplier(true)}
                        fullWidth
                        sx={{ mt: 3 }}
                        variant="contained"
                        color="primary"
                      >
                        Select Supplier
                      </Button>
                    ) : (
                      <>
                        <Typography variant="body1" sx={{ mt: 3 }}>
                          {supplierEmail}
                        </Typography>
                        <input
                          type="hidden"
                          name="supplier_id"
                          value={supplierId}
                          {...methods.register("supplier_id")}
                        />
                      </>
                    )}
                  </Grid>
                ) :(['NO DISCOUNT','ITEM DISCOUNT'].includes(methods.watch('discount_type')) && field1.name==='discount_amount')?
                <input type='hidden' name={field1.name} {...methods.register(field1.name)} value={field1.name==='discount_type'?'NO DISCOUNT':0}/>
              :  (
                  <Grid
                    item
                    xs={12}
                    lg={field1.name === "additional_details" ? 12 : 3}
                    md={field1.name === "additional_details" ? 12 : 4}
                    sm={field1.name === "additional_details" ? 12 : 4}
                    key={index1}
                  >
                    <CommonInputComponent field={field1} />
                  </Grid>
                )
              )
            )}
          </Grid>
          <Divider sx={{ mt: 1, mb: 1 }} />
          <Box display={"flex"} justifyContent={"space-between"}>
            <Typography variant="h6">Purchase Order Products</Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              color="primary"
              onClick={() => setOpenSelectProduct(true)}
            >
              Add Product
            </Button>
          </Box>
          <Divider sx={{ mt: 1, mb: 1 }} />
          <TableContainer component={Paper} sx={{ whiteSpace: "nowrap" }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Action</TableCell>
                  <TableCell>SKU</TableCell>
                  {fieldType.map((item, index) =>
                    poItemFields?.[item]?.map((field, index2) => (
                      methods.watch('discount_type')!=='ITEM DISCOUNT' && (field.name==='discount_type' || field.name==='discount_amount') ? null :<TableCell key={field.name}>{field.label}</TableCell>
                    ))
                  )}
                </TableRow>
              </TableHead>
              <TableBody>{getPoItems()}</TableBody>
            </Table>
          </TableContainer>
          <Box justifyContent={"space-between"} display={"flex"} sx={{ mt: 2 }}>
            <Button
              variant="contained"
              sx={{ m: 2 }}
              startIcon={<Save />}
              color="primary"
              type="button"
              onClick={(e)=>createOrder(e,"DRAFT")}
              fullWidth
            >
              Save Draft
            </Button>
            <Button
              variant="contained"
              sx={{ m: 2 }}
              type="button"
              startIcon={<CheckCircle />}
              color="primary"
              fullWidth
              onClick={(e)=>createOrder(e,"CREATED")}
            >
              Create Purchase Order
            </Button>
          </Box>
          <Dialog
            open={openSelectSupplier}
            onClose={() => setOpenSelectSupplier(false)}
            maxWidth="lg"
          >
            <DialogContent>
            <Box display={"flex"} justifyContent={"space-between"}>
                  <Typography variant="h6">Select Supplier</Typography>
                  <IconButton onClick={()=>setOpenSelectSupplier(false)}><Close/></IconButton>
            </Box>
              <Divider sx={{ mt: 1, mb: 1 }} />
              <ManageUsers
                onSupplierSelect={(data) => {
                  setSupplierId(data.id);
                  setSupplierEmail(data.email);
                  setOpenSelectSupplier(false);
                }}
              />
            </DialogContent>
          </Dialog>
          <Dialog
            open={openSelectProduct}
            onClose={() => setOpenSelectProduct(false)}
            maxWidth="lg"
          >
            <DialogContent>
                <Box display={"flex"} justifyContent={"space-between"}>
                  <Typography variant="h6">Select Product</Typography>
                  <IconButton onClick={()=>setOpenSelectProduct(false)}><Close/></IconButton>
                </Box>
              <Divider sx={{ mt: 1, mb: 1 }} />
              <ManageProducts onProductSelected={onProductSelected} />
            </DialogContent>
          </Dialog>
          <Dialog
            open={openAddAdditionalDetails}
            onClose={() => setOpenAddAdditionalDetails(false)}
            maxWidth="lg"
          >
            <DialogContent>
            <Box justifyContent={"space-between"} display={"flex"}>
                <Typography variant="h5">Additional Details</Typography>
                <IconButton onClick={()=>setOpenAddAdditionalDetails(false)}><Close/></IconButton>
            </Box>
            <Divider/>
                <JsonInputComponent fields={{label:'Additonal Details',type:'json',name:`items[${selectedPoItemIndex}].additional_details`,default:methods.watch(`items[${selectedPoItemIndex}].additional_details`)}}/>
            </DialogContent>
          </Dialog>
          <input type="hidden" name="status" {...methods.register("status")}/>
        </form>
      </FormProvider>
    </Box>
  );
};
export default CreatePurchaseOrder;
