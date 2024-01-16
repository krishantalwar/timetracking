import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
// import React, { useId } from 'react';

import React from 'react';

// export default function button({ children, ...otherProps }) {

//   return (
//     <FormControl fullWidth>
//       <Button {...otherProps}>
//         {children}
//       </Button>
//     </FormControl>
//   );

// };

function Buttons({
  children,
  type = "button",
  // bgColor = "bg-blue-600",
  // textColor = "text-white",
  className = "",
  ...props
}, ref) {
  // const id = useId();
  return (

    <FormControl  {...props.formcontrolpops}>
      <Button {...props} ref={ref}>
        {children}
      </Button >
    </FormControl>
  );
}

export default React.forwardRef(Buttons)