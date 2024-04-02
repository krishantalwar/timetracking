import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Copyright from "../../layouts/copyright";
import Paper from "@mui/material/Paper";
import CloseIcon from '@mui/icons-material/Close';
// import Backdrops from "../../components/ui/Backdrop/Backdrop";
import {
  useCreateDesignationMasterMutation,
  useGetDesignationQuery,
  useDeleteDesignationMutation,
  useEditDesignationMutation,
  useGetDesignationDetailMutation,
  useLazyGetCodesdesignationQuery
} from "../../features/designation/designationService";

import designationServiceApis from "../../features/designation/designationService";
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

  const [isopen, setIsopen] = React.useState(false);
  // const [isLoaDing, setIsLoaDing] = React.useState(false); 

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
      designation_code: "",
      designation_name: "",
      designation_id: "",

    },
  });


  const [
    updateDesignationDetails,
    {
      // currentData,
      // isFetching,
      isLoading: updateDesignationisLoading,
      // isSuccess, isError,
      // error,
      // status
    },
  ] = useEditDesignationMutation();

  const [
    CreateDesignationMaster,
    {
      // currentData,
      // isFetching,
      isLoading,
      // isSuccess, isError,
      // error,
      // status
    },
  ] = useCreateDesignationMasterMutation();

  const {
    data: designationmasterDate,
    isLoading: designationmasterisLoading,
    isFetching: designationmasterisFetching,
    isSuccess: designationmasterisSuccess,
    isError: designationmasterisError,
    error: designationmastererror,
    refetch: getDesignationRefetch
  } = useGetDesignationQuery("getDesignation");

  



  const [
    DeleteDesignation,
    {
      // currentData,
      // isFetching,
      isLoading: DeleteDesignationisLoading,
      // isSuccess, isError,
      // error,
      // status
    },
  ] = useDeleteDesignationMutation();

  const [
    getDesignationDetails,
    {
      // currentData,
      // isFetching,
      isLoading: DetailDesignationisLoading,
      // isSuccess, isError,
      // error,
      // status
    },
  ] = useGetDesignationDetailMutation();

  const handleDetail = async (row) => {
    // console.log(row);
    // console.log('aaaa');
    try {
      // console.log(!DeleteDesignationisLoading);
      if (!DetailDesignationisLoading) {

        const DesignationDetail = await getDesignationDetails(row).unwrap();
        // console.log(DesignationDetail);
        const defaultValues = {
          //field name need to change as per backend
          "designation_code": DesignationDetail?.designation_code,
          "designation_name": DesignationDetail?.name,
          "designation_id": DesignationDetail?.designationid,
        }

        reset({ ...defaultValues })

        setIsOpen(prev => !prev);
      }
      // console.log(formState)


    } catch (error) {
      console.error("delete error:", error);
    }
  };

  const handleDelete = async (row) => {
    // console.log(row);
    // console.log("aaaa");
    try {

      if (!DeleteDesignationisLoading) {
        const asd = await DeleteDesignation(row).unwrap();
        
      }
    } catch (error) {
      console.error("delete error:", error);
    }
  };

  let content = "";

  if (designationmasterisLoading) {
    content = <TableRow
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell align="right">Loading...</TableCell>
    </TableRow>
      ;
  } else if (designationmasterisSuccess) {
    console.log(designationmasterDate)

    content = designationmasterDate.map((datas, index) => {
      return (
        <TableRow
          key={datas.designationid}
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
          <TableCell align="center">{datas?.designation_code}</TableCell>
          <TableCell component="th" scope="row"align="center" >
            {datas?.name}
          </TableCell>

          <TableCell align="center" style={{ display: 'flex', justifyContent: 'center' }}>
            <Edit style={{ marginRight: '8px' }} key={datas.designationid + index.toString()} onClick={() => handleDetail(datas?.designationid)} />
            <DeleteIcon key={datas.designationid + index.toString() + index.toString()} onDelete={() => handleDelete(datas?.designationid)} />
          </TableCell>

        </TableRow>
      );
    });
    content =
    designationmasterDate.length > 0 ? (
      content
    ) : (
      <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
        <TableCell align="left">Loading...</TableCell>
      </TableRow>
    );
} else if (designationmasterisError) {
  content = (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell align="left">{designationmasterisError}</TableCell>
    </TableRow>
  );
}


  const onSubmit = async (data) => {
    try {
      // setIsLoaDing(true); 
      setIsopen(true);

        if(data?.designation_id){
          if (!updateDesignationisLoading) {
                    await updateDesignationDetails({
                      "designation_code": data.designation_code,
                      "name": data.designation_name,
                      "designationid": data.designation_id,
                    }).unwrap();
                    setIsopen(false);
                    handleClose();
                    reset();
                  }

        }else{
          
        if (!isLoading) {
          await CreateDesignationMaster({
            designation_code: data.designation_code,
            name: data.designation_name,
          }).unwrap();
          setIsopen(false); // Close backdrop after API call is complete
          handleClose();
          getDesignationRefetch();
          reset();
        }
        // setIsLoaDing(false); // Reset loading state
        }
    } catch (error) {
      console.error("Login error:", error);
      // setIsLoaDing(false); // Reset loading state if there's an error
    }
  };
  


  // const onSubmit = async (data) => {
  //   try {
    // setIsLoaDing(true); // Set loading to true when API call starts
  
    // // Show backdrop
    // setIsopen(true);

    // // Delay API call by 10 seconds
    // setTimeout(async () =>{
    //   if (data?.designation_id) {

        //       if (!updateDesignationisLoading) {
        //         await updateDesignationDetails({
        //           "designation_code": data.designation_code,
        //           "name": data.designation_name,
        //           "designationid": data.designation_id,
        //         }).unwrap();
        //         handleClose();
        //         reset();
        //       }
        //     } else {
      
        //       if (!isLoading) {
        //         await CreateDesignationMaster({
        //           designation_code: data.designation_code,
        //           name: data.designation_name,
        //         }).unwrap();
        //         handleClose();
        //         getDesignationRefetch();
        //         reset();
        //       }
        //     }
        //   } 

//     },10000); // 10 seconds delay
//   } catch (error) {
//     console.error("Login error:", error);
//     setIsLoaDing(false); // Reset loading state if there's an error
//   }
// };

  

  //     

  //     if (data?.designation_id) {

  //       if (!updateDesignationisLoading) {
  //         await updateDesignationDetails({
  //           "designation_code": data.designation_code,
  //           "name": data.designation_name,
  //           "designationid": data.designation_id,
  //         }).unwrap();
  //         handleClose();
  //         reset();
  //       }
  //     } else {

  //       if (!isLoading) {
  //         await CreateDesignationMaster({
  //           designation_code: data.designation_code,
  //           name: data.designation_name,
  //         }).unwrap();
  //         handleClose();
  //         getDesignationRefetch();
  //         reset();
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Login error:", error);
  //   }
  // };

  const [isOpen, setIsOpen] = React.useState(false);

  const [getCodess, { data: codedata, isLoading: getcodeisLoading, refetch }] =
    designationServiceApis.endpoints.getCodesdesignation.useLazyQuery();


    const handleopen = () => {
      setIsopen(true);
    };
  
    const handleclose = () => {
      setIsopen(false);
    };

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
          // department_code: codedata.code,
          // department_name: "",

          designation_code: codedata.code,
          designation_name: "",
          designation_id: "",
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
                <Typography><b>Designation</b></Typography>
              </Grid>

              <Grid item xs={2}>
                <Button
                  onClick={handleOpen}
                  variant="outlined"
                  startIcon={<Add />}
                  style={{
                    margin:"0 0 10px"
                  }}
                >
                  Add New
                </Button>
              </Grid>
            </Grid>
            <Table sx={{ mt: 5 }}>
              <TableHead style={{
                  border:"1px solid black",
                
                }} >
                <TableRow  >
                  <TableCell align="center"><b>Designation Code</b></TableCell>
                  <TableCell align="center"><b>Designation Name</b></TableCell>
                  <TableCell align="center"><b>Action</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{
                  border:"1px solid black",
                }}>{content}</TableBody>
            </Table>

            <BasicModal isOpen={isOpen} onClose={handleClose}  isopen={handleopen} onclose={handleclose} >
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
                          // readOnly
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
               <Grid>
               <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Add
                            </Button>
                            <Backdrop
                      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                      open={isopen}
                      onClick={handleclose}
                    >
                      <CircularProgress color="inherit" />
                    </Backdrop>
               </Grid>
               
              </Box>
            </BasicModal>

            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
