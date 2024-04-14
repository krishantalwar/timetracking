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
    useGetUsersQuery,
    useEditUserMasterMutation
} from "../../features/user/userService";

import userServiceApis from "../../features/user/userService";
import Input from "../../components/ui/forminputs/input";
import BasicModal from "../../components/ui/modal/modal";
import Table from "../../components/ui/table/table";
import { useForm, Controller } from "react-hook-form";
import { Add } from "@mui/icons-material";
import { Delete, Edit } from "@mui/icons-material";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import DeleteIcon from "../../components/ui/Delete/deletePopUp";
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
        data: designationmasterDate,
        isLoading: designationmasterisLoading,
        isFetching: designationmasterisFetching,
        isSuccess: designationmasterisSuccess,
        isError: designationmasterisError,
        error: designationmastererror,
        refetch: getDesignationRefetch
    } = useGetUsersQuery("getUsers");





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
    ] = useEditUserMasterMutation();




    const handleDelete = async (row) => {
        // console.log(row);
        // console.log("aaaa");
        try {

            if (!DeleteDesignationisLoading) {
                await DeleteDesignation({
                    "status": 1,
                    "userid": row
                }).unwrap();

                await getDesignationRefetch();
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
                <StyledTableRow
                    key={datas.userid}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                    <StyledTableCell align="center">{datas?.user_code}</StyledTableCell>
                    <StyledTableCell component="th" scope="row" align="center" >
                        {datas?.first_name + " " + datas?.last_name}
                    </StyledTableCell>
                    <StyledTableCell align="center">{datas?.email}</StyledTableCell>
                    <StyledTableCell align="center">{datas?.userDetail?.phone}</StyledTableCell>

                    <StyledTableCell align="center" style={{ display: 'flex', justifyContent: 'center' }}>

                        <DeleteIcon title={"Approved Employer"} button="Approved Employer"
                            desc={"Are you sure you want to Approved Employer?"}
                            key={datas?.id + index.toString() + index.toString()}

                            onDelete={() => handleDelete(datas?.userid)} />


                    </StyledTableCell>

                </StyledTableRow>
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



    const handleopen = () => {
        setIsopen(true);
    };

    const handleclose = () => {
        setIsopen(false);
    };

    const handleOpen = async () => {
        // setIsOpen(true);
        console.log("s");

    };

    const handleClose = () => {
        // setIsOpen(false);
        // setIsOpen((prev) => !prev);
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
                                }}><b>EMLOYERS</b></Typography>
                            </Grid>

                        </Grid>
                        <Table sx={{ mt: 5 }}>
                            <TableHead style={{
                                border: "1px solid black",

                            }} >
                                <TableRow  >
                                    <StyledTableCell align="center"><b>User Code</b></StyledTableCell>
                                    <StyledTableCell align="center"><b>Name</b></StyledTableCell>
                                    <StyledTableCell align="center"><b>Email</b></StyledTableCell>
                                    <StyledTableCell align="center"><b>Phone</b></StyledTableCell>
                                    <StyledTableCell align="center"><b>Action</b></StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody style={{
                                border: "1px solid black",
                            }}>{content}</TableBody>
                        </Table>

                    </Box>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
