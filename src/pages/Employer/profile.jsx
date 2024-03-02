import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useForm, Controller } from "react-hook-form";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { TextField } from "@mui/material";
import { CommentBank, Tab } from "@mui/icons-material";
import { selectCurrentUser } from "../../features/auth/authSelector";
import { useSelector, useDispatch } from "react-redux";
import MenuItem from '@mui/material/MenuItem';
import {
  // useGetProfileDetailMutation,
  useEditProfileMutation,
  useGetProfileQuery,
} from '../../features/profile/profileService'
import {
  useGetCountryQuery,
} from '../../features/country/countryService'

export default function Profile() {
  const { handleSubmit, control, formState, reset, watch } = useForm({
    mode: "onChange",
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      address: "",
      phone: "",
      city: "",
      state: "",
      country: "",
      id: "",
    },
  });
  const currentUser = useSelector(selectCurrentUser);

  const [
    EditProfile,
    {
      // currentData,
      // isFetching,
      isLoading: EditProfileisLoading,
      // isSuccess, isError,
      // error,
      // status
    },
  ] = useEditProfileMutation();

  const
    {
      data: profileData,
      isFetching,
      isLoading: useGetProfileQueryisLoading,
      isSuccess: useGetProfileQueryisSuccess,

      isError,
      error,
      refetch: profileDatarefetch
      // status
    }
      = useGetProfileQuery(currentUser.user);



  const
    {
      data: countryData,
      isLoading: countryDataisLoading,
      isSuccess: countryDataisSuccess,
      isError: countryDataisError,
      error: countryDataerror,
    }
      = useGetCountryQuery('getCountry');

  let countyoptions = <MenuItem key={1}></MenuItem>;
  if (countryDataisLoading) {
    countyoptions = <MenuItem key={1}></MenuItem>;
  } else if (countryDataisSuccess) {
    countyoptions = countryData.map((datas) => {
      return (<MenuItem key={datas.id} value={datas.id} >
        {datas.name}
      </MenuItem>);
    });
  } else if (countryDataisError) {
    countyoptions = <MenuItem key={1}>{countryDataerror}</MenuItem>;
  }


  React.useEffect(() => {

    if (profileData != null && profileData != undefined) {
      if (useGetProfileQueryisSuccess) {
        const defaultValues = {
          first_name: profileData.first_name ?? "",
          last_name: profileData.last_name ?? "",
          email: profileData.email ?? "",
          address: profileData.userDetail.address ?? "",
          phone: profileData.userDetail.phone ?? "",
          city: profileData.userDetail.city ?? "",
          state: profileData.userDetail.state ?? "",
          country: profileData.userDetail.country ?? "",
          id: currentUser.user,
        }
        // console.log(defaultValues)
        reset(defaultValues)
      }
    }

  }, [profileData, useGetProfileQueryisSuccess])


  const onSubmit = async (data) => {
    // console.log(data)
    try {
      if (data?.id) {

        if (!EditProfileisLoading) {
          await EditProfile(data).unwrap();
          reset();
          profileDatarefetch()
        }
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  const countrychnage = watch("country");
  // console.log(countrychnage);

  let stateoptions = <MenuItem key={1}></MenuItem>;
  if (countrychnage != "" && countryDataisSuccess) {
    if (countryDataisLoading) {
      stateoptions = <MenuItem key={1}></MenuItem>;
    } else if (countryDataisSuccess) {
      const filtercountry = countryData.filter((datas) => {
        return datas.id == countrychnage
      });

      stateoptions = filtercountry[0]?.country_state.map((datas) => {
        return (<MenuItem key={datas.stateid} value={datas.stateid} >
          {datas.name}
        </MenuItem>);
      });

    } else if (countryDataisError) {
      stateoptions = <MenuItem key={1}>{countryDataerror}</MenuItem>;
    }
  }


  return (
    <React.Fragment>
      <Box component={Paper} type={Tab}>
        <Typography ml={3}><b>Profile</b></Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          method="post"
          sx={{ mt: 1, ml: 2 }}
        >
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            mt={2}
          >
            <Grid item xs={6}>
              <Controller
                name="first_name"
                control={control}
                rules={{ required: "First name is required" }}

                render={({ field }) => (
                  <TextField
                    {...field}
                    type="text"
                    margin="none"
                    fullWidth
                    label="First Name"
                    formcontrolpops={{
                      fullWidth: true,
                      variant: "standard",
                    }}
                    error={Boolean(formState?.errors?.first_name)}
                    helperText={formState?.errors?.first_name?.message}
                  >
                  </TextField>
                )}
              />
            </Grid>

            <Grid item xs={6}>
              <Controller
                name="last_name"
                control={control}
                rules={{ required: "Last name is required" }}

                render={({ field }) => (
                  <TextField
                    {...field}
                    type="text"
                    margin="none"
                    fullWidth
                    label="Last Name"
                    formcontrolpops={{
                      fullWidth: true,
                      variant: "standard",
                    }}
                    error={Boolean(formState?.errors?.last_name)}
                    helperText={formState?.errors?.last_name?.message}
                  >
                  </TextField>
                )}
              />
            </Grid>
            <Grid item xs={12} mt={2}>
              <Controller
                name="email"
                control={control}
                rules={{ required: "Email is required" }}

                render={({ field }) => (
                  <TextField
                    {...field}
                    disabled
                    readOnly
                    type="email"
                    margin="none"
                    fullWidth
                    label="Email"
                    formcontrolpops={{
                      fullWidth: true,
                      variant: "standard",
                    }}
                    error={Boolean(formState?.errors?.email)}
                    helperText={formState?.errors?.email?.message}
                  >
                  </TextField>
                )}
              />
            </Grid><Grid item xs={12} mt={2}>
              <Controller
                name="address"
                control={control}
                rules={{ required: "Address is required" }}
                // 
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="text"
                    margin="none"
                    fullWidth
                    label="Address"
                    formcontrolpops={{
                      fullWidth: true,
                      variant: "standard",
                    }}
                    error={Boolean(formState?.errors?.address)}
                    helperText={formState?.errors?.address?.message}
                  >
                  </TextField>
                )}
              />
            </Grid><Grid item xs={6} mt={2}>
              <Controller
                name="phone"
                control={control}
                rules={{ required: "phone number is required" }}
                // 
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="text"
                    margin="none"
                    fullWidth
                    label="Contact Number"
                    formcontrolpops={{
                      fullWidth: true,
                      variant: "standard",
                    }}
                    error={Boolean(formState?.errors?.contact_number)}
                    helperText={formState?.errors?.contact_number?.message}
                  >
                  </TextField>
                )}
              />
            </Grid><Grid item xs={6} mt={2}>
              <Controller
                name="city"
                control={control}
                rules={{ required: "City is required" }}
                // 
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="text"
                    margin="none"
                    fullWidth
                    label="City"
                    formcontrolpops={{
                      fullWidth: true,
                      variant: "standard",
                    }}
                    error={Boolean(formState?.errors?.city)}
                    helperText={formState?.errors?.city?.message}
                  >
                  </TextField>
                )}
              />


            </Grid>
            <Grid item xs={6} mt={2}>
              <Controller
                name="country"
                control={control}
                rules={{ required: "Country is required" }}

                render={({ field }) => (
                  <TextField
                    {...field}
                    select


                    SelectProps={{
                      // native: true,
                      // inputProps: {name: 'screen_allocation' }
                    }}

                    margin="none"
                    fullWidth
                    label="Country"
                    formcontrolpops={{
                      fullWidth: true,
                      variant: "standard",
                    }}

                    error={Boolean(formState?.errors?.country)}
                    helperText={formState?.errors?.country?.message}
                  >
                    {countyoptions}
                  </TextField>
                )}
              />
            </Grid>
            <Grid item xs={6} mt={2}>
              <Controller
                name="state"
                control={control}
                rules={{ required: "State is required" }}

                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    SelectProps={{
                      // native: true,
                      // inputProps: {name: 'screen_allocation' }
                    }}
                    margin="none"
                    fullWidth
                    label="State"
                    formcontrolpops={{
                      fullWidth: true,
                      variant: "standard",
                    }}
                    error={Boolean(formState?.errors?.state)}
                    helperText={formState?.errors?.state?.message}
                  >
                    {stateoptions}
                  </TextField>
                )}
              />
            </Grid>

          </Grid>
          <Button type="submit" style={{ marginLeft: 5, marginTop: 20 }}>
            submit
          </Button>
        </Box>
      </Box>
    </React.Fragment>
  );
}
