import React, { useState } from 'react';
import { Grid, Typography, Box, Button, Paper} from '@mui/material';
import MyPageTrailers from './MyPageTrailers';
import MyPageSelection from './MyPageSelection';
import MyPageRating from './MyPageRating'


function MyPage() {
  // declare uState variables
  const [trailers , setTrailers] = useState([]);
  const [displayMore, setDisplayMore] = useState(false);

  const [selectedTrailer, setSelectedTrailer] = useState({});
  const [selectedRating, setSelectedRating] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [userID, setUserID] = useState(1);
  const [errors, setErrors] = useState({});;


  React.useEffect(() => {
    getMyPageDetails();
  },[]);

  // handle changes functions
  const handleSubmit = () => {
    setDisplayMore(true);
  }

  const handleTrailersChange = (event) => {
    setSelectedTrailer(event.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, selectedTrailer: false }));
    setShowConfirmation(false);
  }

  const handleRatingChange = (event) => {
    setSelectedRating(event.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, selectedRating: false }));
    setShowConfirmation(false);
  }

  const handleSubmitTrailers = () => {

    let hasErrors = false;
    const newErrors = {};

    if (!selectedTrailer) {
      newErrors.selectedTrailer.title = true;
      hasErrors = true;
    }
    if (!selectedRating) {
      newErrors.selectedRating = true;
      hasErrors = true;
    }

    if (hasErrors) {
      setErrors(newErrors);
      setShowConfirmation(false);
    } else {
    

    const trailerData = {trailerID: selectedTrailer.id,
      userID : userID,
      trailerScore :selectedRating
    }

    const url = "/api/addTrailerReview"
    console.log(url)

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(trailerData)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // Handle the response or reset the form
      })
      .catch(error => {
        console.error(error);
      });
      setShowConfirmation(true);
      setErrors({});
  }}

  //api
  const getMyPageDetails = () => {
    callMyPageDetails()
    .then(res => {
      console.log("callApiGetMovie returned: ", res)
      var parsed = JSON.parse(res.express);
      console.log("callApiGetMovie parsed: ", parsed);
      setTrailers(parsed);
    })
  }

  const callMyPageDetails = async () => {
    const url = "/api/getMyPageDetails"
    console.log(url)

    const response = await fetch(url, {
      method: "POST",
      headers : {
        "Content-Type" : "application/json",
      }
    }); 
    const body = await response.json();
    if (response.status !== 200) throw Error (body.message);
    console.log("User settings: ", body);
    return body;
  }

  
  return (
    <Grid container my={6} spacing={2} justifyContent="center" alignItems="center">
      <Grid item xs={12} md={8}>
        <Box p={2}>
          <Typography variant="h3" align="center">My Page</Typography>
        </Box>
        <Box p={2}>
          <Typography variant="subtitle1" align="center">I'm a huge fan of Christopher Nolan's movies, I have selected three of my favourites "Inception", "Interstellar", and "Tenet". 
                                                        Nolan's storytelling and cinematic style consistently blow people's minds, leaving audiences in awe. 
                                                        Each film is distinct from others, as they often leave audiences pondering and dissecting their intricate plots long after the credits roll. 
                                                        Nolan's unique ability to blend intellectual depth with visual spectacle makes his work an unforgettable and thought-provoking experience for moviegoers. 
                                                        Here is a interview video of Robert Downey Jr. & Christopher Nolan, check "Show More" for Christopher Nolan's Oscar nominationed movie trailers.
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} md={8}>
        <Box p={2}>
            <div class="ratio ratio-16x9">
              <iframe width="560" height="315" src="https://www.youtube.com/embed/fez7X_oevNs?si=cF-ngq2YqgpkT-i3&amp;start=160" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </div>
        </Box>
      </Grid>

    {!displayMore && (
      <Grid item xs={12} md={8} align="center">
        <Box p={2}>
          <Button variant="outlined" color="primary" onClick={handleSubmit} id="submit-button">
            Show More
          </Button>
        </Box>
      </Grid>
    )} 
    {displayMore && (
      <>
        <MyPageTrailers trailers = {trailers} displayMore = {displayMore} setDisplayMore = {setDisplayMore}/>
        <Grid item xs={12} md={8} align="center">
          <Box p={2}>
            <Typography variant="h5" align="center"> Leave a Rating !</Typography>
            <Typography variant="subtitle2" align="center">Tell us what you think</Typography>
          </Box>
          <Grid item xs={12} md={8}>
            <Box p={2}>
              <MyPageSelection trailers = {trailers} selectedTrailer = {selectedTrailer} handleTrailersChange = {handleTrailersChange}/>
              {errors.selectedTrailer && <Typography color="red">Select your trailer</Typography>}
              </Box>
          </Grid>
          <Grid item xs={12} md={8} align="left">
            <Box p={2}>
              <MyPageRating selectedRating = {selectedRating} handleRatingChange = {handleRatingChange}/>
              {errors.selectedRating && <Typography color="red">Select the rating</Typography>}
              </Box>
          </Grid>
          <Grid item xs={12} md={8} align="left">
            <Box p={2}>
              <Button variant="contained" color="primary" onClick={handleSubmitTrailers} id="submit-button">
                Submit
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={8} align="left">
            {showConfirmation && (
              <Grid item xs={12} md={8}>
                <Box p={2}>
                    <Typography variant="h6" id="confirmation-message">Your review has been received</Typography>
                    <Typography variant="subtitle1">Trailer: {selectedTrailer.title}</Typography>
                    <Typography variant="subtitle1">Rating: {selectedRating}</Typography>
                </Box>
              </Grid>
            )}
          </Grid>
        </Grid>

      </>
    )}
  </Grid>
  );
}

export default MyPage;