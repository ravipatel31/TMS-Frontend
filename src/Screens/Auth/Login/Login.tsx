import React, { useEffect, useState } from 'react'
import logo from '../../../Assets/Images/logo.png'
import * as Yup from "yup";
import { Form, Formik, FormikHelpers } from 'formik';
import { Box, Button, Grid, IconButton, InputAdornment, InputLabel, TextField, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { setcurrentPage, setisMobileVerify, setuserDetails } from '../../../Redux/Reducers/globalSlice';
import { ApiLogin, ApiSendEmailOtp, ApiSendMobileOtp } from '../../../Core/Apicall';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

interface FormValues {
  email: string;
  password: string;

}
function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // ----------------------------------------------------- Initial Values --------------------------------------------------

  const initialValues: FormValues = {
    email: "",
    password: "",
  };
  // ----------------------------------------------------- Validation Schmea --------------------------------------------------
  const validationSchema = Yup.object({
    email: Yup.string().trim()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string().trim()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  // -------------------------------------------- Send Email Otp -----------------------------------------------------------
  const handleSendEmailOtp = async (email: string) => {

    const data2 = {
      "email": email,
    }
    try {
      const res2 = await ApiSendEmailOtp(data2)
      if (res2.status) {
        // console.log("Otp Data", res2.data)
        dispatch(setcurrentPage('/otp'))
        setTimeout(() => {
          navigate('/otp')
        }, 100);
      }

    }
    catch (error: any) {
    toast.error(error?.message)
    }

  }
      // -------------------------------------------- Send Mobile Otp  -----------------------------------------------------------
  const handleSendMobileOtp = async (mobile: string) => {

    try {
      const data = {
        "mobile": mobile
      }
      const res = await ApiSendMobileOtp(data)
      if (res.status) {
        dispatch(setisMobileVerify(true))
        dispatch(setcurrentPage('/otp'))
        setTimeout(() => {
          navigate('/otp')
        }, 100);
      }
    } catch (error: any) {
      toast.error(error?.message)
    }

  }


  // ----------------------------------------------------- Form Submission --------------------------------------------------
  const handleSubmit = async (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ) => {
    try {
      const data = {
        "email": values.email,
        "password": values.password
      }
      const res = await ApiLogin(data)
      if (res.status) {
        localStorage.setItem('token', res?.token)
        dispatch((setuserDetails(res?.data)))
        if(res?.data?.role?.name ==='Admin'){
          dispatch(setcurrentPage('/organizations'))
          setTimeout(() => {
            navigate('/organizations')
          }, 100);
        }
        else if(res?.data?.role?.name ==='Director'){
          dispatch(setcurrentPage('/dashboard'))
          setTimeout(() => {
            navigate('/dashboard')
          }, 100);
        }
        }
    } catch (error: any) {
      toast.error(error?.message)
    }
  };
  return (
    <Box overflow={'auto'} sx={{boxShadow:'2px 2px 20px #3570FF'}} maxWidth={'450px'} className='w-75 mx-auto d-flex justify-content-center align-items-center'>
      <Box  className='d-flex h-100 p-3  flex-column justify-content-between align-items-center'>
        {/* <Box component={'img'} src={logo} height={{ xs: '80px', md: '120px' }} className='mb-4'></Box> */}
        <Box style={{ flex: 1 }} className='w-100 px-xxl-3   d-flex flex-column' justifyContent={{ xs: 'start', md: "center" }}>
          <Typography className='fs-32 f-bold text-center text-second' gutterBottom>Login to your Account</Typography>
          <Typography className='fs-16 text-dark text-center' gutterBottom>Welcome back to TRS. We are happy to see you again.</Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, handleChange, handleBlur, setFieldValue, values }) => (
              <Form className='w-100 my-2'>
                <Grid container spacing={2} className='w-100'>
                  <Grid size={12} className='form-input'>
                    <InputLabel className='label'>Email</InputLabel>
                    <TextField
                      fullWidth
                      id="email"
                      name="email"
                      placeholder='Enter your email address'
                      // label="First Name"
                      value={values.email}
                      onChange={handleChange}
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                    />
                  </Grid>

                  <Grid size={12} className='form-input'>
                    <InputLabel className='label'>Password</InputLabel>
                    <TextField
                      fullWidth
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      placeholder='Enter your password'
                      // label="First Name"
                      value={values.password}
                      onChange={handleChange}
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword((prev: boolean) => !prev)}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid size={12}>
                    <Button type='submit' fullWidth className='btn-main py-2'>Log In</Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
        {/* <Typography className='fs-14'>Don't have an Account? <a href='/signup' onClick={() => { dispatch(setcurrentPage('/signup')) }} className='text-main'>Signup here</a></Typography> */}
        {/* <Typography className='fs-14'>Don't have an Account? <a href='/dashboard' onClick={() => { dispatch(setcurrentPage('/dashboard')) }} className='text-main'>Signup here</a></Typography> */}
      </Box>
    </Box>
  )
}

export default Login
