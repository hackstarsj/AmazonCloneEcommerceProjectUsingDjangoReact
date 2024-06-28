import React, { useState,useEffect } from 'react';
import { Container, Box, Card, CardContent, Tabs, Tab, Typography, TextField, Button, LinearProgress } from '@mui/material';
import useApi from '../hooks/APIHandler';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function AuthScreen() {
  const [tabValue, setTabValue] = useState(0);
  const navigate=useNavigate();
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  useEffect(()=>{
    if(localStorage.getItem("token")){
        navigate("/home");
    }
  },[])

  return (
    <Container maxWidth="sm" sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Card sx={{ width: '100%' }}>
        <CardContent>
          <Tabs value={tabValue} onChange={handleTabChange} centered>
            <Tab label="Login" />
            <Tab label="Sign Up" />
          </Tabs>
          {tabValue === 0 && <LoginForm />}
          {tabValue === 1 && <SignUpForm />}
        </CardContent>
      </Card>
    </Container>
  );
}


function LoginForm() {
    const navigate=useNavigate();
    const {callApi,error,loading}=useApi();
   const doLogin = async(e) => {
      e.preventDefault();
      let response=await callApi({url:"auth/login/",method:"POST",body:{username:e.target.username.value,password:e.target.password.value}});
      console.log(response);
      if(response?.data?.access){
        localStorage.setItem("token",response.data.access);
            toast.success("Login Successfully");
            navigate("/");
      }
      else{
            toast.error("Invalid Credentials");
      }

   }

  return (
    <Box  sx={{ mt: 3 }}>
        <form onSubmit={doLogin}>
      <Typography variant="h5" component="div" gutterBottom>
        Login
      </Typography>
      <TextField
        fullWidth
        label="Username"
        name='username'
        margin="normal"
        variant="outlined"
      />
      <TextField
        fullWidth
        label="Password"
        type="password"
        name='password'
        margin="normal"
        variant="outlined"
      />
      {loading?<LinearProgress style={{width:'100%'}}/>:
      <Button variant="contained" type='submit' color="primary" fullWidth sx={{ mt: 2 }}>
        Login
      </Button>}
      </form>
    </Box>
  );
}

function SignUpForm() {
    const navigate=useNavigate();
    const {callApi,error,loading}=useApi();
    const doSignup = async(e) => {
        e.preventDefault();
        let response=await callApi({url:"auth/signup/",method:"POST",body:{username:e.target.username.value,password:e.target.password.value,email:e.target.email.value,profile_pic:"https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"}});
        if(response?.data?.access){
            localStorage.setItem("token",response.data.access);
            toast.success("Signup Successfully");
            navigate("/home");
        }
        else{
            toast.error("Signup failed");
        }
        console.log(response);
    }
  
  return (
    <Box  sx={{ mt: 3 }}>
        <form onSubmit={doSignup}>
      <Typography variant="h5" component="div" gutterBottom>
        Sign Up
      </Typography>
      <TextField
        fullWidth
        label="Username"
        margin="normal"
        name='username'
        variant="outlined"
      />
      <TextField
        fullWidth
        label="Email"
        name='email'
        type="email"
        margin="normal"
        variant="outlined"
      />
      <TextField
        fullWidth
        label="Password"
        type="password"
        name='password'
        margin="normal"
        variant="outlined"
      />
      {loading?<LinearProgress style={{width:'100%'}}/>:
      <Button type='submit' variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
        Sign Up
      </Button>}
      </form>
    </Box>
  );
}

export default AuthScreen;
