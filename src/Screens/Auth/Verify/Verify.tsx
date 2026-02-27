import React from 'react'
import logo from '../../../Assets/Images/logo.png'
import * as Yup from "yup";
import { Formik, FormikHelpers, Form } from 'formik';
import { Box, Button, Divider, Grid, IconButton, InputAdornment, InputLabel, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setcurrentPage, setisMobileVerify } from '../../../Redux/Reducers/globalSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ApiSendMobileOtp } from '../../../Core/Apicall';
import { RootState } from '../../../Redux/store';

interface FormValues {

  contactNo: string;

}
function Verify() {
  const {userDetails} = useSelector((state:RootState)=>state.global)
  const dispatch = useDispatch()
  const navigate = useNavigate()

      // -------------------------------------------- Initalizations  ----------------------------------------------------------
  const initialValues: FormValues = {
    contactNo: userDetails?.mobile,
  };
 // -------------------------------------------- Validations  -----------------------------------------------------------
  const validationSchema = Yup.object({
    contactNo: Yup.string().trim()
      .min(10, "minimum 10 numbers required")
      .required("phone number is required"),
  });

  // -------------------------------------------- Form Submit  -----------------------------------------------------------
  const handleSubmit = async (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ) => {

    try {
      const data = {
        "mobile": values?.contactNo
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
  };

  return (
    <Box overflow={'auto'} className='h-100 w-100 d-flex justify-content-center align-items-center'>
      <Box className='d-flex h-100 w-100 p-3 p-xl-4 flex-column justify-content-between align-items-center'>
        <Box component={'img'} src={logo} height={{ xs: '80px', md: '120px' }} className='mb-4'></Box>
        <Box style={{ flex: 1 }} className='w-100 px-xxl-5  d-flex flex-column' justifyContent={{ xs: "start", md: 'center' }}>
          <Typography className='fs-32 f-bold text-center text-second' gutterBottom>Verify your Mobile</Typography>
          <Typography className='fs-16 text-light text-center' gutterBottom>Welcome back to Roaring Picks. We are happy to see you again.</Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ errors, touched, handleChange, handleBlur, setFieldValue, values }) => (
              <Form className='w-100 my-2'>
                <Grid container spacing={2} className='w-100'>
                  <Grid size={12} className='form-input'>
                    <InputLabel className='label'>Mobile</InputLabel>
                    <TextField
                      fullWidth
                      id="email"
                      name="email"
                      placeholder='Enter your mobile number'
                      // label="First Name"
                      value={values.contactNo}
                      disabled
                      onChange={(e) => {
                        const numericValue = e.target.value.replace(/[^0-9]/g, ''); // allow only numbers
                        if (numericValue.length <= 10) {
                          handleChange({
                            target: {
                              name: 'contactNo',
                              value: numericValue,
                            },
                          });
                        }
                      }}

                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Typography className="fs-16 text-second">+61</Typography>
                          </InputAdornment>
                        ),
                      }}
                      error={touched.contactNo && Boolean(errors.contactNo)}
                      helperText={touched.contactNo && errors.contactNo}
                    />
                  </Grid>
                  <Grid size={12}>
                    <Button type='submit' fullWidth className='btn-main py-2'>Send OTP</Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
        <Typography className='fs-14'>Already have an Account? <a href='/' className='text-main'>Login here</a></Typography>
      </Box>
    </Box>
  )
}

export default Verify
