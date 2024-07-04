import {useParams} from 'react-router-dom';
import {useEffect,useState} from 'react';
import useApi from '../hooks/APIHandler';
import { Container, Divider, LinearProgress, Typography } from '@mui/material';
import { Stepper, Step, StepLabel } from '@mui/material';
import { ArrowBack, ArrowOutward, CurrencyExchange } from '@mui/icons-material';
import { Button,Box } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SaveIcon from '@mui/icons-material/Save';
import { FormProvider, get } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { getFormTypes } from '../utils/Helper';

const DynamicForm=()=>{
    const stepItems=getFormTypes();
    const {formName}=useParams();
    const {error,loading,callApi}=useApi();
    const [formConfig,setFormConfig]=useState(null);
    const [currentStep,setCurrentStep]=useState(0);
    const methods=useForm();
    const [steps,setSteps]=useState(stepItems)

    useEffect(()=>{
        fetchForm();
    },[formName])

    const fetchForm=async()=>{
        const response=await callApi({url:`getForm/${formName}/`});
        let stepFilter=stepItems.filter(step=>response.data.data[step.fieldType] && response.data.data[step.fieldType].length>0);
        setSteps(stepFilter);
        setFormConfig(response.data);
        setCurrentStep(0);
    }

    const goToStep=(index)=>{
        setCurrentStep(index);
    }

    const onSubmit=async(data)=>{
        try{
            const response=await callApi({url:`getForm/${formName}/`,method:'post',body:data});
            toast.success(response.data.message);
            setCurrentStep(0);
            methods.reset();
        }
        catch(err){
            console.log(err);
        }

    }

    const nextStep=()=>{
        const currentStepFields=getCurrentStepFields();
        const errors=validateCurrentStepFields(currentStepFields);
        if(errors.length>0){
            errors.forEach(error=>{
                methods.setError(error.name,{type:'manual',message:`${error.label} is Required`})
            })
        }
        else{
            const currentStepFields=getCurrentStepFields();
            currentStepFields.forEach(field=>{
                methods.clearErrors(field.name);
            })
            setCurrentStep((prev)=>(prev+1));
        }
    }

    const getCurrentStepFields=()=>{
        const currentStepType=steps[currentStep]?.fieldType;
        return formConfig.data[currentStepType] || [];
    }
    const validateCurrentStepFields=(fields)=>{
        return fields.filter(field=>field.required && !methods.getValues()[field.name])
    }


    return (
        <Container>
            <Typography variant="h6" gutterBottom>Add {formName.toUpperCase()}</Typography>
            <Divider sx={{margingTop:'15px',marginBottom:'15px'}}/>
            <Stepper activeStep={currentStep} alternativeLabel>
                {steps.map((step,index)=>(
                    <Step key={index} onClick={()=>goToStep(index)}>
                        <StepLabel>{step.label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <Divider sx={{marginTop:'15px',marginBottom:'15px'}}/>
            <Typography variant='h6' gutterBottom>{steps[currentStep].label}</Typography>
            {/* Section for Form */}
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    {formConfig ?
                    <>
                        {steps.map((step,index)=>(
                            <Box component={"div"} sx={{display:index===currentStep?"block":"none"}}>
                                {step.component && <step.component formConfig={formConfig} fieldType={step.fieldType}/>}
                            </Box>
                        ))}
                    </>  : <LinearProgress/>}
            <Box mt={2} display="flex" justifyContent="space-between">
            {currentStep>0 && (<Button type='button' variant="contained" color="primary" onClick={()=>goToStep(currentStep-1)}><ArrowBackIosIcon sx={{fontSize:'18px',marginRight:'5px'}}/> Back</Button>)}
            {currentStep<steps.length-1 && <Button type='button' variant="contained" color="primary" onClick={()=>nextStep()}> Next <ArrowForwardIosIcon sx={{fontSize:'18px',marginLeft:'5px'}}/></Button>}
            {<Button sx={{display:currentStep==steps.length-1?'block':'none'}} variant="contained" color="primary" type="submit"><SaveIcon sx={{fontSize:'20px',marginRight:'5px',margingTop:'8px'}}/> Submit</Button>}
            </Box>
            </form>
            </FormProvider>
            {
               loading && <LinearProgress style={{width:'100%',marginTop:'10px',marginBottom:'10px'}}/>
            }

        </Container>
    )
}
export default DynamicForm;