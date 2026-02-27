import { Box, Button, Checkbox, FormControl, FormControlLabel, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import logo from '../../../Assets/Images/logo.png'
import * as Yup from "yup";
import { Formik, FormikHelpers, Form } from 'formik';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setcurrentPage, setuserDetails } from '../../../Redux/Reducers/globalSlice';
import CalanderIcon from '../../../Assets/Images/calander.png'
import { ApiSendEmailOtp, ApiSignup } from '../../../Core/Apicall';
import { toast } from 'react-toastify';



interface FormValues {
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    dob: Date | null
    password: string;
    agree: boolean
}
function Signup() {

    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    // ----------------------------------------------------- Initial Values --------------------------------------------------
    const initialValues: FormValues = {
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        dob: null,
        password: "",
        agree: false
    };
    // ----------------------------------------------------- Validation Schema --------------------------------------------------
    const validationSchema = Yup.object({
        firstName: Yup.string().trim()
            .required("First name is required"),
        lastName: Yup.string().trim()
            .required("Last name is required"),
        email: Yup.string().trim()
            .email("Invalid email format")
            .required("Email is required"),
        password: Yup.string().trim()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),
        dob: Yup.date()
            .nullable()
            .required("Date of birth is required"),
        mobile: Yup.string().trim()
            .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits")
            .required("Date of birth is required"),
        agree: Yup.boolean()
            .oneOf([true], 'You must accept the Terms & Conditions')
            .required('You must accept the Terms & Conditions'),
    });
    // ----------------------------------------------------- Form Submission --------------------------------------------------
    const handleSubmit = async (
        values: FormValues,
    ) => {
        try {
            const data = {
                "name": `${values.firstName} ${values.lastName}`,
                "email": values.email,
                "mobile": values.mobile,
                "dob": values.dob,
                "password": values.password

            }
            const res = await ApiSignup(data)
            if (res.status) {
                dispatch(setuserDetails(res?.data?.user))
                const data2 = {
                    "email": values.email,
                }
                const res2 = await ApiSendEmailOtp(data2)
                if (res2.status) {
                    // console.log("Otp Data", res2.data)
                    dispatch(setcurrentPage('/otp'))
                    setTimeout(() => {
                        navigate('/otp')
                    }, 100);
                }
            }
        } catch (error: any) {
              toast.error(error?.message)
        }
    };
    return (
        <Box className='h-100 w-100 d-flex justify-content-center align-items-center'>
            <Box overflow={'auto'} gap={{ xs: 2, md: 4 }} className='d-flex h-100  w-100 p-3 p-xl-4 flex-column align-items-center'>
                <Box component={'img'} src={logo} height={{ xs: '80px', md: '120px' }} ></Box>
                <Box style={{ flex: 1 }} className='w-100'>
                    <Typography className='fs-32 f-bold text-center text-second' gutterBottom>Create an Account</Typography>
                    <Typography className='fs-16 text-light text-center' gutterBottom>Welcome to Roaring Picks. We need few details to get started!</Typography>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ errors, touched, handleChange, handleBlur, setFieldValue, values }) => (
                            <Form className='w-100 my-2'>
                                <Grid container spacing={2} className='w-100'>
                                    <Grid size={6} className='form-input'>
                                        <InputLabel className='label'>First Name</InputLabel>
                                        <TextField
                                            fullWidth
                                            id="firstName"
                                            name="firstName"
                                            placeholder='Enter your first name'
                                            // label="First Name"
                                            value={values.firstName}
                                            onChange={handleChange}
                                            error={touched.firstName && Boolean(errors.firstName)}
                                            helperText={touched.firstName && errors.firstName}
                                        />
                                    </Grid>
                                    <Grid size={6} className='form-input'>
                                        <InputLabel className='label'>Last Name</InputLabel>
                                        <TextField
                                            fullWidth
                                            id="lastName"
                                            name="lastName"
                                            // label="First Name"
                                            placeholder='Enter your last name'
                                            value={values.lastName}
                                            onChange={handleChange}
                                            error={touched.lastName && Boolean(errors.lastName)}
                                            helperText={touched.lastName && errors.lastName}
                                        />
                                    </Grid>
                                    <Grid size={12} className='form-input'>
                                        <InputLabel className='label'>Email</InputLabel>
                                        <TextField
                                            fullWidth
                                            id="email"
                                            name="email"
                                            // label="First Name"
                                            placeholder='Enter your email address'
                                            value={values.email}
                                            onChange={handleChange}
                                            error={touched.email && Boolean(errors.email)}
                                            helperText={touched.email && errors.email}
                                        />
                                    </Grid>
                                    <Grid size={12} className='form-input'>
                                        <InputLabel className='label'>Mobile</InputLabel>
                                        <TextField
                                            fullWidth
                                            id="mobile"
                                            name="mobile"
                                            // label="First Name"
                                            placeholder='Enter your mobile no'
                                            value={values.mobile}
                                            onChange={handleChange}
                                            error={touched.email && Boolean(errors.mobile)}
                                            helperText={touched.mobile && errors.mobile}
                                        />
                                    </Grid>
                                    <Grid size={12} className='form-input'>
                                        <InputLabel className='label'>Date of Birth</InputLabel>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DatePicker
                                                value={values.dob}
                                                onChange={(date) => setFieldValue("dob", date)}
                                                readOnly={false}
                                                format="dd/MM/yyyy"
                                                slots={{
                                                    openPickerIcon: () => <img src={CalanderIcon} alt="calendar" style={{ width: 24, height: 24 }} />
                                                }}
                                                slotProps={{
                                                    textField: {
                                                        fullWidth: true,
                                                        placeholder: 'Select your date of birth',
                                                        error: touched.dob && Boolean(errors.dob),
                                                        helperText: touched.dob && errors.dob,
                                                    },
                                                }}
                                            />
                                        </LocalizationProvider>
                                    </Grid>
                                    <Grid size={12} className='form-input'>
                                        <InputLabel className='label'>Password</InputLabel>
                                        <TextField
                                            fullWidth
                                            type={showPassword ? 'text' : 'password'}
                                            id="password"
                                            name="password"
                                            // label="First Name"
                                            placeholder='Create a password'
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
                                    <Grid size={12} className='form-input'>
                                        <FormControlLabel className='mb-0'
                                            control={
                                                <Checkbox
                                                    checked={values.agree}
                                                    onChange={(e) => setFieldValue("agree", e.target.checked)}
                                                    name="agree"
                                                />
                                            }
                                            label={
                                                <span className='fs-14 text-second'>
                                                    I have read and accept the{' '}
                                                    <a
                                                        href="/terms"
                                                        target="_blank"
                                                        className='text-main'
                                                    >
                                                        Terms & Conditions
                                                    </a>.
                                                </span>
                                            }
                                        />
                                        {touched.agree && Boolean(errors.agree) && (
                                            <FormHelperText error>{errors.agree}</FormHelperText>
                                        )}

                                    </Grid>
                                    <Grid size={12}>
                                        <Button type='submit' fullWidth className='btn-main py-2'>Sign Up</Button>
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

export default Signup
