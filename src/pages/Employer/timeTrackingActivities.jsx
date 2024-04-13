import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useForm, Controller } from 'react-hook-form';
import Input from '../../components/ui/forminputs/input';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper'
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Selects from '../../components/ui/forminputs/select'
import { TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormPropsDatePickers from '../../components/ui/forminputs/datePicker'
import Table from "../../components/ui/table/table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from '@mui/material/styles';
import BasicModal from "../../components/ui/modal/modal";
import ShiftnpayLogo from '../../assets/Time-management-icons/shiftnpay.png'
// import Invoice from './invoice'

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf'

// import pdf from 'html-pdf'

import {
    useGetJobhistoryQuery,
    usePaidJobMutation
} from "../../features/job/jobService";
import APIjobService from "../../features/job/jobService";

import DeleteIcon from "../../components/ui/Delete/deletePopUp";

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


export default function TimetracTingActivities() {
    const [isOpen, setIsOpen] = React.useState(false);
    const [isopen, setIsopen] = React.useState(false);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = React.useState(false);

    const [invoiceContents, setinvoiceContents] = React.useState("");
    const [invoicetotal, setinvoiceTotal] = React.useState("");
    const [invoicedownload, setinvoiceDownload] = React.useState(false);

    const { handleSubmit, control,
        formState,
        getValues,
        // errors,
        // touched,
        // isDirty,
        // isValid

    } = useForm(
        {
            mode: 'onChange',
            defaultValues: {
                user_code: "",
                first_name: "",
                job_code: "",
                job_name: "",
                date: "",
            },
            resetOptions: {
                keepDirtyValues: true, // user-interacted input will be retained
                keepErrors: true, // input errors will be retained with value update
            },
        }
    );
    // console.log("getValues", formState);

    // console.log(getValues())
    // console.log(formState?.errors?.role?.message)

    const {
        data: userdata,
        isLoading: getuserisLoading,
        isSuccess: getuserisSuccess,
        error: getusererror,
        refetch: postjobrefetch,
        updateQueryData,
        setQueryData
    } = useGetJobhistoryQuery({ ...getValues() });

    const [
        PaidJob,
        {
            // currentData,
            // isFetching,
            isLoading: PaidJobLoading,
            // isSuccess, isError,
            // error,
            // status
        },
    ] = usePaidJobMutation();

    let invoiceContent = "";
    const handleClose = () => {
        // setIsOpen(false);
        setIsOpen((prev) => !prev);
    };


    const handleopen = () => {
        setIsopen(true);
    };

    const handleclose = () => {
        setIsopen(false);
    };

    const handleOpen = async () => {
        // setIsOpen(true);
        // console.log("s");
        try {
            // const {
            //     data: codedata,
            //     isLoading: getcodeisLoading,
            //     isFetching: codeisFetching,
            //     isSuccess: codeisSuccess,
            // } = await getCodess();


            // if (codeisSuccess) {
            //     // console.log(codedata);
            //     const defaultValues = {
            //         // department_code: codedata.code,
            //         // department_name: "",

            //         designation_code: codedata.code,
            //         designation_name: "",
            //         designation_id: "",
            //     }

            //     reset({ ...defaultValues });
            //     setIsOpen((prev) => !prev);
            // }

            setIsOpen((prev) => !prev);
            // console.log(queryStateResults);
            // console.log(info);
        } catch (error) {
            console.log(error);
        }
    };

    const handleOpenPaymentModal = () => {
        // setIsPaymentModalOpen(true);
    };

    const handleClosePaymentModal = () => {
        // setIsPaymentModalOpen(false);
    };


    const MakePayment = async (data) => {
        try {
            if (!PaidJobLoading) {

                await PaidJob({ "id": data }).unwrap();
                // console.log(asd);
                await postjobrefetch({
                    user_code: getValues('user_code'),
                    first_name: getValues('first_name'),
                    job_code: getValues('job_code'),
                    job_name: getValues('job_name'),
                    date: getValues('date'),
                });
            }
        } catch (error) {
            console.error("delete error:", error);
        }
    };

    const CancelPayment = (data) => {

    };

    const ViewInvoice = (data) => {
        // console.log(userdata)
        // console.log(data)
        const job = userdata.find((element, index, array) => {
            console.log(element.id)
            return element.id == data
        });

        let hrs = job?.time_in.split(":");
        hrs = (hrs[0] + hrs[1] + hrs[2]) / (3600 / 1);
        // let payamount = (hrs) * (datas?.job_rate * 1)
        let payamount = (hrs) * (80 * 1)
        // job.paid = 55;

        invoiceContent = (
            <StyledTableRow
                key={job?.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
                <StyledTableCell align="center">{job?.job?.job_code}</StyledTableCell>
                <StyledTableCell align="center">{job?.job?.name}</StyledTableCell>
                <StyledTableCell align="center">{job?.time_in}</StyledTableCell>
                <StyledTableCell align="center">{job?.job?.job_rate}</StyledTableCell>
                {/* <StyledTableCell align="center">{job?.job?.tax_rate}</StyledTableCell> */}
                <StyledTableCell align="center">{parseFloat(payamount.toFixed(2))}</StyledTableCell>
            </StyledTableRow>
        )
        setinvoiceContents((pre) => invoiceContent)
        setinvoiceTotal((pre) => parseFloat(payamount.toFixed(2)))
        // console.log(invoiceContent);
        handleOpen();
    };

    const DownloadInvoice = (data) => {
        const job = userdata.find((element, index, array) => {
            // console.log(element.id)
            return element.id == data
        });

        let hrs = job?.time_in.split(":");
        hrs = (hrs[0] + hrs[1] + hrs[2]) / (3600 / 1);
        // let payamount = (hrs) * (datas?.job_rate * 1)
        let payamount = (hrs) * (80 * 1)
        // job.paid = 55;

        // const container = document.createElement('div');

        let content =
            `
            <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Invoice</title>
  <style>
    / Add your CSS styles here /
    body {
      font-family: Arial, sans-serif;
    }
    .invoice-heading {
      color: #318CE7;
      font-size: 40px;
    }
    .logo {
      width: 100px;
      height: auto;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th, td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
    }
    th {
      background-color: #f2f2f2;
    }
    .total {
      text-align: right;
      margin-right: 73px;
      margin-top: 10px;
    }
  </style>
</head>
<body>

<div id="invoiceCapture" >
<div class="flex-container" style="display: flex; align-items: center;">
<div><img src=${ShiftnpayLogo} alt="Shiftnpay Logo" class="logo" style="width:300px"></div>
<div class="invoice-heading" style="color: #318CE7;font-size: 40px;"><b>INVOICE</b></div>

</div>

                <table style="border: 1px solid black; Width:610px;">
                    <thead>
                        <tr>
                            <th>Job Code</th>
                            <th>Job Title</th>
                            <th>Employee Code</th>
                            <th>Employee Name</th>
                            <th>Job Rate</th>
                            <th>Tax</th>
                            <th>Pay Amount</th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr
                        >
                            <td align="center">${job?.job?.job_code}</td>
                            <td align="center">${job?.job?.name}</td>
                            <td align="center">${job?.job?.name}</td>
                            <td align="center">${job?.time_in}</td>
                            <td align="center">${job?.job?.job_rate}</td>
                            <td align="center">${0}</td>
                            <td align="center">${parseFloat(payamount.toFixed(2))}</td>
                        </tr>
                    </tbody>
                </table>
                    <div class="total" style="border: 1px solid black; Width:610px; margin-left:495px"><b>TOTAL $ ${payamount}</b></div>
            </div>
            </body>
            </html>`;


        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'pt',
            format: [612, 792]
        });

        pdf.html(content, {
            callback: function (pdf) {
                // Save the PDF file
                // const dataUri = pdf.output('datauristring');
                // const pdfViewer = document.getElementById('pdfViewer');

                // pdfViewer.src = dataUri;

                pdf.save('invoice.pdf');
            }
        });

    };


    let tablecontent = "";
    if (getuserisLoading) {
        tablecontent = (
            <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell align="right">Loading...</TableCell>
            </TableRow>
        );
    } else if (getuserisSuccess) {
        // console.log(shiftmasterDate)
        // console.log(UserjobData);


        tablecontent = userdata.map((datas, index) => {

            let hrs = datas?.time_in.split(":");
            hrs = (hrs[0] + hrs[1] + hrs[2]) / (3600 / 1);
            // let payamount = (hrs) * (datas?.job_rate * 1)
            let payamount = (hrs) * (80 * 1)
            // datas.paid = 55;


            let action = (<div>
                {
                    datas.paid ?
                        (<div>
                            <Button
                                variant='contained'
                                onClick={() => ViewInvoice(datas?.id)}
                                sx={{ mr: 2 }}
                            >
                                View Invoice
                            </Button>
                            <Button
                                variant='contained'
                                // className={classes.button}
                                // disabled={activeStep === 0}
                                onClick={() => DownloadInvoice(datas?.id)}

                            >
                                Download Invoice
                            </Button>
                        </div>)

                        :

                        // <Button
                        //     // onClick={handleOpen}
                        //     variant='contained'
                        //     // className={classes.button}
                        //     // disabled={activeStep === 0}
                        //     onClick={() => MakePayment(datas?.id)}
                        // >
                        //     Make Payment
                        // </Button>
                        (<DeleteIcon title={"Confirm Payment"} button="Make Payment" desc={"Are you sure you want to make payment?"} key={datas?.id + index.toString() + index.toString()} onDelete={() => MakePayment(datas?.id)} />)

                }
            </div>);

            return (
                <StyledTableRow
                    key={datas?.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                    <StyledTableCell align="center">{datas?.job?.job_code}</StyledTableCell>

                    <StyledTableCell align="center">{datas?.job?.name}</StyledTableCell>

                    <StyledTableCell component="th" scope="row" align="center">
                        {datas?.user?.first_name}
                    </StyledTableCell>

                    <StyledTableCell component="th" scope="row" align="center">
                        {datas?.user?.user_code}
                    </StyledTableCell>

                    <StyledTableCell component="th" scope="row" align="center">
                        {new Date().toLocaleDateString()}
                    </StyledTableCell>

                    <StyledTableCell component="th" scope="row" align="center">
                        {"$ " + datas?.job?.job_rate}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row" align="center">
                        {datas?.time_in}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row" align="center">
                    {parseFloat(payamount.toFixed(2))}
                    </StyledTableCell>

                    <StyledTableCell component="th" scope="row" align="center">
                        {parseFloat(payamount.toFixed(2))}
                    </StyledTableCell>


                    <StyledTableCell component="th" scope="row" align="center">

                        {action}

                    </StyledTableCell>


                </StyledTableRow>
            );
        });
    } else if (getusererror) {
        tablecontent = (
            <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell align="right">error</TableCell>
            </TableRow>
        );
    }

    const onSubmit = async (data) => {

        // if (formState.isDirty) {
        // await updateQueryData({ ...getValues() });
        // updateQueryData('GetJobhistory', (prevData) => ({
        //     ...prevData,
        //     // Update query parameters based on form values
        //     // Example: Assuming form fields are user_code, first_name, etc.
        //     // Update query parameters accordingly
        //     user_code: getValues('user_code'),
        //     first_name: getValues('first_name'),
        //     job_code: getValues('job_code'),
        //     job_name: getValues('job_name'),
        //     date: getValues('date'),
        // }));
        await postjobrefetch({
            user_code: getValues('user_code'),
            first_name: getValues('first_name'),
            job_code: getValues('job_code'),
            job_name: getValues('job_name'),
            date: getValues('date'),
        }); // Assuming postjobrefetch accepts the form data directly
        // }
    }

    return (

        <React.Fragment>

            <Box component={Paper} padding={'20px'}>
                <Typography ml={2} style={{
                    color: "#318CE7",
                }}> <b>Time Tracking Acitivities</b>  </Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} method="post" sx={{ mt: 1, ml: 2 }}>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} mt={4}>
                        <Grid item xs={6} >
                            <Controller
                                name="user_code"
                                control={control}
                                // rules={{ required: 'Employee code is required' }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        margin="none"
                                        fullWidth
                                        label="Employee Code"


                                        formcontrolpops={{
                                            "fullWidth": true,
                                            "variant": "standard",
                                        }}
                                        error={Boolean(formState?.errors?.user_code)}
                                        helperText={formState?.errors?.user_code?.message}
                                    >

                                        {/* <MenuItem key={1} value={1}>
                                        asd
                                    </MenuItem> */}

                                    </TextField>
                                )}
                            />
                        </Grid>

                        <Grid item xs={6} >
                            <Controller
                                name="first_name"
                                control={control}
                                // rules={{ required: 'Employee name is required' }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        // select
                                        margin="none"
                                        fullWidth
                                        label="Employee Name"


                                        formcontrolpops={{
                                            "fullWidth": true,
                                            "variant": "standard",
                                        }}
                                        error={Boolean(formState?.errors?.first_name)}
                                        helperText={formState?.errors?.first_name?.message}
                                    >
                                    </TextField>
                                )}
                            />

                        </Grid>

                        <Grid item xs={6} >
                            <Controller
                                name="job_code"
                                control={control}
                                // rules={{ required: 'Job code is required' }}

                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        // select
                                        margin="none"
                                        fullWidth
                                        label="Job Code"
                                        formcontrolpops={{
                                            "fullWidth": true,
                                            "variant": "standard",
                                        }}
                                        error={Boolean(formState?.errors?.job_code)}
                                        helperText={formState?.errors?.job_code?.message}
                                    >
                                    </TextField>
                                )}
                            />

                        </Grid>
                        <Grid item xs={6} >
                            <Controller
                                name="job_name"
                                control={control}
                                // rules={{ required: 'Job name is required' }}

                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        // select
                                        margin="none"
                                        fullWidth
                                        label="Job Name"

                                        formcontrolpops={{
                                            "fullWidth": true,
                                            "variant": "standard",
                                        }}
                                        error={Boolean(formState?.errors?.job_name)}
                                        helperText={formState?.errors?.job_name?.message}
                                    >
                                    </TextField>
                                )}
                            />

                        </Grid>

                        <Grid item xs={4} mt={2}>
                            <Controller
                                name="date"
                                control={control}
                                // rules={{ required: 'Date is required' }}
                                // defaultValue=""
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        InputLabelProps={{ shrink: true }}
                                        margin="none"
                                        fullWidth
                                        label="Date"
                                        type='date'
                                        formcontrolpops={{
                                            "fullWidth": true,
                                            "variant": "standard",
                                        }}
                                        error={Boolean(formState?.errors?.date)}
                                        helperText={formState?.errors?.date?.message}
                                    />
                                )}
                            />
                        </Grid>
                    </Grid>
                    <Button type="submit" variant='outlined' style={{ marginLeft: 5, marginTop: 20 }} > Submit </Button>
                </Box>

                <Grid mt={10}>
                    <Table>
                        <TableHead>
                            <TableRow style={{
                                border: "1px solid black",
                            }}>
                                <StyledTableCell align="center"><b>Job Code</b></StyledTableCell>
                                <StyledTableCell align="center"> <b>Job Title</b></StyledTableCell>
                                <StyledTableCell align="center"><b>Employee Name</b></StyledTableCell>
                                <StyledTableCell align="center"><b>Employee Code</b></StyledTableCell>
                                <StyledTableCell align="center"><b>Date</b></StyledTableCell>
                                <StyledTableCell align="center"><b>Job Rate</b></StyledTableCell>
                                <StyledTableCell align="center"><b>Total Hrs</b></StyledTableCell>
                                <StyledTableCell align="center"><b>Tax Rate</b></StyledTableCell>
                                <StyledTableCell align="center"><b>Pay Amount</b></StyledTableCell>
                                <StyledTableCell align="center"><b>Action</b></StyledTableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody style={{
                            border: "1px solid black",
                        }}>
                            {tablecontent}
                        </TableBody>
                    </Table>
                </Grid>
            </Box>

            {/* <iframe id={"pdfViewer"} style={{ width: "100%", height: "500px", border: "none" }}></iframe> */}


            <BasicModal isOpen={isOpen} onClose={handleClose} isopen={handleopen} onclose={handleclose} >

                <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    method="post"
                    id="modal-modal-description"
                    sx={{ mt: 1 }}

                >
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid container alignItems="center">
                        <Grid tem xs={{display:'flex'}}>
                                <img src={ShiftnpayLogo} alt="Shiftnpay Logo" />
                            </Grid>
                            <Grid >
                                <Typography style={{ color: "#318CE7", fontSize: "40px" }}> <b>INVOICE</b></Typography>
                            </Grid>
                           
                        </Grid>
                    </Grid>

                    <Table>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center"><b>Job Code</b></StyledTableCell>
                                <StyledTableCell align="center"><b>Job Title</b></StyledTableCell>
                                <StyledTableCell align="center"><b>Employee Code</b></StyledTableCell>
                                <StyledTableCell align="center"><b>Employee Name</b></StyledTableCell>
                                <StyledTableCell align="center"><b>Job Rate</b></StyledTableCell>
                                <StyledTableCell align="center"><b>Tax</b></StyledTableCell>
                                <StyledTableCell align="center"><b>Pay Amount</b></StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {invoiceContents}
                        </TableBody>
                    </Table>

                    <Typography className="total" sx={{ textAlign: 'end', mr: 4 }} ><b>Total $</b> {invoicetotal} </Typography>

                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} mt={3} >
                        <Grid item xs={4} mt={2} mb={2} >
                            <Button variant='outlined' fullWidth onClick={() => setinvoiceDownload(true)}>Download</Button>
                        </Grid>

                        <Grid item xs={4} mt={2} mb={2}>
                            <Button variant='outlined' fullWidth onClick={handleClose}>Cancel</Button>
                        </Grid>
                    </Grid>
                </Box>
            </BasicModal>

            <BasicModal
                isOpen={isPaymentModalOpen}
                onClose={handleClosePaymentModal}
                title="Make Payment"
            >
                <Box p={2} style={{
                    width: "fitcontent"
                }}>
                    <Typography variant="h6" gutterBottom>
                        Confirm Payment
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Are you sure you want to make payment?
                    </Typography>
                </Box>
                <Grid container justifyContent="flex-end" p={2} >
                    <Button onClick={handleClosePaymentModal} variant='contained' >
                        Cancel
                    </Button>
                    <Button onClick={MakePayment} color="primary" variant="contained" sx={{ ml: 3 }}>
                        Make Payment
                    </Button>
                </Grid>
            </BasicModal>
        </React.Fragment>

    );
}
