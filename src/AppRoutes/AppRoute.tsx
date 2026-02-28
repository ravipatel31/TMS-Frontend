import { Box } from '@mui/material'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Signup from '../Screens/Auth/Signup/Signup'
import Authlayout from '../Layout/AuthLayout/Authlayout'
import Login from '../Screens/Auth/Login/Login'
import Verify from '../Screens/Auth/Verify/Verify'
import Otp from '../Screens/Auth/Otp/Otp'
import Mainlayout from '../Layout/MainLayout/Mainlayout'
import NotFound from '../Screens/FallBack/NotFound'
import Organizations from '../Screens/Components/Organizations/Organizations'
import UserDetails from '../Screens/Components/UserDetails/UserDetails'
import OrganizationDashboard from '../Screens/Organizations/OrganizationDashboard/OrganizationDashboard'
import OrganizationUsers from '../Screens/Organizations/OrganizationUsers/OrganizationUsers'

function AppRoute() {
    return (
        <Box className='h-100 w-100'>
            <Routes>
                <Route path='/'
                    element={
                        <Authlayout>
                            <Login />
                        </Authlayout>
                    } />
                <Route path='/signup'
                    element={
                        <Authlayout>
                            <Signup />
                        </Authlayout>
                    } />
                <Route path='/verify'
                    element={
                        <Authlayout>
                            <Verify />
                        </Authlayout>
                    } />
                <Route path='/otp'
                    element={
                        <Authlayout>
                            <Otp />
                        </Authlayout>
                    } />
                <Route path='/organizations'
                    element={
                        <Mainlayout allowedRoles={["Admin"]}>
                            <Organizations />
                        </Mainlayout>
                    } />

                <Route path='/organizations/userdetails'
                    element={
                        <Mainlayout allowedRoles={["Admin"]}>
                            <UserDetails />
                        </Mainlayout>
                    } />
                <Route path='/users/userdetails'
                    element={
                        <Mainlayout allowedRoles={["Director"]}>
                            <UserDetails />
                        </Mainlayout>
                    } />

                <Route path='/dashboard'
                    element={
                        <Mainlayout allowedRoles={["Admin","Director"]}>
                            <OrganizationDashboard />
                        </Mainlayout>
                    } />
                <Route path='/users'
                    element={
                        <Mainlayout allowedRoles={["Admin", "Director"]}>
                            <OrganizationUsers />
                        </Mainlayout>
                    } />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Box>
    )
}

export default AppRoute
