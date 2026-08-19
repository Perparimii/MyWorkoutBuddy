//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from './assets/vite.svg'
//import heroImg from './assets/hero.png'
//import './App.css'
import ProtectedRoute from "@/ProtectedRoute";
import Landing from "@/Pages/Landing";
import Dashboard from "@/Pages/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyWorkouts from "./Pages/MyWorkouts";
import Plans from "./Pages/Plans";
import Register from "./Pages/Register";


function App() {

  return(

  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
      <Route path="/home" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
      <Route path="/myworkouts" element={<ProtectedRoute><MyWorkouts/></ProtectedRoute>}/>
      <Route path="/plans" element={<ProtectedRoute><Plans/></ProtectedRoute>}/>
    </Routes>
  </BrowserRouter>
  );
  
}
export default App;
