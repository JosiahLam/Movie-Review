import React from 'react';
import {FormControl, Select, MenuItem, InputLabel } from '@mui/material';

function MyPageSelection({trailers, selectedTrailer, handleTrailersChange}) {

  const [open, setOpen] = React.useState(false); 

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  }; 

  return (
      <FormControl fullWidth>
      <InputLabel id="trailer-select">Select a Trailer </InputLabel>
        <Select
            labelId = "trailer-select"
            id = "trailer-select"
            open= {open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={selectedTrailer}
            label="Select a Trailer"
            onChange={handleTrailersChange}
        >
            {trailers.map((trailer, index) => (
            <MenuItem key={index} value={trailer}>
              {trailer.title}
            </MenuItem>
          ))}
        </Select>
    </FormControl>
  )
}

export default MyPageSelection;