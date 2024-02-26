import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser } from "../features/auth/authSelector";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
const defaultTheme = createTheme();

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  // console.log(currentUser);
  return currentUser.isAuthenticated ? (
    // return true ? (
    <ThemeProvider theme={defaultTheme}>
      <Outlet />
    </ThemeProvider>
  ) : (
    <Navigate to="login" />
  );
};

export default Navigation;
