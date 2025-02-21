import React from 'react';
import { TextField } from '@mui/material';

function SearchTitle({ enteredTitle, handleTitleChange }) {
  return (
    <TextField
      label="Search for a movie title"
      value={enteredTitle}
      onChange={handleTitleChange}
      fullWidth
      id="search-title"
    />
  );
}

export default SearchTitle;
