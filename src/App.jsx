import './App.css'
import HomePage from './components/Home'
import Navbar from './components/Navbar'
// import Services from './components/Services'
import {  Routes, Route } from 'react-router-dom';

function App() {
  return (
    <> 
    <Navbar/>
    <Routes>

   <Route path="/" element={<HomePage/> } />
    {/* <Route path="/services" element={<Services/> } /> */}
     {/* <Route path="/contact" element={<Contact/> } />  */}
     {/* <Route path="/about" element={<About />} />  */}

      
      </Routes>
    </>
  )
}

export default App