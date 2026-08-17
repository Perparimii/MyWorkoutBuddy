//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from './assets/vite.svg'
//import heroImg from './assets/hero.png'
//import './App.css'
import ProtectedRoute from "@/ProtectedRoute";
import Landing from "@/Pages/Landing";
import Dashboard from "@/Pages/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/Pages/Home";
import MyWorkouts from "./Pages/MyWorkouts";


function App() {

  return(

  <BrowserRouter>
    <Routes>

      <Route path="/" element={<Landing/>}/>
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
      <Route path="/home" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
      <Route path="/myworkouts" element={<ProtectedRoute><MyWorkouts/></ProtectedRoute>}/>

    </Routes>
  </BrowserRouter>
  );
  
}
export default App;
