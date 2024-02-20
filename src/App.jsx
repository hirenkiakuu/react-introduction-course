import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import PostsList from './pages/PostsList/PostsList';
import PostPage from './pages/PostPage/PostPage';

// import './App.css'

const App = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<PostsList />} />
      <Route path='/post/:id' element={<PostPage />} />
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
    </>
  );
};

export default App;