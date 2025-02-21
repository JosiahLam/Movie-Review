import React from 'react';
import { TextField } from '@mui/material';

function SearchActor({ enteredActor, handleActorChange }) {
  return (
    <TextField
      label="Search for a Actor"
      value={enteredActor}
      onChange={handleActorChange}
      fullWidth
      id="search-actor"
    />
  );
}

export default SearchActor;
