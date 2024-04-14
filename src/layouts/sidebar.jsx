import * as React from "react";
import { useState, useEffect } from "react";
import { ListSubheader } from "@mui/material";
import { NavLink } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Profile from "../../src/assets/Time-management-icons/Profile.png";
import Profile2 from "../../src/assets/Time-management-icons/mingcute_user-5-line.png";
import Time from "../../src/assets/Time-management-icons/carbon_time.png";
import Dataimg from "../../src/assets/Time-management-icons/material-symbols-light_upload-sharp.png";
import Reportsimg from "../../src/assets/Time-management-icons/mdi_report-box-outline.png";
import Tabler from "../assets/Time-management-icons/icons/department.png"
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import DashboardIcon from '../assets/Time-management-icons/Dashboard.png';
import DesignationIcon from '../assets/Time-management-icons/Desigantion.png';
import RoleIcon from '../assets/Time-management-icons/roles.png';
import PostjobIcon from '../assets/Time-management-icons/job-post.png';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';

const NavLinks = React.forwardRef((props, ref) => {
  const elementClasses =
    "MuiButtonBase-root MuiListItemButton-root MuiListItemButton-gutters MuiListItemButton-root MuiListItemButton-gutters css-a16wff-MuiButtonBase-root-MuiListItemButton-root";
  return (
    <NavLink
      ref={ref}
      {...props}
    // className={({ isActive }) =>
    //   isActive ? elementClasses + " activeLink" : elementClasses
    // }
    />
  );
});

const menu = [
  {
    icon: "Dashboard",
    name: "Dashboard",
    path: "",
  },
  {
    icon: "Employee",
    name: "Employee Master",
    path: "addEmployee",
  },
  {
    icon: "Shift",
    name: "Shift Manstar",
    path: "shiftmaster",
  },
  {
    icon: "designation",
    name: "Designation",
    path: "/designation",
  },
  {
    icon: "department",
    name: "Department",
    path: "/department",
  },
  {
    icon: "Roles",
    name: "Roles & Responsibilities",
    path: "rolesresponsibilities",
  },
  {
    icon: "postjob",
    name: "Post a Job",
    path: "joblisting",
  },
  {
    icon: "TimeTracking",
    name: "Time Tracking Activities",
    path: "timetrackingactivities",
  },
  {
    icon: "Calendar",
    name: "Calendar",
    path: "calendar",
  },
  {
    icon: "Tax",
    name: "Tax",
    path: "tax",
  },

  {
    icon: "Reports",
    name: "Reports",
  },
];

const iconMapping = {
  Dashboard: <img src={DashboardIcon} alt="" />,
  Employee: <img src={Profile} alt="" />,
  Shift: <img src={Profile2} alt="" />,
  Roles: <img src={RoleIcon} alt="" />,
  department: <img src={Tabler} alt="" />,
  designation: <img src={DesignationIcon} alt="" />,
  TimeTracking: <img src={Time} alt="" />,
  DataUpload: <img src={Dataimg} alt="" />,
  postjob: <img src={PostjobIcon} alt="" />,
  Calendar: <CalendarMonthOutlinedIcon />,
  Reports: <img src={Reportsimg} alt="" />,
};

export const mainListItems = (
  <React.Fragment>
    {menu.map((item, index) => {
      const IconComponent = iconMapping[item.icon];
      return (
        <React.Suspense key={index} fallback={<div>Loading...</div>}>
          <ListItemButton
            style={{
              display: 'flex',
              alignItems: 'center', // Align items vertically center
              color: "black",
              textDecoration: "none",

              //  fontWeight:"500"
            }}
            component={NavLinks}
            to={item.path}
          >
            <ListItemIcon sx={{ minWidth: "40px", margin: " 10px" }}>
              {IconComponent}
            </ListItemIcon>
            <ListItemText
              primaryTypographyProps={{ fontSize: "14px" }}
              primary={item.name}
            />
          </ListItemButton>
        </React.Suspense>
      );
    })}
  </React.Fragment>
);


export const userMenueItems = (
  <React.Fragment>


    <React.Suspense key={1} fallback={<div>Loading...</div>}>


      <ListItemButton
        style={{
          display: 'flex',
          alignItems: 'center', // Align items vertically center
          color: "black",
          textDecoration: "none",

          //  fontWeight:"500"
        }}
        component={NavLinks}
        to={""}
      >
        <ListItemIcon sx={{ minWidth: "40px", margin: " 10px" }}>
          <img src={DashboardIcon} alt="" />
        </ListItemIcon>
        <ListItemText
          primaryTypographyProps={{ fontSize: "14px" }}
          primary={"DashBoard"}
        />
      </ListItemButton>

      <ListItemButton
        style={{
          display: 'flex',
          alignItems: 'center', // Align items vertically center
          color: "black",
          textDecoration: "none",

          //  fontWeight:"500"
        }}
        component={NavLinks}
        to={"timetracking"}
      >
        <ListItemIcon sx={{ minWidth: "40px", margin: " 10px" }}>
          <img src={Time} alt="" />
        </ListItemIcon>
        <ListItemText
          primaryTypographyProps={{ fontSize: "14px" }}
          primary={"Time Tracking"}
        />
      </ListItemButton>
    </React.Suspense>

  </React.Fragment>
)


export const adminMenueItems = (
  <React.Fragment>


    <React.Suspense key={1} fallback={<div>Loading...</div>}>


      <ListItemButton
        style={{
          display: 'flex',
          alignItems: 'center', // Align items vertically center
          color: "black",
          textDecoration: "none",

          //  fontWeight:"500"
        }}
        component={NavLinks}
        to={""}
      >
        <ListItemIcon sx={{ minWidth: "40px", margin: " 10px" }}>
          <img src={DashboardIcon} alt="" />
        </ListItemIcon>
        <ListItemText
          primaryTypographyProps={{ fontSize: "14px" }}
          primary={"DashBoard"}
        />
      </ListItemButton>

      <ListItemButton
        style={{
          display: 'flex',
          alignItems: 'center', // Align items vertically center
          color: "black",
          textDecoration: "none",

          //  fontWeight:"500"
        }}
        component={NavLinks}
        to={"adminuser"}
      >
        <ListItemIcon sx={{ minWidth: "40px", margin: " 10px" }}>
          <img src={Profile} alt="" />
        </ListItemIcon>
        <ListItemText
          primaryTypographyProps={{ fontSize: "14px" }}
          primary={"users"}
        />
      </ListItemButton>
    </React.Suspense>

  </React.Fragment>
)


export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton
      component={NavLinks}
      activeclassname={({ isActive }) =>
        isActive ? 'active' : 'ddd'
      }
      to="/"
      sx={{ margin: "5px 7px", borderRadius: "7px" }}
    >
      <ListItemIcon sx={{ color: "#364152" }}>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
  </React.Fragment>
);
