import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { TextField } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import MenuItem from "@mui/material/MenuItem";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useGetCountryQuery } from "../../features/country/countryService";

import { useGetDepartmentQuery } from "../../features/department/departmentService";

import { useGetDesignationQuery } from "../../features/designation/designationService";

import { useGetShiftQuery } from "../../features/shiftmaster/shiftService";

import { useGetRoleQuery } from "../../features/roles/roles";

import {
  useForm,
  Controller,
  FormProvider,
  useFormContext,
} from "react-hook-form";

function getSteps() {
  return ["Employee Details", "Shift Allocation", "Role Assigned", "Documents"];
}


const EmployeDetails = () => {
  const {
    data: countryData,
    isLoading: countryDataisLoading,
    isSuccess: countryDataisSuccess,
    isError: countryDataisError,
    error: countryDataerror,
  } = useGetCountryQuery("getCountry");

  const {
    data: DepartmentmasterDate,
    isLoading: DepartmentmasterisLoading,
    isFetching: DepartmentmasterisFetching,
    isSuccess: DepartmentmasterisSuccess,
    isError: DepartmentmasterisError,
    error: Departmentmastererror,
    refetch: getDepartmentRefetch,
  } = useGetDepartmentQuery("getDepartment");

  const {
    data: designationmasterDate,
    isLoading: designationmasterisLoading,
    isFetching: designationmasterisFetching,
    isSuccess: designationmasterisSuccess,
    isError: designationmasterisError,
    error: designationmastererror,
    refetch: getDesignationRefetch,
  } = useGetDesignationQuery("getDesignation");

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
  const {
    control,
    formState: { errors },
    watch,
  } = useFormContext();
  
  // console.log(errors);

  const countrychnage = watch("country");
  // console.log(countrychnage);

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

  let deaprtmentptions = <MenuItem key={1}></MenuItem>;
  if (DepartmentmasterisLoading) {
    deaprtmentptions = <MenuItem key={1}></MenuItem>;
  } else if (DepartmentmasterisSuccess) {
    deaprtmentptions = DepartmentmasterDate.map((datas) => {
      return (
        <MenuItem key={datas?.departmentid} value={datas?.departmentid}>
          {datas?.name}
        </MenuItem>
      );
    });
  } else if (DepartmentmasterisError) {
    deaprtmentptions = <MenuItem key={1}>{Departmentmastererror}</MenuItem>;
  }

  let designationptions = <MenuItem key={1}></MenuItem>;
  if (designationmasterisLoading) {
    designationptions = <MenuItem key={1}></MenuItem>;
  } else if (designationmasterisSuccess) {
    designationptions = designationmasterDate.map((datas) => {
      return (
        <MenuItem key={datas?.designationid} value={datas?.designationid}>
          {datas?.name}
        </MenuItem>
      );
    });
  } else if (designationmasterisError) {
    deaprtmentptions = <MenuItem key={1}>{designationmastererror}</MenuItem>;
  }

  let reporting_mangeroptions = (
    <MenuItem key={1} value={1}>
      mn,n,n
    </MenuItem>
  );

  return (
    <>
      <Grid
        container
        sx={{
          padding: "30px",
        }}
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Grid item xs={4}>
          <Controller
            control={control}
            name="employe_code"
            rules={{ required: "Employe code is required." }}
            render={({ field }) => (
              <TextField
                fullWidth
                id="employe_code"
                label="Employee Code"
                variant="outlined"
                placeholder="Enter employee code"
                margin="normal"
                {...field}
                error={Boolean(errors?.employe_code)}
                helperText={errors.employe_code?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={4}>
          <Controller
            control={control}
            name="first_name"
            rules={{ required: "First name is required" }}
            render={({ field }) => (
              <TextField
                margin="normal"
                variant="outlined"
                placeholder="Enter first name"
                fullWidth
                label="First Name"
                id="first_name"
                {...field}
                error={Boolean(errors?.first_name)}
                helperText={errors?.first_name?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={4}>
          <Controller
            control={control}
            name="last_name"
            rules={{ required: "Last name is required." }}
            render={({ field }) => (
              <TextField
                id="last_name"
                label="Last Name"
                variant="outlined"
                placeholder="Enter last name"
                fullWidth
                margin="normal"
                {...field}
                error={Boolean(errors?.last_name)}
                helperText={errors.last_name?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={4}>
          <Controller
            control={control}
            name="email"
            rules={{ required: "email  is required." }}
            render={({ field }) => (
              <TextField
                type="email"
                id="email"
                label="Email"
                variant="outlined"
                placeholder="Enter email"
                fullWidth
                margin="normal"
                {...field}
                error={Boolean(errors?.email)}
                helperText={errors.email?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={4}>
          <Controller
            control={control}
            name="country"
            rules={{ required: "Location is required" }}
            render={({ field }) => (
              <TextField
                margin="normal"
                variant="outlined"
                placeholder="Enter location"
                fullWidth
                label="Location"
                id="country"
                {...field}
                select
                SelectProps={
                  {
                    // native: true,
                    // inputProps: {name: 'screen_allocation' }
                  }
                }
                error={Boolean(errors?.loction)}
                helperText={errors?.loction?.message}
              >
                {countyoptions}
              </TextField>
            )}
          />
        </Grid>
        <Grid item xs={4}>
          <Controller
            control={control}
            name="state"
            rules={{ required: "Sub location is required." }}
            render={({ field }) => (
              <TextField
                id="state"
                label="Sub Location"
                variant="outlined"
                placeholder="Enter sub location"
                fullWidth
                margin="normal"
                {...field}
                select
                SelectProps={
                  {
                    // native: true,
                    // inputProps: {name: 'screen_allocation' }
                  }
                }
                error={Boolean(errors?.sub_loction)}
                helperText={errors.sub_loction?.message}
              >
                {stateoptions}
              </TextField>
            )}
          />
        </Grid>
        <Grid item xs={4} mt={1}>
          <Controller
            control={control}
            name="date_of_birth"
            rules={{ required: "Date Of Birth is required" }}
            render={({ field }) => (
              <TextField
                InputLabelProps={{ shrink: true }}
                type="date"
                margin="normal"
                variant="outlined"
                placeholder="Enter date of birth"
                fullWidth
                label="Date Of Birth"
                id="date_of_birth"
                {...field}
                error={Boolean(errors?.date_of_birth)}
                helperText={errors?.date_of_birth?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={4} mt={1}>
          <Controller
            control={control}
            name="date_of_joining"
            rules={{ required: "Date Of Joining is required." }}
            render={({ field }) => (
              <TextField
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                id="date_of_joining"
                label="Date Of Joining"
                variant="outlined"
                placeholder="Enter date of joining"
                fullWidth
                margin="normal"
                {...field}
                error={Boolean(errors?.date_of_joining)}
                helperText={errors.date_of_joining?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={4}>
          <Controller
            control={control}
            name="department"
            rules={{ required: "Department is required" }}
            render={({ field }) => (
              <TextField
                margin="normal"
                variant="outlined"
                placeholder="Enter department"
                fullWidth
                label="Department"
                id="department"
                select
                SelectProps={
                  {
                    // native: true,
                    // inputProps: {name: 'screen_allocation' }
                  }
                }
                {...field}
                error={Boolean(errors?.department)}
                helperText={errors?.department?.message}
              >
                {deaprtmentptions}
              </TextField>
            )}
          />
        </Grid>
        <Grid item xs={4}>
          <Controller
            control={control}
            name="designation"
            rules={{ required: "Designation is required." }}
            render={({ field }) => (
              <TextField
                id="designation"
                label="Designation"
                variant="outlined"
                placeholder="Enter designation"
                fullWidth
                margin="normal"
                select
                SelectProps={
                  {
                    // native: true,
                    // inputProps: {name: 'screen_allocation' }
                  }
                }
                {...field}
                error={Boolean(errors?.designation)}
                helperText={errors.designation?.message}
              >
                {designationptions}
              </TextField>
            )}
          />
        </Grid>
        <Grid item xs={4}>
          <Controller
            control={control}
            name="reporting_manager"
            rules={{ required: "Reporting manager is required" }}
            render={({ field }) => (
              <TextField
                margin="normal"
                variant="outlined"
                placeholder="Enter reporting manager"
                fullWidth
                label="Reporting Manager"
                id="reporting_manager"
                {...field}
                select
                SelectProps={
                  {
                    // native: true,
                    // inputProps: {name: 'screen_allocation' }
                  }
                }
                error={Boolean(errors?.reporting_manager)}
                helperText={errors?.reporting_manager?.message}
              >
                {reporting_mangeroptions}
              </TextField>
            )}
          />
        </Grid>
      </Grid>
    </>
  );
};

const ShiftAllocation = () => {
  const {
    data: shiftmasterData,
    isLoading: shiftmasterisLoading,
    isFetching: shiftmasterisFetching,
    isSuccess: shiftmasterisSuccess,
    isError: shiftmasterisError,
    error: shiftmastererror,
    refetch: getShiftRefetch,
  } = useGetShiftQuery("getShift");

  const {
    control,
    formState: { errors },
    watch,
  } = useFormContext();
 

  let shiftptions = <MenuItem key={1}></MenuItem>;
  if (shiftmasterisLoading) {
    shiftptions = <MenuItem key={1}></MenuItem>;
  } else if (shiftmasterisSuccess) {
    shiftptions = shiftmasterData.map((datas) => {
      return (
        <MenuItem key={datas?.shiftid} value={datas?.shiftid}>
          {datas?.name}
        </MenuItem>
      );
    });
  } else if (shiftmasterisError) {
    shiftptions = <MenuItem key={1}>{shiftmastererror}</MenuItem>;
  }
  const shift_allocationchange = watch("shift_allocation");

  console.log(shift_allocationchange);

  let shift_detail = "";

  if (
    shift_allocationchange != "" &&
    shift_allocationchange != undefined &&
    shiftmasterisSuccess
  ) {
    const shift_allocation_selected = shiftmasterData.filter((datas) => {
      return datas.shiftid == shift_allocationchange;
    });

    if (shift_allocation_selected.length) {
      shift_detail = (
        <Box>
          <Typography component="h3">Shift Detail</Typography>
          <Grid
            container
            sx={{
              padding: "30px",
            }}
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={4}>
              <Card sx={{ width: "100%", backgroundColor: "lightgreen" }}>
                <CardContent>
                  <Box sx={{ display: "flex", color: "#fff" }}>
                    <Box marginLeft={1} marginTop={-2}>
                      <h3>Shift Name</h3>
                      <Typography>
                        {shift_allocation_selected[0].name}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={4}>
              <Card sx={{ width: "100%", backgroundColor: "orange" }}>
                <CardContent>
                  <Box sx={{ display: "flex", color: "#fff" }}>
                    <Box marginLeft={1} marginTop={-2}>
                      <h3>Shift Start Time</h3>
                      <Typography>
                        {shift_allocation_selected[0].start_time +
                          " To " +
                          shift_allocation_selected[0].end_time}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={4}>
              <Card sx={{ width: "100%", backgroundColor: "blue" }}>
                <CardContent>
                  <Box sx={{ display: "flex", color: "#fff" }}>
                    <Box marginLeft={1} marginTop={-2}>
                      <h3>Break TIme</h3>
                      <Typography>
                        {shift_allocation_selected[0].break_start_time +
                          " To " +
                          shift_allocation_selected[0].break_end_time}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      );
    }
  }
  return (
    <>
      <Grid
        container
        sx={{
          padding: "30px",
        }}
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Grid item xs={6}>
          <Controller
            control={control}
            name="employe_code"
            rules={{ required: "Employe code is required." }}
            render={({ field }) => (
              <TextField
                readOnly
                disabled
                id="employe_code"
                label="Employee Code"
                variant="outlined"
                placeholder="Enter employee code"
                fullWidth
                margin="normal"
                {...field}
                error={Boolean(errors?.employe_code)}
                helperText={errors.employe_code?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={4}>
          <Controller
            control={control}
            name="first_name"
            rules={{ required: "First name is required" }}
            render={({ field }) => (
              <TextField
                readOnly
                disabled
                margin="normal"
                variant="outlined"
                placeholder="Enter first name"
                fullWidth
                label="First Name"
                id="first_name"
                {...field}
                error={Boolean(errors?.first_name)}
                helperText={errors?.first_name?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            control={control}
            name="shift_allocation"
            rules={{ required: "Shift allocation is required." }}
            render={({ field }) => (
              <TextField
                select
                id="shift_allocation"
                label="Shift Allocation"
                variant="outlined"
                placeholder="Enter shift allocation"
                fullWidth
                margin="normal"
                {...field}
                error={Boolean(errors?.shift_allocation)}
                helperText={errors.shift_allocation?.message}
              >
                {shiftptions}
              </TextField>
            )}
          />
        </Grid>
      </Grid>
      {shift_detail}
    </>
  );
};
const RoleAssigned = () => {
  const {
    data: roleDate,
    isLoading: roleisLoading,
    isFetching: roleisFetching,
    isSuccess: roleisSuccess,
    isError: roleisError,
    error: roleerror,
    refetch: getRolerefetch,
  } = useGetRoleQuery("getRole");

  const {
    control,
    formState: { errors },
  } = useFormContext();
  console.log(errors);

  let roleoptions = "";
  if (roleisLoading) {
    roleoptions = <MenuItem key={1}></MenuItem>;
  } else if (roleisSuccess) {
    roleoptions = roleDate.map((datas) => {
      return (
        <MenuItem key={datas.roleid} value={datas.roleid}>
          {datas.name}
        </MenuItem>
      );
    });
  } else if (roleisError) {
    roleoptions = <MenuItem key={1}></MenuItem>;
  }
  return (
    <>
      <Grid
        container
        sx={{
          padding: "30px",
        }}
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Grid item xs={6}>
          <Controller
            control={control}
            name="employe_code"
            rules={{ required: "Employe code is required." }}
            render={({ field }) => (
              <TextField
                disabled
                id="employe_code"
                label="Employee Code"
                variant="outlined"
                placeholder="Enter employee code"
                fullWidth
                margin="normal"
                {...field}
                error={Boolean(errors?.employe_code)}
                helperText={errors.employe_code?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={4}>
          <Controller
            control={control}
            name="first_name"
            rules={{ required: "First name is required" }}
            render={({ field }) => (
              <TextField
                disabled
                margin="normal"
                variant="outlined"
                placeholder="Enter first name"
                fullWidth
                label="First Name"
                id="first_name"
                {...field}
                error={Boolean(errors?.first_name)}
                helperText={errors?.first_name?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            control={control}
            name="role_assigned"
            rules={{ required: "Role assigned is required." }}
            render={({ field }) => (
              <TextField
                select
                id="role_assigned"
                label="Role Assigned"
                variant="outlined"
                placeholder="Enter role assigned"
                fullWidth
                margin="normal"
                {...field}
                error={Boolean(errors?.role_assigned)}
                helperText={errors.role_assigned?.message}
              >
                {roleoptions}
              </TextField>
            )}
          />
        </Grid>
      </Grid>
    </>
  );
};
const Documents = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const handleFileChange = (event) => {
    const files = [...event.target.files];
    setSelectedFiles(files);
    event.target.value = ''; 
    return files;
  };

  const {
    control,
    formState: { errors },
  } = useFormContext();
  console.log(errors);
  return (
    <>
      <Grid
        container
        sx={{
          padding: "30px",
        }}
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Grid item xs={6}>
          <Controller
            control={control}
            name="employe_code"
            rules={{ required: "Employe code is required." }}
            render={({ field }) => (
              <TextField
                disabled
                id="employe_code"
                label="Employee Code"
                variant="outlined"
                placeholder="Enter employee code"
                fullWidth
                margin="normal"
                {...field}
                error={Boolean(errors?.employe_code)}
                helperText={errors.employe_code?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            control={control}
            name="first_name"
            rules={{ required: "First name is required" }}
            render={({ field }) => (
              <TextField
                disabled
                margin="normal"
                variant="outlined"
                placeholder="Enter first name"
                fullWidth
                label="First Name"
                id="first_name"
                {...field}
                error={Boolean(errors?.first_name)}
                helperText={errors?.first_name?.message}
              />
            )}
          />
        </Grid>
        {/* <Grid item xs={6}>
          <Controller
            control={control}
            name="upload_documents[]"
            rules={{ required: "Document is required." }}
            render={({ field }) => (
              <TextField
                {...field}
                type="file"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{ multiple: true }}
                // multiple
                id="Document"
                label="Upload Document"
                variant="outlined"
                placeholder="Upload document"
                fullWidth
                margin="normal"
                error={Boolean(errors?.upload_documents)}
                helperText={errors.upload_documents?.message}
              >
              </TextField>
            )}
          />
        </Grid> */}

        <Grid item xs={6}>
          <Controller
            control={control}
            name="upload_documents"
            rules={{ required: "Document is required." }}
            render={({ field }) => (
              <input
                type="file"
                multiple
                variant="outlined"
                onChange={(e) => field.onChange(handleFileChange(e))}
                style={{
                  border: "1px solid grey", // Custom border style
                  borderRadius: "4px", // Rounded corners
                  padding: "20px", // Padding
                  width: "100%", // Full width
                  height:"60px",
                  boxSizing: "border-box", // Include border and padding in width
                }}
              />                 
            )}
            
           
          />
          <div>
            {selectedFiles.length > 0 && (
              <p>
                {selectedFiles.length}{" "}
                {selectedFiles.length === 1 ? "file" : "files"} selected
              </p>
            )}
          </div>
        {errors.upload_documents && <span style={
          {
            color:"red"
          }
        }
          >{errors.upload_documents.message}</span>}
        </Grid>
      </Grid>
    </>
  );
};
function getStepContent(step) {
  switch (step) {
    // case 0:
    //   return <EmployeDetails />;
    // case 1:
    //   return <ShiftAllocation />;
    // case 2:
    //   return <RoleAssigned />;
    case 0:
      return <Documents />;
    default:
      return "unknown step";
  }
}

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skippedSteps, setSkipped] = React.useState([]);
  const steps = getSteps();
  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      employe_code: "s",
      first_name: "s",
      last_name: "",
      email: "",
      country: "",
      state: "",
      date_of_birth: "",
      date_of_joining: "",
      department: "",
      designation: "",
      reporting_manager: "",
      shift_allocation: "",
      role_assigned: "",
      "upload_documents[]": [],
      upload_document: [],
    },
  });

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepFalied = () => {
    return Boolean(Object.keys(methods.formState.errors).length);
  };

  const isStepSkipped = (step) => {
    return skippedSteps.includes(step);
  };

  // const handleNext = () => {
  //   let newSkipped = skipped;
  //   if (isStepSkipped(activeStep)) {
  //     newSkipped = new Set(newSkipped.values());
  //     newSkipped.delete(activeStep);
  //   }

  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  //   setSkipped(newSkipped);
  // };
  const handleNext = (data) => {
    console.log(data);
    // console.log("data");
    // console.log(activeStep);
    // console.log(steps);
    if (activeStep == steps.length - 1) {
      // console.log("ds");
      // fetch("https://jsonplaceholder.typicode.com/comments")
      //   .then((data) => data.json())
      //   .then((res) => {
      //     console.log(res);
      setActiveStep((pre) => pre + 1);
      console.log(activeStep);
      // });
    } else {
      setActiveStep((pre) => pre + 1);
      console.log(activeStep);
      // setActiveStep(activeStep + 1);
      // setSkippedSteps(
      //   skippedSteps.filter((skipItem) => skipItem !== activeStep)
      // );
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid item xs={12} sm={12} md={12} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 2,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            //   alignItems: 'center',
          }}
        >
          <Box>Add Employee</Box>
          <Typography
            sx={{
              my: 2,
              // mx: 4,
              display: "flex",
              flexDirection: "column",
              mb: 3,
              //   alignItems: 'center',
            }}
          ></Typography>

          <Stepper alternativeLabel activeStep={activeStep}>
            {steps.map((step, index) => {
              const labelProps = {};
              const stepProps = {};
              //   if (isStepOptional(index)) {
              //     labelProps.optional = (
              //       <Typography
              //         variant="caption"
              //         align="center"
              //         style={{ display: "block" }}
              //       >
              //         optional
              //       </Typography>
              //     );
              //   }
              if (isStepFalied() && activeStep == index) {
                labelProps.error = true;
              }
              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step {...stepProps} key={index}>
                  <StepLabel {...labelProps}>{step}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          <br />
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                {/* <Button onClick={handleReset}>Reset</Button> */}
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(handleNext)}>
                  {getStepContent(activeStep)}

                  <Box
                    align="right"
                    sx={{
                      padding: "10px",
                    }}
                  >
                    <Button
                      // className={classes.button}
                      disabled={activeStep === 0}
                      onClick={handleBack}
                    >
                      back
                    </Button>
                    {/* {isStepOptional(activeStep) && (
                <Button
                  className={classes.button}
                  variant="contained"
                  color="primary"
                  onClick={handleSkip}
                >
                  skip
                </Button>
              )} */}
                    <Button
                      // className={classes.button}
                      variant="contained"
                      color="primary"
                      // onClick={handleNext}
                      type="submit"
                    >
                      {activeStep === steps.length - 1 ? "Finish" : "Next"}
                    </Button>
                  </Box>
                </form>
              </FormProvider>
            </React.Fragment>
          )}
        </Box>
      </Grid>
    </Grid>
  );
}
