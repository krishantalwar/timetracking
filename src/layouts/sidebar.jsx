import * as React from 'react';
import { ListSubheader } from '@mui/material';
import { NavLink } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Profile from '../../src/assets/Time-management-icons/Profile.png'
import Profile2 from '../../src/assets/Time-management-icons/mingcute_user-5-line.png'
import DoneSharpIcon from '@mui/icons-material/DoneSharp';
import Time from '../../src/assets/Time-management-icons/carbon_time.png'
import Dataimg from '../../src/assets/Time-management-icons/material-symbols-light_upload-sharp.png'
import Dept_desigimg from '../../src/assets/Time-management-icons/tabler_building.png'
import Reportsimg from '../../src/assets/Time-management-icons/mdi_report-box-outline.png'
import Logoutimg from '../../src/assets/Time-management-icons/fluent_arrow-exit-20-regular.png'
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import DashboardIcon from '@mui/icons-material/Dashboard';

const NavLinks = React.forwardRef((props, ref) => {
  const elementClasses = "MuiButtonBase-root MuiListItemButton-root MuiListItemButton-gutters MuiListItemButton-root MuiListItemButton-gutters css-a16wff-MuiButtonBase-root-MuiListItemButton-root";
  return (
    <NavLink
      ref={ref}
      {...props}
      className={({ isActive }) => (isActive ? elementClasses + " activeLink" : elementClasses)}
    // className='MuiButtonBase-root MuiListItemButton-root MuiListItemButton-gutters MuiListItemButton-root MuiListItemButton-gutters css-a16wff-MuiButtonBase-root-MuiListItemButton-root' 
    />
  )
});

const menu = [
  {
    "icon": 'Dashboard',
    "name": 'Dashboard',
    "path": '',
  },
  {
    "icon": 'Employee',
    "name": 'Employee Master',
    "path": 'addEmployee',
  },
  {
    "icon": 'Shift',
    "name": 'Shift Manstar',
    "path": 'shiftmaster',
  },
  {
    "icon": 'Roles',
    "name": 'Roles & Responsibilities',
    "path": 'roles&responsibilities',
  },
  {
    "icon": 'postjob',
    "name": 'Post a Job',
    "path": 'joblisting',
  },
  {
    "icon": 'TimeTracking',
    "name": 'Time Tracking Activities',
    "path": 'timetrackingactivities',
  },
  {
    "icon": 'Dept_Desig',
    "name": 'Department & Designation',
    "path": 'department_designation',
  },
  {
    "icon": 'Reports',
    "name": 'Reports',
  }

];

const iconMapping = {
  Dashboard: <DashboardIcon />,
  Employee: <img src={Profile} alt="" />,
  Shift: <img src={Profile2} alt="" />,
  Roles: <DoneSharpIcon />,
  TimeTracking: <img src={Time} alt="" />,
  DataUpload: <img src={Dataimg} alt="" />,
  postjob: <BusinessCenterOutlinedIcon />,
  Dept_Desig: <img src={Dept_desigimg} alt="" />,
  Reports: <img src={Reportsimg} alt="" />,
  Logout: <img src={Logoutimg} alt="" />,
};

export const mainListItems = (
  <React.Fragment>
    {menu.map((item, index) => {
      const IconComponent = iconMapping[item.icon];
      return (
        <React.Suspense key={index} fallback={<div>Loading...</div>}>
          <ListItemButton
            component={NavLinks}
            to={item.path}
            sx={{
              margin: "5px 7px", borderRadius: "7px",
            }}
          >
            <ListItemIcon sx={{ color: "#364152", minWidth: '30px' }}>
              {IconComponent}
            </ListItemIcon >
            <ListItemText primaryTypographyProps={{ fontSize: '12px' }}
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
    <ListItemButton

      component={NavLinks}
      // activeclassname={({ isActive }) =>
      //   isActive ? 'active' : 'ddd'
      // }
      to="/"

      sx={{ margin: "5px 7px", borderRadius: "7px", }}>
      <ListItemIcon sx={{ color: "#364152" }}>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>

  </React.Fragment>
);