import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
// import TextField from '@mui/material/TextField';
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Copyright from "../../layouts/copyright";
import Paper from "@mui/material/Paper";
import graphic from "../../assets/Time-management-icons/graphic.png/";
import logo from "../../assets/Time-management-icons/logo.png";

import {
  useLoginEmailMutation,
  // useLoginGoogleMutation
} from "../../features/auth/authService";

// import Input  from '../../components/ui/forminputs/input';
import Input from "../../components/ui/forminputs/input";

import BasicModal from "../../components/ui/modal/modal";

import Table from "../../components/ui/table/table";

// import { useDispatch } from 'react-redux';

// import { setAuth } from '../../features/auth/authSlice';
// import { GoogleLogin } from '@react-oauth/google';

import { useForm, Controller } from "react-hook-form";

// import Button from '../../components/ui/button/button';

// import { PlusOne } from '@mui/icons-material';

import { Add } from "@mui/icons-material";
// const defaultFormFields = {
//   email: '',
//   password: '',
// };

import { Delete, Edit } from "@mui/icons-material";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";

export default function ShiftMaster() {
  const {
    handleSubmit,
    control,
    // errors,
    // getValues, getFieldState,
    formState,
    // reset, watch,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  // console.log(errors)
  // console.log(formState);
  // const [Login, { currentData,isUninitialized,isFetching,isLoading
  //     , isError,
  //       isSuccess,
  //       error}] = useLoginMutation()

  const [
    LoginEmail,
    {
      // currentData,
      // isFetching,
      isLoading,
      // isSuccess, isError,
      // error,
      // status
    },
  ] = useLoginEmailMutation();
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
          password: data.password,
        }).unwrap();
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
      console.error("Login error:", error);
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

  const [isOpen, setIsOpen] = React.useState(false);

  const handleOpen = () => {
    console.log("asdas");
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData("Frozen yoghurt", "yoghurt", 6.0, 24, [

      <Edit />,
      <Delete />,
    ]),
    createData("Ice cream sandwich", "yoghurt", 9.0, 37, [
  
      <Edit />,
      <Delete />,
    ]),
    createData("Eclair", "yoghurt", 16.0, 24, [

      <Edit />,
      <Delete />,
    ]),
    createData("Cupcake", "yoghurt", 3.7, 67, [
      <Edit />,
      <Delete />,
    ]),
    createData("Gingerbread", "yoghurt", 16.0, 49, [
      <Edit />,
      <Delete />,
    ]),
  ];
  return (
    <React.Fragment>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />

        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          component={Paper}
          elevation={6}
          square
        >
          <Box
            sx={{
              my: 2,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              //   alignItems: 'center',
            }}
          >
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={10}>
                <Typography>Shift Master</Typography>
              </Grid>

              <Grid item xs={2}>
                <Button
                  onClick={handleOpen}
                  variant="outlined"
                  startIcon={<Add />}
                >
                  Add New
                </Button>
              </Grid>
            </Grid>
            <Table sx={{ mt: 5 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Shift Code</TableCell>
                  <TableCell align="right">Shift Name</TableCell>
                  <TableCell align="right">Start Time</TableCell>
                  <TableCell align="right">End Time</TableCell>
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
                  Add Shift
                </Typography>
              </Grid>

              <Grid item xs={2}>
                <Button onClick={handleClose} variant="outlined" startIcon={<Add />}>
                  Close
                </Button>
              </Grid>
            </Grid>
              <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                method="post"
                id="modal-modal-description"
                sx={{ mt: 1 }}
              >
                <Grid
                  container
                  rowSpacing={1}
                  spacing={{ xs: 2, md: 3 }}
                  columns={{ xs: 4, sm: 8, md: 12 }}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                  <Grid item xs={6}>
                    <Controller
                      name="shift_code"
                      control={control}
                      rules={{ required: "shift code is required" }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          margin="normal"
                          fullWidth
                          id="shift_code"
                          label="Shift Code"
                          type="text"
                          autoComplete="email"
                          autoFocus
                          formcontrolpops={{
                            fullWidth: true,
                            variant: "standard",
                          }}
                          error={Boolean(formState?.errors?.shift_code)}
                          helperText={formState?.errors?.shift_code?.message}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <Controller
                      name="shift_name"
                      control={control}
                      rules={{
                        required: "shift name is required"
                      }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          margin="normal"
                          fullWidth
                          label="Shift Name"
                          type="text"
                          id="shift_name"
                          autoComplete="shift_name"
                          formcontrolpops={{
                            fullWidth: true,
                            variant: "standard",
                          }}
                          error={Boolean(formState?.errors?.shift_name)}
                          helperText={formState?.errors?.shift_name?.message}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <Controller
                      name="start_time"
                      control={control}
                      rules={{
                        required: "Start Time is required"
                      }}
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
                            fullWidth: true,
                            variant: "standard",
                          }}
                          error={Boolean(formState?.errors?.start_time)}
                          helperText={formState?.errors?.start_time?.message}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <Controller
                      name="end_time"
                      control={control}
                      rules={{
                        required: "Start End is required"
                      }}
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
                            fullWidth: true,
                            variant: "standard",
                          }}
                          error={Boolean(formState?.errors?.end_time)}
                          helperText={formState?.errors?.end_time?.message}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <Controller
                      name="break_time"
                      control={control}
                      rules={{
                        required: "Break End is required"
                      }}
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
                            fullWidth: true,
                            variant: "standard",
                          }}
                          error={Boolean(formState?.errors?.break_time)}
                          helperText={formState?.errors?.break_time?.message}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <Controller
                      name="overtime_start_time"
                      control={control}
                      rules={{
                        required: "Overtime start Time is required"
                      }}
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
                            fullWidth: true,
                            variant: "standard",
                          }}
                          error={Boolean(formState?.errors?.overtime_start_time)}
                          helperText={formState?.errors?.overtime_start_time?.message}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <Controller
                      name="overtime_end_time"
                      control={control}
                      rules={{
                        required: "Overtime End Time is required",
                        minLength: 8,
                      }}
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
                            fullWidth: true,
                            variant: "standard",
                          }}
                          error={Boolean(formState?.errors?.overtime_end_time)}
                          helperText={
                            formState?.errors?.overtime_end_time?.message
                          }
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
