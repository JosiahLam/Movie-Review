import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Landing from '../Landing';
import MyPage from '../MyPage';
import ReviewPage from '../ReviewPage';
import Search from '../SearchPage';
import { createTheme } from '@mui/material/styles';


function App() {

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/MyPage" element={<MyPage />} />
          <Route path="/ReviewPage" element={<ReviewPage />} />
          <Route path="/SearchPage" element={<Search />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;
