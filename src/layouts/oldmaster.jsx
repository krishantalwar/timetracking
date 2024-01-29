import React, { Fragment } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser } from '../features/auth/authSelector';

import { Navigate } from "react-router-dom";
const defaultTheme = createTheme();

export default function OldMaster(children) {
 
  const currentUser = useSelector(selectCurrentUser);
  console.log(currentUser);
  

  return false? (
    <ThemeProvider theme={defaultTheme}>
      <Outlet />
    </ThemeProvider>
  ) : (
    <Navigate to="/" />
  );
  // return (
  //   <Fragment>
      
  //     <ThemeProvider theme={defaultTheme}>
  //       <Outlet/>
  //     </ThemeProvider>
  //   </Fragment>
  
    
  // );
}