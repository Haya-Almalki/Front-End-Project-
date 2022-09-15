import './App.css'
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login'
import Register from './pages/Register'
import Appointment from './pages/Appointment';
import UserAppointment from './pages/UserAppointment';
import ProviderAppointment from './pages/ProviderAppointment';


function App() {
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
