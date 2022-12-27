import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "./Components/Form";
// import { useState } from "react";
// import Filter from "./Components/Filter";
import EnquiryList from "./Components/Enquiry-List";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import Home from "./Components/Home";

function App() {
  
  return (
    <div>
       
      
        <Router>
        <Sidebar/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path="/form" element={<Form />} />
          <Route path="/enqlist" element={<EnquiryList />} />
         </Routes>
         </Router>
      
      
    </div>
  );
}

export default App;
