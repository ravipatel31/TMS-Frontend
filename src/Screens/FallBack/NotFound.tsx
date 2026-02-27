import { Box } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function NotFound() {
    const navigate = useNavigate()
    return (
        <Box height={'100%'} className='w-100'  overflow={'hidden !important'}>
            <div className='w-100 h-100' style={{overflow:'hidden'}}>
                <div className="shape shape-red d-none d-xl-block"></div>
                <div className="shape shape-red-light d-none d-xl-block"></div>
                <div className="shape shape-red2 d-none d-xl-block"></div>
                <div className="shape shape-red-light2 d-none d-xl-block"></div>
                <div className="shape shape-blue"></div>
                <div className="shape shape-blue-small"></div>
                <div className="shape shape-beige"></div>

                <div className="container vh-100 w-100 d-flex align-items-center justify-content-center">
                    <div className="text-center position-relative">
                        <div className="error-code fs-72">404</div>
                        <h2 className="fw-bold mb-2 fs-28">Page not found</h2>
                        <p className="text-muted mb-4 fs-18">
                            Oops! The page you are looking for does not exist.
                            <br />
                            It might have been moved or deleted.
                        </p>

                        <button
                            className="btn btn-outline-custom fs-14"
                            onClick={() => navigate(-1)}
                        >
                            BACK 
                        </button>
                    </div>
                </div>
            </div>
        </Box>
    )
}

export default NotFound
