import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionplugin from "@fullcalendar/interaction";
import BasicModal from "../components/ui/modal/modal";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Input from "@mui/material/Input"; // Import Input component from Material-UI
import { useForm, Controller } from "react-hook-form";
import Button from "@mui/material/Button";
// import momentPlugin from '@fullcalendar/moment';

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { control, handleSubmit, formState } = useForm(); // Initialize form control

  // Function to handle date click
  const handleDateClick = (info) => {
    setSelectedDate(info.dateStr);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleclickevent = (info) => {

    var eventObj = info.event;
    // console.log(info);
    // console.log(eventObj);
    if (eventObj) {
      alert(
        'title ' + eventObj.title + '.\n' +
        'discription of event ' + eventObj.extendedProps.description
      );

      //   window.open(eventObj.url);

      info.jsEvent.preventDefault(); // prevents browser from following link in current tab.
      // } else {
      //   alert('Clicked ' + eventObj.title);
    }
  };


  return (
    <div style={{ backgroundColor: "white" }}>
      <FullCalendar
        // defaultView="dayGridMonth"
        initialView='timeGridWeek'
        plugins={[timeGridPlugin, interactionplugin]}
        headerToolbar={{
          start: "today prev,next",
          center: "title",
          end: "timeGridWeek,timeGridDay"
        }}
        timeZone={'local'}
        themeSystem="Simplex"
        // editable={true}
        // allDayDefault={false}
        timeFormat={{
          agenda: 'H(:mm)'
        }}
        axisFormat={'H(:mm)'}
        // dragOpacity={{
        //   agenda: 5
        // }}
        // minTime={0}
        // maxTime={24}
        //       eventDrop= function (event, delta) {
        //         alert(event.title + ' was moved ' + delta + ' days\n' +
        //           '(should probably update your database)');
        // }
        // dateClick={handleDateClick}


        events={
          [
            {
              title: 'JOB002 krishan ',
              description: 'description for All Day Event . this event detail ',
              start: '2024-04-14T01:30:00',
              end: '2024-04-14T02:30:00',
              allDay: false
            }
          ]
        }
        titleFormat={{ // will produce something like "Tuesday, September 18, 2018"
          month: 'long',
          year: 'numeric',
          day: 'numeric',
          weekday: 'long',
          hour12: true
        }}
        eventTimeFormat={{ // like '14:30:00'
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          meridiem: false,
          hour12: false,
          omitZeroMinute: true,
        }}

        eventClick={handleclickevent}

      //       views={{
      //   dayGrid: {
      //       // options apply to dayGridMonth, dayGridWeek, and dayGridDay views
      //     },
      //     timeGrid: {
      //       // options apply to timeGridWeek and timeGridDay views
      //     },
      //     week: {
      //       // options apply to dayGridWeek and timeGridWeek views
      //     },
      //     day: {
      //       // options apply to dayGridDay and timeGridDay views
      //     }
      // }}

      />

      {/* Modal */}
      <BasicModal isOpen={isModalOpen} onClose={closeModal}>
        <div>
          <h2 style={{ color: "#318CE7" }}>Selected Date: {selectedDate}</h2>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={10}>
              <Typography style={{ color: "#318CE7" }}>
                <b>Add Task</b>
              </Typography>
            </Grid>
          </Grid>
          <Box
            component="form"
            onSubmit={handleSubmit((data) => console.log(data))} // Handle form submission
            method="post"
            id="modal-modal-description"
            sx={{ mt: 1 }}
          >



            <Grid item xs={12} style={{ textAlign: "right" }}>
              <Button
                onClick={closeModal}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2, ml: 2, width: "90px", minWidth: "10px" }}
              >
                Add
              </Button>
            </Grid>
          </Box>
        </div>
      </BasicModal>
    </div>
  );
}
