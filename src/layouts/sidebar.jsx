import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Link from '@mui/material/Link';
import { CgProfile } from "react-icons/cg";
import { TbUser } from "react-icons/tb";
// import logo from '../assets/Time-management-icons/logo.png'


const menue = [
  {
    "icon": 'Employee',
    "name": 'Employee Master',
  },
  {
    "icon": 'DashboardIcon',
    "name": 'Shift Manstar',
  },
  {
    "icon": 'DashboardIcon',
    "name": 'Roles & Responsibilities',
  },
  {
    "icon": 'DashboardIcon',
    "name": 'Time Tracking Activities',
  },
  {
    "icon": 'DashboardIcon',
    "name": 'Data Upload Tool',
  },
  {
    "icon": 'DashboardIcon',
    "name": 'Department & Designation',
  },
  {
    "icon": 'DashboardIcon',
    "name": 'Reports',
  },
  {
    "icon": 'DashboardIcon',
    "name": 'Logout',
  }

];

const iconMapping = {
  Employee: <TbUser/>,

  // CgProfile: <CgProfile   size='20' />,
  // DashboardTwoToneIcon: <DashboardTwoToneIcon />,
  // Add more icon mappings as needed
};

export const mainListItems = (
  <React.Fragment>
    {menue.map((item, index) => {

      const IconComponent = iconMapping[item.icon];

      return (
        <React.Suspense key={index} fallback={<div>Loading...</div>}>
          <ListItemButton sx={{ margin: "5px 2px", borderRadius: "7px" }}>
          <ListItemIcon sx={{color:"#364152", minWidth:'30px'}}>
            {IconComponent}
      </ListItemIcon >
            <ListItemText primaryTypographyProps={{fontSize: '12px'}} 
             primary={item.name} />
          </ListItemButton>
        </React.Suspense>
      )
    })}
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton sx={{ margin: "5px 7px", borderRadius: "7px", }}>
      <ListItemIcon sx={{ color: "#364152" }}>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>

  </React.Fragment>
);