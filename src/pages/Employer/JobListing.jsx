import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Copyright from "../../layouts/copyright";
import Paper from "@mui/material/Paper";
import Input from "../../components/ui/forminputs/input";
import BasicModal from "../../components/ui/modal/modal";
import Table from "../../components/ui/table/table";
import { useForm, Controller } from "react-hook-form";
import { Add } from "@mui/icons-material";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import { TextField } from "@mui/material";
import DeleteIcon from "../../components/ui/Delete/deletePopUp";
import { useCreatePostjobMutation,
  useEditPostjobMutation,
  useGetPostjobDetailMutation,
  useDeletePostjobMutation,
  // useLazyGetCodeQuery,
  useGetPostjobQuery } from "../../features/postJob/postbobService";

export default function JobListing() {
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
      job_id:"",
      job_description:"",
      location:"",
      sub_location:"",
      rating:""
    },
  });

  const {
    data: postjobData,
    isLoading: postjobisLoading,
    isFetching: shiftmasterisFetching,
    isSuccess: postjobisSuccess,
    isError: postjobisError,
    error: postjoberror,
  } = useGetPostjobQuery("getPostjob");

  const [
    DeletePostjob,
    {
      // currentData,
      // isFetching,
      isLoading: DeletePostjobisLoading,
      // isSuccess, isError,
      // error,
      // status
    },
  ] = useDeletePostjobMutation();

  const [
    EditPostjob,
    {
      // currentData,
      // isFetching,
      isLoading: EditpostjobisLoading,
      // isSuccess, isError,
      // error,
      // status
    },
  ] = useEditPostjobMutation();

  const [
    CreatePostjob,
    {
      // currentData,
      // isFetching,
      isLoading,
      // isSuccess, isError,
      // error,
      // status
    },
  ] = useCreatePostjobMutation();

  const [
    getPostjobDetail,
    {
      // currentData,
      // isFetching,
      isLoading: DetailShiftMasterisLoading,
      // isSuccess, isError,
      // error,
      // status
    },
  ] = useGetPostjobDetailMutation();

  const handleDetail = async (row) => {
    console.log(row);
    console.log('aaaa');
    try {

      
      console.log(!DeletePostjobisLoading);
      // if (!DeletePostjobisLoading) {
      const PostjobDetail = await getPostjobDetail(row).unwrap();
      // console.log(asd);
      // }
      console.log(formState)
      // formState.defaultValues.name = "asda";
      // console.log(formState)
      // useForm({


      //below values need to change as per backend
      const defaultValues = {
        // "break_end_time": ShiftMasterDetail?.break_end_time,
        // "break_start_time": ShiftMasterDetail?.break_start_time,
        // "end_time": ShiftMasterDetail?.end_time,
        // "start_time": ShiftMasterDetail?.start_time,
        // "overtime_end_time": ShiftMasterDetail?.overtime_end_time,
        // "overtime_start_time": ShiftMasterDetail?.overtime_start_time,
        // "name": ShiftMasterDetail?.name,
        // "shiftid": ShiftMasterDetail?.shiftid,
      }
      // });
      reset({ ...defaultValues })

      setIsOpen(prev => !prev);
    } catch (error) {
      console.error("delete error:", error);
    }
  };


  const handleDelete = async (row) => {
    console.log(row);
    console.log("aaaa");
    try {
      console.log(!DeletePostjobisLoading);
      // if (!DeletePostjobisLoading) {
      const asd = await DeletePostjob(row).unwrap();
      console.log(asd);
      // }
    } catch (error) {
      console.error("delete error:", error);
    }
  };

 
  let content = "";
  if (postjobisLoading) {
    content = (
      <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
        <TableCell align="right">Loading...</TableCell>
      </TableRow>
    );
  } else if (postjobisSuccess) {
    // console.log(shiftmasterDate)
    content = postjobData.map((datas, index) => {
      return (
        <TableRow
          key={datas.shiftid}
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
          <TableCell align="right">{datas?.jobid}</TableCell>
          <TableCell component="th" scope="row"> {datas?.job_description}</TableCell>
          <TableCell align="right">{datas?.location}</TableCell>
          <TableCell align="right">{datas?.sub_location}</TableCell>
          <TableCell align="right">{datas?.rating}</TableCell>
          <TableCell align="right">
            <Edit key={datas.shiftid + index.toString()} onClick={() => handleDetail(datas?.shiftid)} />
            <DeleteIcon
              key={datas.shiftid + index.toString() + index.toString()}
              onDelete={() => handleDelete(datas?.shiftid)}
            />
          </TableCell>
        </TableRow>
      );
    });
  } else if (postjobisError) {
    content = (
      <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
        <TableCell align="right">{postjoberror}</TableCell>
      </TableRow>
    );
  }
  // console.log(content)
  // console.log(shiftmasterisLoading)
  // console.log(shiftmasterisFetching)
  // console.log(shiftmasterisError)
  // console.log(shiftmastererror)

  const onSubmit = async (data) => {
    // event.preventDefault();
    console.log(data)
    // const data = new FormData(event.currentTarget);
    try {
      // console.log(isFetching);
      // console.log(status);
      // console.log(isLoading);
      // console.log(isSuccess);
      // console.log(isError);
      // console.log(error);
      // console.log(!isLoading);

      //shiftid  to change
      if (data?.shiftid) { 

        if (!EditpostjobisLoading) {
          await EditPostjob(data).unwrap();
          handleClose();
          reset();
        }
      } else {

        if (!isLoading) {
          await CreatePostjob(data).unwrap();
          handleClose();
          reset();
        }
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

  const [isOpen, setIsOpen] = React.useState(false);

  const handleOpen = async () => {
    console.log("asdas");
    try {
      const {
        data: codedata,
        isLoading: getcodeisLoading,
        isFetching: codeisFetching,
        isSuccess: codeisSuccess,
      } = await getCode();

      console.log(codedata);
      console.log(getcodeisLoading);
      console.log(getcodeisLoading);
      console.log(codeisSuccess);
      if (codeisSuccess) {
        console.log(codedata);
      }
      // console.log(queryStateResults);
      // console.log(info);
    } catch (error) {
      console.log(error);
    }
    setIsOpen((prev) => !prev);
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
                  <TableCell>Job ID</TableCell>
                  <TableCell align="right">Job Description</TableCell>
                  <TableCell align="right">Location</TableCell>
                  <TableCell align="right">Sub Location</TableCell>
                  <TableCell align="right">Rating</TableCell>
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
                  <Typography>Add a Job</Typography>
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
                      name="job_id"
                      control={control}
                      // rules={{ required: "shift code is required" }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          margin="normal"
                          fullWidth
                          id="job_id"
                          label="Job ID"
                          type="text"
                          readOnly
                          disabled
                          formcontrolpops={{
                            fullWidth: true,
                            variant: "standard",
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
                      rules={{
                        required: "Job description is required",
                      }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          margin="normal"
                          fullWidth
                          label="Job Description"
                          type="text"
                          id="name"
                          autoComplete="name"
                          formcontrolpops={{
                            fullWidth: true,
                            variant: "standard",
                          }}
                          error={Boolean(formState?.errors?.job_description)}
                          helperText={formState?.errors?.job_description?.message}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={6} mt={2}>
                    <Controller
                      name="location"
                      control={control}
                      rules={{
                        required: "Location is required",
                      }}
                      defaultValue={null}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          id="location"
                          type="text"
                          label="Location"
                          formcontrolpops={{
                            fullWidth: true,
                            variant: "standard",
                          }}
                          error={Boolean(formState?.errors?.location)}
                          helperText={formState?.errors?.location?.message}
                        ></TextField>
                      )}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <Controller
                      name="sub_location"
                      control={control}
                      rules={{
                        required: "Sub location is required",
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          margin="normal"
                          fullWidth
                          label="Sub Location"
                          type="text"
                          id="sub_location"
                          formcontrolpops={{
                            fullWidth: true,
                            variant: "standard",
                          }}
                          error={Boolean(formState?.errors?.sub_location)}
                          helperText={formState?.errors?.sub_location?.message}
                        ></TextField>
                      )}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Controller
                      name="rating"
                      control={control}
                      rules={{
                        required: "Rating is required",
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          margin="normal"
                          fullWidth
                          label="Rating"
                          type="text"
                          id="rating"
                          formcontrolpops={{
                            fullWidth: true,
                            variant: "standard",
                          }}
                          error={Boolean(formState?.errors?.rating)}
                          helperText={
                            formState?.errors?.rating?.message
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
