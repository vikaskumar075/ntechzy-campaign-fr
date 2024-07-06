import React from 'react'
import DropDown from './components/DropDown'
import Login from "./components/Login"
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'

const App = () => {
  return (
    <>
    <Router>
      <Routes>
      
      <Route path="/" exact element={<DropDown/>} />
      <Route path="/login" exact element={<Login/>} />
      </Routes>
    </Router>
    </>
  )
}

export default App