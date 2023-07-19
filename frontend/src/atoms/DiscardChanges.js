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
  discardTitle = 'All Changes Will Be Discarded',
  discardContent = 'This will reset the form.',
}) => {
  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <Dialog open={openDialog} onClose={handleClose}>
      <MuiDialogTitle fontWeight='600'>{discardTitle}</MuiDialogTitle>
      <DialogContent>
        <DialogContentText>{discardContent}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <MuiButton
          size='large'
          color='error'
          onClick={handleDiscard}
          style={{ fontWeight: '600' }}
        >
          Discard All Changes
        </MuiButton>
        <MuiButton
          size='large'
          onClick={handleEditing ? handleEditing : handleClose}
          style={{ fontWeight: '600' }}
        >
          Continue Editing
        </MuiButton>
      </DialogActions>
    </Dialog>
  );
};

export default DiscardChanges;
