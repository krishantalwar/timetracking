import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Input from '../../components/ui/forminputs/input';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper'
import { TextField } from '@mui/material';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Selects from '../../components/ui/forminputs/select'
import FormPropsDatePickers from '../../components/ui/forminputs/datePicker'

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
    control,
    formState: { errors },
  } = useFormContext();
  console.log(errors);
  return (
    <>
      <Grid
        container
        sx={{
          padding: "30px"
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
            name="loction"
            rules={{ required: "Location is required" }}
            render={({ field }) => (
              <TextField
                margin="normal"
                variant="outlined"
                placeholder="Enter location"
                fullWidth
                label="Location"
                id="loction"
                {...field}
                error={Boolean(errors?.loction)}
                helperText={errors?.loction?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={4}>
          <Controller
            control={control}
            name="sub_loction"
            rules={{ required: "Sub location is required." }}
            render={({ field }) => (
              <TextField
                id="sub_loction"
                label="Sub Location"
                variant="outlined"
                placeholder="Enter sub location"
                fullWidth
                margin="normal"
                {...field}
                error={Boolean(errors?.sub_loction)}
                helperText={errors.sub_loction?.message}
              />
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
                {...field}
                error={Boolean(errors?.department)}
                helperText={errors?.department?.message}
              />
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
                {...field}
                error={Boolean(errors?.designation)}
                helperText={errors.designation?.message}
              />
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
                label="Designation"
                id="reporting_manager"
                {...field}
                error={Boolean(errors?.reporting_manager)}
                helperText={errors?.reporting_manager?.message}
              />
            )}
          />
        </Grid>
      </Grid>
    </>
  );
};

const ShiftAllocation = () => {
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
          padding: "30px"
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
                <MenuItem key={1} value={1}>
                  Morning
                </MenuItem>
                <MenuItem key={2} value={2}>
                  Afternoon
                </MenuItem>
                <MenuItem key={3} value={3}>
                  Evening
                </MenuItem>
                <MenuItem key={4} value={4}>
                  Night
                </MenuItem>
              </TextField>
            )}
          />
        </Grid>
      </Grid>
    </>
  );
};
const RoleAssigned = () => {
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
          padding: "30px"
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
                <MenuItem key={1} value={1}>
                  Manager
                </MenuItem>
                <MenuItem key={2} value={2}>
                  Employee
                </MenuItem>
                <MenuItem key={3} value={3}>
                  Role
                </MenuItem>
                <MenuItem key={4} value={4}>
                  Role
                </MenuItem>
              </TextField>
            )}
          />
        </Grid>
      </Grid>
    </>
  );
};
const Documents = () => {
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
          padding: "30px"
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
        <Grid item xs={6}>
          <Controller
            control={control}
            name="upload_document"
            rules={{ required: "Document is required." }}
            render={({ field }) => (
              <TextField
                InputLabelProps={{ shrink: true }}
                type="file"
                id="Document"
                label="Upload Document"
                variant="outlined"
                placeholder="Upload document"
                fullWidth
                margin="normal"
                {...field}
                error={Boolean(errors?.upload_document)}
                helperText={errors.upload_document?.message}
              >
              </TextField>
            )}
          />
        </Grid>
      </Grid>
    </>
  );
};
function getStepContent(step) {
  switch (step) {
    case 0:
      return <EmployeDetails />;

    // case 1:
    //   return <ShiftAllocation />;
    // case 2:
    //   return <RoleAssigned />;
    // case 3:
    //   return <Documents />;
    default:
      return "unknown step";
  }
}

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skippedSteps, setSkipped] = React.useState([]);
  const steps = getSteps();
  const methods = useForm(
    {
      mode: 'onChange',
      defaultValues: {
        firstName: "",
        lastName: "",
        nickName: "",
        emailAddress: "",
        phoneNumber: "",
        alternatePhone: "",
        address1: "",
        address2: "",
        country: "",
        cardNumber: "",
        cardMonth: "",
        cardYear: "",
      },
    }
  );

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
    console.log(activeStep);
    console.log(steps);
    if (activeStep == steps.length - 1) {
      console.log("ds");
      // fetch("https://jsonplaceholder.typicode.com/comments")
      //   .then((data) => data.json())
      //   .then((res) => {
      //     console.log(res);
      setActiveStep((pre) => pre + 1);
      // });
    } else {
      setActiveStep((pre) => pre + 1);
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
          <Box>Add Employee</Box>
          <Typography sx={{
            my: 2,
            // mx: 4,
            display: 'flex',
            flexDirection: 'column',
            mb: 3
            //   alignItems: 'center',
          }}>

          </Typography>

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
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Box sx={{ flex: '1 1 auto' }} />
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
                      padding: "10px"
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
