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

export default function DepartmentDesignation() {

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
            <Typography mt={2} > Department & Designation</Typography>
            <Box  component={Paper}>
            <Box component="form"  onSubmit={handleSubmit(onSubmit)} method="post"  sx={{ mt: 1, ml:2 }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} mt={4}>
                    <Grid item xs={6} >

                        <Controller
                            name="department"
                            control={control}
                            rules={{ required: 'Department is required' }}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    select
                                    margin="none"
                                    fullWidth
                                    label="Department"

                                    SelectProps={{
                                        // native: true,
                                        // inputProps: {name: 'screen_allocation' }
                                    }}

                                    defaultValue=""
                                    formcontrolpops={{
                                        "fullWidth": true,
                                        "variant": "standard",
                                    }}
                                    error={Boolean(formState?.errors?.department)}
                                    helperText={formState?.errors?.department?.message}
                                >

                                    <MenuItem key={1} value={1}>
                                        HR
                                    </MenuItem>

                                </TextField>
                            )}
                        />
                    </Grid>


                    <Grid item xs={6}>
                        <Controller
                            name="designation"
                            control={control}
                            rules={{ required: 'Designation is required' }}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    select
                                    margin="none"
                                    fullWidth
                                    label="Designation"

                                    SelectProps={{
                                        // native: true,
                                        // inputProps: {name: 'screen_allocation' }
                                    }}

                                    defaultValue=""
                                    formcontrolpops={{
                                        "fullWidth": true,
                                        "variant": "standard",
                                    }}
                                    error={Boolean(formState?.errors?.designation)}
                                    helperText={formState?.errors?.designation?.message}
                                >

                                    <MenuItem key={1} value={1}>
                                        Manager
                                    </MenuItem>

                                </TextField>
                            )}
                        />

                    </Grid>
                    
                </Grid>
                <Button type="submit" style={{marginLeft:5, marginTop:100}} > Submit </Button>
                </Box>
            </Box>
        </React.Fragment>
    )
};


