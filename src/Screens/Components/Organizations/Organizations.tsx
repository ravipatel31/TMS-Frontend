import { CancelOutlined, Delete, DeleteOutline, Edit, MoreHorizOutlined, MoreVertOutlined, PersonAdd, PersonAddOutlined } from '@mui/icons-material'
import { Box, Button, Drawer, Grid, IconButton, InputLabel, Menu, MenuItem, TextField, Tooltip, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { ApiCreateOrganization, ApiCreateUser, ApiDeleteOrganization, ApiGetOrganizationList, ApiUpdateOrganization } from '../../../Core/Apicall'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import * as Yup from "yup";
import dayjs from 'dayjs'
import { tr } from 'date-fns/locale'
import { Link } from 'react-router-dom'


interface OrganizationFormValues {
    organizationName: string;
    registrationNumber: string;
    email: string;
    contactNo: string;
    address: string;
    city: string;
    state: string;
    latitude: string;
    longitude: string;
}


function Organizations() {
    const [organizationList, setOrganizationList] = useState<any[]>([])
    const [openDrawer, setopenDrawer] = useState<boolean>(false)
    const [isuserCreate, setisuserCreate] = useState<boolean>(false)
    const autocompleteRef = useRef<any>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [fulladdress, setfulladdress] = useState<string>('')
    const [activeOrganizationId, setactiveOrganizationId] = useState<number | null>(null)
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [selectedId, setSelectedId] = useState<number | null>(null);



    const handleClick = (
        event: React.MouseEvent<HTMLElement>,
        id: number
    ) => {
        setAnchorEl(event.currentTarget);
        setSelectedId(id);
    };


    const handleClose = () => {
        setAnchorEl(null);
        setSelectedId(null);
    };

    const getOrganizations = async () => {
        try {
            const res = await ApiGetOrganizationList()
            if (res?.status) {
                setOrganizationList(res?.data)
            }
        } catch (error: any) {
            toast.error(error?.message)
        }
    }

    const initialValues = {
        organizationName: "",
        registrationNumber: "",
        email: "",
        contactNo: "",
        address: "",
        city: "",
        state: "",
        latitude: "",
        longitude: ""
    }

    const validationSchema =
        Yup.object({
            organizationName: Yup.string()
                .required("Organization name is required"),

            registrationNumber: Yup.string()
                .required("Registration number is required"),

            email: Yup.string()
                .email("Invalid email format")
                .required("Email is required"),

            contactNo: Yup.string()
                .matches(/^[0-9]{10}$/, "Contact number must be 10 digits")
                .required("Contact number is required"),

            address: Yup.string()
                .required("Address is required"),
        })

    const handleSubmit = async (values: any) => {
        try {
            const res = activeOrganizationId ? await ApiUpdateOrganization({ organizationId: activeOrganizationId, ...values }) : await ApiCreateOrganization(values)
            if (res?.status) {
                setactiveOrganizationId(null)
                setopenDrawer(false)
                setisuserCreate(false)
                getOrganizations()
            }
        } catch (error: any) {
            toast.error(error?.message)
        }
    }


    const formik = useFormik<OrganizationFormValues>({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            handleSubmit(values)
        },
    });

    useEffect(() => {
        getOrganizations()
    }, [])

    useEffect(() => {
        if (!openDrawer) return;

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
    }, [openDrawer]);


    const handleOnClose = () => {
        setopenDrawer(false)
        setisuserCreate(false)
        setactiveOrganizationId(null)
        formik.setFieldValue('organizationName', '')
        formik.setFieldValue('registrationNumber', '')
        formik.setFieldValue('email', '')
        formik.setFieldValue('contactNo', '')
        formik.setFieldValue('address', '')
        formik.setFieldValue('city', '')
        formik.setFieldValue('state', '')
        formik.setFieldValue('latitude', '')
        formik.setFieldValue('longitude', '')
        setfulladdress('')

    }

    const updateOrganization = (value: any) => {
        formik.setFieldValue('organizationName', value?.organizationName)
        formik.setFieldValue('registrationNumber', value?.registrationNumber)
        formik.setFieldValue('email', value?.email)
        formik.setFieldValue('contactNo', value?.contactNo)
        formik.setFieldValue('address', value?.address)
        formik.setFieldValue('city', value?.city)
        formik.setFieldValue('state', value?.state)
        formik.setFieldValue('latitude', value?.latitude)
        formik.setFieldValue('longitude', value?.longitude)
        setactiveOrganizationId(value?.organizationId)
        setfulladdress(value?.address)
        setopenDrawer(true)
        setisuserCreate(false)

    }

    const handleDeleteOrganization = async (value: any) => {
        try {
            const isConfrim = window.confirm("Are you sure you want to delete this organization")
            if (!isConfrim) {
                return
            }
            const res = await ApiDeleteOrganization({ organizationId: value })
            if (res?.status) {
                getOrganizations()
            }
        } catch (error: any) {
            toast.error(error?.message)
        }
    }

    const addUser = (item: any) => {
        setactiveOrganizationId(item?.organizationId)
        setisuserCreate(true)
        setopenDrawer(true)
    }

    const editUser = (item: any) => {

    }


    return (
        <Box className='w-100 p-3 mx-auto' maxWidth={'1440px'}>
            <Box className='d-flex justify-content-between align-items-center mb-3'>
                <Typography className='fs-20 fw-bold'>Organization List</Typography>
                <Button className='btn-main px-3' onClick={() => { setopenDrawer(true); setisuserCreate(false); }}>+ Add Organization</Button>
            </Box>

            <Box className='p-3 bg-white border-20'>
                {organizationList?.length > 0 ? (
                    <>
                        <Grid container className='w-100 border-10 mt-3 bg-light-main' alignItems="center">
                            {["Organization Name", "Address", "Contact No", "Registration Number", "Director", "No of Projects", "No of Employee", "Actions"].map((header, index) => (
                                <Grid size={'grow'} className='p-2 px-3' key={index}>
                                    <Typography className='text-main fs-14' textAlign={index > 1 ? 'center' : 'start'} fontWeight={600}>
                                        {header}
                                    </Typography>
                                </Grid>
                            ))}
                        </Grid>

                        {organizationList?.map((item, index) => (
                            <Grid key={index} container borderBottom={'1px solid #ccc'} className='w-100' alignItems="center">
                                <Grid size={'grow'} className='p-2 px-3'>
                                    <Typography className='fs-14'>
                                        {item?.organizationName}
                                    </Typography>
                                </Grid>
                                <Grid size={'grow'} className='p-2 px-3'>
                                    <Tooltip title={item?.address || ''} placement="top">
                                        <Typography className='fs-14'>
                                            {item?.address?.length > 20 ? `${item.address.substring(0, 20)}...` : item?.address}
                                        </Typography>
                                    </Tooltip>
                                </Grid>

                                <Grid size={'grow'} className='p-2 px-3'>
                                    <Typography className='fs-14 text-center'>
                                        {item?.contactNo}
                                    </Typography>
                                </Grid>
                                <Grid size={'grow'} className='p-2 px-3'>
                                    <Typography className='fs-14 text-center'>
                                        {item?.registrationNumber}
                                    </Typography>
                                </Grid>
                                <Grid size={'grow'} className='p-2 px-3'>
                                    <Typography className='fs-14'>
                                        {item?.users && item?.users?.length > 0 ? (
                                            <>
                                                <Link to={'/organizations/userdetails'} state={{userId:item?.users?.[0]?.userId}}> {item?.users?.[0]?.firstName} {item?.users?.[0]?.lastName}</Link>
                                                <br />
                                                <span className='fs-12'>({item?.users?.[0]?.email})</span>
                                            </>
                                        ) : (
                                            '-'
                                        )}
                                    </Typography>
                                </Grid>
                                <Grid size={'grow'} className='p-2 px-3'>
                                    <Typography className='fs-14 text-center'>
                                        {item?.totalteamMeber ?? "-"}
                                    </Typography>
                                </Grid>
                                <Grid size={'grow'} className='p-2 px-3'>
                                    <Typography className='fs-14 text-center'>
                                        {item?.totalProjects ?? "-"}
                                    </Typography>
                                </Grid>
                                <Grid size={'grow'} className='p-2 px-3 d-flex justify-content-center' gap={2}>
                                    <IconButton
                                        id="basic-button"
                                        aria-controls={open ? 'basic-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                        onClick={(e) => { handleClick(e, index) }}
                                    >
                                        <MoreVertOutlined />
                                    </IconButton>
                                    <Menu
                                        id="basic-menu"
                                        anchorEl={anchorEl}
                                        open={open && index === selectedId}
                                        onClose={handleClose}
                                        slotProps={{
                                            list: {
                                                'aria-labelledby': 'basic-button',
                                            },
                                        }}
                                    >
                                        <MenuItem onClick={() => { handleDeleteOrganization(item?.organizationId) }} className='d-flex' sx={{ gap: 1 }}>Delete</MenuItem>
                                        <MenuItem onClick={() => { updateOrganization(item); setAnchorEl(null) }}>Edit Organization</MenuItem>
                                        <MenuItem>
                                            <Link to={'/organizations/userdetails'} style={{ textDecoration: 'none' }} className='text-dark' state={{organizationId: item?.organizationId,}}> Create Director</Link>
                                        </MenuItem>
                                    </Menu>
                                    {/* <IconButton className='m-0 p-0' onClick={() => { handleDeleteOrganization(item?.organizationId) }}><Delete sx={{ fill: 'red' }} /></IconButton>
                                    <IconButton className='m-0 p-0' onClick={() => { updateOrganization(item) }}><Edit sx={{ fill: "#3570FF" }} /></IconButton>
                                    {item?.users?.length < 1 && (<IconButton className='m-0 p-0' onClick={() => { addUser(item) }}><PersonAddOutlined sx={{ fill: "#3570FF" }} /></IconButton>)} */}
                                </Grid>
                            </Grid>
                        ))}
                    </>
                ) : (
                    <></>
                )}
            </Box>


            <Drawer
                anchor={'right'}
                open={openDrawer}
                onClose={handleOnClose}

            >
                <Box maxWidth={'500px'} className='p-3'>
                    <Box className='d-flex justify-content-between align-items-center'>
                        <Typography variant="h5" mb={3} fontWeight={600}>
                            {isuserCreate ? "User" : "Organization"} Detail
                        </Typography>
                        <IconButton onClick={handleOnClose}>
                            <CancelOutlined />
                        </IconButton>
                    </Box>

                    <Box component="form" onSubmit={formik.handleSubmit}>
                        <Grid container spacing={3} className='form-input'>
                            {/* Organization Name */}
                            <Grid size={12}>
                                <InputLabel className='label'>Organization Name</InputLabel>
                                <TextField
                                    fullWidth
                                    name="organizationName"
                                    value={formik.values.organizationName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={
                                        formik.touched.organizationName &&
                                        Boolean(formik.errors.organizationName)
                                    }
                                    helperText={
                                        formik.touched.organizationName &&
                                        formik.errors.organizationName
                                    }
                                />
                            </Grid>

                            {/* Registration Number */}
                            <Grid size={12}>
                                <InputLabel className='label'>Registration Number</InputLabel>
                                <TextField
                                    fullWidth
                                    name="registrationNumber"
                                    value={formik.values.registrationNumber}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={
                                        formik.touched.registrationNumber &&
                                        Boolean(formik.errors.registrationNumber)
                                    }
                                    helperText={
                                        formik.touched.registrationNumber &&
                                        formik.errors.registrationNumber
                                    }
                                />
                            </Grid>

                            {/* Email */}
                            <Grid size={12}>
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
                            <Grid size={12}>
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

                            {/* Address */}
                            <Grid size={12}>
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
                            <Grid size={12}>
                                <InputLabel className='label'>City</InputLabel>
                                <TextField
                                    fullWidth
                                    disabled
                                    name="city"
                                    value={formik.values.city}
                                />
                            </Grid>

                            {/* State */}
                            <Grid size={12}>
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
                                    {activeOrganizationId ? "Update" : "Submit"}
                                </Button>
                            </Grid>

                        </Grid>
                    </Box>
                </Box>
            </Drawer>
        </Box>
    )
}

export default Organizations
