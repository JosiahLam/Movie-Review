import React from 'react';
import {Grid, Typography,Box, Button} from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';


function MyPageTrailers({trailers, displayMore, setDisplayMore}) {

  const handleSubmit = () => {
    setDisplayMore(false)
  }

  return (
    <>
    {displayMore && (
      <Grid item xs={12} md={8} align="center">
        <Box p={2}>
          <Button variant="outlined" color="primary" onClick={handleSubmit} id="submit-button">
            Hide All
          </Button>
        </Box>
      </Grid>
    )}
    <Grid item xs={12} md={8}>
        <Box p={2}>
          <Typography variant="h5" align="left">{trailers[0].title}</Typography>
          <Typography variant="subtitle1" align="left">{trailers[0].detail}</Typography>
        </Box>
        <Box p={2}>
            <div class="ratio ratio-16x9">
              <iframe width="560" height="315" src="https://www.youtube.com/embed/8hP9D6kZseM?si=KOurqe9isqA0f6q9" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </div>
        </Box>
      </Grid>

      <Grid item xs={12} md={8}>
        <Box p={2}>
          <Typography variant="h5" align="left">{trailers[1].title}</Typography>
          <Typography variant="subtitle1" align="left">{trailers[1].detail}</Typography>
        </Box>
        <Box p={2}>
            <div class="ratio ratio-16x9">
              <iframe width="560" height="315" src="https://www.youtube.com/embed/2LqzF5WauAw?si=ecnY1JfRmqkLrSX9&amp;start=9" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>            
            </div>
        </Box>
      </Grid>

      <Grid item xs={12} md={8}>
        <Box p={2}>
          <Typography variant="h5" align="left">{trailers[2].title}</Typography>
          <Typography variant="subtitle1" align="left">{trailers[2].detail}</Typography>
        </Box>
        <Box p={2}>
            <div class="ratio ratio-16x9">
              <iframe width="560" height="315" src="https://www.youtube.com/embed/LdOM0x0XDMo?si=eHSueTZvBf-YJ5xR" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>            
            </div>
        </Box>
      </Grid>
    </>
  )
}

export default MyPageTrailers;