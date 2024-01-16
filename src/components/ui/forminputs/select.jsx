
import FormControl from '@mui/material/FormControl';
import React, { useId } from 'react';

// import React from 'react';

// import Select, { SelectChangeEvent } from '@mui/material/Select';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';


function Selects({ className = "", inputtype = "text", inputname = "", hanndlechange = "", label = "", options = [], empty, ...props }, ref) {
  const id = useId();
  // console.log(props);
  // console.log(...props);

  return (
    <FormControl  {...props.formcontrolpops}>
      <InputLabel
      //   id={id}
      >{label}</InputLabel>
      <Select
        labelId={id}
        id={id}
        name={inputname}
        label={label}
        onChange={hanndlechange}
        className={className}
        {...props}
        ref={ref}
      >
        <MenuItem value="">
          <em>{empty}</em>
        </MenuItem>

        {options?.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )

};

export default React.forwardRef(Selects)
