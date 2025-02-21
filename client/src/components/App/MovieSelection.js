import React from 'react';
import {FormControl, Select, MenuItem, InputLabel } from '@mui/material';

function MovieSelection({movies, selectedMovie, handleMovieChange}) {

  const [open, setOpen] = React.useState(false); 

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  }; 

  return (
    <FormControl fullWidth>
      <InputLabel id="movie-select">Select a Movie </InputLabel>
      <Select
          labelId = "movie-select"
          id = "movie-select"
          open= {open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={selectedMovie}
          label="Select a Movie"
          onChange={handleMovieChange}
      >
          {movies.map((movie, index) => (
          <MenuItem key={index} value={movie}>
            {movie.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>  
  );
}

export default MovieSelection;