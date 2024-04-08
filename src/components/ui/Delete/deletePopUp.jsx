import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box } from '@mui/material';
import { Delete, Edit, PaidOutlined } from '@mui/icons-material';
import Grid from '@mui/material/Grid';
// import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
// import PaymentsIcon from '@mui/icons-material/Payments';
const DeleteConfirmation = ({ title = "Confirm Delete", button = "Delete", desc = "Are you sure you want to delete this item?", open, onClose, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <p>{desc}</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="secondary">
          {button}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const DeleteIcon = ({ title, button, desc, onDelete }) => {
  const [confirmationOpen, setConfirmationOpen] = useState(false);

  const handleDeleteClick = () => {
    setConfirmationOpen(true);
  };

  const handleConfirmDelete = () => {
    onDelete();
    setConfirmationOpen(false);
  };

  const handleCancelDelete = () => {
    setConfirmationOpen(false);
  };

  return (
    <Grid  >
      <Box className="delete-icon" onClick={handleDeleteClick} >
        {
          (button ? (<Button startIcon={<PaidOutlined />}  ></Button>) : (<Button startIcon={<Delete />}  ></Button>))
        }


      </Box>
      <DeleteConfirmation
        title={title}
        desc={desc}
        button={button}
        open={confirmationOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </Grid>
  );
};

export default DeleteIcon;
