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
import { TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormPropsDatePickers from '../../components/ui/forminputs/datePicker'


export default function TimetracTingActivities() {

    const { handleSubmit, control,
        formState
    } = useForm(
        {
            mode: 'onChange',
            defaultValues: {
                role: "",
                screen_allocation: "",
            },
        }
    );
    console.log(formState?.errors?.role?.message)
    const onSubmit = async (data) => {

    }

    return (

        <React.Fragment>
            <Typography mt={2}>  Time Tracking Acitivities </Typography>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} method="post" sx={{ mt: 1, ml: 2 }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} mt={4}>
                    <Grid item xs={6} >

                        <Controller
                            name="role"
                            control={control}
                            rules={{ required: 'Employee code is required' }}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    margin="none"
                                    fullWidth
                                    label="Employee Code"

                                    SelectProps={{
                                        native: true,
                                        inputProps: {name: 'screen_allocation' }
                                    }}

                                    defaultValue=""
                                    formcontrolpops={{
                                        "fullWidth": true,
                                        "variant": "standard",
                                    }}
                                    error={Boolean(formState?.errors?.role)}
                                    helperText={formState?.errors?.role?.message}
                                >

                                    {/* <MenuItem key={1} value={1}>
                                        asd
                                    </MenuItem> */}

                                </TextField>
                            )}
                        />
                    </Grid>


                    <Grid item xs={6} >
                        <Controller
                            name="employee_name"
                            control={control}
                            rules={{ required: 'Employee name is required' }}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    // select
                                    margin="none"
                                    fullWidth
                                    label="Employee Name"
                                    SelectProps={{
                                        // native: true,
                                        // inputProps: {name: 'screen_allocation' }
                                    }}

                                    defaultValue=""
                                    formcontrolpops={{
                                        "fullWidth": true,
                                        "variant": "standard",
                                    }}
                                    error={Boolean(formState?.errors?.employee_name)}
                                    helperText={formState?.errors?.employee_name?.message}
                                >
                                </TextField>
                            )}
                        />

                    </Grid>
                    <Grid item xs={6} mt={2}>
                        <Controller
                            name="employee_department"
                            control={control}
                            rules={{ required: 'Employee department is required' }}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    // select
                                    margin="none"
                                    fullWidth
                                    label="Employee Department"

                                    SelectProps={{
                                        // native: true,
                                        // inputProps: {name: 'screen_allocation' }
                                    }}

                                    defaultValue=""
                                    formcontrolpops={{
                                        "fullWidth": true,
                                        "variant": "standard",
                                    }}
                                    error={Boolean(formState?.errors?.employee_department)}
                                    helperText={formState?.errors?.employee_department?.message}
                                >
                                </TextField>
                            )}
                        />

                    </Grid>
                    <Grid item xs={6} mt={2}>
                        <Controller
                            name="employee_designation"
                            control={control}
                            rules={{ required: 'Employee designation is required' }}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    // select
                                    margin="none"
                                    fullWidth
                                    label="Employee Designation"

                                    SelectProps={{
                                        // native: true,
                                        // inputProps: {name: 'screen_allocation' }
                                    }}

                                    defaultValue=""
                                    formcontrolpops={{
                                        "fullWidth": true,
                                        "variant": "standard",
                                    }}
                                    error={Boolean(formState?.errors?.employee_designation)}
                                    helperText={formState?.errors?.employee_designation?.message}
                                >
                                </TextField>
                            )}
                        />

                    </Grid>
                    <Grid item xs={4}mt={2}>
                        <Controller
                            name="date"
                            control={control}
                            rules={{ required:'Date is required' }}
                            defaultValue=""
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    margin="none"
                                    fullWidth
                                    label="Date"
                                    type='date'
                                    formcontrolpops={{
                                        "fullWidth": true,
                                        "variant": "standard",
                                    }}

                                    DateProps={{
                                        native: false,
                                        // inputProps: {name: 'screen_allocation' }
                                    }}
                                    error={Boolean(formState?.errors?.date)}
                                    helperText={formState?.errors?.date?.message}
                                />
                            )}
                        />
                    </Grid>
                </Grid>
                <Button type="submit" style={{ marginLeft: 5, marginTop: 10 }} > Submit </Button>

            </Box>
        </React.Fragment>
    )
};


