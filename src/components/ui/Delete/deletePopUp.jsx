import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import Grid from '@mui/material/Grid';

const DeleteConfirmation = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        <p>Are you sure you want to delete this item?</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="secondary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const DeleteIcon = ({ onDelete }) => {
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
      <Box className="delete-icon"  onClick={handleDeleteClick} >
        <Button startIcon={<Delete/>}  ></Button>
      </Box>
      <DeleteConfirmation
        open={confirmationOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </Grid>
  );
};

export default DeleteIcon;
