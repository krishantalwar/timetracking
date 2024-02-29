import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useForm, Controller } from "react-hook-form";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { Tab } from "@mui/icons-material";

import {
  useUpdatpasswordMutation,
} from "../../features/auth/authService";

export default function Profile() {
  const { handleSubmit, control, watch, formState } = useForm({
    mode: "onChange",
    defaultValues: {
      current_password: "",
      new_password: "",
      confirm_password: ""
    },
  });
  const password = watch("new_password", "");

  const [
    updatepassword,
    {
      // currentData,
      // isFetching,
      isLoading,
      // isSuccess, isError,
      // error,
      // status
    },
  ] = useUpdatpasswordMutation();

  const onSubmit = async (data) => {

    try {
      console.log(!isLoading);
      if (!isLoading) {
        await updatepassword({
          current_password: data.current_password,
          new_password: data.new_password,
          confirm_password: data.confirm_password,
          user_id: ""
        }).unwrap();
      }
    } catch (error) {

      console.error("Login error:", error);
    }
  };

  return (
    <React.Fragment>
      <Box component={Paper} type={Tab}>
        <Typography ml={3}><b>Change Password</b></Typography>
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
                name="current_password"
                control={control}
                rules={{ required: "Existing password is required" }}

                render={({ field }) => (
                  <TextField
                    {...field}
                    type="password"
                    margin="none"
                    fullWidth
                    label="Existing Password"

                    formcontrolpops={{
                      fullWidth: true,
                      variant: "standard",
                    }}
                    error={Boolean(formState?.errors?.current_password)}
                    helperText={formState?.errors?.current_password?.message}
                  >
                  </TextField>
                )}
              />
            </Grid>

            <Grid item xs={6}>
              <Controller
                name="new_password"
                control={control}
                rules={{ required: "New password is required" }}

                render={({ field }) => (
                  <TextField
                    {...field}
                    type="password"
                    margin="none"
                    fullWidth
                    label=" New Password"

                    formcontrolpops={{
                      fullWidth: true,
                      variant: "standard",
                    }}
                    error={Boolean(formState?.errors?.new_password)}
                    helperText={formState?.errors?.new_password?.message}
                  >
                  </TextField>
                )}
              />
            </Grid>
            <Grid item xs={6} mt={2}>
              <Controller
                name="confirm_password"
                control={control}
                rules={{
                  required: "Confirm Password is required",

                  validate: (value) =>
                    value === password || "The passwords do not match"
                }}

                render={({ field }) => (
                  <TextField
                    {...field}
                    type="password"
                    margin="none"
                    fullWidth
                    label="Confirm Password"

                    formcontrolpops={{
                      fullWidth: true,
                      variant: "standard",
                    }}
                    error={Boolean(formState?.errors?.confirm_password)}
                    helperText={formState?.errors?.confirm_password?.message}
                  >
                  </TextField>
                )}
              />
            </Grid>

          </Grid>
          <Button type="submit" style={{ marginLeft: 5, marginTop: 20 }}>
            {""}
            Change Password{" "}
          </Button>
        </Box>
      </Box>
    </React.Fragment>
  );
}
