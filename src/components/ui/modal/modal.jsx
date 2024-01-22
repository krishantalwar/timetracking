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
  width: "50%",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function BasicModal({ children, isOpen, onClose, ...props }, ref) {
  // console.log(props);
  // console.log(children);
  // console.log("sd");
  // const [Open, setOpen] = React.useState(false);
  // const Open = props?.Open;
  // if(Open){
  //   setOpen(Open);
  // } else {
  //   setOpen(false);
  // }
  // const handleOpen = props?.handleOpen
  // const handleClose = props?.handleClose

  // const children = ""
  // const children=props?.children;
  // const style=props?.start;
  //   const title=props?.title;
  // const handleClose = () => {
  //   setOpen(false);
  // };
  return (

    <Modal
      ref={ref}
      open={isOpen}
      onClose={onClose}
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