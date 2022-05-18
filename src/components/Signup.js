import React, { useEffect } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import auth from '../firebase.init';
import { PacmanLoader } from 'react-spinners';

const Signup = () => {
  const navigate = useNavigate();

  // React hook form
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  // From Firebase Hook

  // Email And Password
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  // Submit
  const onSubmit = (data) => {
    // console.log(data);
    createUserWithEmailAndPassword(data.email, data.password);
  };

  if (user) {
    toast.success('User Created');
  }

  // Error
  if (error) {
    console.log(error);
    const customError = error?.message.split('Error');
    toast.error(customError[1] || error.message);
  }

  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);
  return (
    <>
      <section className="h-screen bg-slate-700 ">
        <div className="container py-12 px-6 h-full mx-auto">
          <div className="flex justify-center items-center flex-wrap h-full  text-gray-800">
            <div className="xl:w-9/12">
              <div className="block bg-white shadow-lg rounded-lg">
                <div className="lg:flex lg:flex-wrap g-0">
                  <div className="lg:w-6/12 mx-auto px-4 md:px-0 h-full">
                    <div className="p-12 md:mx-6 pb-4">
                      {loading ? (
                        <>
                          <div className="absolute top-2/4 left-[45%] z-50">
                            <PacmanLoader color={'black'} size={25} />
                          </div>
                        </>
                      ) : (
                        <form onSubmit={handleSubmit(onSubmit)}>
                          <p className="mb-4">
                            Please{' '}
                            <span className="font-extrabold">Register</span> to
                            your account
                          </p>
                          <div className="mb-4">
                            <input
                              type="text"
                              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                              id="name"
                              placeholder="Your name"
                            />
                          </div>
                          <div className="mb-4">
                            <input
                              type="email"
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

                          <div className="text-center pt-1 mb-4 pb-1">
                            <button
                              className="btn-primary inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                              type="submit"
                            >
                              Register
                            </button>
                          </div>
                          <div className="flex items-center justify-center mb-4">
                            <p className="mb-0 mr-2">
                              Already have an account?
                              <button
                                onClick={() => navigate(`/login`)}
                                type="button"
                                className="hover:underline text-red-600 font-medium text-sm leading-tight cursor-pointer ml-1"
                              >
                                Login
                              </button>
                            </p>
                          </div>
                        </form>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
