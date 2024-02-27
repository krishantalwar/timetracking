import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Copyright from "../../layouts/copyright";
import Paper from "@mui/material/Paper";

import {
  useCreateDepartmentnMasterMutation,
  useGetDepartmentQuery,
  useDeleteDepartmentMutation
  ,useEditDepartmentMutation
} from "../../features/department/departmentService";
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
import DeleteIcon from "../../components/ui/Delete/deletePopUp";

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
      department_code: "",
      department_name: "",
    },
  });

  const [
    CreateDepartmentMaster,
    {
      // currentData,
      // isFetching,
      isLoading,
      // isSuccess, isError,
      // error,
      // status
    },
  ] = useCreateDepartmentnMasterMutation();

  const [
    getDepartmentDetails,
    {
      // currentData,
      // isFetching,
      isLoading: DetailDepartmentnisLoading,
      // isSuccess, isError,
      // error,
      // status
    },
  ] = useEditDepartmentMutation();

  const handleDetail = async (row) => {
    console.log(row);
    console.log('aaaa');
    try {
      console.log(!DeleteDepartmentisLoading);
      // if (!DeleteDepartmentisLoading) {
      const DapartmentDetail = await getDepartmentDetails(row).unwrap();
      // console.log(asd);
      // }
      console.log(formState)
      // formState.defaultValues.name = "asda";
      // console.log(formState)
      // useForm({
      const defaultValues = {
        //field name need to change as per backend
        "break_end_time": DapartmentDetail?.desg_code,
        "break_start_time": DapartmentDetail?.desg_name
      }
      // });
      reset({ ...defaultValues })

      setIsOpen(prev => !prev);
    } catch (error) {
      console.error("delete error:", error);
    }
  };

  const {
    data: DepartmentmasterDate,
    isLoading: DepartmentmasterisLoading,
    isFetching: DepartmentmasterisFetching,
    isSuccess: DepartmentmasterisSuccess,
    isError: DepartmentmasterisError,
    error: Departmentmastererror,
  } = useGetDepartmentQuery("getDepartment");

  const [
    DeleteDepartment,
    {
      // currentData,
      // isFetching,
      isLoading: DeleteDepartmentisLoading,
      // isSuccess, isError,
      // error,
      // status
    },
  ] = useDeleteDepartmentMutation
  ();

  const handleDelete = async (row) => {
    console.log(row);
    console.log("aaaa");
    try {
      console.log(!DeleteDesignationisLoading);
      // if (!DeleteDesignationisLoading) {
      const asd = await DeleteDepartment(row).unwrap();
      console.log(asd);
      // }
    } catch (error) {
      console.error("delete error:", error);
    }
  };

  let content = "";
  if (DepartmentmasterisLoading) {
    content = (
      <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
        <TableCell align="right">Loading...</TableCell>
      </TableRow>
    );
    console.log(DepartmentmasterisFetching);
    console.log(!DepartmentmasterisFetching);
  } else if (DepartmentmasterisSuccess) {
    // console.log(DepartmentmasterDate)
    console.log(DepartmentmasterisFetching);
    console.log(!DepartmentmasterisFetching);

    content = DepartmentmasterDate.map((datas, index) => {
      return (
        <TableRow
          key={datas.departmentid}
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
          <TableCell align="right">{datas?.department_code}</TableCell>
          <TableCell component="th" scope="row">
            {datas?.name}
          </TableCell>

          <TableCell align="right">
            <Edit key={datas.departmentid + index.toString()} />
            <DeleteIcon
              key={datas.shiftid + index.toString() + index.toString()}
              onDelete={() => handleDelete(datas?.shiftid)}
            />
          </TableCell>
        </TableRow>
      );
    });

    content =
      DepartmentmasterDate.length > 0 ? (
        content
      ) : (
        <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
          <TableCell align="right">no data</TableCell>
        </TableRow>
      );
  } else if (DepartmentmasterisError) {
    content = (
      <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
        <TableCell align="right">{Departmentmastererror}</TableCell>
      </TableRow>
    );
  }

  console.log(DepartmentmasterisFetching);
  console.log(!DepartmentmasterisFetching);

  const onSubmit = async (data) => {
    try {
      console.log(isLoading);
      console.log(!isLoading);
      if (!isLoading) {
        await CreateDepartmentMaster({
          name: data.department_name,
        }).unwrap();
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
                <Typography>Department</Typography>
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
                  <TableCell>Department Code</TableCell>
                  <TableCell align="right">Department Name</TableCell>
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
                  <Typography>Add Department</Typography>
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
                      name="department_code"
                      control={control}
                      // rules={{ required: "shift code is required" }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          margin="normal"
                          fullWidth
                          id="department_code"
                          label="Departent Code"
                          type="text"
                          readonly
                          disabled
                          formcontrolpops={{
                            fullWidth: true,
                            variant: "standard",
                          }}
                          error={Boolean(formState?.errors?.department_code)}
                          helperText={
                            formState?.errors?.department_code?.message
                          }
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <Controller
                      name="department_name"
                      control={control}
                      rules={{
                        required: "Department is required",
                      }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          margin="normal"
                          fullWidth
                          label="Department"
                          type="text"
                          id="department_name"
                          autoComplete="name"
                          formcontrolpops={{
                            fullWidth: true,
                            variant: "standard",
                          }}
                          error={Boolean(formState?.errors?.department_name)}
                          helperText={
                            formState?.errors?.department_name?.message
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
