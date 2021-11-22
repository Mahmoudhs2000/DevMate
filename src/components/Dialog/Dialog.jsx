import * as React from 'react';
import Button from '@material-ui/core/Button';

import { Dialog,Select,FormControl, InputLabel,MenuItem,DialogTitle,DialogActions,DialogContent,TextField,DialogContentText, Typography } from '@material-ui/core';

export default function FormDialog({open, setOpen, usersOptions, Data,setData,saveLabel, handleSave,dialogHeader, confirm, confirmMsg}) {
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = ({target})=> {
    const {name, value} = target;
    setData((prev)=> ({
      ...prev, 
      [name]: value
    }))
  }
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{dialogHeader}</DialogTitle>
        <DialogContent>
         {confirm ? 
            <Typography>{confirmMsg}</Typography>
         :<> <DialogContentText>
            Assign A Task To A Team Memeber
          </DialogContentText>
          <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">User</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={Data.user || ''}
            fullWidth
            name='user'
            label="User"
            onChange={handleChange}
          >
            {
              usersOptions.map(
                (user)=> 
                <MenuItem key={user.id} value={user.name}>{user.name}</MenuItem>
              )
            }
          </Select>
          </FormControl>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Task"
            onChange={handleChange}
            type="textarea"
            fullWidth
            value={Data.task || ''}
            name='task'
            variant="standard"
          /></>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>{saveLabel}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
