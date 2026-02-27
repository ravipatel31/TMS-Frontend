import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { toast, ToastContainer } from 'react-toastify';
import AppRoute from './AppRoutes/AppRoute';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './Redux/store';
import { ApiGetUserDetails } from './Core/Apicall';
import { setcurrentPage, setuserDetails } from './Redux/Reducers/globalSlice';
import { useNavigate } from 'react-router-dom';

function App() {
  const globalData = useSelector((state: RootState) => state.global)
  const { loading } = useSelector((state: RootState) => state.loading)
  console.log("GlobalData", globalData)
  const token = localStorage.getItem('token')
  const dispatch = useDispatch()
  const navigate = useNavigate()



  // const getUserDetails = async () => {
  //   try {
  //     const res = await ApiGetUserDetails()
  //     if (res.status) {
  //       dispatch((setuserDetails(res?.data?.user)))
  //       dispatch(setcurrentPage('/dashboard'))
  //       setTimeout(() => {
  //         navigate('/dashboard')
  //       }, 100);
  //     }
  //   } catch (error: any) {
  //     // toast.error(error?.message)
  //   }
  // }

  // useEffect(() => {
  //   if (token) {
  //     getUserDetails()
  //   }
  // }, [token])

  return (
    <div className='App'>
      <ToastContainer />
      <AppRoute />
      {loading && (
        <div className='loading'>
          <svg width="48" height="48" viewBox="0 0 50 50" role="status" aria-label="Loading">
            <circle cx="25" cy="25" r="20" fill="none" stroke="#745FDD" strokeWidth="5" />
            <path d="M45 25a20 20 0 0 1-20 20" stroke="white" strokeWidth="5" strokeLinecap="round" fill="none">
              <animateTransform attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.8s" repeatCount="indefinite" />
            </path>
          </svg>
        </div>
      )}
    </div>
  );
}

export default App;
