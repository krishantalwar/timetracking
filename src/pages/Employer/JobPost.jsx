import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useForm, Controller } from 'react-hook-form';
import Grid from '@mui/material/Grid';
import { TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Input from '../../components/ui/forminputs/input';

export default function JobPost() {

    const { handleSubmit, control,
        formState
    } = useForm(
        {
            mode: 'onChange',
            defaultValues: {
                job_id: "",
                job_description: "",
                location:"",
                sub_location:"",
                job_rate:"",
            },
        }
    );
    // console.log(formState?.errors?.role?.message)
    const onSubmit = async (data) => {

    }

    return (

        <React.Fragment>
            <Typography mt={2}> Post a Job</Typography>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} method="post"  sx={{ mt: 1, ml:2 }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} mt={4}>
                    
                    <Grid item xs={6} >

                        <Controller
                            name="job_id"
                            control={control}
                            // rules={{ required: 'Job id is required' }}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    disabled
                                    margin="none"
                                    fullWidth
                                    label="Job ID"
                                    type='text'
                                    formcontrolpops={{
                                        "fullWidth": true,
                                        "variant": "standard",
                                    }}
                                    error={Boolean(formState?.errors?.job_id)}
                                    helperText={formState?.errors?.job_id?.message}
                                >

                                </Input>
                            )}
                        />
                    </Grid>


                    <Grid item xs={6}>
                        <Controller
                            name="job_description"
                            control={control}
                            rules={{ required: 'Job description is required' }}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    margin="none"
                                    fullWidth
                                    label="Job Description"
                                    SelectProps={{
                                        // native: true,
                                        // inputProps: {name: 'screen_allocation' }
                                    }}

                                    defaultValue=""
                                    formcontrolpops={{
                                        "fullWidth": true,
                                        "variant": "standard",
                                    }}
                                    error={Boolean(formState?.errors?.job_description)}
                                    helperText={formState?.errors?.job_description?.message}
                                >
                                </TextField>
                            )}
                        />

                    </Grid>


                    <Grid item xs={6} mt={2}>
                        <Controller
                            name="location"
                            control={control}
                            rules={{ required: 'Location is required' }}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    select
                                    {...field}
                                    margin="none"
                                    fullWidth
                                    label="Location"
                                    SelectProps={{
                                        // native: true,
                                        // inputProps: {name: 'screen_allocation' }
                                    }}

                                    defaultValue=""
                                    formcontrolpops={{
                                        "fullWidth": true,
                                        "variant": "standard",
                                    }}
                                    error={Boolean(formState?.errors?.location)}
                                    helperText={formState?.errors?.location?.message}
                                >
                                     <MenuItem key={1} value={1}>
                                        New york
                                    </MenuItem>
                                </TextField>
                            )}
                        />

                    </Grid>

                    <Grid item xs={6} mt={2}>
                        <Controller
                            name="sub_location"
                            control={control}
                            rules={{ required: 'Sub location is required' }}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    select
                                    {...field}
                                    margin="none"
                                    fullWidth
                                    label="Job sub_location"
                                    SelectProps={{
                                        // native: true,
                                        // inputProps: {name: 'screen_allocation' }
                                    }}

                                    defaultValue=""
                                    formcontrolpops={{
                                        "fullWidth": true,
                                        "variant": "standard",
                                    }}
                                    error={Boolean(formState?.errors?.sub_location)}
                                    helperText={formState?.errors?.sub_location?.message}
                                >
                                     <MenuItem key={1} value={1}>
                                        xyz
                                    </MenuItem>
                                </TextField>
                            )}
                        />

                    </Grid>

                    <Grid item xs={6} mt={2}>
                        <Controller
                            name="job_rate"
                            control={control}
                            rules={{ required: 'Job rate is required' }}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    select
                                    {...field}
                                    margin="none"
                                    fullWidth
                                    label="Job Rate"
                                    SelectProps={{
                                        // native: true,
                                        // inputProps: {name: 'screen_allocation' }
                                    }}

                                    defaultValue=""
                                    formcontrolpops={{
                                        "fullWidth": true,
                                        "variant": "standard",
                                    }}
                                    error={Boolean(formState?.errors?.job_rate)}
                                    helperText={formState?.errors?.job_rate?.message}
                                >
                                     <MenuItem key={1} value={1}>
                                        5
                                    </MenuItem>
                                </TextField>
                            )}
                        />

                    </Grid>
                    
                </Grid>
                <Button type="submit" style={{marginLeft:5, marginTop:20, height:30, width:120, border:'1px solid black' , color:'white', backgroundColor:'darkblue'}} >
                    Create  job </Button>
            </Box>
        </React.Fragment>
    )
};


