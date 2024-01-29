import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useForm, Controller } from 'react-hook-form';
import Input from '../../components/ui/forminputs/input';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper'
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Selects from '../../components/ui/forminputs/select'
import FormPropsDatePickers from '../../components/ui/forminputs/datePicker'
// import InputFileUpload from '../../components/ui/forminputs/'

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
                                error={Boolean(formState?.errors?.employe_code)}
                                helperText={formState?.errors?.employe_code?.message}
                              />
                            )}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <Controller
                            name="password"
                            control={control}
                            rules={{ required: 'Password is required', minLength: 8 }}
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
                        <Grid item xs={4}>
                          <Controller
                            name="password"
                            control={control}
                            rules={{ required: 'Password is required', minLength: 8 }}
                            render={({ field }) => (
                              <Input
                                {...field}
                                margin="none"
                                fullWidth
                                label="Last Name"
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


                        <Grid item xs={4}>
                          <Controller
                            name="password"
                            control={control}
                            rules={{ required: 'Password is required', minLength: 8 }}
                            render={({ field }) => (
                              <Input
                                {...field}
                                margin="none"
                                fullWidth
                                label="Location"
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
                        <Grid item xs={4}>
                          <Controller
                            name="password"
                            control={control}
                            rules={{ required: 'Password is required', minLength: 8 }}
                            render={({ field }) => (
                              <Input
                                {...field}
                                margin="none"
                                fullWidth
                                label="Sub Location"
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
                        <Grid item xs={4}>
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


                        <Grid item xs={4}>
                          <Controller
                            name="Date of Joining"
                            control={control}
                            rules={{ required: 'Date of Joining is required', minLength: 8 }}
                            render={({ field }) => (
                              <FormPropsDatePickers
                                {...field}
                                margin="none"
                                fullWidth
                                label="Date of Joining"
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

                        <Grid item xs={4}>
                          <Controller
                            name="password"
                            control={control}
                            rules={{ required: 'Password is required', minLength: 8 }}
                            render={({ field }) => (
                              <Input
                                {...field}
                                margin="none"
                                fullWidth
                                label="Department"
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

                        <Grid item xs={4}>
                          <Controller
                            name="password"
                            control={control}
                            rules={{ required: 'Password is required', minLength: 8 }}
                            render={({ field }) => (
                              <Input
                                {...field}
                                margin="none"
                                fullWidth
                                label="Designation"
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

                        <Grid item xs={4}>
                          <Controller
                            name="password"
                            control={control}
                            rules={{ required: 'Password is required', minLength: 8 }}
                            render={({ field }) => (
                              <Input
                                {...field}
                                margin="none"
                                fullWidth
                                label="Reporting Manger"
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
