import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useForm, Controller } from 'react-hook-form';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper'
import Table from "../../components/ui/table/table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BasicModal from "../../components/ui/modal/modal";
import { Add } from "@mui/icons-material";
import CloseIcon from '@mui/icons-material/Close';
import {
    useGetRoleQuery,
} from "../../features/roles/roles";

import {
    useGetScreensQuery,
} from "../../features/screens/screens";

import {
    useSavePermissionsMutation,
} from "../../features/permission/permissions";
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


export default function RolesandResponsibilities() {
    const [isOpen, setIsOpen] = React.useState(false);

    const handleOpen = () => {
        // setIsOpen(false);
        setIsOpen((prev) => !prev);
    };
    const handleClose = () => {
        // setIsOpen(false);
        setIsOpen((prev) => !prev);
    };
    const { handleSubmit, control,
        formState,
        reset
    } = useForm(
        {
            mode: 'onChange',
            defaultValues: {
                role: "",
                screen_allocation: [],
            },
        }
    );

    const [
        savePermissions,
        {
            // currentData,
            // isFetching,
            isLoading,
            // isSuccess, isError,
            // error,
            // status
        },
    ] = useSavePermissionsMutation();

    const onSubmit = async (data) => {
        if (!isLoading) {
            await savePermissions({
                role_id: data.role,
                screen_id: data.screen_allocation
            })
        }

        getRolerefetch()
        reset()
    }

    const {
        data: roleDate,
        isLoading: roleisLoading,
        isFetching: roleisFetching,
        isSuccess: roleisSuccess,
        isError: roleisError,
        error: roleerror,
        refetch: getRolerefetch
    } = useGetRoleQuery("getRole");

    let roleoptions = "";
    let rolelisting = "";
    if (roleisLoading) {
        roleoptions = <MenuItem key={1}></MenuItem>;
        rolelisting = <TableRow
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
            <TableCell align="right">Loading...</TableCell>
        </TableRow>
            ;
    } else if (roleisSuccess) {
        roleoptions = roleDate.map((datas) => {
            return (<MenuItem key={datas.roleid} value={datas.roleid}>
                {datas.name}
            </MenuItem>);
        });
        rolelisting = roleDate.map((datas, index) => {
            return (
                <StyledTableRow
                    key={datas.roleid}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                    <StyledTableCell align="center">{datas?.role_code}</StyledTableCell>
                    <StyledTableCell align="center" component="th" scope="row">
                        {datas?.name}
                    </StyledTableCell>

                    <StyledTableCell align="center">
                        {/* shiftid need to change */}
                        <VisibilityIcon key={datas.roleid + index.toString()} onClick={() => handleDetail(datas?.roleid)} />

                    </StyledTableCell>
                </StyledTableRow>
            );
        });

    } else if (roleisError) {
        roleoptions = <MenuItem key={1}></MenuItem>;
        rolelisting = <TableRow
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
            <TableCell align="right">{roleerror}</TableCell></TableRow>;
    }

    const {
        data: screensDate,
        isLoading: screensisLoading,
        isFetching: screensisFetching,
        isSuccess: screensisSuccess,
        isError: screensisError,
        error: screenserror,
    } = useGetScreensQuery("getScreens");

    let screensoptions = "";
    if (screensisLoading) {
        screensoptions = <MenuItem key={1}></MenuItem>;
    } else if (screensisSuccess) {
        screensoptions = screensDate.map((datas) => {
            return (<MenuItem key={datas.screenid} value={datas.screenid} >
                {datas.name}
            </MenuItem>);
        });
    } else if (screensisError) {
        screensoptions = <MenuItem key={1}></MenuItem>;
    }

    const [modaldataa, setmodaldataa] = React.useState("");

    let modaldata = ""
    const handleDetail = async (row) => {
        try {

            const fiterdata = roleDate.filter((currentValue) => {
                // console.log(currentValue.roleid == row)
                return currentValue.roleid == row;
            });
            console.log(fiterdata)
            modaldata = fiterdata[0]?.permissions.map((datas, index) => {
                // console.log(datas)
                // console.log(datas?.screens)
                return (
                    <Grid key={index} item xs={12}>
                        <Typography>{datas?.screens?.name}</Typography>
                    </Grid>);
                // return datas?.screens?.name;
            });
            setmodaldataa(prev => modaldata)
            console.log(modaldata);
            handleOpen()
        } catch (error) {
            console.error("delete error:", error);
        }
    };
    React.useEffect(() => {

    }, [modaldataa])


    return (

        <React.Fragment>
            <Box component={Paper} padding={'20px'}>
                <Typography  ml={2} style={{
                  color: "#318CE7",
                }}> <b>Roles & Responsibilities</b> </Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} method="post" sx={{ mt: 1, ml: 2 }}>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} mt={4}>
                        <Grid item xs={6} >

                            <Controller
                                name="role"
                                control={control}
                                rules={{ required: 'Role is required' }}

                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        select
                                        margin="none"
                                        fullWidth
                                        label="Role"

                                        SelectProps={{
                                            // native: true,
                                            // inputProps: {name: 'screen_allocation' }
                                        }}


                                        formcontrolpops={{
                                            "fullWidth": true,
                                            "variant": "standard",
                                        }}
                                        error={Boolean(formState?.errors?.role)}
                                        helperText={formState?.errors?.role?.message}
                                    >
                                        {roleoptions}

                                    </TextField>
                                )}
                            />
                        </Grid>


                        <Grid item xs={6}>
                            <Controller
                                name="screen_allocation"
                                control={control}
                                rules={{ required: 'Screen Allocation is required' }}

                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        select
                                        margin="none"
                                        fullWidth
                                        label="Screen Allocation"
                                        multiple
                                        SelectProps={{
                                            multiple: true,
                                            // native: true,
                                            // inputProps: {name: 'screen_allocation' }
                                        }}
                                        formcontrolpops={{
                                            "fullWidth": true,
                                            "variant": "standard",
                                        }}
                                        error={Boolean(formState?.errors?.screen_allocation)}
                                        helperText={formState?.errors?.screen_allocation?.message}
                                    >
                                        {screensoptions}

                                    </TextField>
                                )}
                            />

                        </Grid>

                    </Grid>
                    <Button type="submit"  variant='outlined' style={{ marginLeft: 5, marginTop: 20, marginBottom:'15px'}} > Submit </Button>
                </Box>
                <Table sx={{ mt: 5 }}>
                    <TableHead style={{
                  border:"1px solid black",
                 
                }}>
                        <TableRow>
                            <StyledTableCell align='center'><b>Role Code</b></StyledTableCell>
                            <StyledTableCell align="center"><b>Role Name</b></StyledTableCell>
                            <StyledTableCell align="center"><b>Action</b></StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody style={{
                  border:"1px solid black",
                 
                }} >{rolelisting}</TableBody>
                </Table>


                <BasicModal isOpen={isOpen} onClose={handleClose}>
                    <Grid
                        container
                        rowSpacing={1}
                        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    >
                        <Grid item xs={10}>
                            <Typography>Role Screens</Typography>
                        </Grid>

                        <Grid item xs={2}>
                            <Button
                                onClick={handleClose}
                                variant="contained"
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

                            {modaldataa}


                        </Grid>

                    </Box>
                </BasicModal>
            </Box>
        </React.Fragment>
    )
};


