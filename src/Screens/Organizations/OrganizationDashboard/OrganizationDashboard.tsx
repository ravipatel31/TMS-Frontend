import { ArrowDownwardOutlined, ArrowUpwardOutlined, KeyboardArrowDown } from '@mui/icons-material';
import { Box, Button, Dialog, DialogContent, DialogTitle, Divider, FormControlLabel, Grid, LinearProgress, Menu, MenuItem, Radio, RadioGroup, Table, TableBody, TableCell, TableHead, TableRow, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Projects from '../../../Assets/Images/Dashboard/TotalProjects.png'
import Team from '../../../Assets/Images/Dashboard/TotalTeam.png'
import Time from '../../../Assets/Images/Dashboard/Time.png'
import Accuracy from '../../../Assets/Images/Dashboard/Accuracy.png'
import PieChart from '../../Components/Charts/PieChart/PieChart';
import LineChart from '../../Components/Charts/LineChart/LineChart';
import { ApiGetOrganizationDashobard } from '../../../Core/Apicall';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';

function OrganizationDashboard() {

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const years = [2022, 2023, 2024, 2025, 2026];
  const [selectedMonth, setSelectedMonth] = useState<string>(dayjs().format("MMMM"));
  const [selectedYear, setSelectedYear] = useState<Number>(dayjs().year());

  const [monthAnchor, setMonthAnchor] = useState<null | HTMLElement>(null);
  const [yearAnchor, setYearAnchor] = useState<null | HTMLElement>(null);
  const [organizationDetails, setOrganizationDetails] = useState<any>([])

  const openMonth = Boolean(monthAnchor);
  const openYear = Boolean(yearAnchor);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const getOrganizationDashboard = async () => {
    try {
      const data = `?month=${months.indexOf(selectedMonth) + 1}&year=${selectedYear}`
      const res = await ApiGetOrganizationDashobard(data)
      setOrganizationDetails(res?.data)
    } catch (error: any) {
      toast.error(error?.message)
    }
  }
  useEffect(() => {
    if (selectedMonth && selectedYear) {
      getOrganizationDashboard()
    }
  }, [selectedMonth, selectedYear])
  return (
    <Box className='h-100 w-100 p-2 p-md-3 mx-auto' maxWidth={'1440px'} overflow={'auto'}>
      <Box className='d-flex align-items-center flex-wrap w-100 justify-content-between'>
        <Typography className='fs-20 fw-bold'>Dashboard</Typography>
        <Box className='d-flex align-items-center' gap={1}>
          <Typography className='fs-14 fw-bold'>Filter By:</Typography>
          <Box display="flex" gap={1}>

            {/* YEAR DROPDOWN */}
            <Box>
              <Button
                onClick={(e) => setYearAnchor(e.currentTarget)}
                endIcon={<KeyboardArrowDown />}
                className='fs-14 text-secondary'
                sx={{ textTransform: 'none' }}
              >
                {`Year: ${selectedYear}`}
              </Button>

              <Menu
                anchorEl={yearAnchor}
                open={openYear}
                onClose={() => setYearAnchor(null)}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
                PaperProps={{
                  sx: {
                    borderRadius: 3,
                    width: 200,
                    mt: 1
                  }
                }}
              >
                <Typography px={2} pt={1} className='fs-14' fontWeight={600}>
                  Select Year
                </Typography>

                {years.map((year) => (
                  <MenuItem
                    key={year}
                    onClick={() => {
                      setSelectedYear(year);
                      setYearAnchor(null);
                    }}
                  >
                    <Radio checked={selectedYear === year} />
                    <span className='fs-14'>{year}</span>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* MONTH DROPDOWN */}
            <Box>
              <Button
                onClick={(e) => setMonthAnchor(e.currentTarget)}
                endIcon={<KeyboardArrowDown />}
                sx={{ textTransform: "none", fontSize: "18px" }}
                aria-controls={openMonth ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={openMonth ? 'true' : undefined}
                className='fs-14 text-secondary'
              >
                Month: {selectedMonth}
              </Button>

              <Menu
                anchorEl={monthAnchor}
                open={openMonth}
                onClose={() => setMonthAnchor(null)}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
                PaperProps={{
                  sx: {
                    borderRadius: 3,
                    width: 220,
                    mt: 1
                  }
                }}
              >
                <Typography px={2} pt={1} fontWeight={600}>
                  <span className='fs-14'>  Select Month</span>
                </Typography>

                {months.map((month) => (
                  <MenuItem
                    key={month}
                    onClick={() => {
                      setSelectedMonth(month);
                      setMonthAnchor(null);
                    }}
                  >
                    <Radio checked={selectedMonth === month} />
                    <span className='fs-14'> {month}</span>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

          </Box>
        </Box>
      </Box>

      <Grid container className='mt-3 w-100' spacing={2}>
        <Grid size={{ xs: 12, md: 6, lg: 3 }} className='bg-white border-10 p-3'>
          <Box className='d-flex alig-items-start' gap={2}>
            <Box className='p-2 bg-light-main' borderRadius={'50%'} height={'fit-content'} >
              <Box height={'24px'} width={'24px'} component={'img'} src={Projects} className='m-0'></Box>
            </Box>
            <Box>
              <Typography className='fs-16' gutterBottom>Total Projects</Typography>
              <Typography className='fs-20 fw-bold' gutterBottom>8</Typography>
              <Box className='d-flex align-items-center'><ArrowUpwardOutlined className='fs-14' sx={{ fill: "green" }} /><span className='text-success fs-12'>&nbsp;8%</span><span className='fs-12'>&nbsp; this month</span></Box>

            </Box>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 3 }} className='bg-white border-10 p-3'>
          <Box className='d-flex alig-items-start' gap={2}>
            <Box className='p-2 bg-light-main' borderRadius={'50%'} height={'fit-content'} >
              <Box height={'24px'} width={'24px'} component={'img'} src={Team}></Box>
            </Box>
            <Box>
              <Typography className='fs-16' gutterBottom>Total Team Meber</Typography>
              <Typography className='fs-20 fw-bold' gutterBottom>{organizationDetails?.totalUsers}</Typography>
              <Box className='d-flex align-items-center'><ArrowUpwardOutlined className='fs-14' sx={{ fill: organizationDetails?.newUsersThisMonth > 0 ? "green":"#ccc" }} /><span className='text-success fs-12'>&nbsp;{organizationDetails?.newUsersThisMonth}</span><span className='fs-12'>&nbsp; New Hires</span></Box>
            </Box>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 3 }} className='bg-white border-10 p-3'>
          <Box className='d-flex alig-items-start' gap={2}>
            <Box className='p-2 bg-light-main' borderRadius={'50%'} height={'fit-content'} >
              <Box height={'24px'} width={'24px'} component={'img'} src={Time}></Box>
            </Box>
            <Box>
              <Typography className='fs-16' gutterBottom>Total Hours</Typography>
              <Typography className='fs-20 fw-bold' gutterBottom>487.6</Typography>
              <Box className='d-flex align-items-center'><ArrowUpwardOutlined className='fs-14' sx={{ fill: "green" }} /><span className='text-success fs-12'>&nbsp;8%</span><span className='fs-12'>&nbsp; this month</span></Box>
            </Box>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 3 }} className='bg-white border-10 p-3'>
          <Box className='d-flex alig-items-start' gap={2}>
            <Box className='p-2 bg-light-main' borderRadius={'50px'} height={'fit-content'} >
              <Box height={'24px'} width={'24px'} component={'img'} src={Accuracy}></Box>
            </Box>
            <Box>
              <Typography className='fs-14' gutterBottom>Accuracy</Typography>
              <Typography className='fs-20 fw-bold' gutterBottom>85%</Typography>
              <Box className='d-flex align-items-center'><ArrowDownwardOutlined className='fs-14' sx={{ fill: "red" }} /><span className='text-danger fs-12'>&nbsp;8%</span><span className='fs-12'>&nbsp; this month</span></Box>
            </Box>
          </Box>
        </Grid>

      </Grid>

      <Grid container className='mt-3 w-100' spacing={2}>
        <Grid size={{ xs: 12, md: 4 }} className='bg-white border-10 p-3'>
          <Typography className='fw-bold fs-18'>Project Status</Typography>
          <Box className='d-flex justify-content-center w-100'>
            <PieChart />
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 5 }} className='bg-white border-10 p-3'>
          <Typography className='fw-bold fs-18'>Monthly Logged Hours</Typography>
          <Box className='d-flex justify-content-center w-100'>
            <LineChart />
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 3 }} className='bg-white border-10 p-3'>
          <Typography className='fw-bold fs-18 mb-3' gutterBottom>Project Work Summary</Typography>
          <Box className='mb-2'>
            <Box className='d-flex align-items-center w-100 justify-content-between'>
              <Typography className='fs-16 bold'>Wolfpack</Typography>
              <Typography className='fs-18'>120 <span className='fs-14'>hrs</span></Typography>
            </Box>
            <progress id="file" className='w-100 custom-progress' value="32" max="100"> 32% </progress>
          </Box>
          <Box className='mb-2'>
            <Box className='d-flex align-items-center w-100 justify-content-between'>
              <Typography className='fs-16 bold'>Louca</Typography>
              <Typography className='fs-18'>150 <span className='fs-14'>hrs</span></Typography>
            </Box>
            <progress id="file" className='w-100 custom-progress' value="32" max="100"> 80% </progress>
          </Box>
          <Box className='mb-2'>
            <Box className='d-flex align-items-center w-100 justify-content-between'>
              <Typography className='fs-16 bold'>Mysterey Management</Typography>
              <Typography className='fs-18'>85<span className='fs-14'>hrs</span></Typography>
            </Box>
            <progress id="file" className='w-100 custom-progress' value="32" max="100"> 45% </progress>
          </Box>
          <Box className='mb-2'>
            <Box className='d-flex align-items-center w-100 justify-content-between'>
              <Typography className='fs-16 bold'>Wefroth</Typography>
              <Typography className='fs-18'>34 <span className='fs-14'>hrs</span></Typography>
            </Box>
            <progress id="file" className='w-100 custom-progress' value="32" max="100"> 31% </progress>
          </Box>
          <Divider
            sx={{
              borderStyle: "dashed",
              borderColor: "#3570FF",
            }}
          />
          <Box className='d-flex align-items-center w-100 mt-2 justify-content-between'>
            <Typography className='fs-16 bold'>Total Work Hours</Typography>
            <Typography className='fs-18'>245 <span className='fs-14'>hrs</span></Typography>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }} className='bg-white p-3 border-10'>
          <Typography className='fw-bold fs-18' gutterBottom>Top Performer</Typography>

          <Grid container className='w-100 border-10 mt-3 bg-light-main' alignItems="center">
            {["Name", "Tasks", "Hours", "Accuracy", "Status"].map((header, index) => (
              <Grid size={'grow'} className='p-2 px-3' key={index}>
                <Typography className='text-main fs-14' textAlign={index > 0 ? 'center' : 'start'} fontWeight={600}>
                  {header}
                </Typography>
              </Grid>
            ))}
          </Grid>
          <Grid container className='w-100' alignItems="center">
            {["Ravi Patel", "18", "450", "90%", "Very Good"].map((header, index) => (
              <Grid size={'grow'} className='p-2 px-3' key={index}>
                <Typography className='fs-14' textAlign={index > 0 ? 'center' : 'start'}>
                  {header}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }} className='bg-white border-10 p-3'>
          <Typography className='fw-bold fs-18 mb-3' gutterBottom>Upcoming Holidays</Typography>

          <Box bgcolor={'#cccccc1A'} className='border-10 py-2 px-3 mb-2 d-flex justify-content-between'>
            <Typography className='fs-14 fw-bold'>Holi</Typography>
            <Typography className='fs-14'>3-Mar</Typography>
          </Box>
          <Box bgcolor={'#cccccc1A'} className='border-10 py-2 px-3 mb-2 d-flex justify-content-between'>
            <Typography className='fs-14 fw-bold'>Ramnavmi</Typography>
            <Typography className='fs-14'>21-Mar</Typography>
          </Box>
          <Box bgcolor={'#cccccc1A'} className='border-10 py-2 px-3 mb-2 d-flex justify-content-between'>
            <Typography className='fs-14 fw-bold'>Dr. Ambedkar Jayanti</Typography>
            <Typography className='fs-14'>5-Apr</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default OrganizationDashboard
