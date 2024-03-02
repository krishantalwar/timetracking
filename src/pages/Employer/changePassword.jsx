import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useForm, Controller } from "react-hook-form";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { Tab } from "@mui/icons-material";
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

import {
  useUpdatpasswordMutation,
} from "../../features/auth/authService";
import { selectCurrentUser } from "../../features/auth/authSelector";
import { useSelector, useDispatch } from "react-redux";
import logger from "redux-logger";

export default function Profile() {
  const { handleSubmit, control, watch, formState,getValues, reset } = useForm({
    mode: "onChange",
    defaultValues: {
      current_password: "",
      new_password: "",
      confirm_password: ""
    },
  });
  const currentUser = useSelector(selectCurrentUser);
  const password = watch("new_password", "");

  const [
    updatepassword,
    {
      isLoading,
      isSuccess,
    },
  ] = useUpdatpasswordMutation();

  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

  const onSubmit = async (data) => {
    try {
      if (!isLoading) {
        setShowConfirmationDialog(true);

      }
    } catch (error) {
      console.error("Change password error:", error);
    }
  };

  const confirmChangePassword = async () => {
    try {
      // console.log(formState);
      // console.log(formState.current_password);
      // console.log(getValues());
      const data =getValues()
      await updatepassword({
        current_password: data.current_password,
        new_password: data.new_password,
        confirm_password: data.confirm_password,
        user_id: currentUser.user
      }).unwrap();
      reset();
      setShowConfirmationDialog(false);
    } catch (error) {
      console.error("Change password error:", error);
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
                  />
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
                    label="New Password"
                    formcontrolpops={{
                      fullWidth: true,
                      variant: "standard",
                    }}
                    error={Boolean(formState?.errors?.new_password)}
                    helperText={formState?.errors?.new_password?.message}
                  />
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
                  />
                )}
              />
            </Grid>
          </Grid>
          <Button type="submit" style={{ marginLeft: 5, marginTop: 20 }}>
            Change Password
          </Button>
        </Box>
      </Box>
      {showConfirmationDialog && (
        <ConfirmationDialog
          open={showConfirmationDialog}
          onClose={() => setShowConfirmationDialog(false)}
          onConfirm={confirmChangePassword}
        />
      )}
    </React.Fragment>
  );
}

const ConfirmationDialog = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirmation</DialogTitle>
      <DialogContent>
        {/* <DialogContentText> */}
         <p>Are you sure you want to change the password?</p> 
        {/* </DialogContentText> */}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="primary" autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};
