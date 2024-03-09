import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import { TbUser } from "react-icons/tb";
import { TbLogout } from "react-icons/tb";
import logo from "../assets/Time-management-icons/logo.png";
import Shiftnpaylogo from "../assets/Time-management-icons/hover-icon/shiftnpay.png";
import { NavLink } from "react-router-dom";
import LockResetIcon from "@mui/icons-material/LockReset";
import ResetPassword from "../assets/Time-management-icons/password.png";
import {
  useLogoutsMutation,
  // useLoginGoogleMutation
} from "../features/auth/authService";

const NavLinks = React.forwardRef((props, ref) => {
  // console.log(props.activeclassname)
  return (
    <NavLink
      ref={ref}
      {...props}
      className="MuiButtonBase-root MuiListItemButton-root MuiListItemButton-gutters MuiListItemButton-root MuiListItemButton-gutters css-a16wff-MuiButtonBase-root-MuiListItemButton-root"
    />
  );
});

const settings = [
  { icon: <TbUser />, label: "Profile", path: "/profile" },
  {
    icon: <img src={ResetPassword} alt="" />,
    label: "Reset Password",
    path: "/password",
  },
  { icon: <TbLogout />, label: "Logout" },
];

export default function Navbar(props) {
  const open = props.open;
  // const drawerWidth = props.drawerWidth
  const toggleDrawer = props.toggleDrawer;
  const handleCloseUserMenu = props.handleCloseUserMenu;
  const id = props.id;
  const handleClick = props.handleClick;
  // const handleCloseUserMenu = props.handleCloseUserMenu
  const handleOpenUserMenu = props.handleOpenUserMenu;
  const anchorElUser = props.anchorElUser;
  const AppBar = props.AppBar;

  const [
    Logout,
    {
      // currentData,
      // isFetching,
      isLoading,
      // isSuccess, isError,
      // error,
      // status
    },
  ] = useLogoutsMutation();

  const logout = async () => {
    try {
      // console.log(!isLoading);
      if (!isLoading) {
        await Logout().unwrap();
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <AppBar
      position="absolute"
      open={open}
      sx={{
        background: "#fff",
        color: "#000",
        width: "100%",
        boxShadow: "none",
      }}
    >
      <Toolbar
        sx={{
          pr: "24px", // keep right padding when drawer closed
        }}
      >
        <Typography
          component="h1"
          color="inherit"
          noWrap
          sx={{
            display: "inline-block",
            fontWeight: "bold",
            textTransform: "uppercase",
            fontSize: "22px",
            marginRight: "20px",
            letterSpacing: "1px",
          }}
        >
          <img
            style={{
              width: "160px",
              // height: "auto",
            }}
            src={Shiftnpaylogo}
          />
        </Typography>

        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer}
          sx={{
            marginRight: "20px",
            marginLeft: 0,
          }}
        >
          <MenuIcon />
        </IconButton>
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-end" }}>
          <IconButton
            color="inherit"
            aria-describedby={id}
            type="button"
            onClick={handleClick}
            sx={{ padding: 0 }}
          >
            <Badge
              badgeContent={4}
              color="secondary"
              sx={{
                color: "#8044f7",
                display: "flex",
                padding: "10px",
                justifyContent: "center",
                alignItems: "center",
                width: "40px",
                height: "40px",
                background: "#e3daf5",
                borderRadius: "20px",
              }}
            >
              <NotificationsIcon sx={{ width: "20px", height: "20px" }} />
            </Badge>
          </IconButton>
          <Box sx={{ flexGrow: 0, marginLeft: "15px" }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="" />
              </IconButton>
            </Tooltip>
            <Menu
              className="ProfTab"
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((item, index) => {
                if (item.label == "Logout") {
                  return (
                    <MenuItem
                      key={index}
                      onClick={logout}
                      sx={{ display: "flex", gap: "12px", ml: "5px" }}
                    >
                      {item.icon}
                      <Typography textAlign="center">{item.label}</Typography>
                    </MenuItem>
                  );
                } else {
                  return (
                    <MenuItem
                      key={index}
                      component={NavLink}
                      to={item.path}
                      onClick={handleCloseUserMenu}
                      sx={{ display: "flex", gap: "10px" }}
                    >
                      {item.icon}
                      <Typography textAlign="center">{item.label}</Typography>
                    </MenuItem>
                  );
                }
              })}
            </Menu>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
