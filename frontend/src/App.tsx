//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from './assets/vite.svg'
//import heroImg from './assets/hero.png'
//import './App.css'
import Landing from "@/Pages/Landing";
import Dashboard from "@/Pages/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {

  return(

  <BrowserRouter>
    <Routes>

      <Route path="/" element={<Landing/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>

    </Routes>
  </BrowserRouter>
  );
  
}
export default App;
