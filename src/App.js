import './App.css'
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login'
import Register from './pages/Register'
import Appointment from './pages/Appointment';
import UserAppointment from './pages/UserAppointment';
import ProviderAppointment from './pages/ProviderAppointment';
import NotFound from './pages/NotFound';
import Home from './pages/Home'
import { useState } from 'react';




function App() {
  const [category, setCategory] = useState('');


  return (
    <ChakraProvider>
      <div className='BG'>
        <BrowserRouter>
          <Routes>
            <Route path='/Login' element={<Login />} />
            <Route path='/Register' element={<Register />} />
            <Route path='/bookAppointment' element={<Appointment />} />
            <Route path='/userAppointment' element={<UserAppointment />} />
            <Route path='/providerAppointment' element={<ProviderAppointment />} />
            <Route path='/home' element={<Home setCategory={setCategory}  />} />
            <Route path="*" element={<NotFound />} />
            {/* <Route path='/register' element={<Register />} /> */}
            {/* <Route element={<AuthRoute setUser={setUser} />}>
        <Route path='/' element={<Dashboard />} />
        <Route path='/admin' element={<Admin user={user} />} />
      </Route> */}
          </Routes>
        </BrowserRouter>
      </div>
    </ChakraProvider>
  );
}

export default App;
