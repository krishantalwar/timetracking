import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Copyright from "../../layouts/copyright";
import Paper from "@mui/material/Paper";
import CloseIcon from '@mui/icons-material/Close';
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import {
  useCreateShiftMasterMutation,
  useGetShiftQuery,
  useDeleteShiftMasterMutation,
  useGetShiftMasterDetailMutation,
  useEditShiftMasterMutation,
  // useLazyGetCodeQuery
} from "../../features/shiftmaster/shiftService";
import shiftServiceApis from "../../features/shiftmaster/shiftService";

import Input from "../../components/ui/forminputs/input";

import BasicModal from "../../components/ui/modal/modal";

import Table from "../../components/ui/table/table";

import { useForm, Controller } from "react-hook-form";

import { Add } from "@mui/icons-material";

import { Delete, Edit } from "@mui/icons-material";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";

import { TextField } from "@mui/material";

import DeleteIcon from "../../components/ui/Delete/deletePopUp";
import { styled } from '@mui/material/styles';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#318CE7",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));


const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function ShiftMaster() {
  const [isopen, setIsopen] = React.useState(false);

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
      shift_code: "",
      break_end_time: "",
      break_start_time: "",
      end_time: "",
      start_time: "",
      overtime_end_time: "",
      overtime_start_time: "",
      name: "",
      shiftid: ""
    },
  });

  // const { trigger, queryStateResults, info } = shiftServiceApis.useLazyGetCodeQuery('getCode');

  // const { data: codedata, error, isError, isLoading: codeisLoading, isFetching } = result;
  // console.log(queryStateResults);
  // console.log(info);
  // console.log(useLazyGetCodeQuery);

  // console.log(codedata);
  // console.log(error);
  // console.log(isError);
  // console.log(codeisLoading);
  const [getCode, { data: codedata, isLoading: getcodeisLoading, refetch: getCoderefetch }] =
    shiftServiceApis.endpoints.getCode.useLazyQuery();

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
    refetch: getShiftRefetch
  } = useGetShiftQuery("getShift");

  const [
    DeleteShiftMaster,
    {
      // currentData,
      // isFetching,
      isLoading: DeleteShiftMasterisLoading,
      // isSuccess, isError,
      // error,
      // status
    },
  ] = useDeleteShiftMasterMutation();

  const [
    getShiftMasterDetail,
    {
      // currentData,
      // isFetching,
      isLoading: DetailShiftMasterisLoading,
      // isSuccess, isError,
      // error,
      // status
    },
  ] = useGetShiftMasterDetailMutation();

  const [
    EditShiftMaster,
    {
      // currentData,
      // isFetching,
      isLoading: EditShiftMasterisLoading,
      // isSuccess, isError,
      // error,
      // status
    },
  ] = useEditShiftMasterMutation();



  const handleDelete = async (row) => {
    // console.log(row);
    // console.log("aaaa");
    try {

      if (!DeleteShiftMasterisLoading) {
        const asd = await DeleteShiftMaster(row).unwrap();
        // console.log(asd);
      }
    } catch (error) {
      console.error("delete error:", error);
    }
  };

  let content = "";
  if (shiftmasterisLoading) {
    content = (
      <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
        <TableCell align="right">Loading...</TableCell>
      </TableRow>
    );
  } else if (shiftmasterisSuccess) {
    // console.log(shiftmasterDate)
    content = shiftmasterDate.map((datas, index) => {
      return (
        <StyledTableRow
          key={datas.shiftid}
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
          <StyledTableCell align="center">{datas?.shiftid}</StyledTableCell>
          <StyledTableCell align="center" component="th" scope="row"> {datas?.name} </StyledTableCell>
          <StyledTableCell align="center">{datas?.start_time}</StyledTableCell>
          <StyledTableCell align="center">{datas?.end_time}</StyledTableCell>

          {/* <TableCell align="right">
            <Edit key={datas.shiftid + index.toString()} onClick={() => handleDetail(datas?.shiftid)} />
            <DeleteIcon
              key={datas.shiftid + index.toString() + index.toString()}
              onDelete={() => handleDelete(datas?.shiftid)}
            />
          </TableCell> */}

          <StyledTableCell align="center" style={{ display: 'flex', justifyContent: 'center' }}>
            <Edit style={{ marginRight: '8px' }} key={datas.shiftid + index.toString()} onClick={() => handleDetail(datas?.shiftid)} />
            <DeleteIcon key={datas.shiftid + index.toString() + index.toString()} onDelete={() => handleDelete(datas?.shiftid)} />
          </StyledTableCell>
        </StyledTableRow>
      );
    });
  } else if (shiftmasterisError) {
    content = (
      <StyledTableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
        <StyledTableCell align="right">{shiftmastererror}</StyledTableCell>
      </StyledTableRow>
    );
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
      setIsopen(true);

      setTimeout(async () => {
        if (data?.shiftid) {

          if (!EditShiftMasterisLoading) {
            await EditShiftMaster(data).unwrap();
            setIsopen(false);
            handleClose();
            getShiftRefetch();
            reset();
          }
        } else {
          if (!isLoading) {
            const defaultValues = {
              "break_end_time": data?.break_end_time,
              "break_start_time": data?.break_start_time,
              "end_time": data?.end_time,
              "start_time": data?.start_time,
              "overtime_end_time": data?.overtime_end_time,
              "overtime_start_time": data?.overtime_start_time,
              "name": data?.name,
              // "shiftid": ShiftMasterDetail?.shiftid,
              "shift_code": data.shift_code,
            }
            await CreateShiftMaster(defaultValues).unwrap();
            setIsopen(false);
            handleClose();
            getShiftRefetch();
            reset();
          }
        }

      }, 3000)


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

  const handleDetail = async (row) => {
    console.log(row);
    console.log('aaaa');
    try {
      if (!DetailShiftMasterisLoading) {
        const ShiftMasterDetail = await getShiftMasterDetail(row).unwrap();
        // console.log(asd);
        // formState.defaultValues.name = "asda";
        // console.log(formState)
        // useForm({
        const defaultValues = {
          "break_end_time": ShiftMasterDetail?.break_end_time,
          "break_start_time": ShiftMasterDetail?.break_start_time,
          "end_time": ShiftMasterDetail?.end_time,
          "start_time": ShiftMasterDetail?.start_time,
          "overtime_end_time": ShiftMasterDetail?.overtime_end_time,
          "overtime_start_time": ShiftMasterDetail?.overtime_start_time,
          "name": ShiftMasterDetail?.name,
          "shiftid": ShiftMasterDetail?.shiftid,
          "shift_code": ShiftMasterDetail.shift_code,
        }
        // });
        reset({ ...defaultValues })

        setIsOpen(prev => !prev);

      }
      console.log(formState)
    } catch (error) {
      console.error("delete error:", error);
    }
  };

  const handleopen = () => {
    setIsopen(true);
  };

  const handleclose = () => {
    setIsopen(false);
  };


  const handleOpen = async () => {
    // console.log("asdas");
    try {
      const {
        data: codedata,
        isLoading: getcodeisLoading,
        isFetching: codeisFetching,
        isSuccess: codeisSuccess,
      } = await getCode();

      // console.log(codedata);
      // console.log(getcodeisLoading);
      // console.log(getcodeisLoading);
      // console.log(codeisSuccess);
      if (codeisSuccess) {
        // console.log(codedata);
        const defaultValues = {
          "break_end_time": "",
          "break_start_time": "",
          "end_time": "",
          "start_time": "",
          "overtime_end_time": "",
          "overtime_start_time": "",
          "name": "",
          "shift_code": codedata.code,
        }
        // });
        reset({ ...defaultValues })
        setIsOpen((prev) => !prev);
      }
      // console.log(queryStateResults);
      // console.log(info);
    } catch (error) {
      console.log(error);
    }

  };

  const handleClose = () => {
    setIsOpen((prev) => !prev);
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
                <Typography style={{
                  color: "#318CE7",
                }}><b>Shift Master</b></Typography>
              </Grid>

              <Grid item xs={2}>
                <Button
                  onClick={handleOpen}
                  variant="outlined"
                  startIcon={<Add />}
                  style={{
                    margin:"0 0 10px"
                  }}
                >
                  Add New
                </Button>
              </Grid>
            </Grid>
            <Table sx={{ mt: 5 }}>
              <TableHead style={{
                  border:"1px solid black",
                
                }} >
                <TableRow>
                  <StyledTableCell align="center"><b>Shift Code</b></StyledTableCell>
                  <StyledTableCell align="center"><b>Shift Name</b></StyledTableCell>
                  <StyledTableCell align="center"><b>Start Time</b></StyledTableCell>
                  <StyledTableCell align="center"><b>End Time</b></StyledTableCell>
                  <StyledTableCell align="center"><b>Action</b></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{
                  border:"1px solid black",
                
                }}>{content}</TableBody>
            </Table>

            <BasicModal isOpen={isOpen} onClose={handleClose} isopen={handleopen} onclose={handleclose}>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={10}>
                  <Typography style={{
                  color: "#318CE7",
                }}><b>Add Shift</b></Typography>
                </Grid>

                {/* <Grid item xs={2}>
                  <Button
                    onClick={handleClose}
                    variant="outlined"
                    startIcon={<CloseIcon />}
                  >
                    Close
                  </Button>
                </Grid> */}
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
                          // readOnly
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
                <Grid item xs={12} style={{ textAlign: 'right' }}>
                
                <Button
                  onClick={handleClose}
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Cancel
                </Button>
              
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 3, mb: 2 , ml:2, width: '90px', minWidth: '10px' }}
                 
                >
                  Add
                </Button>
                  <Backdrop
                    sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={isopen}
                    onClick={handleclose}
                  >
                    <CircularProgress color="inherit" />
                  </Backdrop>
                </Grid>

              </Box>
            </BasicModal>

            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
