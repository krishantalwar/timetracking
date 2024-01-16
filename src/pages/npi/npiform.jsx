import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import Input from '../../components/ui/forminputs/input';

import Selects from '../../components/ui/forminputs/select';

import Button from '../../components/ui/button/button';

export default function NpiForm() {

    const handleSubmit = (event) => {

    };

    return (
        <React.Fragment>
            <Box component="form" onSubmit={handleSubmit} >
                <Box sx={{ display: 'flex', mt: 10 }}>
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        sx={{ flexGrow: 1 }}
                    >
                        Search NPI Records
                    </Typography>
                </Box>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: 'white',
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                        mt: 2
                    }}
                >
                    <Container maxWidth="lg" sx={{ mt: 3 }}>
                        <Grid container spacing={3} >
                            <Grid item xs={12} sm={4}>
                                <Input
                                    label="NPI Number"
                                    placeholder="NPI Number"
                                    fullWidth
                                    autoComplete="family-name"
                                    variant="standard"
                                    required
                                    formcontrolpops={{
                                        "fullWidth": "fullWidth",
                                        "variant": "standard",
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>

                                <Selects
                                    label="NPI Type"
                                    placeholder="NPI Type"
                                    fullWidth
                                    autoComplete="family-name"
                                    variant="standard"
                                    required
                                    options={["active", "inactive"]}
                                    formcontrolpops={{
                                        "fullWidth": "fullWidth",
                                        "variant": "standard",
                                    }}
                                />



                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Input
                                    label="Taxonomy Description"
                                    placeholder="Taxonomy Description"
                                    fullWidth
                                    autoComplete="family-name"
                                    variant="standard"
                                    required
                                    formcontrolpops={{
                                        "fullWidth": "fullWidth",
                                        "variant": "standard",
                                    }}
                                />
                            </Grid>
                        </Grid>

                        <Grid container spacing={3} sx={{ mt: 3 }}>
                            <Grid item xs={12} sm={6}>
                                <Input
                                    label="Provider First Name"
                                    placeholder="Provider First Name"
                                    fullWidth
                                    autoComplete="family-name"
                                    variant="standard"
                                    required
                                    formcontrolpops={{
                                        "fullWidth": "fullWidth",
                                        "variant": "standard",
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Input
                                    label="Provider Last Name"
                                    placeholder="Provider Last Name"
                                    fullWidth
                                    autoComplete="family-name"
                                    variant="standard"
                                    required
                                    formcontrolpops={{
                                        "fullWidth": "fullWidth",
                                        "variant": "standard",
                                    }}
                                />
                            </Grid>
                        </Grid>

                        <Grid container spacing={3} sx={{ mt: 3 }} >
                            <Grid item xs={12} sm={4}>
                                <Input
                                    label="Organization Name (LBN, DBA, Former LBN or Other Name)"
                                    placeholder="Organization Name (LBN, DBA, Former LBN or Other Name)"
                                    fullWidth
                                    autoComplete="family-name"
                                    variant="standard"
                                    required
                                    formcontrolpops={{
                                        "fullWidth": "fullWidth",
                                        "variant": "standard",
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Input
                                    label="Authorized Official First Name"
                                    placeholder="Authorized Official First Name"
                                    fullWidth
                                    autoComplete="family-name"
                                    variant="standard"
                                    required
                                    formcontrolpops={{
                                        "fullWidth": "fullWidth",
                                        "variant": "standard",
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Input
                                    label="Authorized Official Last Name"
                                    placeholder="Authorized Official Last Name"
                                    fullWidth
                                    autoComplete="family-name"
                                    variant="standard"
                                    required
                                    formcontrolpops={{
                                        "fullWidth": "fullWidth",
                                        "variant": "standard",
                                    }}
                                />
                            </Grid>
                        </Grid>

                        <Grid container spacing={3} sx={{ mt: 3 }}>
                            <Grid item xs={12} sm={2.3}>
                                <Input
                                    label="City"
                                    placeholder="City"
                                    fullWidth
                                    autoComplete="family-name"
                                    variant="standard"
                                    required
                                    formcontrolpops={{
                                        "fullWidth": "fullWidth",
                                        "variant": "standard",
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={2.3}>
                                <Selects
                                    label="State"
                                    placeholder="State"
                                    fullWidth
                                    autoComplete="family-name"
                                    variant="standard"
                                    required
                                    options={["active", "inactive"]}
                                    formcontrolpops={{
                                        "fullWidth": "fullWidth",
                                        "variant": "standard",
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={2.3}>
                                <Selects
                                    label="Country"
                                    placeholder="Country"
                                    fullWidth
                                    autoComplete="family-name"
                                    variant="standard"
                                    required
                                    options={["active", "inactive"]}
                                    formcontrolpops={{
                                        "fullWidth": "fullWidth",
                                        "variant": "standard",
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={2.3}>
                                <Selects
                                    label="Postal Code"
                                    placeholder="Postal Code"
                                    fullWidth
                                    autoComplete="family-name"
                                    variant="standard"
                                    required
                                    options={["active", "inactive"]}
                                    formcontrolpops={{
                                        "fullWidth": "fullWidth",
                                        "variant": "standard",
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={2.3}>
                                <Selects
                                    label="Address Type"
                                    placeholder="Address Type"
                                    fullWidth
                                    autoComplete="family-name"
                                    variant="standard"
                                    required
                                    options={["active", "inactive"]}
                                    formcontrolpops={{
                                        "fullWidth": "fullWidth",
                                        "variant": "standard",
                                    }}
                                />
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                                label="Use this address for payment details"
                            />
                        </Grid>

                        <Box sx={{ display: 'flex', mt: 10 }}>
                            <Typography
                                component="p"
                                // variant="h6"
                                color="inherit"
                                // noWrap
                                sx={{ flexGrow: 1, color: "#004c9e" }}
                            >
                                ** This search page is by default set to return similar and close results to your search keywords.
                                You can check the box above if you only want the exact matches for your keywords to be returned in the search results.
                                <Tooltip title="Use this option if you know exactly the search results you are looking for, otherwise do not check this box and the system will 
                            automatically return all NPIs matching your search criteria, as well as, any with similar and close matches to the search criteria entered.">
                                    <IconButton>
                                        <InfoIcon sx={{ color: "#ffae42", fontSize: "18px" }} />
                                    </IconButton>
                                </Tooltip>
                            </Typography>


                        </Box>
                        <Box sx={{ display: 'flex', mt: 2 }}>
                            <Typography
                                component="p"
                                // variant="h6"
                                color="inherit"
                                // noWrap
                                sx={{ flexGrow: 1, fontWeight: "bold" }}
                            >
                                Note: The NPI Registry limits searches to the first 2100 results. If you cannot find the NPI that you are looking for, please refine the search.
                            </Typography>
                        </Box>


                        <Box sx={{ display: 'flex', mt: 2 }}>
                            <Button
                                variant="text"
                            >Clear</Button>
                            <Button
                                variant="contained"

                            >Search</Button>
                        </Box>
                    </Container>

                </Box>
            </Box>
        </React.Fragment >
    )
}