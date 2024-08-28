import {
  Autocomplete,
  FormControlLabel,
  Switch,
  TextField,
} from "@mui/material";
import JsonInputComponent from "./JsonInputComponent";
import { useFormContext } from "react-hook-form";
import { useEffect } from "react";

const CommonInputComponent = ({ field,sx }) => {
  
  useEffect(() => {
     const selectedOption= field?.options?.find((option) => option.id === watch(field.name)) || field?.options?.find((option) => option.id === field.default) ||null;
     if(selectedOption){
       setValue(field.name, selectedOption.id);
     }

     if(field.type==='text' && 'isDateTime' in field){
        if(field.default){
          const date=new Date(field.default);
          const tzOffset=new Date().getTimezoneOffset()*60000;
          const localtTime=new Date(date.getTime()-tzOffset).toISOString().slice(0,16);
          setValue(field.name,localtTime); 
      }
      else{
          setValue(field.name,new Date().toISOString().slice(0,16));
      }
     }
  }, []);

  const {
    register,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useFormContext();

  return field.type === "text" ? (
    "isDate" in field ?
    <TextField
      fullWidth
      margin="normal"
      required={field.required}
      sx={sx}
      key={field.name}
      label={field.label}
      error={!!errors[field.name]}
      {...register(field.name, { required: field.required })}
      defaultValue={field.default}
      placeholder={field.placeholder}
      type="date-local"
      InputLabelProps={{shrink:true}}
    />:
    "isDateTime" in field ?
    <TextField
      fullWidth
      sx={sx}
      margin="normal"
      required={field.required}
      key={field.name}
      label={field.label}
      error={!!errors[field.name]}
      {...register(field.name, { required: field.required })}
      defaultValue={field.default}
      placeholder={field.placeholder}
      type="datetime-local"
      InputLabelProps={{shrink:true}}
    />:<TextField
      fullWidth
      margin="normal"
      sx={sx}
      required={field.required}
      key={field.name}
      label={field.label}
      error={!!errors[field.name]}
      {...register(field.name, { required: field.required })}
      defaultValue={field.default}
      placeholder={field.placeholder}
    />
  ) : field.type === "select" ? (
    <Autocomplete
      sx={{mt:2,...sx}}
      {...register(field.name, { required: field.required })}
      options={field.options}
      getOptionLabel={(option) => option.value}
      defaultValue={
        field.options.find((option) => option.id === watch(field.name)) ||
        field.options.find((option) => option.id === field.default) ||
        null
      }
      onChange={(event, newValue) => {
        setValue(field.name, newValue ? newValue.id : "");
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={field.label}
          variant="outlined"
          error={!!errors[field.name]}
          helperText={!!errors[field.name] && "This Field is Required"}
        />
      )}
    />
  ) : field.type === "checkbox" ? (
    <FormControlLabel
        sx={sx}
      control={
        <Switch
          error={!!errors[field.name]}
          {...register(field.name, { required: field.required })}
          defaultValue={field.default}
        />
      }
      label={field.label}
    />
  ) : field.type === "textarea" ? (
    <TextField
      fullWidth
      sx={sx}
      margin="normal"
      key={field.name}
      required={field.required}
      error={!!errors[field.name]}
      label={field.label}
      {...register(field.name, { required: field.required })}
      defaultValue={field.default}
      rows={4}
      multiline
      placeholder={field.placeholder}
    />
  ) : field.type === "json" ? (
    <JsonInputComponent fields={field} key={field.name} />
  ) : (
    <h2>Field Not Found</h2>
  );
};
export default CommonInputComponent;
