import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Login from '../pages/login/login';
import Home from './home';
import { selectCurrentUser } from "../features/auth/authSelector";
import { useSelector } from "react-redux";
// import { Outlet } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';

// import { selectIsCartOpen } from '../../store/cart/cart.selector';
// import { selectCurrentUser } from '../../store/user/user.selector';
// import { signOutStart } from '../../store/user/user.action';
// import { useAuth } from '../features/auth/authQueries';

const defaultTheme = createTheme();

export default function Dashboard(children) {
  // const dispatch = useDispatch();
  // const currentUser = useSelector(selectCurrentUser);
  // const signOutUser = () => dispatch(signOutStart());
  // const { isAuthenticated, user } = useAuth();
  const currentUser = useSelector(selectCurrentUser);
  console.log(currentUser);
  let page = <Login />;

  if (currentUser.isAuthenticated) {
    page = <Home />
    // Redirect if user is not authenticated
    // return <Redirect to="/login" />;
  }

  //   if (roles && !roles.includes(user.role)) {
  //     // Redirect if user does not have the required role
  //     return <Redirect to="/" />;
  //   }
  return (
    <ThemeProvider theme={defaultTheme}>

      {page}

    </ThemeProvider>
  );
}