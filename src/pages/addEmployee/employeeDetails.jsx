import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useForm, Controller, useFormContext } from 'react-hook-form';
import Input from '../../components/ui/forminputs/input';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper'
import { TextField } from '@mui/material';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Selects from '../../components/ui/forminputs/select'
import FormPropsDatePickers from '../../components/ui/forminputs/datePicker'

const steps = [
  'Employee Details',
  'Shift Allocation',
  'Role Assigned',
  'Documents'
];

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
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
          
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              // if (isStepOptional(index)) {
              //   labelProps.optional = (
              //     <Typography variant="caption">Optional</Typography>
              //   );
              // }
              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          <br/>
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

              {console.log(activeStep)}
              {
                activeStep == 0 ?
                  (
                    <React.Fragment>
                      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >

                        <Grid item xs={4}>
                          <Controller
                            name="employe_code"
                            control={control}
                            rules={{ required: 'Employee code is required' }}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                margin="none"
                                variant="outlined"
                                fullWidth
                                label="Employe code"
                                type="Input"
                                id="Employeecode"
                                formcontrolpops={{
                                  "fullWidth": true,
                                  // "variant": "standard",
                                }}
                                error={Boolean(formState?.errors?.employe_code)}
                                helperText={formState?.errors?.employe_code?.message}
                              />
                            )}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <Controller
                            name="employee_name"
                            control={control}
                            rules={{ required: 'Employee name is required', minLength: 8 }}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                margin="none"
                                fullWidth
                                label="First Name"
                                type="employee_name"
                                id="employee_name"
                                autoComplete="employee_name"
                                formcontrolpops={{
                                  "fullWidth": true,
                                  "variant": "standard",
                                }}
                                error={Boolean(formState?.errors?.employee_name)}
                                helperText={formState?.errors?.employee_name?.message}
                              />
                            )}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <Controller
                            name="last_name"
                            control={control}
                            rules={{ required: 'Last name is required', minLength: 8 }}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                margin="none"
                                fullWidth
                                label="Last Name"
                                type="last_name"
                                id="last_name"
                                autoComplete="last_name"
                                formcontrolpops={{
                                  "fullWidth": true,
                                  "variant": "standard",
                                }}
                                error={Boolean(formState?.errors?.last_name)}
                                helperText={formState?.errors?.last_name?.message}
                              />
                            )}
                          />
                        </Grid>


                        <Grid item xs={4} mt={3}>
                          <Controller
                            name="location"
                            control={control}
                            rules={{ required: 'Location is required', minLength: 8 }}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                margin="none"
                                fullWidth
                                label="Location"
                                type="location"
                                id="location"
                                autoComplete="location"
                                formcontrolpops={{
                                  "fullWidth": true,
                                  "variant": "standard",
                                }}
                                error={Boolean(formState?.errors?.location)}
                                helperText={formState?.errors?.location?.message}
                              />
                            )}
                          />
                        </Grid>
                        <Grid item xs={4} mt={3}>
                          <Controller
                            name="sub_location"
                            control={control}
                            rules={{ required: 'Sub location is required', minLength: 8 }}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                margin="none"
                                fullWidth
                                label="Sub Location"
                                type="sub_location"
                                id="sub_location"
                                autoComplete="sub_location"
                                formcontrolpops={{
                                  "fullWidth": true,
                                  "variant": "standard",
                                }}
                                error={Boolean(formState?.errors?.sub_location)}
                                helperText={formState?.errors?.sub_location?.message}
                              />
                            )}
                          />
                        </Grid>
                        <Grid item xs={4} mt={2}>
                          <Controller
                            name="DOB"
                            control={control}
                            rules={{ required: 'Date of birth is required', minLength: 8 }}
                            render={({ field }) => (
                              <FormPropsDatePickers
                                {...field}
                                margin="none"
                                fullWidth
                                label="Date Of Birth"
                                type="Date"
                                // id="password"
                                // autoComplete="current-password"
                                formcontrolpops={{
                                  "fullWidth": true,
                                  "variant": "standard",
                                }}
                                error={Boolean(formState?.errors?.password)}
                                helperText={formState?.errors?.password?.message}
                              />
                            )}
                          />
                        </Grid>


                        <Grid item xs={4} mt={2}>
                          <Controller
                            name="date_of_joining"
                            control={control}
                            rules={{ required: 'Date of Joining is required', minLength: 8 }}
                            render={({ field }) => (
                              <FormPropsDatePickers
                                {...field}
                                margin="none"
                                fullWidth
                                label="Date of Joining"
                                type="Date"
                                id="date_of_joining"
                                autoComplete="date_of_joining"
                                formcontrolpops={{
                                  "fullWidth": true,
                                  "variant": "standard",
                                }}
                                error={Boolean(formState?.errors?.date_of_joining)}
                                helperText={formState?.errors?.date_of_joining?.message}
                              />
                            )}
                          />
                        </Grid>

                        <Grid item xs={4} mt={3}>
                          <Controller
                            name="department"
                            control={control}
                            rules={{ required: 'Department is required', minLength: 8 }}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                margin="none"
                                fullWidth
                                label="Department"
                                type="Department"
                                id="Department"
                                autoComplete="Department"
                                formcontrolpops={{
                                  "fullWidth": true,
                                  "variant": "standard",
                                }}
                                error={Boolean(formState?.errors?.department)}
                                helperText={formState?.errors?.department?.message}
                              />
                            )}
                          />
                        </Grid>

                        <Grid item xs={4} mt={3}>
                          <Controller
                            name="designation"
                            control={control}
                            rules={{ required: 'Designation is required', minLength: 8 }}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                margin="none"
                                fullWidth
                                label="Designation"
                                type="designation"
                                id="designation"
                                autoComplete="designation"
                                formcontrolpops={{
                                  "fullWidth": true,
                                  "variant": "standard",
                                }}
                                error={Boolean(formState?.errors?.designation)}
                                helperText={formState?.errors?.designation?.message}
                              />
                            )}
                          />
                        </Grid>

                        <Grid item xs={4} mt={3}>
                          <Controller
                            name="reporting_manager"
                            control={control}
                            rules={{ required: 'Reportingmanager is required', minLength: 8 }}
                            render={({ field }) => (
                              <Input
                                {...field}
                                margin="none"
                                fullWidth
                                label="Reporting Manger"
                                type="reporting_manager"
                                id="reporting_manager"
                                autoComplete="reporting_manager"
                                formcontrolpops={{
                                  "fullWidth": true,
                                  "variant": "standard",
                                }}
                                error={Boolean(formState?.errors?.password)}
                                helperText={formState?.errors?.password?.message}
                              />
                            )}
                          />
                        </Grid>


                      </Grid>

                    </React.Fragment>
                  )
                  : ("")
              }
              {
                activeStep == 1 ?                  (
                    <React.Fragment>
                      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                        <Grid item xs={5}>
                          <Controller
                            name="Employe Code"
                            control={control}
                            rules={{ required: 'Employee code is required' }}
                            render={({ field }) => (
                              <Input
                                {...field}
                                margin="none"
                                fullWidth
                                label="Employe code"
                                type="Input"
                                id="Employeecode"
                                // autoComplete="current-password"
                                formcontrolpops={{
                                  "fullWidth": true,
                                  "variant": "standard",
                                }}
                                error={Boolean(formState?.errors?.password)}
                                helperText={formState?.errors?.password?.message}
                              />
                            )}
                          />
                        </Grid>
                        <Grid item xs={5}>
                          <Controller
                            name="Employee Name"
                            control={control}
                            rules={{ required: 'Employee Name is required' }}
                            render={({ field }) => (
                              <Input
                                {...field}
                                margin="none"
                                fullWidth
                                label="Emplyee Name"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                formcontrolpops={{
                                  "fullWidth": true,
                                  "variant": "standard",
                                }}
                                error={Boolean(formState?.errors?.password)}
                                helperText={formState?.errors?.password?.message}
                              />
                            )}
                          />
                        </Grid>
                        <Grid item xs={5} mt={3}>
                          <Controller
                            name="Shift Allocation"
                            control={control}
                            rules={{ required: 'Employee Shift is required' }}
                            render={({ field }) => (
                              <Selects
                                {...field}
                                margin="none"
                                // fullWidth
                                label="Shift Allocation"
                                options={[
                                  'Morning',
                                  'Afternoon',
                                  'Evening',
                                  'Night'
                                ]}
                                // type="password"
                                // id="password"
                                // autoComplete="current-password"
                                formcontrolpops={{
                                  "fullWidth": true,
                                  "variant": "standard",
                                }}
                                error={Boolean(formState?.errors?.password)}
                                helperText={formState?.errors?.password?.message}
                              />
                            )}
                          />
                        </Grid>
                        </Grid>  
                    </React.Fragment>
                  )
                  : ("")
              }
              {
                activeStep == 2 ?
                  (
                    <React.Fragment>
                      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >

                        <Grid item xs={6}>
                          <Controller
                            name="Employe Code"
                            control={control}
                            rules={{ required: 'Employee code is required' }}
                            render={({ field }) => (
                              <Input
                                {...field}
                                margin="none"
                                fullWidth
                                label="Employe code"
                                type="Input"
                                id="Employeecode"
                                // autoComplete="current-password"
                                formcontrolpops={{
                                  "fullWidth": true,
                                  "variant": "standard",
                                }}
                                error={Boolean(formState?.errors?.password)}
                                helperText={formState?.errors?.password?.message}
                              />
                            )}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <Controller
                            name="password"
                            control={control}
                            rules={{ required: 'Employee Name is required' }}
                            render={({ field }) => (
                              <Input
                                {...field}
                                margin="none"
                                fullWidth
                                label="Employee Name"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                formcontrolpops={{
                                  "fullWidth": true,
                                  "variant": "standard",
                                }}
                                error={Boolean(formState?.errors?.password)}
                                helperText={formState?.errors?.password?.message}
                              />
                            )}
                          />
                        </Grid>
                        <Grid item xs={6} mt={3}>
                          {/* <h4>Role Assigned</h4> */}
                          <Controller
                            name="Role Assigned"
                            control={control}
                            rules={{ required: 'Role Assigned is required' }}
                            render={({ field }) => (
                              <Selects
                                {...field}
                                margin="none"
                                fullWidth
                                label="Role Assigned"
                                options={[
                                  'Manager',
                                  'Employee',

                                ]}
                                // type="password"
                                // id="password"
                                // autoComplete="current-password"
                                formcontrolpops={{
                                  "fullWidth": true,
                                  "variant": "standard",
                                }}
                                error={Boolean(formState?.errors?.password)}
                                helperText={formState?.errors?.password?.message}
                              />
                            )}
                          />
                        </Grid>
                      </Grid>

                    </React.Fragment>
                  )
                  : ("")
              }

{
                activeStep == 3 ?
                  (
                    <React.Fragment>
                      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >

                        <Grid item xs={6}>
                          <Controller
                            name="Employe Code"
                            control={control}
                            rules={{ required: 'Employee code is required' }}
                            render={({ field }) => (
                              <Input
                                {...field}
                                margin="none"
                                fullWidth
                                label="Employe code"
                                type="Input"
                                id="Employeecode"
                                // autoComplete="current-password"
                                formcontrolpops={{
                                  "fullWidth": true,
                                  "variant": "standard",
                                }}
                                error={Boolean(formState?.errors?.password)}
                                helperText={formState?.errors?.password?.message}
                              />
                            )}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <Controller
                            name="Employee Name"
                            control={control}
                            rules={{ required: 'Employee Name is required', minLength: 8 }}
                            render={({ field }) => (
                              <Input
                                {...field}
                                margin="none"
                                fullWidth
                                label="Emplyee Name"
                                type="Input"
                                // id="password"
                                // autoComplete="current-password"
                                formcontrolpops={{
                                  "fullWidth": true,
                                  "variant": "standard",
                                }}
                                error={Boolean(formState?.errors?.password)}
                                helperText={formState?.errors?.password?.message}
                              />
                            )}
                          />
                        </Grid>
                        <Grid item xs={4} mt={4}>
                          <Box>Upload Document</Box>
                          <Controller
                            name="File upload"
                            control={control}
                            rules={{ required: 'File Upload is required'}}
                            render={({ field }) => (
                              <Input
                                {...field}
                                margin="none"
                                fullWidth
                                // label="Document Upload"
                                type="file"
                                // id="password"
                                // autoComplete="current-password"
                                formcontrolpops={{
                                  "fullWidth": true,
                                  "variant": "standard",
                                }}
                                error={Boolean(formState?.errors?.password)}
                                helperText={formState?.errors?.password?.message}
                              />
                            )}
                          />
                        </Grid>
                      </Grid>
                    </React.Fragment>
                  )
                  : ("")
              }
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  <Box color='#4169E1' >Back</Box>
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                {/* {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )} */}

                <Button onClick={handleNext}>
                  {activeStep === steps.length - 1 ? 'Finish' : 'Save & Next'}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Box>
      </Grid>
    </Grid>
  );
}
