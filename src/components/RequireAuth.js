import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import { PacmanLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import auth from '../firebase.init';

const RequireAuth = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);
  const location = useLocation();
  if (loading) {
    return (
      <>
        <div className="absolute top-2/4 left-[45%] z-50">
          <PacmanLoader color={'black'} size={25} />
        </div>
      </>
    );
  }
  if (error) {
    console.log(error);
    return toast.error(error);
  }

  if (!user?.uid) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
