import React, { useEffect, useState } from "react";
import {
    Box,
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    IconButton,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setcurrentPage } from "../../../Redux/Reducers/globalSlice";
import { RootState } from "../../../Redux/store";

const Dashboard = () => (
    <svg width="29" height="27" viewBox="0 0 29 27" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.94598 11.1935H8.32403C10.7021 11.1935 11.8911 10.0741 11.8911 7.8353V5.59649C11.8911 3.35768 10.7021 2.23828 8.32403 2.23828H5.94598C3.56793 2.23828 2.37891 3.35768 2.37891 5.59649V7.8353C2.37891 10.0741 3.56793 11.1935 5.94598 11.1935Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20.2136 11.1935H22.5916C24.9697 11.1935 26.1587 10.0741 26.1587 7.8353V5.59649C26.1587 3.35768 24.9697 2.23828 22.5916 2.23828H20.2136C17.8355 2.23828 16.6465 3.35768 16.6465 5.59649V7.8353C16.6465 10.0741 17.8355 11.1935 20.2136 11.1935Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20.2136 24.6271H22.5916C24.9697 24.6271 26.1587 23.5077 26.1587 21.2689V19.0301C26.1587 16.7913 24.9697 15.6719 22.5916 15.6719H20.2136C17.8355 15.6719 16.6465 16.7913 16.6465 19.0301V21.2689C16.6465 23.5077 17.8355 24.6271 20.2136 24.6271Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5.94598 24.6271H8.32403C10.7021 24.6271 11.8911 23.5077 11.8911 21.2689V19.0301C11.8911 16.7913 10.7021 15.6719 8.32403 15.6719H5.94598C3.56793 15.6719 2.37891 16.7913 2.37891 19.0301V21.2689C2.37891 23.5077 3.56793 24.6271 5.94598 24.6271Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>

)
const User = () => (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.1992 13.5875C15.0742 13.575 14.9242 13.575 14.7867 13.5875C11.8117 13.4875 9.44922 11.05 9.44922 8.05C9.44922 4.9875 11.9242 2.5 14.9992 2.5C18.0617 2.5 20.5492 4.9875 20.5492 8.05C20.5367 11.05 18.1742 13.4875 15.1992 13.5875Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8.95039 18.2C5.92539 20.225 5.92539 23.525 8.95039 25.5375C12.3879 27.8375 18.0254 27.8375 21.4629 25.5375C24.4879 23.5125 24.4879 20.2125 21.4629 18.2C18.0379 15.9125 12.4004 15.9125 8.95039 18.2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)
const Projects = () => (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.025 7.4625C3.4375 9.5625 2.5 12.175 2.5 15C2.5 21.9 8.1 27.5 15 27.5C21.9 27.5 27.5 21.9 27.5 15C27.5 8.1 21.9 2.5 15 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6.25 15C6.25 19.8375 10.1625 23.75 15 23.75C19.8375 23.75 23.75 19.8375 23.75 15C23.75 10.1625 19.8375 6.25 15 6.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15 20C17.7625 20 20 17.7625 20 15C20 12.2375 17.7625 10 15 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>

)
const MyProjects = () => (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M26.5875 24.125C26.4 26.0375 26.25 27.5 22.8625 27.5H7.13745C3.74995 27.5 3.59995 26.0375 3.41245 24.125L2.91245 17.875C2.81245 16.8375 3.13745 15.875 3.72495 15.1375C3.73745 15.125 3.73745 15.125 3.74995 15.1125C4.43745 14.275 5.47495 13.75 6.63745 13.75H23.3625C24.525 13.75 25.55 14.275 26.225 15.0875C26.2375 15.1 26.25 15.1125 26.25 15.125C26.8625 15.8625 27.2 16.825 27.0875 17.875L26.5875 24.125Z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M4.375 14.2871V7.84961C4.375 3.59961 5.4375 2.53711 9.6875 2.53711H11.275C12.8625 2.53711 13.225 3.01211 13.825 3.81211L15.4125 5.93711C15.8125 6.46211 16.05 6.78711 17.1125 6.78711H20.3C24.55 6.78711 25.6125 7.84961 25.6125 12.0996V14.3371" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M11.7871 21.25H18.2121" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)
const TimeSheet = () => (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M25.9375 16.5625C25.9375 22.6 21.0375 27.5 15 27.5C8.9625 27.5 4.0625 22.6 4.0625 16.5625C4.0625 10.525 8.9625 5.625 15 5.625C21.0375 5.625 25.9375 10.525 25.9375 16.5625Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15 10V16.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M11.25 2.5H18.75" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>

)
const MyTimeSheet = () => (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 27.5C8.1 27.5 2.5 21.9 2.5 15C2.5 8.1 8.1 2.5 15 2.5C21.9 2.5 27.5 8.1 27.5 15C27.5 21.9 21.9 27.5 15 27.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M19.6371 18.9742L15.7621 16.6617C15.0871 16.2617 14.5371 15.2992 14.5371 14.5117V9.38672" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>

)
const Team = () => (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.4996 8.95C22.4246 8.9375 22.3371 8.9375 22.2621 8.95C20.5371 8.8875 19.1621 7.475 19.1621 5.725C19.1621 3.9375 20.5996 2.5 22.3871 2.5C24.1746 2.5 25.6121 3.95 25.6121 5.725C25.5996 7.475 24.2246 8.8875 22.4996 8.95Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M21.2113 18.0502C22.9238 18.3377 24.8113 18.0377 26.1363 17.1502C27.8988 15.9752 27.8988 14.0502 26.1363 12.8752C24.7988 11.9877 22.8863 11.6877 21.1738 11.9877" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7.46406 8.95C7.53906 8.9375 7.62656 8.9375 7.70156 8.95C9.42656 8.8875 10.8016 7.475 10.8016 5.725C10.8016 3.9375 9.36406 2.5 7.57656 2.5C5.78906 2.5 4.35156 3.95 4.35156 5.725C4.36406 7.475 5.73906 8.8875 7.46406 8.95Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8.75078 18.0502C7.03828 18.3377 5.15078 18.0377 3.82578 17.1502C2.06328 15.9752 2.06328 14.0502 3.82578 12.8752C5.16328 11.9877 7.07578 11.6877 8.78828 11.9877" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14.9996 18.2879C14.9246 18.2754 14.8371 18.2754 14.7621 18.2879C13.0371 18.2254 11.6621 16.8129 11.6621 15.0629C11.6621 13.2754 13.0996 11.8379 14.8871 11.8379C16.6746 11.8379 18.1121 13.2879 18.1121 15.0629C18.0996 16.8129 16.7246 18.2379 14.9996 18.2879Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M11.3629 22.2242C9.60039 23.3992 9.60039 25.3242 11.3629 26.4992C13.3629 27.8367 16.6379 27.8367 18.6379 26.4992C20.4004 25.3242 20.4004 23.3992 18.6379 22.2242C16.6504 20.8992 13.3629 20.8992 11.3629 22.2242Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>

)
const Configuration = () => (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M15 18.75C12.9289 18.75 11.25 17.0711 11.25 15C11.25 12.9289 12.9289 11.25 15 11.25C17.0711 11.25 18.75 12.9289 18.75 15C18.75 17.0711 17.0711 18.75 15 18.75Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2.5 13.8998C2.5 12.5998 3.5625 11.5248 4.875 11.5248C7.1375 11.5248 8.0625 9.9248 6.925 7.9623C6.275 6.8373 6.6625 5.3748 7.8 4.7248L9.9625 3.4873C10.95 2.8998 12.225 3.2498 12.8125 4.2373L12.95 4.4748C14.075 6.4373 15.925 6.4373 17.0625 4.4748L17.2 4.2373C17.7875 3.2498 19.0625 2.8998 20.05 3.4873L22.2125 4.7248C23.35 5.3748 23.7375 6.8373 23.0875 7.9623C21.95 9.9248 22.875 11.5248 25.1375 11.5248C26.4375 11.5248 27.5125 12.5873 27.5125 13.8998V16.0998C27.5125 17.3998 26.45 18.4748 25.1375 18.4748C22.875 18.4748 21.95 20.0748 23.0875 22.0373C23.7375 23.1748 23.35 24.6248 22.2125 25.2748L20.05 26.5123C19.0625 27.0998 17.7875 26.7498 17.2 25.7623L17.0625 25.5248C15.9375 23.5623 14.0875 23.5623 12.95 25.5248L12.8125 25.7623C12.225 26.7498 10.95 27.0998 9.9625 26.5123L7.8 25.2748C6.6625 24.6248 6.275 23.1623 6.925 22.0373C8.0625 20.0748 7.1375 18.4748 4.875 18.4748C3.5625 18.4748 2.5 17.3998 2.5 16.0998V13.8998Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>

)
const Leave = () => (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 2.5V6.25" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20 2.5V6.25" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M26.25 10.625V21.25C26.25 25 24.375 27.5 20 27.5H10C5.625 27.5 3.75 25 3.75 21.25V10.625C3.75 6.875 5.625 4.375 10 4.375H20C24.375 4.375 26.25 6.875 26.25 10.625Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 13.75H20" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 20H15" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>

)
const Holiday = () => (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 2.5V6.25" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20 2.5V6.25" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4.375 11.3633H25.625" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M26.25 10.625V21.25C26.25 25 24.375 27.5 20 27.5H10C5.625 27.5 3.75 25 3.75 21.25V10.625C3.75 6.875 5.625 4.375 10 4.375H20C24.375 4.375 26.25 6.875 26.25 10.625Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M19.6186 17.125H19.6298" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M19.6186 20.875H19.6298" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14.9941 17.125H15.0053" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14.9941 20.875H15.0053" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10.3681 17.125H10.3794" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10.3681 20.875H10.3794" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>


)



const Sidebar = () => {
    const [open, setOpen] = useState(false);
    const [selectedMenue, setSelecetdMenue] = useState<string | null>(null)
    const { userDetails } = useSelector((state: RootState) => state.global)
    const theme = useTheme();
    const location = useLocation()
    const navigate = useNavigate()

    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
    const dispatch = useDispatch()
    const userRole = userDetails?.role?.name

    const menuItems = [
        { name: "Organizations", value: '/organizations', icon: <Dashboard />, roles: ["Admin"] },
        { name: "Dashboard", value: '/dashboard', icon: <Dashboard />, roles: ["Admin", "Director", "Employee"] },
        { name: "User", value: '/users', icon: <User />, roles: ["Director", "Employee"] },
        { name: "Projects", value: '/projects', icon: <Projects />, roles: ["Director", "Employee"] },
        { name: "My Projects", value: '/myprojects', icon: <MyProjects />, roles: ["Director", "Employee"] },
        { name: "Team", value: 'team', icon: <Team />, roles: ["Director", "Employee"] },
        { name: "Timesheet", value: '/timesheet', icon: <TimeSheet />, roles: ["Director", "Employee"] },
        { name: "My Timesheet", value: '/mytimesheet', icon: <MyTimeSheet />, roles: ["Director", "Employee"] },
        { name: "Configuration", value: '/configuration', icon: <Configuration />, roles: ["Director", "Employee"] },
        { name: "Leave", value: '/leave', icon: <Leave />, roles: ["Director", "Employee"] },
        { name: "Holiday", value: '/holiday', icon: <Holiday />, roles: ["Director", "Employee"] },
    ];

    useEffect(() => {
        const currentPath = location.pathname;

        const matchedMenu = menuItems.find(item =>
            currentPath.startsWith(item.value)
        );

        if (matchedMenu) {
            setSelecetdMenue(matchedMenu.value);
        }
    }, [location])

    const handleNavigate = (value: string) => {
        navigate(value)
        dispatch(setcurrentPage(value));
    }

    const drawerWidth = 220;

    const SidebarContent = (
        <Box
            sx={{
                width: drawerWidth,
                borderRight: '1px solid #E4E4E4'
            }}
            height={'calc(100vh - 60px)'}
            className='pt-2'
            overflow={'hidden'}

        >
            <List className="pe-3 ps-2 m-0 py-0" sx={{ overflow: 'auto', height: '100%' }} >
                {menuItems.map((item, index) => {
                    const isSelecetd = selectedMenue === item?.value
                    if (!item?.roles?.includes(userRole)) return null;
                    return (
                        <ListItemButton
                            key={index}
                            sx={{
                                flexDirection: isTablet ? "column" : "row",
                                justifyContent: "center",
                                alignItems: "center",
                                color: isSelecetd ? "white" : "#818299",
                                // background:'#4267E3',
                                py: '15px',
                                "&:hover": {
                                    bgcolor: "#4267E31A",
                                    color: "#818299 !important",
                                    borderRadius: '10px'
                                },
                            }}
                            className={`${isSelecetd ? 'bg-main border-10' : ''} mb-2`}
                            onClick={() => { handleNavigate(item?.value) }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: isTablet ? 0 : 2,
                                    mb: isTablet ? 1 : 0,
                                    color: "inherit",
                                }}
                            >
                                {item.icon}
                            </ListItemIcon>

                            <ListItemText
                                primary={
                                    <Typography
                                        className={`text-secondary fs-16 ${isSelecetd ? 'text-white' : ''}`}>
                                        {item.name}
                                    </Typography>
                                }
                            />
                        </ListItemButton>
                    )
                })}
            </List>
        </Box>
    );

    return (
        <>
            {/* Mobile Hamburger */}
            {isMobile && (
                <IconButton
                    onClick={() => setOpen(true)}
                    sx={{ position: "fixed", top: 10, left: 10 }}
                >
                    <MenuIcon />
                </IconButton>
            )}

            {/* Drawer for Mobile */}
            {isMobile ? (
                <Drawer open={open} onClose={() => setOpen(false)}>
                    {SidebarContent}
                </Drawer>
            ) : (
                <Box
                    sx={{
                        width: drawerWidth,
                        position: "fixed",
                        height: "100vh",
                    }}
                >
                    {SidebarContent}
                </Box>
            )}
        </>
    );
};

export default Sidebar;
