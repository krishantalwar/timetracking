import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Copyright from '../../layouts/copyright';
import Shiftpaylogo from "../../assets/Time-management-icons/shiftnpay.png";

import {
    useLoginEmailMutation,
    // useLoginGoogleMutation
} from '../../features/auth/authService';

// import Input  from '../../components/ui/forminputs/input';
import Input from '../../components/ui/forminputs/input';

// import { useDispatch } from 'react-redux';

// import { setAuth } from '../../features/auth/authSlice';

import { useForm, Controller } from 'react-hook-form';




// const defaultFormFields = {
//   email: '',
//   password: '',
// };


export default function Forget() {
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
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <img src={Shiftpaylogo} style={{ marginBottom: 20 }} />
                    <Typography component="h1" variant="h5">
                        Forgot Password
                    </Typography>


                    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>

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




                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Send Verfication Code
                        </Button>


                        <Grid container>

                        </Grid>
                    </Box>

                </Box>
                <Copyright />
            </Container>
        </React.Fragment>
    );
}