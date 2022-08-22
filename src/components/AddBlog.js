import React,{useState} from 'react';
import { Box, Button, InputLabel, TextField, Typography } from '@mui/material';
import axios from 'axios';

const labelStyle = {mb: 1, mt: 2, fontSize: "24", fontWeight: "bold"};

const AddBlog = () => {
  const [inputs, setInputs] = useState({
    title: '', 
    description: '', 
    imageUrl: ''
  });

  const postBlog = async () => {
    const res = await axios
                          .post("http://localhost:5000/api/blog/add", 
                          {
                            title: inputs.title,
                            description: inputs.description,
                            image: inputs.imageUrl,
                            user: localStorage.getItem("userId")
                          }).catch((error) => console.log(error));

    const data = res.data;
    return data;
  }

  const handleChange = (e) => {
    const value = e.target.value;
    setInputs({
      ...inputs,
      [e.target.name]: value
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);

    postBlog().then((data) => console.log(data));
  }


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          border={3}
          borderRadius={10}
          borderColor= {"linear-gradient(90deg, rgba(2,6,14,1) 14%, rgba(78,4,10,1) 50%, rgba(77,4,13,1) 53%, rgba(0,0,0,1) 100%, rgba(255,0,0,1) 100%)"}
          boxShadow={"10px 10px 20px #ccc"}
          padding={3}
          margin={"auto"}
          marginTop={4}
          display="flex"
          flexDirection={"column"}
          width="80%"
        >
          <Typography
          fontWeight={"bold"}
          padding={3}
          color="blue"
          variant='h2'
          textAlign={"center"}
          >Post Your Blog</Typography>
          <InputLabel sx={labelStyle}>Title</InputLabel>
          <TextField 
          name="title"
          value={inputs.title} 
          margin='auto' 
          variant='outlined'
          onChange={handleChange} />
          <InputLabel sx={labelStyle}>Description</InputLabel>
          <TextField 
          name="description"
          value={inputs.description} 
          margin='auto' 
          variant='outlined'
          onChange={handleChange} />
          <InputLabel sx={labelStyle}>Image</InputLabel>
          <TextField 
          name='imageUrl' 
          value={inputs.imageUrl}
          onChange={handleChange} />

          <Button sx={{mt: 3, borderRadius: 5}} color='warning' variant='contained' type='submit'>Save</Button>
        </Box>
      </form>
    </div>
  )
}

export default AddBlog