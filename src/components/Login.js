import React, { useEffect } from 'react';
import {
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { PacmanLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import auth from '../firebase.init';

const Login = () => {
  const navigate = useNavigate();

  // React hook form
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  // From Firebase Hook

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  // Google
  const [signInWithGoogle, googleUser, googleLoading, googleError] =
    useSignInWithGoogle(auth);

  // Submit
  const onSubmit = (data) => {
    // console.log(data);
    signInWithEmailAndPassword(data.email, data.password);
  };

  // Error
  if (error) {
    // console.log(error);
    const customError = error?.message.split('Error');
    toast.error(customError[1] || error?.message);
  }
  if (googleError) {
    // console.log(googleError);
    const customError = googleError?.message.split('Error');
    toast.error(customError[1] || googleError?.message);
  }

  // User
  if (user?.user?.uid || googleUser?.user?.uid) {
    // console.log(user?.user);
    toast.success('User Logged in Successfully');
  }

  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  useEffect(() => {
    if (user || googleUser) {
      navigate(from, { replace: true });
    }
  }, [user, googleUser, from, navigate]);

  return (
    <section className="h-screen bg-slate-700-200 ">
      <div className="container py-12 px-6 h-full mx-auto">
        <div className="flex justify-center items-center flex-wrap h-full text-gray-800 ">
          <div className="block bg-white shadow-lg rounded-lg p-12">
            <div className=" px-4 mx-auto">
              <div className=" md:mx-6">
                {loading || googleLoading ? (
                  <>
                    <div className="absolute top-2/4 left-[45%] z-50">
                      <PacmanLoader color={'black'} size={25} />
                    </div>
                  </>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <p className="mb-4">Please login to your account</p>
                    <div className="mb-4">
                      <input
                        type="email"
                        name="email"
                        className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        id="email"
                        placeholder="Your email"
                        {...register('email', { required: true })}
                      />
                      <span className="text-red-600 text-sm">
                        {errors.email && 'Email is required'}
                      </span>
                    </div>

                    <div className="mb-4">
                      <input
                        type="password"
                        className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        id="password"
                        placeholder="Password"
                        {...register('password', { required: true })}
                      />
                      <span className="text-red-600 text-sm">
                        {errors.password && 'Password is required'}
                      </span>
                    </div>

                    <div className="text-center pt-1 mb-2 pb-1">
                      <button
                        className="btn-primary inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                        type="submit"
                      >
                        Login
                      </button>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <p className="mb-0 mr-2">
                        Don't have an account?
                        <button
                          onClick={() => navigate(`/signup`)}
                          type="button"
                          className="hover:underline text-red-600 font-medium text-sm leading-tight cursor-pointer ml-1"
                        >
                          Register
                        </button>
                      </p>
                    </div>
                  </form>
                )}

                {/* Social login */}
                <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                  <p className="text-center font-semibold mx-4 mb-0">OR</p>
                </div>

                <button
                  onClick={() => signInWithGoogle()}
                  className="px-7 py-3 text-black font-medium text-sm leading-snug uppercase rounded w-full flex justify-center items-center mb-3 shadow-xl"
                >
                  {/* <!-- Google --> */}
                  Continue with Google
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
