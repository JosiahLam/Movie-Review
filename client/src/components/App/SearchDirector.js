import React from 'react';
import { TextField } from '@mui/material';

function SearchDirector({ enteredDirector, handleDirectorChange }) {
  return (
    <TextField
      label="Search for a Director"
      value={enteredDirector}
      onChange={handleDirectorChange}
      fullWidth
      id="search-director"
    />
  );
}

export default SearchDirector;
