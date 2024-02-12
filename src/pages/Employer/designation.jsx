import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Copyright from "../../layouts/copyright";
import Paper from "@mui/material/Paper";

import {
  useCreateShiftMasterMutation,
  useGetShiftQuery,
} from "../../features/shiftmaster/shiftService";
import Input from "../../components/ui/forminputs/input";
import BasicModal from "../../components/ui/modal/modal";
import Table from "../../components/ui/table/table";
import { useForm, Controller } from "react-hook-form";
import { Add } from "@mui/icons-material";
import { Delete, Edit } from "@mui/icons-material";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";

export default function Designation() {
  const {
    handleSubmit,
    control,
    // errors,
    // getValues, getFieldState,
    formState,
    reset,
    watch,
  } = useForm({
    mode: "onChange",
    defaultValues: {
        designation_code:"",
        designation_name:"",

    },
  });

  const [
    CreateShiftMaster,
    {
      // currentData,
      // isFetching,
      isLoading,
      // isSuccess, isError,
      // error,
      // status
    },
  ] = useCreateShiftMasterMutation();

  const {
    data: shiftmasterDate,
    isLoading: shiftmasterisLoading,
    isFetching: shiftmasterisFetching,
    isSuccess: shiftmasterisSuccess,
    isError: shiftmasterisError,
    error: shiftmastererror,
  } = useGetShiftQuery("getShift");

  let content = "";
  if (shiftmasterisLoading) {
    content = <p>Loading...</p>;
  } else if (shiftmasterisSuccess) {
    // console.log(shiftmasterDate)
    content = shiftmasterDate.map((datas) => {
      return (
        <TableRow
          key={datas.shiftid}
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
          <TableCell align="right">{datas?.shift_code}</TableCell>
          <TableCell component="th" scope="row">
            {datas?.name}
          </TableCell>
          <TableCell align="right">{datas?.start_time}</TableCell>
          <TableCell align="right">{datas?.end_time}</TableCell>

          <TableCell align="right">
            <Edit key={datas.shiftid} />
            <Delete key={datas.shiftid} />
          </TableCell>
        </TableRow>
      );
    });
  } else if (shiftmasterisError) {
    content = <p>{shiftmastererror}</p>;
  }

  const onSubmit = async (data) => {
    try {
      console.log(isLoading);
      console.log(!isLoading);
      if (!isLoading) {
        await CreateShiftMaster(data).unwrap();
        handleClose();
        reset();
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const [isOpen, setIsOpen] = React.useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <React.Fragment>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />

        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          component={Paper}
          elevation={6}
          square
        >
          <Box
            sx={{
              my: 2,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              //   alignItems: 'center',
            }}
          >
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={10}>
                <Typography>Designation</Typography>
              </Grid>

              <Grid item xs={2}>
                <Button
                  onClick={handleOpen}
                  variant="outlined"
                  startIcon={<Add />}
                >
                  Add New
                </Button>
              </Grid>
            </Grid>
            <Table sx={{ mt: 5 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Designation Code</TableCell>
                  <TableCell align="right">Designation Name</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{content}</TableBody>
            </Table>

            <BasicModal isOpen={isOpen} onClose={handleClose}>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={10}>
                  <Typography>Add Designation</Typography>
                </Grid>

                <Grid item xs={2}>
                  <Button
                    onClick={handleClose}
                    variant="outlined"
                    startIcon={<Add />}
                  >
                    Close
                  </Button>
                </Grid>
              </Grid>
              <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                method="post"
                id="modal-modal-description"
                sx={{ mt: 1 }}
              >
                <Grid
                  container
                  rowSpacing={1}
                  spacing={{ xs: 2, md: 3 }}
                  columns={{ xs: 4, sm: 8, md: 12 }}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                  <Grid item xs={6}>
                    <Controller
                      name="designation_code"
                      control={control}
                      // rules={{ required: "shift code is required" }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          margin="normal"
                          fullWidth
                          id="designation_code"
                          label="Designation Code"
                          type="text"
                          readonly
                          disabled
                          formcontrolpops={{
                            fullWidth: true,
                            variant: "standard",
                          }}
                          error={Boolean(formState?.errors?.designation_code)}
                          helperText={
                            formState?.errors?.designation_code?.message
                          }
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <Controller
                      name="designation_name"
                      control={control}
                      rules={{
                        required: "Designation is required",
                      }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          margin="normal"
                          fullWidth
                          label="Designation"
                          type="text"
                          id="designation_name"
                          autoComplete="name"
                          formcontrolpops={{
                            fullWidth: true,
                            variant: "standard",
                          }}
                          error={Boolean(formState?.errors?.designation_name)}
                          helperText={
                            formState?.errors?.designation_name?.message
                          }
                        />
                      )}
                    />
                  </Grid>
                </Grid>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Add
                </Button>
              </Box>
            </BasicModal>

            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
