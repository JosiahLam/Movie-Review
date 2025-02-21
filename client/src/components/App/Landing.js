import React, { useState } from 'react';
import { Grid, Typography, Button, Box, Paper} from '@mui/material';
import { useNavigate } from 'react-router-dom';


const serverURL = "";

function Landing() {
  // useState

  // handle change
  const navigate = useNavigate();

  return (
    <>
    <Grid container my={6} spcaing = {2} justifyContent="center" alignItems="center">
      <Grid item xs={12}  md={8}>
        <Box p={2}>
          <Typography variant="h3" align = "center">Welcome to Movie Magic!</Typography>
        </Box>
        <Box p={2}>
          <Typography variant="subtitle1" align="center">Dive into a world of cinematic wonders where your movie journey begins. 
                                                        Discover personalized recommendations on MyPage, share your thoughts and ratings on the Review page, and explore our vast database by searching for your favorite movies, actors, or directors. 
                                                        Whether you're here to find your next great watch or share your movie insights, we’ve got something for every film enthusiast. Let the adventure start now!
          </Typography>
        </Box>
      </Grid>
    </Grid>

    <Grid container spacing={4} justifyContent="center" alignItems="center">
        <Grid item xs={12} sm={4} display="flex" justifyContent="center" alignItems="center">
          <Paper p={2}>
            <Box p={2} textAlign="center">
              <Typography variant="h5">MyPage</Typography>
              <Typography variant="subtitle2">This page showcases our favorite movies as the audience, providing their names and brief descriptions. It offers an engaging way to share your top picks with others, highlighting what makes each movie special and giving viewers a quick overview of why they might enjoy watching them.</Typography>
            </Box>
            <Box p={2} textAlign="center">
              <Button
                variant="outlined"
                color="inherit"
                onClick={() => navigate('/MyPage')}>
                <Typography variant="h6" color="inherit" noWrap>Click to MyPage</Typography>
              </Button>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={4} display="flex" justifyContent="center" alignItems="center">
          <Paper>
            <Box p={2} textAlign="center">
              <Typography variant="h5">Review</Typography>
              <Typography variant="subtitle2">This page allows you to contribute your thoughts on movies you’ve watched. Select a movie from our curated list, enter its title, and write a detailed review. You can also rate the movie to share your opinion with others, making it easier for fellow users to decide what to watch next.</Typography>
            </Box>
            <Box p={2} textAlign="center">
              <Button
                variant="outlined"
                color="inherit"
                onClick={() => navigate('/ReviewPage')}>
                <Typography variant="h6" color="inherit" noWrap>Click to Review</Typography>
              </Button>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={4} display="flex" justifyContent="center" alignItems="center">
          <Paper>
            <Box p={2} textAlign="center">
              <Typography variant="h5">Search</Typography>
              <Typography variant="subtitle2">Use this page to find movies by searching for their name, actor, or director. The search functionality provides a comprehensive list of movies that match your query, along with detailed information and reviews to help you make informed decisions about your next watch.</Typography>
            </Box>
            <Box p={2} textAlign="center">
              <Button
                variant="outlined"
                color="inherit"
                onClick={() => navigate('/SearchPage')}>
                <Typography variant="h6" color="inherit" noWrap>Click to Search</Typography>
              </Button>
            </Box>
          </Paper>
        </Grid>

    </Grid>
    </>
  );
}

export default Landing;