import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import React from 'react';
import { useId } from 'react';

function Input({ className = "", ...props }, ref) {
  const id = useId();
  // console.log(props);
  // console.log(props.formcontrolpops);
  return (
    <FormControl {...props.formcontrolpops}>
      <TextField
        id={id}
        // type={type}
        className={className}
        {...props}
        ref={ref}
      />
      {/* {props?.error ? '<p>{' + props?.helperText + '}</p>' : ''} */}
    </FormControl>
  )

};

export default React.forwardRef(Input)


// <TextField
//     fullWidth
//     select
//     SelectProps={{
//       native: true,
//       inputProps: {name: 'name' }
//     }}
//     label="asd"
//     defaultValue=""
//   >
//     <option value="" disabled readonly></option>
     
//         <option value="3">
//           asdwd
//         </option>
    
//   </TextField>