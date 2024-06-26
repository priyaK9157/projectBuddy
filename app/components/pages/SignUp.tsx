'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
// import { updateSignupData } from '../redux/actions';
import { generateOTP } from '../../Services/operations/generateAndVerifyOTP';
import { useSelector } from 'react-redux';
import { updateSignupData } from '@/GlobalRedux/Features/Counter/signupReducer';
import { RootState } from '@/GlobalRedux/store';


const SignUpPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data } = useSelector((state:RootState) => state.signup);
  console.log("data", data)

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState('India');
  const [agreeTerms, setAgreeTerms] = useState(false);
 


  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
    
    e.preventDefault();

   

    if (!firstName || !lastName || !email || !password || !agreeTerms) {
      console.log("all firld not provided")
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log("email not correct")
      return;
    }

    const Full_Name = firstName + ' ' + lastName
    const formData = {
      Full_Name,
      Email: email,
      password,
      country,
      agreeTerms,
    };


    if((Object.keys(data).length === 0)===true){
      dispatch(updateSignupData(formData));
  }

    console.log("formData",formData )

    setLoading(true);
    try {
      const OtpGenerateResponse = await generateOTP( email,'SignIn' );
      console.log("OtpGenerateResponse",OtpGenerateResponse)
      setLoading(false);

      if (OtpGenerateResponse.data.message === 'Profile found') {
        toast.error('User already registered. Please use a different email ID.', {
          position: 'bottom-center',
        });
        return;
      }

      // dispatch(updateSignupData(signupData));
      router.push('/components/pages/OtpPage'); // Navigate to OTP page
    } catch (error) {
      setLoading(false);
      toast.error('An error occurred during signup. Please try again.', {
        position: 'bottom-center',
      });
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white border border-gray-200 shadow-sm w-full max-w-md">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800">Sign up</h1>
            <p className="mt-2 text-sm text-gray-600">
              Already have an account?
              <button onClick={() => router.push('/signin')} className="text-blue-600 decoration-2 hover:underline font-medium">
                Sign in here
              </button>
            </p>
          </div>

          <div className="mt-5">
            <button
              type="button"
              className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
            >
              <svg
                className="w-4 h-auto"
                width="46"
                height="47"
                viewBox="0 0 46 47"
                fill="none"
              >
                <path
                  d="M46 24.0287C46 22.09 45.8533 20.68 45.5013 19.2112H23.4694V27.9356H36.4069C36.1429 30.1094 34.7347 33.37 31.5957 35.5731L31.5663 35.8669L38.5191 41.2719L38.9885 41.3306C43.4477 37.2181 46 31.1669 46 24.0287Z"
                  fill="#4285F4"
                />
                <path
                  d="M23.4694 47C29.8061 47 35.1161 44.9144 39.0179 41.3012L31.625 35.5437C29.6301 36.9244 26.9898 37.8937 23.4987 37.8937C17.2793 37.8937 12.0281 33.7812 10.1505 28.1412L9.88649 28.1706L2.61097 33.7812L2.52296 34.0456C6.36608 41.7125 14.287 47 23.4694 47Z"
                  fill="#34A853"
                />
                <path
                  d="M10.1212 28.1413C9.62245 26.6725 9.32908 25.1156 9.32908 23.5C9.32908 21.8844 9.62245 20.3275 10.0918 18.8588V18.5356L2.75765 12.8369L2.52296 12.9544C0.909439 16.1269 0 19.7106 0 23.5C0 27.2894 0.909439 30.8731 2.49362 34.0456L10.1212 28.1413Z"
                  fill="#FBBC05"
                />
                <path
                  d="M23.4694 9.07688C27.8699 9.07688 30.8622 10.9863 32.5344 12.5725L39.1645 6.11C35.0867 2.32063 29.8061 0 23.4694 0C14.287 0 6.36607 5.2875 2.49362 12.9544L10.0918 18.8588C11.9987 13.1894 17.25 9.07688 23.4694 9.07688Z"
                  fill="#EB4335"
                />
              </svg>
              Sign up with Google
            </button>

            <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6">
              Or
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid gap-y-4">
                <div>
                  <label htmlFor="first-name" className="block text-sm mb-2">First Name</label>
                  <input
                    type="text"
                    id="first-name"
                    name="first-name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="py-3 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="last-name" className="block text-sm mb-2">Last Name</label>
                  <input
                    type="text"
                    id="last-name"
                    name="last-name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="py-3 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm mb-2">Email address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="py-3 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm mb-2">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="py-3 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="confirm-password" className="block text-sm mb-2">Confirm Password</label>
                  <input
                    type="password"
                    id="confirm-password"
                    name="confirm-password"
                    value={password} // Assuming you are matching password directly; usually you'd have a separate state for confirmation
                    onChange={(e) => setPassword(e.target.value)}
                    className="py-3 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                    required
                  />
                </div>
                <div className="flex items-center">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                  />
                  <label htmlFor="terms" className="ml-3 text-sm">
                    I accept the{' '}
                    <a href="#" className="text-blue-600 decoration-2 hover:underline font-medium">
                      Terms and Conditions
                    </a>
                  </label>
                </div>
                <button
                  type="submit"
                  // onClick={()=>router.push("/components/pages/OtpPage")}
                  className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 hover:bg-blue-700"
                  disabled={loading}
                >
                  {loading ? 'Loading...' : 'Sign up'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUpPage;
