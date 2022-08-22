import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import axios from 'axios';
import {authActions} from '../store';
import {useNavigate} from 'react-router-dom'

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
      name: '', 
      email: '', 
      password: ''
    });

  const [isSignup, setIsSignup] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    setInputs({
      ...inputs,
      [e.target.name]: value
    });
  };

  const sendLogin = async() => {
    const res = await axios.post("http://localhost:5000/api/user/signin", 
    {
      email: inputs.email,
      password: inputs.password
    }).catch((error) => console.log(error));

    const data = await res.data; 
    return data;
  }

  const sendSignup = async() => {
    const res = await axios.post("http://localhost:5000/api/user/signup", 
    { name: inputs.name,
      email: inputs.email,
      password: inputs.password
    }).catch((error) => console.log(error));

    const data = await res.data; 
    return data;
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    console.log(inputs);
    // sendSignup();
    if(isSignup){
      sendSignup()
                .then((data) => localStorage.setItem("userId", data.user._id))
                .then(() =>dispatch(authActions.login()))
                .then(() =>navigate('/blogs'))
                .then((data) =>console.log(data));
    }
    else{
      sendLogin()
              .then((data) => localStorage.setItem("userId", data.user._id))
              .then(() =>dispatch(authActions.login()))
              .then(() =>navigate('/blogs'))
              .then((data) =>console.log(data));
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Box 
          maxWidth={400}
          display="flex" 
          flexDirection="column" 
          alignItems="center" 
          justifyContent={"center"}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin="auto"
          marginTop={5}
          borderRadius={5}
          >
        <Typography variant='h3' padding={3} textAlign="center" >{isSignup ? "Signup" : "Login"}</Typography>
        {isSignup && 
        <TextField onChange={handleChange}
        name="name"
        required
        value={inputs.name}  
        placeholder='Name' 
        margin='dense'/> } {" "}

        <TextField onChange={handleChange}
        name="email"
        required
        value={inputs.email} 
        type={'email'} 
        placeholder='Email' 
        margin='dense'/>

        <TextField onChange={handleChange}
        name="password"
        required
        value={inputs.password} 
        type={'password'}  
        placeholder='Password' 
        margin='dense'/>

        <Button 
        type='submit'
        variant='contained'
        sx={{borderRadius: 3, marginTop: 3}} 
        color="warning">Submit</Button>

        <Button 
        sx={{borderRadius: 3}}
        onClick={() => setIsSignup(!isSignup)}
        
        >Change To {isSignup ? "Login" : "Signup"}</Button>
      </Box>
    </form>
  )
}

export default Auth
