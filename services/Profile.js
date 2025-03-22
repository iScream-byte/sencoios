import {deleteServiceAuthorized, getService, getServiceAuthorized, postService, postServiceAuthorized, postServiceFormData, postServiceFormDataAuthorized, putServiceAuthorized} from '../configs/FetchRequest';

const ProfileService = {};

ProfileService.getProfile = (id,token) => getServiceAuthorized(
    `/api/v1/profileNode/my/profile/${id}`,
     token
  );

  ProfileService.getPersonalInfo = (token) => getServiceAuthorized(
    `/api/v1/registrationProfileNode/user/profile`,
     token
  );
  ProfileService.updatePersonalInformation = (payload, token) => putServiceAuthorized(
    `/api/v1/registrationProfileNode/update/user/profile`,
    payload,
    token
  );
  ProfileService.sendOTP = (payload, token) => postServiceAuthorized(
    `/api/v1/registrationProfileNode/verify/contact/number`,
    payload,
    token
  );
  ProfileService.changePassword = (payload, token) => postServiceAuthorized(
    `/api/v1/registrationProfileNode/change/password`,
    payload,
    token
  );
  ProfileService.getAvailablePoints = (token) => getServiceAuthorized(
    `/api/v1/pointsNode/getAvailablePoints`,
    token
  );
  ProfileService.getCompanyDetails = (token) => getServiceAuthorized(
    `/api/v1/profileNode/get/company/detail`,
    token
  );
  ProfileService.getBrand = () => getService(
    `/api/v1/registrationProfileNode/get/brand`,
   // token
  );
  ProfileService.getWishlist = (token) => getServiceAuthorized(
    `/cartManagement/api/v1/wishlists`,
    token
  );

  ProfileService.updateEkycInformation = (payload, token) =>  putServiceAuthorized(
    `/api/v1/registrationProfileNode/update/user/kyc`,
    payload,
    token
  )

export default ProfileService;