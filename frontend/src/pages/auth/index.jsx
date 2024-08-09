import { apiClient } from '@/lib/api-client';
import { useAppStore } from '@/store';
import { LOGIN_ROUTE, SIGNUP_ROUTE } from '@/utils/constant';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Auth = () => {
  const { setUserInfo } = useAppStore();
  const navigate = useNavigate();
  const [login, setLogin] = useState(true);
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateLogin = () => {
    if (!loginData.email) {
      toast.error('Email required');
      return false;
    }
    if (!loginData.password) {
      toast.error('Password required');
      return false;
    }
    return true;
  };

  const validateSignup = () => {
    if (!loginData.firstName) {
      toast.error('First Name required');
      return false;
    }
    if (!loginData.lastName) {
      toast.error('Last Name required');
      return false;
    }
    if (!loginData.email) {
      toast.error('Email required');
      return false;
    }
    if (!loginData.password) {
      toast.error('Password required');
      return false;
    }
    if (loginData.password !== loginData.confirmPassword) {
      toast.error('Password and Confirm Password do not match');
      return false;
    }
    return true;
  };

  const handleSignup = async () => {
    if (validateSignup()) {
      try {
        const response = await apiClient.post(SIGNUP_ROUTE, {
          firstName: loginData.firstName,
          lastName: loginData.lastName,
          email: loginData.email,
          password: loginData.password,
        }, { withCredentials: true });

        if (response.status === 201) {
          setUserInfo(response.data.user);
          toast.success('Signup successful');
          navigate('/profile');
        }
      } catch (error) {
        console.error(error);
        toast.error('Signup failed');
      }
    }
  };

  const handleLogin = async () => {
    if (validateLogin()) {
      try {
        const response = await apiClient.post(LOGIN_ROUTE, {
          email: loginData.email,
          password: loginData.password,
        }, { withCredentials: true });

        if (response.data.user?.id) {
          setUserInfo(response.data.user);
          toast.success('Logged In Successfully');
          navigate('/profile');
        }
      } catch (error) {
        console.error(error);
        toast.error('Login failed');
      }
    }
  };

  return (
    <div className="flex items-center h-screen">
      <div className="mx-auto flex flex-col shadow-xl rounded-3xl max-w-lg md:flex-row md:max-w-none md:pr-10">
        <div className="max-w-md rounded-3xl bg-gradient-to-t from-blue-700 via-blue-700 to-blue-600 px-4 py-10 text-white sm:px-10 md:m-6 md:mr-8">
          <p className="mb-20 font-bold tracking-wider">Chat App Test</p>
          <p className="mb-4 text-3xl font-bold md:text-4xl md:leading-snug ">
            Start your <br />
            journey with us
          </p>
          <p className="mb-28 leading-relaxed text-gray-200">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere nisi
            voluptas a officia. Omnis.
          </p>
          <div className="bg-blue-600/80 rounded-2xl px-4 py-8">
            <p className="mb-3 text-gray-200">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error ea
              voluptates sapiente!
            </p>
            <div className="">
              <div className="flex items-center">
                <img
                  className="h-10 w-10 rounded-full object-cover"
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Simon Lewis"
                />
                <p className="ml-4 w-56">
                  <strong className="block font-medium">Simon Lewis</strong>
                  <span className="text-xs text-gray-200">
                    Published 12 Bestsellers
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 py-20 w-full md:w-96">
          <h2 className="mb-2 text-3xl font-bold">
            {login ? 'Login' : 'Sign Up'}
          </h2>
          <button
            className="mb-10 block font-bold text-gray-600 underline"
            onClick={() => setLogin(!login)}
          >
            {login ? 'Create an account' : 'Have an account'}
          </button>
          {login ? (
            <>
              <label className="mb-1 font-medium text-gray-500" htmlFor="login-email">Email</label>
              <div className="mb-4">
                <input
                  type="email"
                  id="login-email"
                  name="email"
                  className="w-full border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-600 rounded-md border-2"
                  placeholder="Enter your email"
                  onChange={handleInputChange}
                  value={loginData.email}
                />
              </div>

              <label className="mb-1 font-medium text-gray-500" htmlFor="login-password">Password</label>
              <div className="mb-4">
                <input
                  type="password"
                  id="login-password"
                  name="password"
                  className="w-full border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-600 rounded-md border-2"
                  placeholder="Enter your password"
                  onChange={handleInputChange}
                  value={loginData.password}
                />
              </div>

              <button
                className="hover:shadow-blue-600/40 rounded-xl bg-gradient-to-r from-blue-700 to-blue-600 px-8 py-3 font-bold text-white transition-all hover:opacity-90 hover:shadow-lg w-full"
                onClick={handleLogin}
              >
                Login
              </button>
            </>
          ) : (
            <>
              <label className="mb-1 font-medium text-gray-500" htmlFor="signup-firstName">First Name</label>
              <div className="mb-4">
                <input
                  type="text"
                  id="signup-firstName"
                  name="firstName"
                  className="w-full border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-600 rounded-md border-2"
                  placeholder="Enter your First Name"
                  onChange={handleInputChange}
                  value={loginData.firstName}
                />
              </div>

              <label className="mb-1 font-medium text-gray-500" htmlFor="signup-lastName">Last Name</label>
              <div className="mb-4">
                <input
                  type="text"
                  id="signup-lastName"
                  name="lastName"
                  className="w-full border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-600 rounded-md border-2"
                  placeholder="Enter your Last Name"
                  onChange={handleInputChange}
                  value={loginData.lastName}
                />
              </div>

              <label className="mb-1 font-medium text-gray-500" htmlFor="signup-email">Email</label>
              <div className="mb-4">
                <input
                  type="email"
                  id="signup-email"
                  name="email"
                  className="w-full border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-600 rounded-md border-2"
                  placeholder="Enter your email"
                  onChange={handleInputChange}
                  value={loginData.email}
                />
              </div>

              <label className="mb-1 font-medium text-gray-500" htmlFor="signup-password">Password</label>
              <div className="mb-4">
                <input
                  type="password"
                  id="signup-password"
                  name="password"
                  className="w-full border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-600 rounded-md border-2"
                  placeholder="Choose a password (minimum 8 characters)"
                  onChange={handleInputChange}
                  value={loginData.password}
                />
              </div>

              <label className="mb-1 font-medium text-gray-500" htmlFor="signup-confirm-password">Confirm Password</label>
              <div className="mb-4">
                <input
                  type="password"
                  id="signup-confirm-password"
                  name="confirmPassword"
                  className="w-full border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-600 rounded-md border-2"
                  placeholder="Confirm your password"
                  onChange={handleInputChange}
                  value={loginData.confirmPassword}
                />
              </div>

              <button
                className="hover:shadow-blue-600/40 rounded-xl bg-gradient-to-r from-blue-700 to-blue-600 px-8 py-3 font-bold text-white transition-all hover:opacity-90 hover:shadow-lg w-full"
                onClick={handleSignup}
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
