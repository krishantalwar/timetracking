import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { useId } from 'react';

 function FormPropsDatePickers({label=""},ref) {
  const id = useId();
  return (
    <LocalizationProvider  dateAdapter={AdapterDayjs} >
      <DemoContainer components={['DatePicker', 'DatePicker', 'DatePicker']}>
        <DatePicker id={id} label={label} name="startDate" ref={ref}/>
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default React.forwardRef(FormPropsDatePickers)