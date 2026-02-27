import { Box, Button, Divider, Grid, InputLabel, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik';
import React, { useEffect, useRef, useState } from 'react'
import { ApiCreateUser, ApiGetUserDetails, ApiUpdateUserDetails } from '../../../Core/Apicall';
import { toast } from 'react-toastify';
import * as Yup from "yup";
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Redux/store';
import dayjs from 'dayjs';




interface DirectorFormValues {
    firstName: string;
    lastName: string;
    email: string;
    contactNo: string;
    employeeId: string;
    joiningDate: Date | null;
    address: string;
    city: string;
    state: string;
    latitude: string;
    longitude: string;
}

function UserDetails() {

    const autocompleteRef = useRef<any>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [fulladdress, setfulladdress] = useState<string>('')
    const { userDetails } = useSelector((state: RootState) => state.global)
    const [userdata, setuserdata] = useState<any>([])
    const navigate = useNavigate()

    const location = useLocation();
    const { organizationId, userId } = location.state;


    const initialValues = {
        firstName: "",
        lastName: "",
        email: "",
        contactNo: "",
        address: "",
        joiningDate: null,
        employeeId: "",
        city: "",
        state: "",
        latitude: "",
        longitude: ""
    }

    const mapUserDataToFormValues = (data: any): DirectorFormValues => ({
        firstName: data?.firstName || "",
        lastName: data?.lastName || "",
        email: data?.email || "",
        contactNo: data?.contactNo || "",
        address: data?.address || "",
        joiningDate: data?.joiningDate || null,
        employeeId: data?.employeeId || "",
        city: data?.city || "",
        state: data?.state || "",
        latitude: data?.latitude || "",
        longitude: data?.longitude || ""
    });

    const validationSchema =
        Yup.object({
            firstName: Yup.string()
                .required("first name is required"),

            lastName: Yup.string()
                .required("last name is required"),

            email: Yup.string()
                .email("Invalid email format")
                .required("Email is required"),

            contactNo: Yup.string()
                .matches(/^[0-9]{10}$/, "Contact number must be 10 digits")
                .required("Contact number is required"),

            joiningDate: Yup.date()
                .required("Joining date  is required"),

            employeeId: Yup.string()
                .required("Employee Id is required"),

            address: Yup.string()
                .required("Address is required"),
        })


    const formik = useFormik<DirectorFormValues>({
        initialValues: userdata
            ? mapUserDataToFormValues(userdata)
            : initialValues,
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            handleSubmit(values)
        },
    });
    // console.log("Formik.values--->", formik.values)

    const handleSubmit = async (values: any) => {
        try {
            const res =
                !userId ?
                    await ApiCreateUser({
                        organizationId: organizationId,
                        ...values,
                    })
                    :
                    await ApiUpdateUserDetails({
                        userId,
                        ...values,
                    })

            if (res?.status) {
                toast.success(res?.message)
                navigate(-1)
                // setactiveOrganizationId(null)
                // setisuserCreate(false)
            }
        } catch (error: any) {
            toast.error(error?.message)
        }
    }

    useEffect(() => {

        const timer = setTimeout(() => {
            if (!inputRef.current || !window.google) return;

            autocompleteRef.current = new window.google.maps.places.Autocomplete(
                inputRef.current as HTMLInputElement,
                { types: ["geocode"], componentRestrictions: { country: "IN" } }
            );

            autocompleteRef.current.addListener("place_changed", () => {
                const place = autocompleteRef.current?.getPlace();
                if (!place || !place.formatted_address) return;

                if (place.geometry?.location) {
                    formik.setFieldValue("latitude", place.geometry.location.lat());
                    formik.setFieldValue("longitude", place.geometry.location.lng());
                }
                setfulladdress(place.formatted_address);

                place.address_components?.forEach((component: any) => {
                    const types = component.types;
                    if (types.includes("administrative_area_level_1")) {
                        formik.setFieldValue("state", component.long_name);
                    }
                    if (types.includes("locality")) {
                        formik.setFieldValue("city", component.long_name);
                    }
                });
                formik.setFieldValue("address", place.formatted_address);
            });
        }, 200); // give it 200ms to render

        return () => {
            clearTimeout(timer);
            if (autocompleteRef.current) {
                window.google.maps.event.clearInstanceListeners(autocompleteRef.current);
            }
        };
    }, []);

    useEffect(() => {
        const getUserDetails = async () => {
            try {
                const data = `/${userId}`
                const res = await ApiGetUserDetails(data)
                if (res?.status) {
                    const formattedData = {
                        ...res.data,
                        joiningDate: res.data.joiningDate
                            ? dayjs(res.data.joiningDate).format('YYYY-MM-DD')
                            : ""
                    };
                    setuserdata(formattedData)
                }

            } catch (error: any) {
                toast.error(error?.message)
            }
        }
     userId &&  getUserDetails()

    }, [userId])

    console.log("Form Values---->", formik.values)
    useEffect(() => {
        if (userdata) {
            setfulladdress(userdata?.address)
        }
    }, [userdata])



    return (
        <Box className='w-100 p-3 m-3 mx-5' maxWidth={'1440px'} overflow={'auto'}>
            <Typography className='fs-24  fw-bold mb-4' gutterBottom> {userId ? "Update" : "Create"} User</Typography>

            <Grid container spacing={4} className='bg-white border-20 p-4'>
                <Grid size={{ xs: 12, md: 8, xl: 6 }}>
                    <Box component="form" onSubmit={formik.handleSubmit}>
                        <Grid container spacing={3} className='form-input'>
                            {/* First Name */}
                            <Grid size={6}>
                                <InputLabel className='label'>First Name</InputLabel>
                                <TextField
                                    fullWidth
                                    name="firstName"
                                    value={formik.values.firstName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={
                                        formik.touched.firstName &&
                                        Boolean(formik.errors.firstName)
                                    }
                                    helperText={
                                        formik.touched.firstName &&
                                        formik.errors.firstName
                                    }
                                />
                            </Grid>

                            {/* Last Name */}
                            <Grid size={6}>
                                <InputLabel className='label'>Last Name</InputLabel>
                                <TextField
                                    fullWidth
                                    name="lastName"
                                    value={formik.values.lastName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={
                                        formik.touched.lastName &&
                                        Boolean(formik.errors.lastName)
                                    }
                                    helperText={
                                        formik.touched.lastName &&
                                        formik.errors.lastName
                                    }
                                />
                            </Grid>

                            {/* Email */}
                            <Grid size={6}>
                                <InputLabel className='label'>Email</InputLabel>
                                <TextField
                                    fullWidth
                                    name="email"
                                    type="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={
                                        formik.touched.email && Boolean(formik.errors.email)
                                    }
                                    helperText={
                                        formik.touched.email && formik.errors.email
                                    }
                                />
                            </Grid>

                            {/* Contact No */}
                            <Grid size={6}>
                                <InputLabel className='label'>Contact Number</InputLabel>
                                <TextField
                                    fullWidth
                                    name="contactNo"
                                    value={formik.values.contactNo}
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/\D/g, ""); // allow only numbers
                                        if (value.length <= 10) {
                                            formik.setFieldValue("contactNo", value);
                                        }
                                    }}
                                    onBlur={formik.handleBlur}
                                    error={
                                        formik.touched.contactNo &&
                                        Boolean(formik.errors.contactNo)
                                    }
                                    helperText={
                                        formik.touched.contactNo &&
                                        formik.errors.contactNo
                                    }
                                />
                            </Grid>

                            {/* Employee Id */}
                            <Grid size={6}>
                                <InputLabel className='label'>Employee Id</InputLabel>
                                <TextField
                                    fullWidth
                                    name="employeeId"
                                    value={formik.values.employeeId}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={
                                        formik.touched.employeeId &&
                                        Boolean(formik.errors.employeeId)
                                    }
                                    helperText={
                                        formik.touched.employeeId &&
                                        formik.errors.employeeId
                                    }
                                />
                            </Grid>


                            {/* Joining Date */}
                            <Grid size={6}>
                                <InputLabel className='label'>Joinning Date</InputLabel>
                                <TextField
                                    fullWidth
                                    name="joiningDate"
                                    type='date'
                                    value={formik.values.joiningDate}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={
                                        formik.touched.joiningDate &&
                                        Boolean(formik.errors.joiningDate)
                                    }
                                    helperText={
                                        formik.touched.joiningDate &&
                                        formik.errors.joiningDate
                                    }
                                />
                            </Grid>


                            {/* Address */}
                            <Grid size={6}>
                                <InputLabel className='label'>Address</InputLabel>
                                <TextField
                                    fullWidth
                                    type='text'
                                    name="address"
                                    inputRef={inputRef}
                                    value={fulladdress}
                                    onChange={(e) =>
                                        setfulladdress(e.target.value)
                                    }
                                    error={
                                        formik.touched.address &&
                                        Boolean(formik.errors.address)
                                    }
                                    helperText={
                                        formik.touched.address &&
                                        formik.errors.address
                                    }
                                />
                            </Grid>

                            {/* City */}
                            <Grid size={6}>
                                <InputLabel className='label'>City</InputLabel>
                                <TextField
                                    fullWidth
                                    disabled
                                    name="city"
                                    value={formik.values.city}
                                />
                            </Grid>

                            {/* State */}
                            <Grid size={6}>
                                <InputLabel className='label'>State</InputLabel>
                                <TextField
                                    fullWidth
                                    disabled
                                    name="state"
                                    value={formik.values.state}
                                />
                            </Grid>

                            {/* Submit Button */}
                            <Grid size={12}>
                                <Button
                                    fullWidth
                                    className='btn-main py-2 mt-3'
                                    type="submit"
                                >
                                    Submit
                                </Button>
                            </Grid>

                        </Grid>
                    </Box>
                </Grid>
                <Grid size='auto'>
                    <Divider orientation='vertical' className='h-100' sx={{ border: " 1px dashed #ccc" }} />
                </Grid>
                <Grid size='grow'>
                    <Box className='border border-10 m-auto' height={'300px'} width={'100%'} maxWidth={'300px'} ></Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default UserDetails
