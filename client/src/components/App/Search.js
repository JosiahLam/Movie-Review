import React, { useState } from 'react';
import { Grid, Typography, Button, Box } from '@mui/material';
import Paper from '@mui/material/Paper';
import SearchTitle from './SearchTitle';
import SearchActor from './SearchActor';
import SearchDirector from './SearchDirector';

const serverURL = "";

function Search() {
  const [titleSearchTerm, setTitleSearchTerm] = useState('');
  const [actorSearchTerm, setActorSearchTerm] = useState('');
  const [directorSearchTerm, setDirectorSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleTitleChange = (event) => {
    setTitleSearchTerm(event.target.value);
  };

  const handleActorChange = (event) => {
    setActorSearchTerm(event.target.value);
  };

  const handleDirectorChange = (event) => {
    setDirectorSearchTerm(event.target.value);
  };


  const handleSubmit = () => {
      handleApiSearch()
      setShowConfirmation(true);
    };

  const handleApiSearch = () => {
    callApiSearch()
      .then(res => {
        console.log("callApiSearch returned: ", res)
        const parsed = JSON.parse(res.express)
        console.log("callApiSearch: ", parsed[0])
        setSearchResult(parsed);
      });
    }

  const callApiSearch = async () => {

    const url = "/api/search"
    console.log(url)

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
    },
      body: JSON.stringify({
        titleSearchTerm: titleSearchTerm,
        actorSearchTerm: actorSearchTerm,
        directorSearchTerm: directorSearchTerm,
      })
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message)
    console.log("Found Search: ", body );
    return body;
  }
  
  return (
    <Grid container my={6} spacing={2} justifyContent="center" alignItems="center">
      <Grid item xs={12} md={8}>
        <Box p={2}>
          <Typography variant="h3" align="center">Search a movie</Typography>
        </Box>
        <Box p={2}>
          <Typography variant="subtitle1" align="center">Use this page to find movies by searching for their name, actor, or director. The search functionality provides a comprehensive list of movies that match your query, along with detailed information and reviews to help you make informed decisions about your next watch.</Typography>
        </Box>
      </Grid>
      <Grid item xs={12} md={8}>
        <Box p={2}>
          <SearchTitle
            titleSearchTerm={titleSearchTerm}
            handleTitleChange={handleTitleChange}
          />
        </Box>
      </Grid>
      <Grid item xs={12} md={8}>
        <Box p={2}>
          <SearchActor
            actorSearchTerm={actorSearchTerm}
            handleActorChange={handleActorChange}
          />
        </Box>
      </Grid>
      <Grid item xs={12} md={8}>
        <Box p={2}>
          <SearchDirector
            directorSearchTerm={directorSearchTerm}
            handleDirectorChange={handleDirectorChange}
          />
        </Box>
      </Grid>
      <Grid item xs={12} md={8}>
        <Box p={2}>
          <Button variant="contained" color="primary" onClick={handleSubmit} id="search-button">
            Submit
          </Button>
        </Box>
      </Grid>

    {showConfirmation && (
    <Grid item xs={12} md={8}>
      <Box p={2}>
        <Typography variant="h6" id="confirmation-message">Search Result: </Typography>
      </Box> 
    </Grid>
    )}
    {showConfirmation && (
    searchResult.map((result, index) => (
      <Grid item xs={12} md={8} key={index}>
        <Paper elevation={3}>
          <Box p={2}>
            <Typography variant="subtitle1">Movie Title: {result.name}</Typography>
            <Typography variant="subtitle1">Movie Director(s): {result.directors}</Typography>
            <Typography variant="subtitle1">Average Rating: {result.averageRating || 'N/A'}</Typography>
            <Typography variant="subtitle1">Reviews: {result.reviews ? result.reviews.split('\n').map((review, reviewIndex) => (
              <span key={reviewIndex}>{review}<br/></span>
            )) : 'No reviews available'}</Typography>
          </Box>
        </Paper>
        
      </Grid>
      ))
    )}
    </Grid>
  );
}

export default Search;
