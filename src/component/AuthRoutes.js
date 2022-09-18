import React, { useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

const AuthRoute = ({ setUser }) => {
  
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUser = async () => {
      const request = await fetch('/api/v1/user/me');
      const data = await request.json();
      if (request.status === 200) {
        setUser(data);
      } else if (request.status === 401) {
        localStorage.removeItem('loggedIn');
        navigate('/login');
      }
    };
    fetchUser();
  }, [navigate]);
  if (!localStorage.getItem('loggedIn')) {
    return <Navigate to='/login' />;
  }

  return <Outlet />;
};

export default AuthRoute;