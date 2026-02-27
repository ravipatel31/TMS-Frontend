const api_url = process.env.REACT_APP_API_URL

export const login = `${api_url}/user/login`
export const createuser = `${api_url}/user/create-user`
export const getorganizations = `${api_url}/organization/get-organizationlist`
export const createorganizations = `${api_url}/organization/create-organization`
export const updateorganizations = `${api_url}/organization/update-organization`
export const deleteorganizations = `${api_url}/organization/delete-organization`
export const getuserDetails = `${api_url}/user/get-user-details`
export const updateDetails = `${api_url}/user/update-user-details`
export const getusers = `${api_url}/user/get-users`





export const signup = `${api_url}/auth/signup`
export const sendemailotp = `${api_url}/auth/send-email-otp`
export const verifyemailotp = `${api_url}/auth/verify-email-otp`
export const sendymobileotp = `${api_url}/auth/send-mobile-otp`
export const verifyymobileotp = `${api_url}/auth/verify-mobile-otp`


