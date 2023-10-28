import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import SignUp from './pages/SignUp.jsx';
import Profile from './pages/Profile.jsx';
import About from './pages/About.jsx';
import Home from './pages/Home.jsx';
import Header from './components/Header.jsx';
import SignIn from './pages/SignIn.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
export default function App() {
  return(<BrowserRouter>
    <Header/>
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path='/sign-in' element={<SignIn/>}/>
        <Route path='/sign-up' element={<SignUp/>}/>
        <Route path='/about' element={<About/>}/>
        <Route element={<PrivateRoute/>}>
          <Route path='/profile' element={<Profile/>}/>
        </Route>
    </Routes>
  </BrowserRouter>)
}
