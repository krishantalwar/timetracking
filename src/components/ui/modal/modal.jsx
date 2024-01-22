import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

 function BasicModal({ ...props }, ref) {
    console.log(...props);
  const [open, setOpen] = React.useState(false);
  const Open = props?.Open;
  if(Open){
    setOpen(Open);
  }

  const children=props?.children;
  const style=props?.start;
//   const title=props?.title;
  return (
 
      <Modal
      ref={ref}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            {children}
        </Box>
      </Modal>
  );
}
export default React.forwardRef(BasicModal)