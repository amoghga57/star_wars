import React from 'react'
import Planets from "./Components/Planet/Planets.jsx"
import Residents from './Components/Residents/Residents.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <div>
          <BrowserRouter basename="/star_wars">
            <Routes>
              <Route exact element={<Planets/>} path='/' />
              <Route element={<Residents/>} path='/residents/details/:id' />
            </Routes>
          </BrowserRouter>

    </div>
  )
}

export default App
