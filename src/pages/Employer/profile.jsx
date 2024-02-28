import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useForm, Controller } from "react-hook-form";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { TextField } from "@mui/material";
import { Tab } from "@mui/icons-material";
import {
  useGetProfileDetailMutation,
  useEditProfileMutation} from '../../features/profile/profileService'

export default function Profile() {
  const { handleSubmit, control, formState } = useForm({
    mode: "onChange",
    defaultValues: {
      role: "",
      screen_allocation: "",
    },
  });
   


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

  const [
    getProfileDetail,
    {
      // currentData,
      // isFetching,
      isLoading: DetailShiftMasterisLoading,
      // isSuccess, isError,
      // error,
      // status
    },
  ] = useGetProfileDetailMutation();

  const handleDetail = async (row) => {
    console.log(row);
    console.log('aaaa');
    try {

      
      console.log(!DetailShiftMasterisLoading);
      // if (!DeleteShiftMasterisLoading) {
      const ProfileDetail = await getProfileDetail(row).unwrap();
      // console.log(asd);
      // }
      console.log(formState)
      // formState.defaultValues.name = "asda";
      // console.log(formState)
      // useForm({
      const defaultValues = {
        // "break_end_time": ShiftMasterDetail?.break_end_time,
        // "break_start_time": ShiftMasterDetail?.break_start_time,
        // "end_time": ShiftMasterDetail?.end_time,
        // "start_time": ShiftMasterDetail?.start_time,
        // "overtime_end_time": ShiftMasterDetail?.overtime_end_time,
        // "overtime_start_time": ShiftMasterDetail?.overtime_start_time,
        // "name": ShiftMasterDetail?.name,
        // "shiftid": ShiftMasterDetail?.shiftid,
      }
      // });
      reset({ ...defaultValues })

      setIsOpen(prev => !prev);
    } catch (error) {
      console.error("delete error:", error);
    }
  };


  const onSubmit = async (data) => {
    console.log(data)
    try {
      if (data?.shiftid) {

        if (!EditProfileisLoading) {
          await EditProfile(data).unwrap();
          handleClose();
          reset();
        }
      } 
    } catch (error) {
      console.error("Login error:", error);
    }
  };

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
                defaultValue=""
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
                defaultValue=""
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
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
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
                // defaultValue=""
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
                name="contact_number"
                control={control}
                rules={{ required: "Contact number is required" }}
                // defaultValue=""
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
                // defaultValue=""
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
            </Grid><Grid item xs={6} mt={2}>
              <Controller
                name="state"
                control={control}
                rules={{ required: "State is required" }}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="text"
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
                  </TextField>
                )}
              />
            </Grid>
            <Grid item xs={6} mt={2}>
              <Controller
                name="country"
                control={control}
                rules={{ required: "Country is required" }}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="text"
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
                  </TextField>
                )}
              />
            </Grid>
            <Grid item xs={6} mt={2}>
              <Controller
                name="password"
                control={control}
                rules={{ required: "Password is required" }}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="password"
                    margin="none"
                    fullWidth
                    label="Password"
                    formcontrolpops={{
                      fullWidth: true,
                      variant: "standard",
                    }}
                    error={Boolean(formState?.errors?.password)}
                    helperText={formState?.errors?.password?.message}
                  >
                  </TextField>
                )}
              />
            </Grid>
          </Grid>
          <Button type="submit" style={{ marginLeft: 5, marginTop: 20 }}>
            {" "}
            Submit{" "}
          </Button>
        </Box>
      </Box>
    </React.Fragment>
  );
}
