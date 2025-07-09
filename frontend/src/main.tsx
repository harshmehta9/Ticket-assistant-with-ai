import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CheckAuth from './components/CheckAuth';
import TicketsDetailsPage from './pages/ticket';
import Tickets from './pages/Tickets';
import SignUp from './pages/SignUp';
import Login from './pages/Login';




createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>

        <Route path='/' element={
          <CheckAuth protectedRoute={true}>
            <Tickets/>
          </CheckAuth>
        }/>

        <Route path='/tickets/:id' element={
          <CheckAuth protectedRoute={true}>
            <TicketsDetailsPage/>
          </CheckAuth>
        }/>

        <Route path='/login' element={
          <CheckAuth protectedRoute={false}>
            <Login/>
          </CheckAuth>
        }/>

        <Route path='/signup' element={
          <CheckAuth protectedRoute={false}>
            <SignUp/>
          </CheckAuth>
        }/>

        <Route path='/admin' element={
          <CheckAuth protectedRoute={true}>
            <Tickets/>
          </CheckAuth>
        }/>
      </Routes>
    </BrowserRouter>

  </StrictMode>,
)
