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
import User_profile from './pages/User_profile'
import Provider_profile from './pages/Provider_profile'
import ProfileP from './pages/ProfileP'
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
            <Route path='/User_profile' element={<User_profile />}/>
            <Route path='/Provider_profile' element={<Provider_profile />}/>
           <Route path='/profilep' element={<ProfileP />}/>
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
