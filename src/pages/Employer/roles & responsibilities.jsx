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

export default function RolesandResponsibilities() {

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
            <Box  component={Paper}>
            <Typography mt={2}  ml={2}>  Roles & Responsibilities</Typography>
            <Box component="form"  onSubmit={handleSubmit(onSubmit)} method="post"  sx={{ mt: 1, ml:2 }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} mt={4}>
                    <Grid item xs={6} >

                        <Controller
                            name="role"
                            control={control}
                            rules={{ required: 'Role is required' }}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    select
                                    margin="none"
                                    fullWidth
                                    label="Role"

                                    SelectProps={{
                                        // native: true,
                                        // inputProps: {name: 'screen_allocation' }
                                    }}

                                    defaultValue=""
                                    formcontrolpops={{
                                        "fullWidth": true,
                                        "variant": "standard",
                                    }}
                                    error={Boolean(formState?.errors?.role)}
                                    helperText={formState?.errors?.role?.message}
                                >

                                    <MenuItem key={1} value={1}>
                                        asd
                                    </MenuItem>

                                </TextField>
                            )}
                        />
                    </Grid>


                    <Grid item xs={6}>
                        <Controller
                            name="screen_allocation"
                            control={control}
                            rules={{ required: 'Screen Allocation is required' }}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    select
                                    margin="none"
                                    fullWidth
                                    label="Screen Allocation"

                                    SelectProps={{
                                        // native: true,
                                        // inputProps: {name: 'screen_allocation' }
                                    }}

                                    defaultValue=""
                                    formcontrolpops={{
                                        "fullWidth": true,
                                        "variant": "standard",
                                    }}
                                    error={Boolean(formState?.errors?.screen_allocation)}
                                    helperText={formState?.errors?.screen_allocation?.message}
                                >

                                    <MenuItem key={1} value={1}>
                                        asd
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


