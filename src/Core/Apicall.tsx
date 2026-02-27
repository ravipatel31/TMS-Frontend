import { baseApiCall } from './BaseApiCall'
import { createorganizations, createuser, deleteorganizations, getorganizations, getuserDetails, getusers, login, sendemailotp, sendymobileotp, signup, updateDetails, updateorganizations, verifyemailotp, verifyymobileotp } from './ApiEndPoint'

export const ApiLogin = (data: any) => {
  return baseApiCall({
    url: login,
    method: 'post',
    data
  })
}

export const ApiCreateUser = (data: any) => {
  return baseApiCall({
    url: createuser,
    method: 'post',
    data
  })
}

export const ApiGetOrganizationList = () => {
  return baseApiCall({
    url: getorganizations,
    method: 'get',
  })
}
export const ApiCreateOrganization = (data:any) => {
  return baseApiCall({
    url: createorganizations,
    method: 'post',
    data
  })
}
export const ApiUpdateOrganization = (data:any) => {
  return baseApiCall({
    url: updateorganizations,
    method: 'put',
    data
  })
}
export const ApiDeleteOrganization = (data:any) => {
  return baseApiCall({
    url: deleteorganizations,
    method: 'put',
    data
  })
}

export const ApiGetUserDetails = (data:any) => {
  return baseApiCall({
    url: getuserDetails + data,
    method: 'get',
  })
}
export const ApiUpdateUserDetails = (data:any) => {
  return baseApiCall({
    url: updateDetails,
    method: 'put',
    data
  })
}

export const ApiGetUser = (data?:any) => {
  return baseApiCall({
    url: getusers + data,
    method: 'get',
  })
}















export const ApiSignup = (data: any) => {
  return baseApiCall({
    url: signup,
    method: 'post',
    data
  })
}
export const ApiSendEmailOtp = (data: any) => {
  return baseApiCall({
    url: sendemailotp,
    method: 'post',
    data
  })
}
export const ApiSendMobileOtp = (data: any) => {
  return baseApiCall({
    url: sendymobileotp,
    method: 'post',
    data
  })
}
export const ApiVerifyEmailOtp = (data: any) => {
  return baseApiCall({
    url: verifyemailotp,
    method: 'post',
    data
  })
}
export const ApiVerifyMobileOtp = (data: any) => {
  return baseApiCall({
    url: verifyymobileotp,
    method: 'post',
    data
  })
}
// export const ApiGetUserDetails = () => {
//   return baseApiCall({
//     url: getuserDetails,
//     method: 'get',
//   })
// }


