import React, { createContext, useReducer } from 'react'
import 'bootstrap/dist/css/bootstrap.css'

import { Routes, Route } from "react-router-dom";

import Navbar from './components/Navbar'
import Home from './components/Home'
import MarkAttendance from './components/MarkAttendance';
import Signup from './components/Signup';
import Login from './components/Login';
import ViewRecords from './components/ViewRecords';
import ErrorPage from './components/ErrorPage';
import Logout from './components/Logout';
import { initialState } from '../src/reducer/useReducer';
import { reducer } from '../src/reducer/useReducer';
import Test from './components/Test';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const userContext = createContext();

const App = () => {
  //conteext API 
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <>

      <userContext.Provider value={{ state, dispatch }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mark_attendance" element={<MarkAttendance />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/view_records" element={<ViewRecords />} />
          <Route path="/test" element={<Test />} />
          <Route path="/logout" element={<Logout />} />
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </userContext.Provider>
      <ToastContainer />
    </>
  )
}

export default App