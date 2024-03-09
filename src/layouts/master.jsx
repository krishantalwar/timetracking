import React, { Fragment } from "react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ShimmerNavigation from "../components/ui/shimmer/shimmerNavigation";
import { useState ,useEffect } from "react";

import { mainListItems, secondaryListItems } from "./sidebar";
import { Outlet } from "react-router-dom";
import Navbar from "./navbar";

import Copyright from "./copyright";
import MuiAppBar from "@mui/material/AppBar";

import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
const drawerWidth = 230;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => {
  return {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  };
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => {
  return {
    "& .MuiDrawer-paper": {
      position: "relative",
      whiteSpace: "nowrap",
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: "border-box",
      ...(!open && {
        overflowX: "hidden",
        transition: theme.transitions.create("width", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up("sm")]: {
          width: theme.spacing(6.7),
        },
      }),
    },
  };
});

export default function Master() {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); 

    return () => clearTimeout(timer);
  }, []);

  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const show = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;
  const defaultTheme = createTheme();
  return (
    <>
    {isLoading ? (<ShimmerNavigation/>):(<Fragment>
      <ThemeProvider theme={defaultTheme}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <Navbar
            id={id}
            handleClic={handleClick}
            handleOpenUserMenu={handleOpenUserMenu}
            anchorElUser={anchorElUser}
            AppBar={AppBar}
            toggleDrawer={toggleDrawer}
            open={open}
            drawerWidth={drawerWidth}
            handleCloseUserMenu={handleCloseUserMenu}
          />

          <Drawer
            id="Dashnav"
            variant="permanent"
            open={open}
            sx={{ border: "none" }}
          >
            <Toolbar
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                px: [1],
              }}
            >
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            <Divider />

            <List component="nav">
              {mainListItems}
              <Divider sx={{ my: 1 }} />
              {/* {secondaryListItems} */}
            </List>
          </Drawer>

          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
            }}
          >
            <Container maxWidth="lg" sx={{ mt: 10, mb: 4 }}>
              <Outlet />
            </Container>

            <Copyright sx={{ pt: 4 }} />
          </Box>
        </Box>
      </ThemeProvider>
    </Fragment>)}
    </>
    
  );
}
