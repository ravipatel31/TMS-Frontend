import React, { useEffect, useRef } from "react";
import logo from "../../../Assets/Images/logo.png";
import * as Yup from "yup";
import { Formik, FormikHelpers, Form } from "formik";
import {
  Box,
  Button,
  Grid,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setcurrentPage, setisMobileVerify } from "../../../Redux/Reducers/globalSlice";
import { RootState } from "../../../Redux/store";
import { ApiSendEmailOtp, ApiSendMobileOtp, ApiVerifyEmailOtp, ApiVerifyMobileOtp } from "../../../Core/Apicall";
import { toast } from "react-toastify";

interface FormValues {
  otp: string[];
}


function Otp() {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isMobileVerify, userDetails } = useSelector((state: RootState) => state.global)

   // -------------------------------------------- Initializations  -----------------------------------------------------------
  const initialValues: FormValues = {
    otp: Array(6).fill(""),
  };

    // -------------------------------------------- Validation  -----------------------------------------------------------
  const validationSchema = Yup.object({
    otp: Yup.array()
      .of(Yup.string().matches(/^[0-9]$/, "Must be a number"))
      .test("len", "OTP must be 6 digits", (arr) => arr?.join("").length === 6),
  });

 // -------------------------------------------- Submit Otp  -----------------------------------------------------------
  const handleSubmit = async (
    values: FormValues,
  ) => {
    const otpValue = values.otp.join("");
    try {
      const data =
      {
        "email": userDetails?.email,
        "otp": values.otp.join("")
      }
      const data2 =
      {
        "mobile": userDetails?.mobile,
        "otp": values.otp.join("")
      }
      const res = !isMobileVerify ? await ApiVerifyEmailOtp(data) : await ApiVerifyMobileOtp(data2)
      if (res.status) {
        if (isMobileVerify) {
          dispatch(setcurrentPage('/dashboard'))
          dispatch(setisMobileVerify(false))
          setTimeout(() => {
            navigate('/dashboard')
          }, 100);
        }
        else {
          dispatch(setcurrentPage('/verify'))
          setTimeout(() => {
            navigate('/verify')
          }, 100);
        }
      }

    } catch (error: any) {
      toast.error(error?.message)
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    values: FormValues,
    setFieldValue: (field: string, value: any) => void
  ) => {
    const { value } = e.target;
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...values.otp];
    newOtp[index] = value;
    setFieldValue("otp", newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

    // -------------------------------------------- BackSpace Functions  -----------------------------------------------------------
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
    values: FormValues,
    setFieldValue: (field: string, value: any) => void
  ) => {
    if (e.key === "Backspace" && !values.otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // -------------------------------------------- Send Email Otp -----------------------------------------------------------
  const handleSendEmailOtp = async () => {

    const data2 = {
      "email": userDetails?.email,
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

    // -------------------------------------------- Send Mobile Otp -----------------------------------------------------------

  const handleSendMobileOtp = async () => {

    try {
      const data = {
        "mobile": userDetails?.email
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

  return (
    <Box overflow={'auto'} className="h-100 w-75 d-flex justify-content-center align-items-center">
      <Box className="d-flex h-100 w-100 p-3 p-xl-4 flex-column justify-content-between align-items-center">
        {/* <Box
          component={"img"}
          src={logo}
          height={{ xs: "80px", md: "120px" }}
          className="mb-4"
        ></Box> */}

        <Box
          style={{ flex: 1 }}
          justifyContent={{ xs: "start", md: 'center' }}
          className="w-100 px-xxl-5 d-flex flex-column"
        >
          <Typography
            className="fs-32 f-bold text-center text-second"
            gutterBottom
          >
            Verify your {isMobileVerify ? 'Mobile' : "Email"}
          </Typography>
          <Typography
            className="fs-16 text-light text-center mb-3"
            gutterBottom
          >
            We have shared OTP on your {isMobileVerify ? 'mobile number' : "email id"}.
          </Typography>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue, errors, touched }) => (
              <Form className="w-100 my-2">
                <Box width={'fit-content'} className='form-input'>
                  <InputLabel className="label">Otp</InputLabel>
                  <Grid
                    container
                    width={'fit-content'}
                    spacing={2}
                    justifyContent="center"
                  >
                    {values.otp.map((digit, index) => (
                      <Grid size={{ xs: 2, sm: 2 }} className='form-input' key={index}>
                        <TextField
                          inputRef={(el) => (inputRefs.current[index] = el)}
                          value={digit}
                          onChange={(e: any) =>
                            handleChange(e, index, values, setFieldValue)
                          }
                          onKeyDown={(e: any) =>
                            handleKeyDown(e, index, values, setFieldValue)
                          }
                          inputProps={{
                            maxLength: 1,
                            style: {
                              textAlign: "center",
                              fontSize: "24px",
                              fontWeight: "bold",
                            },
                          }}
                          error={Boolean(errors.otp && touched.otp)}
                        />
                      </Grid>
                    ))}
                  </Grid>
                  <Box className='d-flex justify-content-end mt-2'><a className="text-main fs-14"  onClick={()=>{isMobileVerify ? handleSendMobileOtp () :handleSendEmailOtp() }}>Resend OTP</a></Box>
                </Box>

                <Box className="mt-4">
                  <Button type="submit" fullWidth className="btn-main py-2">
                    Submit
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>

        <Typography className="fs-14">
          Already have an Account?{" "}
          <a href="/" className="text-main">
            Login here
          </a>
        </Typography>
      </Box>
    </Box>
  );
}

export default Otp;
