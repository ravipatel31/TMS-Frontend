import { KeyboardArrowDown, MoreHorizOutlined, SearchRounded } from '@mui/icons-material'
import { Avatar, Box, Button, Chip, Grid, IconButton, InputAdornment, Menu, MenuItem, Radio, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from '../../../Redux/store'
import { ApiDeleteUser, ApiGetUser } from '../../../Core/Apicall'
import { toast } from 'react-toastify'
// import ConfirmDialog from '../Dialog/ConfrimDialog'

function OrganizationUsers() {
  const [selectedMenue, setSelectedMenue] = useState<string>('usermanagement')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const status = [
    "Active", "InActive", "All"
  ];

  const roles = ["Employee"];
  const [selectedStatus, setSelectedStatus] = useState<String>("All");
  const [selectedRole, setSelectedRole] = useState<string>("Employee");

  const [statusAnchor, setStatusAnchor] = useState<null | HTMLElement>(null);
  const [roleAnchor, setRoleAnchor] = useState<null | HTMLElement>(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { userDetails } = useSelector((state: RootState) => state.global)
  const openStatus = Boolean(statusAnchor);
  const openYear = Boolean(roleAnchor);
  const [users, setUsers] = useState<any[]>([])
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  const getUserDetails = async () => {
    try {
      const data = `?status=${selectedStatus.toLocaleLowerCase()}${debouncedSearch ? `&searchTerm=${debouncedSearch}`:""}`
      const res = await ApiGetUser(data)
      if (res?.status) {
        setUsers(res?.data?.filter((item: any) => item?.role.name !== "Director"))
      }
    } catch (error: any) {
      toast.error(error?.message)
    }
  }

  useEffect(() => {
   if(!debouncedSearch) getUserDetails()
  }, [selectedStatus, debouncedSearch])

  useEffect(() => {
    if (!debouncedSearch) return;

    getUserDetails();
  }, [debouncedSearch]);

  const handleChangeUserStatus = async (userId: number, status: string) => {
    const isConfirm = window.confirm(`Are you sure you want to ${status} this user ?`)
    if (isConfirm) {
      setAnchorEl(null)
      try {
        const data = {
          userId,
          status,

        }
        const res = await ApiDeleteUser(data)
        if (res?.status) {
          getUserDetails()
        }
      } catch (error: any) {
        toast.error(error?.message)
      }
    }
  }

  return (
    // p-2 p-md-3
    // maxWidth={'1320px'}
    <Box className='h-100 w-100 p-0' overflow={'auto'}>
      <Box className='d-flex align-items-center m-0 p-0 bg-white' position={'sticky'} top={0}>
        <ToggleButtonGroup value={selectedMenue} onChange={(e: any) => { setSelectedMenue(e.target.value) }}>
          <ToggleButton value={'usermanagement'} className='border-0 fs-16 fw-bold bg-transparent' sx={{ borderRadius: '0px', textTransform: 'none', borderBottom: selectedMenue === 'usermanagement' ? '2px solid #3570FF !important' : '', color: selectedMenue === 'usermanagement' ? '#3570FF !important' : '' }} >
            User Management
          </ToggleButton>
          <ToggleButton value={'usereport'} className='border-0 fs-16 fw-bold bg-transparent' sx={{ borderRadius: '0px', textTransform: 'none', borderBottom: selectedMenue === 'usereport' ? '2px solid #3570FF !important' : '', color: selectedMenue === 'usereport' ? '#3570FF !important' : '' }} >
            User Report
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box className='p-4 mx-auto' maxWidth={'1440px'}>
        <Typography className='fw-bold fs-24' gutterBottom>
          {selectedMenue == 'usermanagement' ? "User Management" : "User Report"}
        </Typography>
        <Typography className='fs-14 text-secondary'>Projects that are either created by you or are assigned to you will be listed here. If project is not in use anymore, you can archive and it will be removed from this list</Typography>
        <Grid container className='my-4 justify-content-between'>
          <Grid size={3} maxWidth={'300px'} sx={{ overflow: 'hidden' }} className='form-input bg-white'>
            <TextField
              className='bg-white'
              fullWidth
              type='text'
              placeholder='Search by Employee Name, Id'
              // label="First Name"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value) }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                    >
                      <SearchRounded sx={{ fill: "#0000009A !important" }} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid size='auto'>
            <Box className='d-flex align-items-center' gap={1}>
              <Typography className='fs-14 fw-bold'>Filter By:</Typography>
              <Box display="flex" gap={1}>

                {/* YEAR DROPDOWN */}
                <Box>
                  <Button
                    onClick={(e) => setRoleAnchor(e.currentTarget)}
                    endIcon={<KeyboardArrowDown />}
                    className='fs-14 text-secondary'
                    sx={{ textTransform: 'none' }}
                  >
                    {`Role: ${selectedRole}`}
                  </Button>

                  <Menu
                    anchorEl={roleAnchor}
                    open={openYear}
                    onClose={() => setRoleAnchor(null)}
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
                      Select Role
                    </Typography>

                    {roles.map((role) => (
                      <MenuItem
                        key={role}
                        onClick={() => {
                          setSelectedRole(role);
                          setRoleAnchor(null);
                        }}
                      >
                        <Radio checked={selectedRole === role} />
                        <span className='fs-14'>{role}</span>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>

                {/* Status DROPDOWN */}
                <Box>
                  <Button
                    onClick={(e) => setStatusAnchor(e.currentTarget)}
                    endIcon={<KeyboardArrowDown />}
                    sx={{ textTransform: "none", fontSize: "18px" }}
                    aria-controls={openStatus ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={openStatus ? 'true' : undefined}
                    className='fs-14 text-secondary'
                  >
                    Status: {selectedStatus}
                  </Button>

                  <Menu
                    anchorEl={statusAnchor}
                    open={openStatus}
                    onClose={() => setStatusAnchor(null)}
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
                      <span className='fs-14'>Select Status</span>
                    </Typography>

                    {status.map((status) => (
                      <MenuItem
                        key={status}
                        onClick={() => {
                          setSelectedStatus(status);
                          setStatusAnchor(null);
                        }}
                      >
                        <Radio checked={selectedStatus === status} />
                        <span className='fs-14'> {status}</span>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>

                <Button className='btn-main px-3'>
                  <Link to={'/users/userdetails'} style={{ textDecoration: 'none' }} className='text-white' state={{ organizationId: userDetails?.organization?.organizationId }}> Create Employee</Link>
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>


        <Grid container spacing={2}>
          {users?.map((user: any, index: number) => (
            <Grid size={{ xs: 12, md: 6, lg: 4, xl: 3 }} key={index} className='bg-white border-10 p-3 pb-5'>
              <Box className='d-flex align-items-center justify-content-between'>
                <Chip className="text-color px-3 py-3" sx={{ borderRadius: '8px', background: user?.isActive ? "#39CA941A" : "#E217171A", color: user?.isActive ? "#39CA94" : "#E21717" }} label={user?.isActive ? "Active" : "InActive"} size="small" />
                <IconButton
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={(e) => { setAnchorEl(e.currentTarget); setSelectedId(index) }}
                >
                  <MoreHorizOutlined />
                </IconButton>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open && index === selectedId}
                  onClose={() => { setAnchorEl(null) }}
                  slotProps={{
                    list: {
                      'aria-labelledby': 'basic-button',
                    },
                  }}
                >
                  <MenuItem onClick={() => { handleChangeUserStatus(user?.userId, user?.isActive ? "delete" : "active") }}>{user?.isActive ? "DeActivate" : "Activate"}</MenuItem>
                  <MenuItem>
                    <Link to={'/organizations/userdetails'} style={{ textDecoration: 'none' }} className='text-dark' state={{ userId: user?.userId, }}>Edit</Link>
                  </MenuItem>

                </Menu>

              </Box>
              <Box className='mx-auto d-flex flex-column align-items-center' gap={1}>
                <Avatar sx={{ height: "72px", width: "72px" }}>{user?.firstName[0]}{user?.lastName[0]}</Avatar>
                <Typography className='text-center text-main fs-20' gutterBottom>{user?.firstName} {user?.lastName}</Typography>
                <Typography className='text-center fs-14' gutterBottom>{user?.email}</Typography>
                <Typography className='text-center bg-secondary px-3 py-1 fs-16' gutterBottom>EmployeeId: {user?.Employee?.employeeId ?? "N/A"}</Typography>
                <Typography className='text-center px-2 fs-16' gutterBottom><span className='text-main'>Role:</span> {user?.role?.name}</Typography>
              </Box>
            </Grid>
          ))}

        </Grid>

      </Box>

    </Box>
  )
}

export default OrganizationUsers
