import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
// import TextField from '@mui/material/TextField';
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import BasicModal from "../../components/ui/modal/modal";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Copyright from "../../layouts/copyright";
import Paper from "@mui/material/Paper";
import graphic from "../../assets/Time-management-icons/graphic.png/";
import logo from "../../assets/Time-management-icons/logo.png";
import Shiftpaylogo from "../../assets/Time-management-icons/shiftnpay.png";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Input from "../../components/ui/forminputs/input";
import { useForm, Controller } from "react-hook-form";
import { useCreateSignupUserMutation } from "../../features/user/userService";
// import { useHistory } from "react-router-dom";

export default function SignIn() {

  const [isopen, setIsopen] = React.useState(false);
  // const history = useHistory();

  const {
    handleSubmit,
    control,
  
    formState,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      firstname: "",
      lastname: "",
      email:"",
      Phonenumber:""

    },
  });

  const [
    createSignupUser,
    {
      // currentData,
      // isFetching,
      isLoading,
      // isSuccess, isError,
      // error,
      // status
    },
  ] = useCreateSignupUserMutation();


  const onSubmit = async (data) => {
    try {
      setIsopen(true);
        if (!isLoading) {
          await createSignupUser({
            email: data.email,
            first_name: data.first_name,
            last_name:data.last_name,
            Phonenumber:data.Phonenumber,
            "status":"0",
            "user_type":"2"
          }).unwrap();
          setIsopen(false);
          reset();  
          
          
        }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleopen = () => {
    setIsopen(true);
  };

  const handleclose = () => {
    setIsopen(false);
  };
  return (
    <React.Fragment>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />

        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img src={Shiftpaylogo} style={{ marginBottom: 20 }} />
            <Typography component="h2" variant="h5">
              Welcome to Time Tracking & Shift Managment System
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              method="post"
              sx={{ mt: 1 }}
            >
                <Controller
                name="first_name"
                control={control}
                rules={{ required: "First name is required"}}
                render={({ field }) => (
                  <Input
                    {...field}
                    margin="normal"
                    fullWidth
                    id="firstname"
                    label="First Name"
                    type="firstname"
                    autoComplete="firstname"
                    autoFocus
                    formcontrolpops={{
                      fullWidth: true,
                      variant: "standard",
                    }}
                    error={Boolean(formState?.errors?.firstname)}
                    helperText={formState?.errors?.firstname?.message}
                  />
                )}
              />
              <Controller
                name="last_name"
                control={control}
                rules={{ required: "Last Name is required" }}
                render={({ field }) => (
                  <Input
                    {...field}
                    margin="normal"
                    fullWidth
                    id="lastname"
                    label="Last Name"
                    type="lastname"
                    autoComplete="lastname"
                    autoFocus
                    formcontrolpops={{
                      fullWidth: true,
                      variant: "standard",
                    }}
                    error={Boolean(formState?.errors?.lastname)}
                    helperText={formState?.errors?.lastname?.message}
                  />
                )}
              />
              <Controller
                name="email"
                control={control}
                rules={{ required: "Email is required" }}
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
                      fullWidth: true,
                      variant: "standard",
                    }}
                    error={Boolean(formState?.errors?.email)}
                    helperText={formState?.errors?.email?.message}
                  />
                )}
              />

              <Controller
                name="Phonenumber"
                control={control}
                rules={{ required: "Phone Number is required" }}
                render={({ field }) => (
                  <Input
                    {...field}
                    margin="normal"
                    fullWidth
                    label="Phone Number "
                    type="Phonenumber"
                    id="Phonenumber"
                    autoComplete="current-password"
                    formcontrolpops={{
                      fullWidth: true,
                      variant: "standard",
                    }}
                    error={Boolean(formState?.errors?.Phonenumber)}
                    helperText={formState?.errors?.Phonenumber?.message}
                  />
                )}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
                            <Backdrop
                      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                      open={isopen}
                      onClick={handleclose}
                    >
                      <CircularProgress color="inherit" />
                    </Backdrop>
              <Grid container>
                <Grid item xs={{alignItems:'right'}}>
                <Link to='/login' variant="body2">
                    Login
                  </Link>
                  </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>

        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${graphic})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </Grid> 
    </React.Fragment>
  );
}
