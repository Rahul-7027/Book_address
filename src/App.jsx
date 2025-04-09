import Data from "./component/BookData/Data"
import TableBookData from "./component/TableBook/TableBookData";
import Nav from "./component/Navbar/Nav"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from "react";


function App() {

  const [mode, setMode] = useState('light');

  const toggleMode = () => {
    if (mode === "light") {
      setMode('dark');
      document.body.style.backgroundColor = '#042743';
    }
    else {
      setMode('light');
      document.body.style.backgroundColor = 'white';
      
    }
  }

  return (
    <>
      <Router>
        <Nav mode={mode} toggleMode={toggleMode} />
        <Routes>
          <Route path="/" element={<Data mode={mode} />} />
          <Route path="/booktableshow" element={<TableBookData mode={mode} />} />
          {/* <Route path="/contact" element={<Contact />} /> */}
        </Routes>
      </Router>
    </>
  )
}

export default App
