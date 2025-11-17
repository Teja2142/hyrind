import React from 'react';
// FIX: Assuming Navbar.jsx and Home.jsx were placed directly in the 'src' directory 
// based on the previous instructions' file structure naming.
import Navbar from './components/Navbar'; 
import Home from './components/Home';
import About from './components/About';
import Service from './components/Services';

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Home />
        <About />
        <Service />
      </main>
    </>
  );
}

export default App;
