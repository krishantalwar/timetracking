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
import {
  useCreateJobMutation,
  useEditJobMutation,
  useGetJobDetailMutation,
  useDeleteJobMutation,
  // useGetCodejobQuery,
  useLazyGetCodejobQuery,
  useGetJobQuery,
} from "../../features/job/jobService";
import jobServiceApis from "../../features/job/jobService";
import MenuItem from "@mui/material/MenuItem";
import { useGetCountryQuery } from "../../features/country/countryService";

export default function JobListing() {
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
      job_code: "",
      job_name: "",
      job_description: "",
      location: "",
      sub_location: "",
      rating: "",
      jobid: ""
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
        "job_description": PostjobDetail?.desciption,
        "location": PostjobDetail?.country,
        "sub_location": PostjobDetail?.state,
        "rating": PostjobDetail?.rating,
        "job_code": PostjobDetail?.job_code,
        "job_name": PostjobDetail?.name,

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
          <TableCell align="left">{"JB" + datas?.jobid}</TableCell>
          <TableCell component="th" scope="row" align="center">
            {" "}
            {datas?.desciption}
          </TableCell>
          <TableCell align="center">{datas?.job_country?.name}</TableCell>
          <TableCell align="center">{datas?.job_state?.name}</TableCell>
          <TableCell align="center">{datas?.rating}</TableCell>
          <TableCell
            align="center"
            style={{ display: "flex", justifyContent: "center" }}
          >
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
            await postjobrefetch();
          }
        } else {
          if (!isLoading) {

            const bodyDefault = {
              // "jobid": data?.jobid,
              "job_description": data?.job_description,
              "location": data?.location,
              "sub_location": data?.sub_location,
              "rating": data?.rating,
              "job_code": data?.job_code,
              "job_name": data?.job_name,

            };
            await CreatePostjob(bodyDefault).unwrap();
            setIsopen(false);
            handleClose();
            reset();
            await postjobrefetch();
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

  const [isOpen, setIsOpen] = React.useState(false);

  const [getCode, { data: codedata, isLoading: getcodeisLoading, refetch }] =
    jobServiceApis.endpoints.getCodejob.useLazyQuery();

  // const {
  //   data: codedata,
  //   isLoading: getcodeisLoading,
  //   isFetching: codeisFetching,
  //   isSuccess: codeisSuccess,
  //   refetch: coderefetch
  // } = useGetCodejobQuery("getCodejob");

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
