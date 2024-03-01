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
  useDeleteDepartmentMutation,
  useEditDepartmentMutation,
  useGetDepartmentDetailMutation,
  useLazyGetCodesQuery
} from "../../features/department/departmentService";
import departmentServiceApis from "../../features/department/departmentService";
import Input from "../../components/ui/forminputs/input";
import BasicModal from "../../components/ui/modal/modal";
import Table from "../../components/ui/table/table";
import { useForm, Controller } from "react-hook-form";
import { Add } from "@mui/icons-material";
import CloseIcon from '@mui/icons-material/Close';
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
    updateDepartmentDetails,
    {
      // currentData,
      // isFetching,
      isLoading: updateDepartmentnisLoading,
      // isSuccess, isError,
      // error,
      // status
    },
  ] = useEditDepartmentMutation();
  const [
    getDepartmentDetails,
    {
      // currentData,
      // isFetching,
      isLoading: detailDepartmentnisLoading,
      // isSuccess, isError,
      // error,
      // status
    },
  ] = useGetDepartmentDetailMutation();

  const handleDetail = async (row) => {
    // console.log(row);
    // console.log('aaaa');
    try {
      if (!detailDepartmentnisLoading) {
        const DapartmentDetail = await getDepartmentDetails(row).unwrap();
        // console.log(asd);
        const defaultValues = {
          //field name need to change as per backend
          "department_code": DapartmentDetail?.department_code,
          "department_name": DapartmentDetail?.name,
          "departmentid": DapartmentDetail?.departmentid
        }
        reset({ ...defaultValues })

        setIsOpen(prev => !prev);
      }

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
    refetch:getDepartmentRefetch
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
  ] = useDeleteDepartmentMutation();

  const handleDelete = async (row) => {
    // console.log(row);
    // console.log("aaaa");
    try {
      // console.log(!DeleteDepartmentisLoading);
      if (!DeleteDepartmentisLoading) {
        const asd = await DeleteDepartment(row).unwrap();
        console.log(asd);
      }
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
    // console.log(DepartmentmasterisFetching);
    // console.log(!DepartmentmasterisFetching);
  } else if (DepartmentmasterisSuccess) {
    // console.log(DepartmentmasterDate)
    // console.log(DepartmentmasterisFetching);
    // console.log(!DepartmentmasterisFetching);

    content = DepartmentmasterDate.map((datas, index) => {
      return (
        <TableRow
          key={datas.departmentid}
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
          <TableCell align="left">{datas?.department_code}</TableCell>
          <TableCell component="th" scope="row">
            {datas?.name}
          </TableCell>

          <TableCell align="center" style={{ display: 'flex', justifyContent: 'center' }}>
  <Edit  style={{ marginRight: '8px' }} key={datas.departmentid + index.toString()} onClick={() => handleDetail(datas?.departmentid)} />
  <DeleteIcon   key={datas.departmentid + index.toString() + index.toString()} onDelete={() => handleDelete(datas?.departmentid)} />
</TableCell>
        </TableRow>
      );
    });

    content =
      DepartmentmasterDate.length > 0 ? (
        content
      ) : (
        <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
          <TableCell align="left">no data</TableCell>
        </TableRow>
      );
  } else if (DepartmentmasterisError) {
    content = (
      <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
        <TableCell align="left">{Departmentmastererror}</TableCell>
      </TableRow>
    );
  }

  // console.log(DepartmentmasterisFetching);
  // console.log(!DepartmentmasterisFetching);

  const onSubmit = async (data) => {
    try {
      // console.log(isLoading);
      // console.log(!isLoading);
      // if (!isLoading) {
      //   await CreateDepartmentMaster({
      //     name: data.department_name,
      //   }).unwrap();
      //   handleClose();
      //   reset();
      // }

      if (data?.departmentid) {

        if (!updateDepartmentnisLoading) {
          await updateDepartmentDetails({
            department_code: data.department_code,
            name: data.department_name,
            departmentid: data.departmentid,
          }).unwrap();
          handleClose();
          
          reset();
        }
      } else {

        if (!isLoading) {
          await CreateDepartmentMaster({
            department_code: data.department_code,
            name: data.department_name,
          }).unwrap();
          handleClose();
          getDepartmentRefetch();
          reset();
        }
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const [isOpen, setIsOpen] = React.useState(false);
  const [getCodess, { data: codedata, isLoading: getcodeisLoading, refetch }] =
    departmentServiceApis.endpoints.getCodes.useLazyQuery();

  const handleOpen = async () => {
    // setIsOpen(true);
    console.log("s");
    try {
      const {
        data: codedata,
        isLoading: getcodeisLoading,
        isFetching: codeisFetching,
        isSuccess: codeisSuccess,
      } = await getCodess();


      if (codeisSuccess) {
        // console.log(codedata);
        const defaultValues = {
          department_code: codedata.code,
          department_name: "",
        }

        reset({ ...defaultValues });
        setIsOpen((prev) => !prev);
      }
      // console.log(queryStateResults);
      // console.log(info);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    // setIsOpen(false);
    setIsOpen((prev) => !prev);
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
                  <TableCell><b>Department Code</b></TableCell>
                  <TableCell align="left"><b>Department Name</b></TableCell>
                  <TableCell align="center"><b>Action</b></TableCell>
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
                    startIcon={<CloseIcon />}
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
                  Save
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
