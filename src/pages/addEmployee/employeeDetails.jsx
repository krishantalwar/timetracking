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
            ADD EMPLOYEE
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
                            name="password"
                            control={control}
                            rules={{ required: 'Password is required', minLength: 8 }}
                            render={({ field }) => (
                              <Input
                                {...field}
                                margin="normal"
                                fullWidth
                                label="Employe code"
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
                                margin="normal"
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
                                margin="normal"
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
                                margin="normal"
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
                                margin="normal"
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
                            name="password"
                            control={control}
                            rules={{ required: 'Password is required', minLength: 8 }}
                            render={({ field }) => (
                              <Input
                                {...field}
                                margin="normal"
                                fullWidth
                                label="DOB"
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
                                margin="normal"
                                fullWidth
                                label="Date of Joining"
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
                                margin="normal"
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
                                margin="normal"
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
                                margin="normal"
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





              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                {/* {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )} */}

                <Button onClick={handleNext}>
                  {activeStep === steps.length - 1 ? 'Finish' : 'Save Next'}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Box>
      </Grid>
    </Grid>
  );
}
