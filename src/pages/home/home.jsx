import Box from '@mui/material/Box';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import stat1 from '../../assets/Time-management-icons/stat-1.png'
import stat2 from '../../assets/Time-management-icons/stat-2.png'
import stat3 from '../../assets/Time-management-icons/stat-3.png'
import stat4 from '../../assets/Time-management-icons/stat-4.png'
import { Grid } from '@mui/material';

// import Chevrolet from '../Images/Chevrolet.jpg'
// import Card from '../../components/ui/Card/card';


export default function Home(props = { mt: 8, mb: 4 }) {

  return (
    <>
    <h2>All Location</h2>
    <div style={{margin: '0%', display:'flex'}}>
      <Box sx={{flex:1, display:"flex"}}>
    <Card sx={{ width: "100%",  backgroundColor:'lightgreen'}} >
      <CardContent>
        <Box sx={{display: "flex", color:"#fff"}}>
        <img src={stat1} alt="Avatar" className="avatar" />
        <Box>
          {/* <Typography marginLeft={1} marginTop={-2}> */}
            <h3>Total Employee</h3>
          {/* </Typography> */}
        </Box>
        </Box>
      </CardContent>
    </Card>
    </Box>
    <Box sx={{flex:1, display:'flex'}}>
    <Card  sx={{ width: "100%",  backgroundColor:'orange', marginLeft:5}} >
      <CardContent>
        <Box  sx={{display: "flex", color:"#fff"}}>
        <img src={stat2} alt="Avatar" className="avatar" />
        <Box>
          {/* <Typography marginLeft={1} marginTop={-2}> */}
            <h3>Present</h3>
          {/* </Typography> */}
        </Box>
        </Box>
      </CardContent>
    </Card>
    </Box>
    <Box sx={{flex:1, display:'flex'}}>
    <Card  sx={{ width: "100%",  backgroundColor:'blue', marginLeft:5}} >
      <CardContent>
        <Box  sx={{display: "flex", color:"#fff"}}>
        <img src={stat3} alt="Avatar" className="avatar" />
        <Box>
          {/* <Typography marginLeft={1} marginTop={-2}> */}
            <h3>Absent</h3>
          {/* </Typography>\ */}
        </Box>
        </Box>
      </CardContent>
    </Card>
    </Box>
    <Box sx={{flex:1, display:'flex'}}>
    <Card  sx={{ width: "100%",  backgroundColor:'lightpink', marginLeft:5}} >
      <CardContent>
        <Box  sx={{display: "flex", color:"#fff"}}>
        <img src={stat4} alt="Avatar" className="avatar" />
        <Box>
          {/* <Typography marginLeft={1} marginTop={-2}> */}
            <h3>Late Comer</h3>
          {/* </Typography> */}
        </Box>
        </Box>
      </CardContent>
    </Card>
    </Box>
    </div>
    </>
  );
}
