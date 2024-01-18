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

const menue = [
  {
    "icon": 'DashboardIcon',
    "name": 'Employee Master',
  },
  {
    "icon": 'DashboardIcon',
    "name": 'Shift Manstar',
  }
];

const iconMapping = {
  DashboardIcon: <DashboardIcon />,
  // DashboardTwoToneIcon: <DashboardTwoToneIcon />,
  // Add more icon mappings as needed
};

export const mainListItems = (
  <React.Fragment>
    {menue.map((item, index) => {

      const IconComponent = iconMapping[item.icon];

      return (
        <React.Suspense key={index} fallback={<div>Loading...</div>}>
          <ListItemButton sx={{ margin: "5px 7px", borderRadius: "7px", }}>
            {IconComponent}
            <ListItemText primary={item.name} />
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