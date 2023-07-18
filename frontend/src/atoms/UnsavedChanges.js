import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Prompt } from 'react-router';
import {
  Dialog,
  DialogActions,
  DialogTitle as MuiDialogTitle,
  DialogContent,
  DialogContentText,
  Button as MuiButton,
} from '@mui/material';

export const UserConfirmation = (message, callback) => {
  const container = document.createElement('div');
  container.setAttribute('custom-confirmation-navigation', '');
  document.body.appendChild(container);

  const cleanUp = (callbackState) => {
    ReactDOM.unmountComponentAtNode(container);
    document.body.removeChild(container);
    callback(callbackState);
  };

  ReactDOM.render(
    <Dialog open={true}>
      <MuiDialogTitle
        fontFamily="'Source Sans Pro', sans-serif"
        fontWeight='600'
      >
        You Have Unsaved Changes
      </MuiDialogTitle>
      <DialogContent>
        <DialogContentText>
          {message
            ? message
            : `Leaving the page without saving will undo any changes you have made.`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <MuiButton size='large' onClick={() => cleanUp(true)}>
          Leave the Page
        </MuiButton>
        <MuiButton size='large' onClick={() => cleanUp(false)}>
          Stay on The Page
        </MuiButton>
      </DialogActions>
    </Dialog>,
    container
  );
};

const UnsavedChanges = ({ dirty }) => {
  const initializeBeforeUnload = (dirty) => {
    window.onbeforeunload = (event) => {
      if (dirty) {
        const e = event || window.event;
        e.preventDefault();
        if (e) {
          e.returnValue = '';
        }
        return '';
      }
    };
  };

  useEffect(() => {
    initializeBeforeUnload(dirty);

    return () => {
      window.onbeforeunload = undefined;
    };
  }, [dirty]);

  return (
    <Prompt
      when={dirty}
      message='Leaving the page without saving will undo any changes you have made.'
    />
  );
};

export default UnsavedChanges;
