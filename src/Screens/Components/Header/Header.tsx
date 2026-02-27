import { ArrowDropDown, ArrowDropDownOutlined, CheckRounded, Logout, Settings } from '@mui/icons-material';
import { Avatar, Box, Divider, IconButton, ListItemIcon, Menu, MenuItem, Typography } from '@mui/material'
import React from 'react'
import logo from '../../../Assets/Images/logo.png'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../Redux/store';
import Organizations from '../Organizations/Organizations';
import { useLocation, useNavigate } from 'react-router-dom';
import { setcurrentPage, setuserDetails } from '../../../Redux/Reducers/globalSlice';

function Header() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const { userDetails } = useSelector((state: RootState) => state.global)
    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        dispatch(setuserDetails(null))
        dispatch(setcurrentPage('/'))
        setTimeout(() => {
            navigate('/')
        }, 100);
        setAnchorEl(null);
    };

    const lastPath:any = location.pathname
        .split("/")
        .filter(Boolean)
        .pop();

    return (
        <Box className='w-100 m-0 p-0' height={'60px'} sx={{ boxShadow: '0 1px 0px  #E4E4E4' }}>
            <Box className='d-flex align-items-center h-100 pe-2'>
                <Box className='d-flex align-items-center justify-content-center m-0 p-0' gap={1} width={'30%'} maxWidth={'218px'}>
                    <Box className='d-flex flex-column'>
                        <Box component={'img'} src={logo} height={'24px'} />
                    </Box>
                    <Typography className='fs-20 fw-bold text-dark text-center'>TMS</Typography>
                </Box>
                <Box flex={1} className='d-flex align-items-center justify-content-between ps-4 pe-3' borderLeft={'1px solid #E4E4E4'}>
                    <Typography className="fs-20 fw-bold">
                          {lastPath?.charAt(0).toUpperCase() + lastPath?.slice(1)}
                    </Typography>
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2, ":hover": { background: 'transparent' } }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Box className='d-flex align-items-center' gap={1}>
                            <Avatar src='#' className='fs-14'>{userDetails?.firstName[0]}{userDetails?.lastName[0]}</Avatar>

                            <Box>
                                <Typography className='fs-16 text-dark'>{userDetails?.firstName}&nbsp;{userDetails?.lastName}</Typography>
                                <Typography className='fs-12 text-start text-main'>{userDetails?.role?.name}</Typography>
                            </Box>
                            <ArrowDropDownOutlined />
                        </Box>
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        slotProps={{
                            paper: {
                                elevation: 0,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    '& .MuiAvatar-root': {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                    '&::before': {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: 'background.paper',
                                        transform: 'translateY(-50%) rotate(45deg)',
                                        zIndex: 0,
                                    },
                                },
                            },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <MenuItem onClick={handleClose}>
                            <Avatar src='#' className='p-1 fs-12'>{userDetails?.firstName[0]}{userDetails?.lastName[0]}</Avatar> {userDetails?.firstName}&nbsp;{userDetails?.lastName}
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                <Settings fontSize="small" sx={{ color: '#3570FF' }} />
                            </ListItemIcon>
                            Settings
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                <Logout fontSize="small" sx={{ color: '#3570FF' }} />
                            </ListItemIcon>
                            Logout
                        </MenuItem>
                    </Menu>
                </Box>
            </Box>


        </Box>
    )
}

export default Header
