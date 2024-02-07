import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Copyright from '../../layouts/copyright';
import Paper from '@mui/material/Paper';
import graphic from '../../assets/Time-management-icons/graphic.png/'
import logo from '../../assets/Time-management-icons/logo.png'
import Input from '../../components/ui/forminputs/input';
import BasicModal from '../../components/ui/modal/modal';
import Table from '../../components/ui/table/table';
import { useForm, Controller } from 'react-hook-form';
import { Add } from '@mui/icons-material';


import { Delete, Edit } from '@mui/icons-material';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';

export default function JobListing() {
  const { handleSubmit, control,
    formState
  } = useForm(
    {
      mode: 'onChange',
      defaultValues: {
        email: "",
        password: "",
      },
    }
  );
  const onSubmit = async (data) => {
    // event.preventDefault();
    // console.log(data)
    // const data = new FormData(event.currentTarget);
    try {
      // console.log(isFetching);
      // console.log(status);
      console.log(isLoading);
      // console.log(isSuccess);
      // console.log(isError);
      // console.log(error);
      console.log(!isLoading);
      if (!isLoading) {
        await LoginEmail({
          email: data.email,
          password: data.password
        }).unwrap()
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };



  const responseMessage = async (response) => {
  };
  const errorMessage = (error) => {
    console.log(error);
  };

  const [isOpen, setIsOpen] = React.useState(false);

  const handleOpen = () => {
    console.log("asdas");
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  function createData(name, calories, fat, carbs,rating, protein) {
    return { name, calories, fat, carbs,rating,  protein };
  }

  const rows = [
    createData("Frozen yoghurt", "yoghurt", 6.0, 24,5,[
      <Button variant="outlined">Assigned</Button>,
      <Edit />,
      <Delete />,
    ]),
    createData("Ice cream sandwich", "yoghurt", 9.0, 37,5, [
      <Button variant="outlined">Assigned</Button>,
      <Edit />,
      <Delete />,
    ]),
    createData("Eclair", "yoghurt", 16.0, 24,5, [
      <Button variant="outlined">Assigned</Button>,
      <Edit />,
      <Delete />,
    ]),
    createData("Cupcake", "yoghurt", 3.7, 67, 5,[
      <Button variant="outlined">Assigned</Button>,
      <Edit />,
      <Delete />,
    ]),
    createData("Gingerbread", "yoghurt", 16.0, 49,5, [
      <Button variant="outlined">Assigned</Button>,
      <Edit />,
      <Delete />,
    ]),
  ];
  return (
    <React.Fragment>
      <Grid container  component={Paper} sx={{ height: '100vh' }}>
        <CssBaseline />

        <Grid item xs={12} sm={12} md={12} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 2,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              //   alignItems: 'center',
            }}
          >
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
              <Grid item xs={10}>
                <Typography>
                  Job Listing
                </Typography>
              </Grid>

              <Grid item xs={2}>
                <Button onClick={handleOpen} variant="outlined" startIcon={<Add />}>
                  Add New
                </Button>
              </Grid>
            </Grid>
            <Table sx={{ mt: 5 }} 
            >
   <TableHead>
                <TableRow>
                  <TableCell>Job ID</TableCell>
                  <TableCell align="right" > Job Description</TableCell>
                  <TableCell align="right">Location</TableCell>
                  <TableCell align="right">Sub Location</TableCell>
                  <TableCell align="right">Rating</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.calories}</TableCell>
                    <TableCell align="right">{row.fat}</TableCell>
                    <TableCell align="right">{row.carbs}</TableCell>
                    <TableCell align="right">{row.rating}</TableCell>
                    <TableCell align="right">
                      {row.protein.map((item) => {
                        return item;
                      })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
                </Table>

            <BasicModal isOpen={isOpen} onClose={handleClose}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
              <Grid item xs={10}>
                <Typography>
                  Assign Job
                </Typography>
              </Grid>

              <Grid item xs={2}>
                <Button onClick={handleClose} variant="outlined" startIcon={<Add />}>
                  Close
                </Button>
              </Grid>
            </Grid>
              <Box component="form" onSubmit={handleSubmit(onSubmit)} method="post" id="modal-modal-description" sx={{ mt: 1 }}>
             
                <Grid container rowSpacing={1} spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                  <Grid item xs={6}>
                    <Controller
                      name="job_id"
                      control={control}
                      rules={{ required: 'Job id is required', }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          margin="normal"
                          fullWidth
                          id="job_id"
                          label="Job ID"
                          type="text"
                          autoComplete="job_id"
                          autoFocus
                          formcontrolpops={{
                            "fullWidth": true,
                            "variant": "standard",
                          }}
                          error={Boolean(formState?.errors?.job_id)}
                          helperText={formState?.errors?.job_id?.message}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <Controller
                      name="job_description"
                      control={control}
                      rules={{ required: 'Job description is required', minLength: 8 }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          margin="normal"
                          fullWidth
                          label="Job Description"
                          type="text"
                          id="job_description"
                          autoComplete="job_description"
                          formcontrolpops={{
                            "fullWidth": true,
                            "variant": "standard",
                          }}
                          error={Boolean(formState?.errors?.job_description)}
                          helperText={formState?.errors?.job_description?.message}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <Controller
                      name="location"
                      control={control}
                      rules={{ required: 'Location is required', minLength: 8 }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          margin="normal"
                          fullWidth
                          label="Location"
                          type="text"
                          id="location"
                          autoComplete="location"
                          formcontrolpops={{
                            "fullWidth": true,
                            "variant": "standard",
                          }}
                          error={Boolean(formState?.errors?.location)}
                          helperText={formState?.errors?.location?.message}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <Controller
                      name="sub_location"
                      control={control}
                      rules={{ required: 'Sub Location is required', minLength: 8 }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          margin="normal"
                          fullWidth
                          label="Sub Location"
                          type="text"
                          id="sub_location"
                          autoComplete="sub_location"
                          formcontrolpops={{
                            "fullWidth": true,
                            "variant": "standard",
                          }}
                          error={Boolean(formState?.errors?.sub_location)}
                          helperText={formState?.errors?.sub_location?.message}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <Controller
                      name="rating"
                      control={control}
                      rules={{ required: 'Rating is required', minLength: 8 }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          margin="normal"
                          fullWidth
                          label="Rating"
                          type="text"
                          id="rating"
                          autoComplete="rating"
                          formcontrolpops={{
                            "fullWidth": true,
                            "variant": "standard",
                          }}
                          error={Boolean(formState?.errors?.rating)}
                          helperText={formState?.errors?.rating?.message}
                        />
                      )}
                    />
                  </Grid>
                </Grid>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Add
                </Button>


              </Box>
            </BasicModal>

            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Grid>


      </Grid>
    </React.Fragment>
  );
}