import { Box, Grid } from '@mui/material'
import React, { Activity, ReactNode, useEffect } from 'react'
import Login from '../../Screens/Auth/Login/Login'
import coverPage from '../../Assets/Images/coverPage.png'
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
import { useLocation, useNavigate } from 'react-router-dom';
import NotFound from '../../Screens/FallBack/NotFound';

type AuthLayoutProps = {
    children: ReactNode;
};
function Authlayout({ children }: AuthLayoutProps) {
    const location = useLocation();
    const { currentPage } = useSelector((state: RootState) => state.global)
    const navigate = useNavigate()

    useEffect(() => {
        if (currentPage != location.pathname) {
            navigate('/')
            return
        }
    }, [])
    return (
        location?.pathname === currentPage || '/' ?
            <Box className='h-100 w-100'>
                <Grid container className='h-100 w-100 border border-primary d-flex align-items-center justify-content-center'>
                    <Grid size={{ xs: 12, md: 5, xl: 4.5 }}>
                        {children}
                    </Grid>
                    <Activity mode={location?.pathname === '/' ? 'hidden': 'visible'}>
                        <Grid display={{ xs: 'none', md: 'inline-block' }} size={{ xs: 0, md: 7, xl: 7.5 }} className='h-100 p-3 p-xl-4'>
                            <Box component={'img'} src={coverPage} className='w-100 h-100'></Box>
                        </Grid>
                    </Activity>
                </Grid>
            </Box>
            :
            <NotFound />
    )
}

export default Authlayout
