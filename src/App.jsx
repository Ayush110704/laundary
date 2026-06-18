 
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import HomePage from "./components/Home";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <Footer />
 
import './App.css'
import About from './components/About'
import HomePage from './components/Home'
import Navbar from './components/Navbar'
import Services from './components/Services'
import {  Routes, Route } from 'react-router-dom';

function App() {
  return (
    <> 
 
      <HomePage />
      <About/>
 
    <Navbar/>
    <Routes>

   <Route path="/" element={<HomePage/> } />
    <Route path="/services" element={<Services/> } />
     {/* <Route path="/contact" element={<Contact/> } />  */}
     {/* <Route path="/about" element={<About />} />  */}

      
      </Routes>
 
    </>
  );
}

export default App;
