import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogTitle as MuiDialogTitle,
  DialogContent,
  DialogContentText,
  Button as MuiButton,
} from '@mui/material';

const DiscardChanges = ({
  openDialog,
  setOpenDialog,
  handleDiscard = () => {},
  handleEditing,
}) => {
  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <Dialog open={openDialog} onClose={handleClose}>
      <MuiDialogTitle fontWeight='600'>
        All Changes Will Be Discarded
      </MuiDialogTitle>
      <DialogContent>
        <DialogContentText>{`This will reset the form.`}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <MuiButton size='large' color='error' onClick={handleDiscard}>
          Discard All Changes
        </MuiButton>
        <MuiButton
          size='large'
          onClick={handleEditing ? handleEditing : handleClose}
        >
          Continue Editing
        </MuiButton>
      </DialogActions>
    </Dialog>
  );
};

export default DiscardChanges;
