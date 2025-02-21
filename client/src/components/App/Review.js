import React, { useState } from 'react';
import { Grid, Typography, Button, Box} from '@mui/material';
import MovieSelection from './MovieSelection';
import ReviewTitle from './ReviewTitle';
import ReviewBody from './ReviewBody';
import ReviewRating from './ReviewRating';

const serverURL = "";

function Review() {
  const [movies, setMovies] = useState([])
  const [selectedMovie, setSelectedMovie] = useState({});
  const [enteredTitle, setEnteredTitle] = useState('');
  const [enteredReview, setEnteredReview] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [errors, setErrors] = useState({});
  const [userID, setUserID] = useState(1);;

  React.useEffect(() => {
    getMovies();
  },[]);

  const handleMovieChange = (event) => {

    console.log(event.target.value)
    console.log(selectedMovie)

    setSelectedMovie(event.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, selectedMovie: false }));
    setShowConfirmation(false);
  };

  const handleTitleChange = (event) => {
    setEnteredTitle(event.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, enteredTitle: false }));
    setShowConfirmation(false);
  };

  const handleReviewChange = (event) => {
    setEnteredReview(event.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, enteredReview: false }));
    setShowConfirmation(false);
  };

  const handleRatingChange = (event) => {
    setSelectedRating(event.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, selectedRating: false }));
    setShowConfirmation(false);
  };

  const handleSubmit = () => {

    let hasErrors = false;
    const newErrors = {};

    if (!selectedMovie) {
      newErrors.selectedMovie.name = true;
      hasErrors = true;
    }
    if (!enteredTitle) {
      newErrors.enteredTitle = true;
      hasErrors = true;
    }
    if (!enteredReview) {
      newErrors.enteredReview = true;
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

      const reviewData = {userID : userID, 
        movieID: selectedMovie.id ,
        reviewTitle : enteredTitle,
        reviewContent : enteredReview,
        reviewScore :selectedRating
      }

      const url = "/api/addReview"
      console.log(url)

      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reviewData)
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


  const getMovies = () => {
    callApiGetMovies()
    .then(res => {
      console.log("callApiGetMovie returned: ", res)
      var parsed = JSON.parse(res.express);
      console.log("callApiGetMovie parsed: ", parsed);
      setMovies(parsed);
    })
  }

  const callApiGetMovies = async () => {
    const url = serverURL + "/api/getMovies"
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
    <Grid container my={6} spcaing = {2} justifyContent="center" alignItems="center">
      <Grid item xs={12}  md={8}>
        <Box p={2}>
          <Typography variant="h3" align = "center">Review a movie</Typography>
        </Box>
        <Box p={2}>
          <Typography variant="subtitle1" align="center">This page allows you to contribute your thoughts on movies you’ve watched. Select a movie from our curated list, enter its title, and write a detailed review. You can also rate the movie to share your opinion with others, making it easier for fellow users to decide what to watch next.</Typography>
        </Box>
      </Grid>
      <Grid item xs={12} md={8}>
        <Box p={2} > 
          <MovieSelection
            movies={movies}
            selectedMovie={selectedMovie}
            handleMovieChange={handleMovieChange}
          />
        {errors.selectedMovie && <Typography color="red">Select your movie</Typography>}
        </Box>
      </Grid>
      <Grid item xs={12} md={8}>
        <Box p={2}> 
          <ReviewTitle enteredTitle={enteredTitle} handleTitleChange={handleTitleChange} />
        {errors.enteredTitle && <Typography color="red">Enter your review title</Typography>}
        </Box>
      </Grid>
      <Grid item xs={12} md={8}>
        <Box p={2}>
          <ReviewBody enteredReview={enteredReview} handleReviewChange={handleReviewChange} />
        {errors.enteredReview && <Typography color="red">Enter your review</Typography>}
        </Box>
      </Grid>
      <Grid item xs={12} md={8}>
        <Box p={2}>
          <ReviewRating selectedRating={selectedRating} handleRatingChange={handleRatingChange} />
        {errors.selectedRating && <Typography color="red">Select the rating</Typography>}
        </Box>
      </Grid>
      <Grid item xs={12} md={8}>
        <Box p={2}>
          <Button variant="contained" color="primary" onClick={handleSubmit} id="submit-button">
            Submit
          </Button>
        </Box>
      </Grid>

        {showConfirmation && (
          <Grid item xs={12} md={8}>
            <Box p={2}>
              <Typography variant="h6" id="confirmation-message">Your review has been received</Typography>
              <Typography variant="subtitle1">Movie: {selectedMovie.name}</Typography>
              <Typography variant="subtitle1">Review Title: {enteredTitle}</Typography>
              <Typography variant="subtitle1">Review Body: {enteredReview}</Typography>
              <Typography variant="subtitle1">Rating: {selectedRating}</Typography>
            </Box>
      </Grid>
      )}
    </Grid>
  );
}

export default Review;