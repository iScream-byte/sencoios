import {getService, getServiceAuthorized, postService, postServiceAuthorized, postServiceFormData, postServiceFormDataAuthorized} from '../configs/FetchRequest';

const RegistrationService = {};


// const loginPort = 9003;

RegistrationService.getStores = (payload) => postServiceFormData(
  `Masters/Stores`,
  payload,
);
 

RegistrationService.getInfluencers = (personaId, token) => getServiceAuthorized(
  `/api/v1/salesNode/sale/get/all/contractors/${personaId}`,
  token
)
RegistrationService.saveUser = (payload) => postServiceFormData(
  `User/CheckUser`,
  payload,
);
RegistrationService.getOTP = (payload) => postServiceFormData(
  `User/ResendOTP`,
  payload,
);
RegistrationService.login = (payload) => postServiceFormData(
  `User/UserLogin`,
  payload,
);
RegistrationService.MonthlyPerformanceList = (payload) => postServiceFormData(
  `Performance/MonthlyPerformance`,
  payload,
);
RegistrationService.QuaterlyPerformanceList = (payload) => postServiceFormData(
  `Performance/QuaterlyPerformance`,
  payload,
);
RegistrationService.YearlyPerformanceList = (payload) => postServiceFormData(
  `Performance/YearlylyPerformance`,
  payload,
);
RegistrationService.StorePerformance = (payload) => postServiceFormData(
  `Store/StorePerformance`,
  payload,
);

RegistrationService.GetTotalIncentive = (payload) => postServiceFormData(
  `Incentive/EmpIncentive`,
  payload,
);
RegistrationService.GetDeductionData = (payload) => postServiceFormData(
  `Incentive/EmpDeduction`,
  payload,
);
RegistrationService.Search = (payload) => postServiceFormData(
  `Performance/EmpPerformance`,
  payload,
);
RegistrationService.Leaderboard = (payload) => postServiceFormData(
  `Incentive/ScoreboardResult`,
  payload,
);
RegistrationService.UploadDp = (payload) => postServiceFormData(
  `Employee/ProfileImageUpload`,
  payload,
);
RegistrationService.DeleteProfile = (payload) => postServiceFormData(
  `Employee/Delete_user`,
  payload,
);
export default RegistrationService;
