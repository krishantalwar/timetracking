import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Copyright from "../../layouts/copyright";
import Paper from "@mui/material/Paper";

import {
  useCreateShiftMasterMutation,
  useGetShiftQuery,
} from "../../features/shiftmaster/shiftService";

import Input from "../../components/ui/forminputs/input";

import BasicModal from "../../components/ui/modal/modal";

import Table from "../../components/ui/table/table";

import { useForm, Controller } from "react-hook-form";

import { Add } from "@mui/icons-material";

import { Delete, Edit } from "@mui/icons-material";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";

import { TextField } from "@mui/material";

export default function ShiftMaster() {
  const {
    handleSubmit,
    control,
    // errors,
    // getValues, getFieldState,
    formState,
    reset,
    watch,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      break_end_time: "",
      break_start_time: "",
      end_time: "",
      start_time: "",
      overtime_end_time: "",
      overtime_start_time: "",
      name: "",
    },
  });

  const [
    CreateShiftMaster,
    {
      // currentData,
      // isFetching,
      isLoading,
      // isSuccess, isError,
      // error,
      // status
    },
  ] = useCreateShiftMasterMutation();

  const {
    data: shiftmasterDate,
    isLoading: shiftmasterisLoading,
    isFetching: shiftmasterisFetching,
    isSuccess: shiftmasterisSuccess,
    isError: shiftmasterisError,
    error: shiftmastererror,
  } = useGetShiftQuery("getShift");

  let content = "";
  if (shiftmasterisLoading) {
    content = <TableRow
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell align="right">Loading...</TableCell>
    </TableRow>
      ;
  } else if (shiftmasterisSuccess) {
    // console.log(shiftmasterDate)
    content = shiftmasterDate.map((datas) => {
      return (
        <TableRow
          key={datas.shiftid}
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
          <TableCell align="right">{datas?.shift_code}</TableCell>
          <TableCell component="th" scope="row">
            {datas?.name}
          </TableCell>
          <TableCell align="right">{datas?.start_time}</TableCell>
          <TableCell align="right">{datas?.end_time}</TableCell>

          <TableCell align="right">
            <Edit key={datas.shiftid} />
            <Delete key={datas.shiftid} />
          </TableCell>
        </TableRow>
      );
    });
  } else if (shiftmasterisError) {
    content = <Typography>{shiftmastererror}</Typography>;
  }
  // console.log(content)
  // console.log(shiftmasterisLoading)
  // console.log(shiftmasterisFetching)
  // console.log(shiftmasterisError)
  // console.log(shiftmastererror)

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
        await CreateShiftMaster(data).unwrap();
        handleClose();
        reset();
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

  const [isOpen, setIsOpen] = React.useState(false);

  const handleOpen = () => {
    console.log("asdas");
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

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
              <TableBody>{content}</TableBody>
            </Table>

            <BasicModal isOpen={isOpen} onClose={handleClose}>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={10}>
                  <Typography>Add Shift</Typography>
                </Grid>

                <Grid item xs={2}>
                  <Button
                    onClick={handleClose}
                    variant="outlined"
                    startIcon={<Add />}
                  >
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
                      // rules={{ required: "shift code is required" }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          margin="normal"
                          fullWidth
                          id="shift_code"
                          label="Shift Code"
                          type="text"
                          readonly
                          disabled
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
                      name="name"
                      control={control}
                      rules={{
                        required: "shift name is required",
                      }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          margin="normal"
                          fullWidth
                          label="Shift Name"
                          type="text"
                          id="name"
                          autoComplete="name"
                          formcontrolpops={{
                            fullWidth: true,
                            variant: "standard",
                          }}
                          error={Boolean(formState?.errors?.name)}
                          helperText={formState?.errors?.name?.message}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={6} mt={2}>
                    <Controller
                      name="start_time"
                      control={control}
                      rules={{
                        required: "Start Time is required",
                      }}
                      defaultValue={null}
                      render={({ field }) => (
                        <TextField
                        InputLabelProps={{ shrink: true }}
                          {...field}
                          fullWidth
                          id="start_time"
                          label="Shift Start Time"
                          formcontrolpops={{
                            fullWidth: true,
                            variant: "standard",
                          }}
                          type="time"
                          error={Boolean(formState?.errors?.start_time)}
                          helperText={formState?.errors?.start_time?.message}
                        ></TextField>
                      )}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <Controller
                      name="end_time"
                      control={control}
                      rules={{
                        required: "Start End is required",
                      }}
                      render={({ field }) => (
                        <TextField
                        InputLabelProps={{ shrink: true }}
                          {...field}
                          margin="normal"
                          fullWidth
                          label="Shift End Time"
                          type="time"
                          id="end_time"
                          autoComplete="end_time"
                          formcontrolpops={{
                            fullWidth: true,
                            variant: "standard",
                          }}
                          error={Boolean(formState?.errors?.end_time)}
                          helperText={formState?.errors?.end_time?.message}
                        ></TextField>
                      )}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Controller
                      name="break_start_time"
                      control={control}
                      rules={{
                        required: "Break start is required",
                      }}
                      render={({ field }) => (
                        <TextField
                        InputLabelProps={{ shrink: true }}
                          {...field}
                          margin="normal"
                          fullWidth
                          label="Break Start Time"
                          type="time"
                          id="break_start_time"
                          formcontrolpops={{
                            fullWidth: true,
                            variant: "standard",
                          }}
                          error={Boolean(formState?.errors?.break_start_time)}
                          helperText={
                            formState?.errors?.break_start_time?.message
                          }
                        ></TextField>
                      )}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <Controller
                      name="break_end_time"
                      control={control}
                      rules={{
                        required: "Break End is required",
                      }}
                      render={({ field }) => (
                        <TextField
                        InputLabelProps={{ shrink: true }}
                          {...field}
                          margin="normal"
                          fullWidth
                          label="Break End Time"
                          type="time"
                          id="break_end_time"
                          formcontrolpops={{
                            fullWidth: true,
                            variant: "standard",
                          }}
                          error={Boolean(formState?.errors?.break_end_time)}
                          helperText={
                            formState?.errors?.break_end_time?.message
                          }
                        ></TextField>
                      )}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <Controller
                      name="overtime_start_time"
                      control={control}
                      rules={{
                        required: "Overtime start Time is required",
                      }}
                      render={({ field }) => (
                        <TextField
                          InputLabelProps={{ shrink: true }}
                          {...field}
                          margin="normal"
                          fullWidth
                          label="Overtime start Time"
                          type="time"
                          id="overtime_start_time"
                          autoComplete="overtime_start_time"
                          formcontrolpops={{
                            fullWidth: true,
                            variant: "standard",
                          }}
                          error={Boolean(
                            formState?.errors?.overtime_start_time
                          )}
                          helperText={
                            formState?.errors?.overtime_start_time?.message
                          }
                        ></TextField>
                      )}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <Controller
                      name="overtime_end_time"
                      control={control}
                      rules={{
                        required: "Overtime End Time is required",
                      }}
                      render={({ field }) => (
                        <TextField
                        InputLabelProps={{ shrink: true }}
                          {...field}
                          margin="normal"
                          fullWidth
                          label="Overtime End Time"
                          type="time"
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
                        ></TextField>
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
