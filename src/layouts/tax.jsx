import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Copyright from "../layouts/copyright";
import Paper from "@mui/material/Paper";
import {useGetTaxQuery,
    useCreateTaxMasterMutation,
    useDeleteTaxMutation,
    useGetTaxDetailMutation,
    useEditTaxMutation,
    useGetTaxesQuery} from '../features/tax/taxService'
import designationServiceApis from "../features/designation/designationService";
import Input from "../components/ui/forminputs/input"
import BasicModal from "../components/ui/forminputs/input";
import Table from "../components/ui/table/table";
import { useForm, Controller } from "react-hook-form";
import { Add } from "@mui/icons-material";
import { Delete, Edit } from "@mui/icons-material";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import DeleteIcon from "../components/ui/Delete/deletePopUp";
import { styled } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#318CE7",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

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
        company_id: "",
        name: "",
        tax_rate: "",

    },
  });


  const [
    updateTaxDetails,
    {
      // currentData,
      // isFetching,
      isLoading: updateTaxisLoading,
      // isSuccess, isError,
      // error,
      // status
    },
  ] = useEditTaxMutation();

  const [
    CreateTax,
    {
      // currentData,
      // isFetching,
      isLoading,
      // isSuccess, isError,
      // error,
      // status
    },
  ] = useCreateTaxMasterMutation();

  const {
    data: taxdata,
    isLoading: taxdataisLoading,
    isFetching: taxmasterisFetching,
    isSuccess: taxdataisSuccess,
    isError: taxmastererror,
    error: taxdataerror,
    refetch: getTaxesrefetch
  } = useGetTaxesQuery("getTaxes");


  const [
    DeleteTax,
    {
      // currentData,
      // isFetching,
      isLoading: DeleteTaxisLoading,
      // isSuccess, isError,
      // error,
      // status
    },
  ] = useDeleteTaxMutation();

  const [
    getTaxDetails,
    {
      // currentData,
      // isFetching,
      isLoading: DetailsTaxisLoading,
      // isSuccess, isError,
      // error,
      // status
    },
  ] = useGetTaxDetailMutation();

  const handleDetail = async (row) => {
    // console.log(row);
    // console.log('aaaa');
    try {
      // console.log(!DeleteDesignationisLoading);
      if (!DetailsTaxisLoading) {

        const TaxDetail = await getTaxDetails(row).unwrap();
        // console.log(DesignationDetail);
        const defaultValues = {
          //field name need to change as per backend
          "company_id": TaxDetail?.company_id,
          "name": TaxDetail?.name,
          "tax_rate": TaxDetail?.tax_rate,
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

      if (!DeleteTaxisLoading) {
        const asd = await DeleteTax(row).unwrap();

      }
    } catch (error) {
      console.error("delete error:", error);
    }
  };

  let content = "";

  if (taxdataisLoading) {
    content = <TableRow
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell align="right">Loading...</TableCell>
    </TableRow>
      ;
  } else if (taxdataisSuccess) {
    // console.log(designationmasterDate)

    if( taxdata.length > 0 ){
        content = taxdata.map((datas, index) => {
            return (
              <StyledTableRow
                key={datas.company_id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <StyledTableCell align="center">{datas?.name}</StyledTableCell>
                <StyledTableCell component="th" scope="row" align="center" >
                  {datas?.tax_rate}
                </StyledTableCell>
      
                <StyledTableCell align="center" style={{ display: 'flex', justifyContent: 'center' }}>
                  <Edit style={{ marginRight: '8px' }} key={datas.Taxid + index.toString()} onClick={() => handleDetail(datas?.Taxid)} />
                  <DeleteIcon key={datas.Taxid + index.toString() + index.toString()} onDelete={() => handleDelete(datas?.Taxid)} />
                </StyledTableCell>
      
              </StyledTableRow>
            );
          });
    }
   
    
    content =
    taxdata.length > 0 ? (
        content
      ) : (
        <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
          <TableCell align="left">Loading...</TableCell>
        </TableRow>
      );
  } else if (taxmastererror) {
    content = (
      <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
        <TableCell align="left">{taxmastererror}</TableCell>
      </TableRow>
    );
  }


  const onSubmit = async (data) => {
    try {
      // setIsLoaDing(true); 
      setIsopen(true);

      if (data?.Taxid) {
        if (!updateTaxisLoading) {
          await updateTaxDetails({
            "company_id": data.company_id,
            "name": data.name,
            "tax_rate": data.tax_rate,
          }).unwrap();
          setIsopen(false);
          handleClose();
          reset();
        }

      } else {

        if (!isLoading) {
          await CreateTax({
            company_id: data.company_id,
            name: data.name,
            tax_rate: data.tax_rate,
          }).unwrap();
          setIsopen(false); // Close backdrop after API call is complete
          handleClose();
          getTaxesrefetch();
          reset();
        }
        // setIsLoaDing(false); // Reset loading state
      }
    } catch (error) {
      console.error("Login error:", error);
      // setIsLoaDing(false); // Reset loading state if there's an error
    }
  };


  const [isOpen, setIsOpen] = React.useState(false);

//   const [getCodess, { data: codedata, isLoading: getcodeisLoading, refetch }] =
//     designationServiceApis.endpoints.getCodesdesignation.useLazyQuery();


  const handleopen = () => {
    setIsopen(true);
  };

  const handleclose = () => {
    setIsopen(false);
  };

  const handleOpen = async () => {
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

          company_id: codedata.code,
          name: "",
          tax_rate: "",
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
                <Typography style={{
                  color: "#318CE7",
                }}><b>Designation</b></Typography>
              </Grid>

              <Grid item xs={2}>
                <Button
                  onClick={handleOpen}
                  variant="outlined"
                  startIcon={<Add />}
                  style={{
                    margin: "0 0 10px"
                  }}
                >
                  Add New
                </Button>
              </Grid>
            </Grid>
            <Table sx={{ mt: 5 }}>
              <TableHead style={{
                border: "1px solid black",

              }} >
                <TableRow  >
                  <StyledTableCell align="center"><b>Company Id</b></StyledTableCell>
                  <StyledTableCell align="center"><b>Company  Name</b></StyledTableCell>
                  <StyledTableCell align="center"><b>Tax Rate</b></StyledTableCell>
                  <StyledTableCell align="center"><b>Action</b></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{
                border: "1px solid black",
              }}>{content}</TableBody>
            </Table>

            <BasicModal isOpen={isOpen} onClose={handleClose} isopen={handleopen} onclose={handleclose} >
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={10}>
                  <Typography style={{
                  color: "#318CE7",
                }} > <b>Tax Rates</b></Typography>
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
                      name="company_id"
                      control={control}
                      rules={{ required: "Company ID is required" }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          margin="normal"
                          fullWidth
                          id="company_id"
                          label="Company ID"
                          type="text"
                          // readOnly
                          disabled
                          formcontrolpops={{
                            fullWidth: true,
                            variant: "standard",
                          }}
                          error={Boolean(formState?.errors?.company_id)}
                          helperText={
                            formState?.errors?.company_id?.message
                          }
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Controller
                      name="name"
                      control={control}
                      rules={{ required: "Company Name is required" }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          margin="normal"
                          fullWidth
                          id="name"
                          label="Company Name"
                          type="text"
                          // readOnly
                          disabled
                          formcontrolpops={{
                            fullWidth: true,
                            variant: "standard",
                          }}
                          error={Boolean(formState?.errors?.name)}
                          helperText={
                            formState?.errors?.name?.message
                          }
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <Controller
                      name="tax_rate"
                      control={control}
                      rules={{
                        required: "Tax Rate is required",
                      }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          margin="normal"
                          fullWidth
                          label="Tax Rate"
                          type="text"
                          id="tax_rate"
                          autoComplete="name"
                          formcontrolpops={{
                            fullWidth: true,
                            variant: "standard",
                          }}
                          error={Boolean(formState?.errors?.tax_rate)}
                          helperText={
                            formState?.errors?.tax_rate?.message
                          }
                        />
                      )}
                    />
                  </Grid>
                </Grid>
               
                <Grid item xs={12} style={{ textAlign: 'right' }}>
                
                  <Button
                    onClick={handleClose}
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Cancel
                  </Button>
                
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 , ml:2, width: '90px', minWidth: '10px' }}
                   
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
