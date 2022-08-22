import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Box, Button, Tab, Tabs, Toolbar, Typography } from '@mui/material';
import { useSelector, useDispatch } from "react-redux";
import { authActions } from '../store';

const Header = () => {
    const dispatch = useDispatch();
    const [value, setValue] = useState();
    const isLoggedIn = useSelector(state => state.isLoggedIn);

  return (
   <AppBar position='sticky' sx={{background: 'linear-gradient(90deg, rgba(2,6,14,1) 14%, rgba(78,4,10,1) 50%, rgba(77,4,13,1) 53%, rgba(0,0,0,1) 100%, rgba(255,0,0,1) 100%)'}}>
    <Toolbar>
        <Typography variant='h4'>Blog App</Typography>
        {isLoggedIn && <Box display="flex" marginLeft="auto" marginRight="auto">
        <Tabs value={value} onChange={(e, val) => setValue(val)}>
            <Tab LinkComponent={Link} to="/blogs" sx={{color: "white"}} label="All Blogs" />
            <Tab LinkComponent={Link} to="/myBlogs" sx={{color: "white"}} label="My Blogs" />
            <Tab LinkComponent={Link} to="/blogs/add" sx={{color: "white"}} label="Add Blog" />

        </Tabs>
        </Box>}
        <Box display="flex" marginLeft="auto">
        {!isLoggedIn && <>
            <Button 
            LinkComponent={Link} to="/auth"
            variant='contained' 
            color='warning'
            sx={{margin: 1, borderRadius: 10}}>Login</Button>
        <Button 
            LinkComponent={Link} to="/auth"
            variant='contained' 
            color='warning'
            sx={{margin: 1, borderRadius: 10}}>Signup</Button>
        </>}
      {isLoggedIn &&   <Button 
            LinkComponent={Link} to="/auth"
            onClick={() =>dispatch(authActions.logout())}
            variant='contained' 
            color='warning'
            sx={{margin: 1, borderRadius: 10}}>Signout</Button>}
        </Box>
    </Toolbar>
   </AppBar>
  )
}

export default Header