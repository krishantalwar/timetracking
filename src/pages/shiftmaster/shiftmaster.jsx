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

import {
  useLoginEmailMutation,
  // useLoginGoogleMutation
} from '../../features/auth/authService';

// import Input  from '../../components/ui/forminputs/input';
import Input from '../../components/ui/forminputs/input';

// import BasicModal from '../../components/ui/modal/modal';


// import { useDispatch } from 'react-redux';

// import { setAuth } from '../../features/auth/authSlice';
// import { GoogleLogin } from '@react-oauth/google';

import { useForm, Controller } from 'react-hook-form';

// import Button from '../../components/ui/button/button';
import { Delete } from '@mui/icons-material';

// import { PlusOne } from '@mui/icons-material';

import { Add } from '@mui/icons-material';
// const defaultFormFields = {
//   email: '',
//   password: '',
// };


export default function ShiftMaster() {
  const { handleSubmit, control,
    // errors,
    // getValues, getFieldState, 
    formState
    // reset, watch,
  } = useForm(
    {
      mode: 'onChange',
      defaultValues: {
        email: "",
        password: "",
      },
    }
  );
  // console.log(errors)
  // console.log(formState);
  // const [Login, { currentData,isUninitialized,isFetching,isLoading
  //     , isError,
  //       isSuccess,
  //       error}] = useLoginMutation()

  const [LoginEmail, {
    // currentData, 
    // isFetching,
    isLoading,
    // isSuccess, isError,
    // error,
    // status
  }] = useLoginEmailMutation();
  // const [LoginGoogle, { isLoadings }] = useLoginGoogleMutation();

  // const [APIError, setAPIError] = React.useState('');
  // const { email, password } = formFields;

  // const dispatch = useDispatch();
  const resetFormFields = () => {
    // setFormFields(defaultFormFields);
  };



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

      // dispatch(setAuth({ isAuthenticated: true, user: { 'asdas': 'das' } }));

      // resetFormFields()
      // Redirect to the dashboard page after successful login
      // history.push('/dashboard');
    } catch (error) {
      // console.error('Login error:');
      // console.log(isFetching);
      // console.log(status);
      // console.log(isLoading);
      // console.log(isSuccess);
      // console.log(isError);
      // console.log(error);
      // console.log(!isLoading);
      // Handle login error
      // setAPIError(error.data)
      console.error('Login error:', error);
    }
  };

  // const handleChange = (event) => {
  //   const { name, value } = event.target;
  //   setFormFields({ ...formFields, [name]: value });
  // };


  const responseMessage = async (response) => {
    // console.log(response);

    // console.log(response.clientId);

    // await LoginGoogle(response).unwrap()
  };
  const errorMessage = (error) => {
    console.log(error);
  };

  return (
    <React.Fragment>
      <Grid container component="main" sx={{ height: '100vh' }}>
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
            <Grid item xs={12} sm={12} md={12} >
                    <Grid xs={7}>
                        <Typography>
                            Shift Master
                        </Typography>
                    </Grid>

                    <Grid xs={5}>
                        <Button variant="outlined"  startIcon={<Add />}>
                            Add New
                        </Button>
                    </Grid>
            </Grid>
            
         
           
            <Box component="form" onSubmit={handleSubmit(onSubmit)} method="post" sx={{ mt: 1 }}>
                <Grid container rowSpacing={1 }  spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}  columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

                    <Grid xs={6}>
                        <Controller
                            name="email"
                            control={control}
                            rules={{ required: 'Email is required', pattern: /^\S+@\S+$/i }}
                            render={({ field }) => (
                            <Input
                                {...field}
                                margin="normal"
                                fullWidth
                                id="email"
                                label="Email Address"
                                type="email"
                                autoComplete="email"
                                autoFocus
                                formcontrolpops={{
                                "fullWidth": true,
                                "variant": "standard",
                                }}
                                error={Boolean(formState?.errors?.email)}
                                helperText={formState?.errors?.email?.message}
                            />
                            )}
                        />
                    </Grid>

                    <Grid xs={6}>
                        <Controller
                            name="password"
                            control={control}
                            rules={{ required: 'Password is required', minLength: 8 }}
                            render={({ field }) => (
                            <Input
                                {...field}
                                margin="normal"
                                fullWidth
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                formcontrolpops={{
                                "fullWidth": true,
                                "variant": "standard",
                                }}
                                error={Boolean(formState?.errors?.password)}
                                helperText={formState?.errors?.password?.message}
                            />
                            )}
                        />
                    </Grid>

                    <Grid xs={6}>
                        <Controller
                            name="start_time"
                            control={control}
                            rules={{ required: 'Start Time is required', minLength: 8 }}
                            render={({ field }) => (
                            <Input
                                {...field}
                                margin="normal"
                                fullWidth
                                label="Shift Start Time"
                                type="text"
                                id="start_time"
                                autoComplete="start_time"
                                formcontrolpops={{
                                "fullWidth": true,
                                "variant": "standard",
                                }}
                                error={Boolean(formState?.errors?.password)}
                                helperText={formState?.errors?.password?.message}
                            />
                            )}
                        />
                    </Grid>

                    <Grid xs={6}>
                        <Controller
                            name="end_time"
                            control={control}
                            rules={{ required: 'Start End is required', minLength: 8 }}
                            render={({ field }) => (
                            <Input
                                {...field}
                                margin="normal"
                                fullWidth
                                label="Shift End Time"
                                type="text"
                                id="end_time"
                                autoComplete="end_time"
                                formcontrolpops={{
                                "fullWidth": true,
                                "variant": "standard",
                                }}
                                error={Boolean(formState?.errors?.password)}
                                helperText={formState?.errors?.password?.message}
                            />
                            )}
                        />
                    </Grid>

                    <Grid xs={6}>
                        <Controller
                            name="break_time"
                            control={control}
                            rules={{ required: 'Break End is required', minLength: 8 }}
                            render={({ field }) => (
                            <Input
                                {...field}
                                margin="normal"
                                fullWidth
                                label="Break End Time"
                                type="text"
                                id="break_time"
                                autoComplete="break_time"
                                formcontrolpops={{
                                "fullWidth": true,
                                "variant": "standard",
                                }}
                                error={Boolean(formState?.errors?.password)}
                                helperText={formState?.errors?.password?.message}
                            />
                            )}
                        />
                    </Grid>

                    <Grid xs={6}>
                        <Controller
                            name="overtime_start_time"
                            control={control}
                            rules={{ required: 'Overtime start Time is required', minLength: 8 }}
                            render={({ field }) => (
                            <Input
                                {...field}
                                margin="normal"
                                fullWidth
                                label="Overtime start Time"
                                type="text"
                                id="overtime_start_time"
                                autoComplete="overtime_start_time"
                                formcontrolpops={{
                                "fullWidth": true,
                                "variant": "standard",
                                }}
                                error={Boolean(formState?.errors?.password)}
                                helperText={formState?.errors?.password?.message}
                            />
                            )}
                        />
                    </Grid>

                    <Grid xs={6}>
                        <Controller
                            name="overtime_end_time"
                            control={control}
                            rules={{ required: 'Overtime End Time is required', minLength: 8 }}
                            render={({ field }) => (
                            <Input
                                {...field}
                                margin="normal"
                                fullWidth
                                label="Overtime End Time"
                                type="text"
                                id="overtime_end_time"
                                autoComplete="overtime_end_time"
                                formcontrolpops={{
                                "fullWidth": true,
                                "variant": "standard",
                                }}
                                error={Boolean(formState?.errors?.password)}
                                helperText={formState?.errors?.password?.message}
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
                Sign In
              </Button>

              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>


      </Grid>
    </React.Fragment>
  );
}