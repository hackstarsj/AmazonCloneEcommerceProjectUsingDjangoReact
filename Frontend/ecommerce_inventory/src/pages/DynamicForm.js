import {useParams} from 'react-router-dom';
import {useEffect,useState} from 'react';
import useApi from '../hooks/APIHandler';
import StepTextComponents from '../components/StepTextComponents';
import { Container, Divider, LinearProgress, Typography } from '@mui/material';
import { Stepper, Step, StepLabel } from '@mui/material';
import { ArrowBack, ArrowOutward, CurrencyExchange } from '@mui/icons-material';
import { Button,Box } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SaveIcon from '@mui/icons-material/Save';
import { FormProvider } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import StepSelectComponents from '../components/StepSelectComponents';
import StepSwitchComponents from '../components/StepSwitchComponents';
import StepTextAreaComponents from '../components/StepTextAreaComponents';
import StepJsonComponents from '../components/StepJsonComponents';
import StepFileComponents from '../components/StepFileComponents';

const DynamicForm=()=>{
    const {formName}=useParams();
    const {error,loading,callApi}=useApi();
    const [formConfig,setFormConfig]=useState(null);
    const [currentStep,setCurrentStep]=useState(0);
    const methods=useForm();
    const [steps,setSteps]=useState([
        {component:StepSelectComponents,label:"Basic Details",fieldType:'select'},
        {component:StepSwitchComponents,label:"Checklist",fieldType:'checkbox'},
        {component:StepTextComponents,label:"General Information",fieldType:'text'},
        {component:StepTextAreaComponents,label:"Detailed Information",fieldType:'textarea'},
        {component:StepJsonComponents,label:"Additional Details",fieldType:'json'},
        {component:StepFileComponents,label:"Documents & Files",fieldType:'file'},
    ])

    useEffect(()=>{
        fetchForm();
    },[formName])

    const fetchForm=async()=>{
        const response=await callApi({url:`http://localhost:8000/api/getForm/${formName}/`});
        let stepFilter=steps.filter(step=>response.data.data[step.fieldType] && response.data.data[step.fieldType].length>0);
        setSteps(stepFilter);
        setFormConfig(response.data);
    }

    const goToStep=(index)=>{
        setCurrentStep(index);
    }

    const onSubmit=(data)=>{
        console.log(data);
    }

    const StepComponent=steps[currentStep].component;

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
                    {formConfig ? <StepComponent formConfig={formConfig} fieldType={steps[currentStep].fieldType}/> : <LinearProgress/>}
            <Box mt={2} display="flex" justifyContent="space-between">
            {currentStep>0 && (<Button variant="contained" color="primary" onClick={()=>goToStep(currentStep-1)}><ArrowBackIosIcon sx={{fontSize:'18px',marginRight:'5px'}}/> Back</Button>)}
            {currentStep<steps.length-1?<Button variant="contained" color="primary" onClick={()=>goToStep(currentStep+1)}> Next <ArrowForwardIosIcon sx={{fontSize:'18px',marginLeft:'5px'}}/></Button>:<Button variant="contained" color="primary" type="submit"><SaveIcon sx={{fontSize:'18px',marginRight:'5px'}}/> Submit</Button>}
            </Box>
            </form>
            </FormProvider>

        </Container>
    )
}
export default DynamicForm;