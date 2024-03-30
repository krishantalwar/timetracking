import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import { useForm, Controller } from "react-hook-form";
import Input from "../../components/ui/forminputs/input";
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

import {
  useGetUserjobQuery,
} from "../../features/job/jobService";
import { selectCurrentUser } from "../../features/auth/authSelector";
import { useSelector, useDispatch } from "react-redux";



export default function TimeTracking() {
  const [startTime, setStartTime] = useState({});
  const [elapsedTime, setElapsedTime] = useState({});
  const [timerRunning, setTimerRunning] = useState({});
  const [jobidstart, setjobid] = useState(null);

  const [startTotalTime, setStartTotalTime] = useState(null);
  const [elapsedTotalTimee, setElapsedTotalTime] = useState(0);
  const [timerTotalTimeRunning, setTimerTotalTimeRunning] = useState(false);
  const [totaltime, setTotalTime] = useState(null);


  const currentUser = useSelector(selectCurrentUser);

  // console.log(currentUser?.user);
  const {
    data: UserjobData,
    isLoading: UserjobisLoading,
    isFetching: UserjobisFetching,
    isSuccess: UserjobisSuccess,
    isError: UserjobisError,
    error: Userjoberror,
    refetch: Userjobrefetch,
  } = useGetUserjobQuery(currentUser?.user);


  const handleStartTime = (jobid) => {
    // console.log("handleStartTime")
    setjobid((pre) => jobid)
    // let elapsedTimejobid = 0;
    // if (jobid in elapsedTime) {
    let elapsedTimejobid = elapsedTime[jobid];
    // } else {
    //   setElapsedTime(prev => {
    //     return { ...prev, [jobid]: 0 }
    //   })
    //   elapsedTimejobid = 0;
    // }

    // console.log("elapsedTime", elapsedTime);
    // console.log(elapsedTimejobid);

    setStartTime((prev) => {
      console.log(prev);
      // if (jobid in prev) {
      //   return { ...prev, [jobid]: Date.now() - elapsedTimejobid }
      // } else {
      // return { ...prev, [jobid]: Date.now() - 0 }
      return { ...prev, [jobid]: Date.now() - elapsedTimejobid }
      // }
      // return [Date.now() - elapsedTime]
    });


    setTimerRunning((prev) => {
      // if (jobid in prev) {
      return { ...prev, [jobid]: !prev[jobid] }
      // } else {
      //   return { ...prev, [jobid]: true }
      // }
    });

    setStartTotalTime((prev) => Date.now() - elapsedTotalTimee);
    setTimerTotalTimeRunning((prev) => !prev);

  };

  const handleStopTime = (jobid) => {
    if (startTime[jobid]) {
      // setTimerRunning((prev) => !prev);
      setTimerRunning((prev) => {
        return { ...prev, [jobid]: !prev[jobid] }
      });
      setTimerTotalTimeRunning((prev) => !prev);
      setjobid((pre) => null)
    }
  };

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  let tablecontent = ""




  const { handleSubmit, control, formState } = useForm({
    mode: "onChange",
    defaultValues: {
      empcode: "",
      empname: "",
      empdepartment: "",
      designation: "",
      startdate: "",
      enddate: "",
    },
  });

  useEffect(() => {
    // console.log(sdasd)
    // console.log(weqew)
    // console.log(werwe)
    let interval;
    let totalinterval;
    if (timerRunning[jobidstart]) {
      interval = setInterval(() => {
        setElapsedTime((pre) => {
          return { ...pre, [jobidstart]: Date.now() - startTime[jobidstart] }
        });
      }, 1000);

      totalinterval = setInterval(() => {
        setElapsedTotalTime((pre) => Date.now() - startTotalTime);
      }, 1000);

      // console.log("startTime", startTime)
      // console.log("elapsedTime", elapsedTime)


      // return () => clearInterval(interval[jobidstart]);
    } else {
      clearInterval(interval);
      clearInterval(totalinterval);
      // return () => {

      // }
    }
    return () => {
      clearInterval(interval);
      clearInterval(totalinterval);
    }
    // return () => clearInterval(interval);

  }, [timerRunning, startTime]);


  useEffect(() => {
    // let joibid = UserjobData.map((datas, index) => {
    //   return datas?.job?.jobid;
    // });
    // console.log(UserjobData.length)
    if (UserjobisSuccess) {

      let ElapsedTime = {};
      let StartTime = {}
      let TimerRunning = {}
      for (let i = 0; i < UserjobData.length; i++) {

        ElapsedTime[UserjobData[i]?.job?.jobid] = 0;
        StartTime[UserjobData[i]?.job?.jobid] = Date.now() - 0
        TimerRunning[UserjobData[i]?.job?.jobid] = false
        // console.log(UserjobData[i]?.job?.jobid)
      }
      console.log("joibid  joibid", { ...ElapsedTime })
      console.log("joibid  joibid", { ...StartTime })
      console.log("joibid  joibid", { ...TimerRunning })


      setElapsedTime(prev => {
        return { ...prev, ...ElapsedTime }
      });

      setStartTime((prev) => {
        return { ...prev, ...StartTime };
      });

      setTimerRunning((prev) => {
        return { ...prev, ...TimerRunning }
      });
    }

  }, [UserjobisSuccess])

  // formatTime(timerRunning ? Date.now() - startTime : elapsedTime)
  // console.log("Date", Date.now())
  // console.log("Date startTime", startTime)
  // console.log("Date elapsedTime", elapsedTime)
  // console.log("Date timerRunning", timerRunning)

  if (UserjobisLoading) {
    tablecontent = (
      <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
        <TableCell align="right">Loading...</TableCell>
      </TableRow>
    );
  } else if (UserjobisSuccess) {
    // console.log(shiftmasterDate)
    // console.log(UserjobData);


    tablecontent = UserjobData.map((datas, index) => {
      return (
        <TableRow
          key={datas?.job?.jobid}
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
          <TableCell align="left">{datas?.job?.name}</TableCell>

          <TableCell component="th" scope="row" align="center">
            {
              formatTime(timerRunning[datas?.job?.jobid] ? Date.now() - startTime[datas?.job?.jobid] : elapsedTime[datas?.job?.jobid])
            }
          </TableCell>

          <TableCell
            align="center"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Button
              disabled={(jobidstart == null) ? false : ((jobidstart == datas?.job?.jobid) ? false : true)}
              variant="outlined"
              onClick={timerRunning[datas?.job?.jobid] ? () => handleStopTime(datas?.job?.jobid) : () => handleStartTime(datas?.job?.jobid)}
            // onClick={() => handleStartTime(datas?.job?.jobid)}
            >
              {timerRunning[datas?.job?.jobid] ? "Stop Time" : "Start Time"}

            </Button>

          </TableCell>
        </TableRow>
      );
    });
  } else if (UserjobisError) {
    tablecontent = (
      <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
        <TableCell align="right">error</TableCell>
      </TableRow>
    );
  }

  const onSubmit = async (data) => { };
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

            {/* <Grid container rowSpacing={1} columnSpacing={{ xs: 10, sm: 2, md: 3 }}> */}
            <Grid item xs={4} mt={2}  >
              <TextField
                margin="none"
                // disabled
                readOnly
                fullWidth
                label="Total Time"
                value={
                  formatTime(timerTotalTimeRunning ? Date.now() - startTotalTime : elapsedTotalTimee)
                }
                type="text"
                formcontrolpops={{
                  fullWidth: true,
                  variant: "standard",
                }}
                style={{
                  color: "red"
                }}
              />
            </Grid>

            <Grid item xs={4} mt={2}>
              <Button
                type="button"
                // onClick={timerRunning ? handleStopTime : handleStartTime}
                onClick={() => handleStartTime(1)}
                style={{
                  backgroundColor: "lightblue",
                  marginRight: 50,
                  marginTop: 30,
                  border: "3px solid lightblue",
                  width: 120,
                  height: 40,
                  float: "right"
                }}
              >
                {"Start Time"}
                {/* {timerRunning ? "Stop Time" : "Start Time"} */}
              </Button>
            </Grid>

          </Grid>



          {/* </Grid> */}
          <Grid mt={10}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Job Title</TableCell>
                  <TableCell align="right">Total Time</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tablecontent}
                {/* {
                  rows.map((row) => (
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
                  ))
                } */}
              </TableBody>
            </Table>
          </Grid>
        </Box>
      </Box>
    </React.Fragment>
  );
}


