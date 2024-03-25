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
import { Delete, Edit } from "@mui/icons-material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import {
  useCreateJobMutation,
  useEditJobMutation,
  useGetJobDetailMutation,
  useDeleteJobMutation,
  useAssignedtJobMutation,
  // useGetCodejobQuery,
  useLazyGetCodejobQuery,
  useGetJobQuery,
} from "../../features/job/jobService";
import jobServiceApis from "../../features/job/jobService";
import userServiceApis from "../../features/user/userService";
import {
  useGetUsersQuery,
} from "../../features/user/userService";
import MenuItem from "@mui/material/MenuItem";
import { useGetCountryQuery } from "../../features/country/countryService";

export default function JobListing() {
  const [isopen, setIsopen] = React.useState(false);
  const [assignedJobisopen, setAssignedJobIsopen] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

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
      job_code: "",
      job_name: "",
      job_description: "",
      location: "",
      sub_location: "",
      rating: "",
    },
  });

  const {
    handleSubmit: assignedJobHandleSubmit,
    control: assignedJobcontrol,
    // errors,
    // getValues, getFieldState,
    formState: assignedJobformState,
    reset: assignedJobreset,
    watch: assignedJobwatch,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      job_code: "",
      job_id: "",
      job_name: "",
      user_id: ""
    },
  });

  const {
    data: postjobData,
    isLoading: postjobisLoading,
    isFetching: postjobisFetching,
    isSuccess: postjobisSuccess,
    isError: postjobisError,
    error: postjoberror,
    refetch: postjobrefetch,
  } = useGetJobQuery("getJob");


  // console.log(postjobData);
  // console.log(postjobisLoading);
  // console.log(postjobisFetching);
  // console.log(postjobisSuccess);
  // console.log(postjobisError);
  // console.log(postjoberror);

  const [
    DeleteJob,
    {
      // currentData,
      // isFetching,
      isLoading: DeleteJobisLoading,
      // isSuccess, isError,
      // error,
      // status
    },
  ] = useDeleteJobMutation();

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
  ] = useEditJobMutation();

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
  ] = useCreateJobMutation();

  const [
    getPostjobDetail,
    {
      // currentData,
      // isFetching,
      isLoading: DetailJobisLoading,
      // isSuccess, isError,
      // error,
      // status
    },
  ] = useGetJobDetailMutation();

  const handleDetail = async (row) => {
    // console.log(row);
    // console.log("aaaa");
    try {
      console.log(!DetailJobisLoading);
      // if (!DeletePostjobisLoading) {
      const PostjobDetail = await getPostjobDetail(row).unwrap();
      const defaultValues = {
        "jobid": PostjobDetail?.jobid,
        "desciption": PostjobDetail?.desciption,
        "country": PostjobDetail?.country,
        "state": PostjobDetail?.state,
        "rating": PostjobDetail?.rating,
      };
      // });
      reset({ ...defaultValues });

      setIsOpen((prev) => !prev);
    } catch (error) {
      console.error("detail error:", error);
    }
  };

  const handleDelete = async (row) => {
    console.log(row);
    console.log("aaaa");
    try {
      console.log(!DeleteJobisLoading);
      // if (!DeletePostjobisLoading) {
      const asd = await DeleteJob(row).unwrap();
      console.log(asd);
      // }
    } catch (error) {
      console.error("delete error:", error);
    }
  };


  const handleOpen = async () => {
    try {
      const {
        data: codedata,
        isLoading: getcodeisLoading,
        isFetching: codeisFetching,
        isSuccess: codeisSuccess,
      } = await getCode();
      // await coderefetch()
      if (codeisSuccess) {
        // console.log(codedata);
        const defaultValues = {
          job_code: codedata.code,
          job_description: "",
          job_name: "",
          location: "",
          sub_location: "",
          rating: "",
        };

        reset(defaultValues);
      }
      setIsOpen((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  // const [getUsers, { data: userdata, isLoading: getuserisLoading, refetch: getuserrefetch }] =
  //   userServiceApis.endpoints.getUsers.useLazyQuery();



  const handleAssignedJobclose = () => {
    setAssignedJobIsopen((prev) => !prev);
  };


  const {
    data: userdata,
    isLoading: getuserisLoading,
    isSuccess: getuserisSuccess,
    error: getusererror
    // refetch: postjobrefetch,
  } = useGetUsersQuery("getUsers");

  let useroptions = <MenuItem key={1}></MenuItem>;

  if (getuserisLoading) {
    useroptions = <MenuItem key={1}></MenuItem>;
  } else if (getuserisSuccess) {
    // console.log(userdata)
    useroptions = userdata.map((datas) => {
      // console.log(datas);
      return (
        <MenuItem key={datas.userid} value={datas.userid}>
          {datas.first_name}
        </MenuItem>
      );
    });
    // console.log(useroptions);
  } else if (countryDataisError) {
    useroptions = <MenuItem key={1}>{countryDataerror}</MenuItem>;
  }

  const [
    assignedJob,
    {
      // currentData,
      // isFetching,
      isLoading: assignedJobisLoading,
      // isSuccess, isError,
      // error,
      // status
    },
  ] = useAssignedtJobMutation();

  const handlAssignedJobOpen = async (data) => {
    const job = postjobData?.filter((datas) => {
      return datas.jobid == data;
    });

    const defaultValues = {
      "job_code": job[0]?.job_code,
      "job_id": job[0]?.jobid,
      "user_id": "",
      "job_name": job[0]?.name,
    };
    // });
    assignedJobreset({ ...defaultValues });
    console.log(job);
    setAssignedJobIsopen((prev) => !prev);
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
          key={datas.jobid}
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
          <TableCell align="left">{datas?.jobid}</TableCell>
          <TableCell component="th" scope="row" align="center">
            {" "}
            {datas?.desciption}
          </TableCell>
          <TableCell align="center">{datas?.job_country?.name}</TableCell>
          <TableCell align="center">{datas?.job_state?.state}</TableCell>
          <TableCell align="center">{datas?.rating}</TableCell>
          <TableCell
            align="center"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Button
              variant="outlined"
              onClick={() => handlAssignedJobOpen(datas?.jobid)}

            >
              Assigned a Job
            </Button>
            <Edit
              style={{ marginRight: "8px" }}
              key={datas.jobid + index.toString()}
              onClick={() => handleDetail(datas?.jobid)}
            />

            <DeleteIcon
              key={datas.jobid + index.toString() + index.toString()}
              onDelete={() => handleDelete(datas?.jobid)}
            />
          </TableCell>
        </TableRow>
      );
    });
  } else if (postjobisError) {
    console.log(postjoberror);
    content = (
      <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
        <TableCell align="right">error</TableCell>
      </TableRow>
    );
  }
  // console.log(content)
  // console.log(shiftmasterisLoading)
  // console.log(shiftmasterisFetching)
  // console.log(shiftmasterisError)
  // console.log(shiftmastererror)

  const onSubmit = async (data) => {

    setIsopen(true);

    try {
      // console.log(isFetching);
      // console.log(status);
      // console.log(isLoading);
      // console.log(isSuccess);
      // console.log(isError);
      // console.log(error);
      // console.log(!isLoading);

      //shiftid  to change
      setTimeout(async () => {

        if (data?.jobid) {
          if (!EditpostjobisLoading) {
            await EditPostjob(data).unwrap();
            setIsopen(false);
            handleClose();
            reset();
            postjobrefetch();
          }
        } else {
          if (!isLoading) {
            await CreatePostjob(data).unwrap();
            setIsopen(false);
            handleClose();
            reset();
            postjobrefetch();
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

  const assignedJobSubmit = async (data) => {

    setIsopen(true);

    try {
      // console.log(isFetching);
      // console.log(status);
      // console.log(isLoading);
      // console.log(isSuccess);
      // console.log(isError);
      // console.log(error);
      // console.log(!isLoading);

      //shiftid  to change
      // setTimeout(async () => {
      console.log(data);
      if (data?.job_id) {
        if (!assignedJobisLoading) {
          await assignedJob(data).unwrap();
          setIsopen(false);
          handleAssignedJobclose();
          // reset();
          // postjobrefetch();
        }
      }
      // else {
      //   if (!isLoading) {
      //     await assignedJob(data).unwrap();
      //     // setIsopen(false);
      //     // handleClose();
      //     // reset();
      //     // postjobrefetch();
      //   }
      // }

      // }, 3000)


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





  const [getCode, { data: codedata, isLoading: getcodeisLoading, refetch }] =
    jobServiceApis.endpoints.getCodejob.useLazyQuery();



  // const {
  //   data: codedata,
  //   isLoading: getcodeisLoading,
  //   isFetching: codeisFetching,
  //   isSuccess: codeisSuccess,
  //   refetch: coderefetch
  // } = useGetCodejobQuery("getCodejob");


  const handleClose = () => {
    setIsOpen((prev) => !prev);
  };

  const {
    data: countryData,
    isLoading: countryDataisLoading,
    isSuccess: countryDataisSuccess,
    isError: countryDataisError,
    error: countryDataerror,
  } = useGetCountryQuery("getCountry");

  let countyoptions = <MenuItem key={1}></MenuItem>;
  if (countryDataisLoading) {
    countyoptions = <MenuItem key={1}></MenuItem>;
  } else if (countryDataisSuccess) {
    countyoptions = countryData.map((datas) => {
      return (
        <MenuItem key={datas.id} value={datas.id}>
          {datas.name}
        </MenuItem>
      );
    });
  } else if (countryDataisError) {
    countyoptions = <MenuItem key={1}>{countryDataerror}</MenuItem>;
  }

  const countrychnage = watch("location");

  let stateoptions = <MenuItem key={1}></MenuItem>;
  if (
    countrychnage != "" &&
    countrychnage != undefined &&
    countryDataisSuccess
  ) {
    if (countryDataisLoading) {
      stateoptions = <MenuItem key={1}></MenuItem>;
    } else if (countryDataisSuccess) {
      const filtercountry = countryData.filter((datas) => {
        return datas.id == countrychnage;
      });
      console.log(filtercountry);

      stateoptions = filtercountry[0]?.country_state.map((datas) => {
        return (
          <MenuItem key={datas.stateid} value={datas.stateid}>
            {datas.name}
          </MenuItem>
        );
      });
    } else if (countryDataisError) {
      stateoptions = <MenuItem key={1}>{countryDataerror}</MenuItem>;
    }
  }

  const handleopen = () => {
    setIsopen(true);
  };

  const handleclose = () => {
    setIsopen(false);
  };


  // const handleclose = () => {
  //   setIsopen(false);
  // };

  // console.log("postjobData", !postjobData);
  // console.log("postjobData", !postjobisLoading);
  // console.log("postjobData", !postjobisFetching);
  // console.log("postjobData", !postjobisSuccess);
  // console.log("postjobData", !postjobisError);
  // console.log("postjobData", !postjoberror);

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
                <Typography>Post a Job</Typography>
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
                  <TableCell align="center">Job Description</TableCell>
                  <TableCell align="center">Location</TableCell>
                  <TableCell align="center">Sub Location</TableCell>
                  <TableCell align="center">Rating</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{content}</TableBody>
            </Table>

            {/* add modal */}
            <BasicModal isOpen={isOpen} onClose={handleClose} isopen={handleopen} onclose={handleclose}>
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
                      name="job_code"
                      control={control}
                      // rules={{ required: "shift code is required" }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          margin="normal"
                          fullWidth
                          id="job_code"
                          label="Job Code"
                          type="text"
                          readOnly
                          disabled
                          formcontrolpops={{
                            fullWidth: true,
                            variant: "standard",
                          }}
                          error={Boolean(formState?.errors?.job_code)}
                          helperText={formState?.errors?.job_code?.message}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Controller
                      name="job_name"
                      control={control}
                      // rules={{ required: "shift code is required" }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          margin="normal"
                          fullWidth
                          id="job_name"
                          label="Name"
                          type="text"
                          formcontrolpops={{
                            fullWidth: true,
                            variant: "standard",
                          }}
                          error={Boolean(formState?.errors?.job_name)}
                          helperText={formState?.errors?.job_name?.message}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12}>
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
                          type="textarea"
                          id="name"
                          autoComplete="name"
                          formcontrolpops={{
                            fullWidth: true,
                            variant: "standard",
                          }}
                          error={Boolean(formState?.errors?.job_description)}
                          helperText={
                            formState?.errors?.job_description?.message
                          }
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
                          select
                          SelectProps={
                            {
                              // native: true,
                              // inputProps: {name: 'screen_allocation' }
                            }
                          }
                          error={Boolean(formState?.errors?.location)}
                          helperText={formState?.errors?.location?.message}
                        >
                          {countyoptions}
                        </TextField>
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
                          id="sub_location"
                          formcontrolpops={{
                            fullWidth: true,
                            variant: "standard",
                          }}
                          select
                          SelectProps={
                            {
                              // native: true,
                              // inputProps: {name: 'screen_allocation' }
                            }
                          }
                          error={Boolean(formState?.errors?.sub_location)}
                          helperText={formState?.errors?.sub_location?.message}
                        >
                          {stateoptions}
                        </TextField>
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
                          id="rating"
                          formcontrolpops={{
                            fullWidth: true,
                            variant: "standard",
                          }}
                          error={Boolean(formState?.errors?.rating)}
                          helperText={formState?.errors?.rating?.message}
                          select
                          SelectProps={
                            {
                              // native: true,
                              // inputProps: {name: 'screen_allocation' }
                            }
                          }
                        >
                          <MenuItem key={1} value={1}>
                            1
                          </MenuItem>
                          ;
                          <MenuItem key={2} value={2}>
                            2
                          </MenuItem>
                          ;
                          <MenuItem key={3} value={3}>
                            3
                          </MenuItem>
                          ;
                          <MenuItem key={4} value={4}>
                            4
                          </MenuItem>
                          ;
                          <MenuItem key={5} value={5}>
                            5
                          </MenuItem>
                          ;
                        </TextField>
                      )}
                    />
                  </Grid>
                </Grid>


                <Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Add
                  </Button>
                  <Backdrop
                    sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={isopen}
                  // onClick={handleclose}
                  >
                    <CircularProgress color="inherit" />
                  </Backdrop>
                </Grid>


              </Box>
            </BasicModal>
            {/* assigned modal */}



            <BasicModal isOpen={assignedJobisopen} onClose={handleAssignedJobclose}>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={10}>
                  <Typography>Assigned a Job</Typography>
                </Grid>

                <Grid item xs={2}>
                  <Button
                    onClick={handleAssignedJobclose}
                    variant="outlined"
                    startIcon={<Add />}
                  >
                    Close
                  </Button>
                </Grid>
              </Grid>
              <Box
                component="form"
                onSubmit={assignedJobHandleSubmit(assignedJobSubmit)}
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
                      name="job_code"
                      control={assignedJobcontrol}
                      // rules={{ required: "shift code is required" }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          margin="normal"
                          fullWidth
                          id="job_code"
                          label="Job Code"
                          type="text"
                          readOnly
                          disabled
                          formcontrolpops={{
                            fullWidth: true,
                            variant: "standard",
                          }}
                          error={Boolean(formState?.errors?.job_code)}
                          helperText={formState?.errors?.job_code?.message}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Controller
                      name="job_name"
                      control={assignedJobcontrol}
                      // rules={{ required: "shift code is required" }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          margin="normal"
                          fullWidth
                          readOnly
                          disabled
                          id="job_name"
                          label="Name"
                          type="text"
                          formcontrolpops={{
                            fullWidth: true,
                            variant: "standard",
                          }}
                          error={Boolean(formState?.errors?.job_name)}
                          helperText={formState?.errors?.job_name?.message}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <Controller
                      name="user_id"
                      control={assignedJobcontrol}
                      rules={{
                        required: "user is required",
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          margin="normal"
                          fullWidth
                          label="User"
                          id="user_id"
                          formcontrolpops={{
                            fullWidth: true,
                            variant: "standard",
                          }}
                          select
                          SelectProps={
                            {
                              // native: true,
                              // inputProps: {name: 'screen_allocation' }
                            }
                          }
                          error={Boolean(formState?.errors?.user_id)}
                          helperText={formState?.errors?.user_id?.message}
                        >
                          {useroptions}
                        </TextField>
                      )}
                    />
                  </Grid>
                </Grid>


                <Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
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