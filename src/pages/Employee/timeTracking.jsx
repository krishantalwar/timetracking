import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useForm, Controller } from "react-hook-form";
import Input from "../../components/ui/forminputs/input";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { TextField } from "@mui/material";
import Table from "../../components/ui/table/table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

export default function RolesandResponsibilities() {
  const { handleSubmit, control, formState } = useForm({
    mode: "onChange",
    defaultValues: {
      role: "",
      screen_allocation: "",
    },
  });
  console.log(formState?.errors?.role?.message);
  const onSubmit = async (data) => {};

  return (
    <React.Fragment>
      <Box component={Paper}>
        <Typography paddingTop={2} align={"center"}>
          <b>Time Trackking Activities</b>
        </Typography>
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
            mt={0}
          >
            <Grid item xs={4} mt={2}>
              <Controller
                name="empcode"
                control={control}
                rules={{ required: "Employee code is required" }}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    margin="none"
                    disabled
                    fullWidth
                    label="Employee Code"
                    type="text"
                    formcontrolpops={{
                      fullWidth: true,
                      variant: "standard",
                    }}
                    error={Boolean(formState?.errors?.empcode)}
                    helperText={formState?.errors?.empcode?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={4} mt={2}>
              <Controller
                name="emppname"
                control={control}
                rules={{ required: "Employee name is required" }}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    disabled
                    margin="none"
                    fullWidth
                    label="Employee Name"
                    type="text"
                    formcontrolpops={{
                      fullWidth: true,
                      variant: "standard",
                    }}
                    error={Boolean(formState?.errors?.emppname)}
                    helperText={formState?.errors?.emppname?.message}
                  />
                )}
              />
            </Grid>
          </Grid>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            mt={0}
          >
            <Grid item xs={4} mt={2}>
              <Controller
                name="emppdepartment"
                control={control}
                rules={{ required: "Department is required" }}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    margin="none"
                    disabled
                    fullWidth
                    label="Employee Department"
                    type="text"
                    formcontrolpops={{
                      fullWidth: true,
                      variant: "standard",
                    }}
                    error={Boolean(formState?.errors?.emppdepartment)}
                    helperText={formState?.errors?.emppdepartment?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={4} mt={2}>
              <Controller
                name="designation"
                control={control}
                rules={{ required: "Designation is required" }}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    disabled
                    margin="none"
                    fullWidth
                    label="Designation"
                    type="text"
                    formcontrolpops={{
                      fullWidth: true,
                      variant: "standard",
                    }}
                    error={Boolean(formState?.errors?.designation)}
                    helperText={formState?.errors?.designation?.message}
                  />
                )}
              />
            </Grid>
            <Grid ml={2} mt={2}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["TimePicker"]}>
                  <TimePicker label="Total Time" />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
          </Grid>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            mt={0}
          >
            <Grid item xs={4} mt={2}>
              <Controller
                name="startdate"
                control={control}
                rules={{ required: "Date is required" }}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    InputLabelProps={{ shrink: true }}
                    margin="none"
                    fullWidth
                    label="Start Date"
                    type="date"
                    formcontrolpops={{
                      fullWidth: true,
                      variant: "standard",
                    }}
                    error={Boolean(formState?.errors?.date)}
                    helperText={formState?.errors?.date?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={4} mt={2}>
              <Controller
                name="enddate"
                control={control}
                rules={{ required: "Date is required" }}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    InputLabelProps={{ shrink: true }}
                    margin="none"
                    fullWidth
                    label="End Date"
                    type="date"
                    formcontrolpops={{
                      fullWidth: true,
                      variant: "standard",
                    }}
                    error={Boolean(formState?.errors?.date)}
                    helperText={formState?.errors?.date?.message}
                  />
                )}
              />
            </Grid>
            <Grid>
              <Button
                type="Button"
                style={{
                  backgroundColor: "lightblue",
                  marginLeft: 20,
                  marginTop: 30,
                  border: "3px solid lightblue",
                  width: 120,
                  height: 40,
                }}
              >
                {" "}
                Start Time{" "}
              </Button>
              <Button
                type="Button"
                style={{
                  backgroundColor: "lightblue",
                  marginLeft: 30,
                  marginTop: 30,
                  border: "3px solid lightblue",
                  width: 120,
                  height: 40,
                }}
              >
                {" "}
                Stop Time{" "}
              </Button>
            </Grid>
          </Grid>
          <Grid mt={4}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Employee Name</TableCell>
                  <TableCell>Job Title</TableCell>
                  <TableCell align="right">Total Time</TableCell>
                  <TableCell align="right">Time In</TableCell>
                  <TableCell align="right">Time Out</TableCell>
                  <TableCell align="right">Break Time</TableCell>
                  <TableCell align="right">Late In</TableCell>
                  <TableCell align="right">Early Out</TableCell>
                </TableRow>
              </TableHead>
              {/* <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.calories}</TableCell>
                    <TableCell align="right">{row.fat}</TableCell>
                    <TableCell align="right">{row.carbs}</TableCell>
                    <TableCell align="right">
                      {row.protein.map((item) => {
                        return item;
                      })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody> */}
            </Table>
          </Grid>
        </Box>
      </Box>
    </React.Fragment>
  );
}
