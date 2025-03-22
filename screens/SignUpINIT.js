import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';
 
  
import InputField from '../components/InputField';
 
import RegistrationService from '../services/registration';
 
import {useDispatch, useSelector} from 'react-redux';
import FormBackground from '../components/FormBackground';
import ButtonGradient from '../components/ButtonGradient';
import VerifyInputField from '../components/VerifyInputField';
 
 
import OTPModal from '../components/OTPModal';
 
import {
  addBrandId,
  addContactId,
  addCreatedById,
  addHierarchicalId,
  addOrganizationId,
  updateLoginStatus,
  updateToken,
} from '../store/redux/currentUser';
 
import RewardsConnectFullLogo from '../components/RewardsConnectFullLogo';
import ProfileService from '../services/Profile';
import { useToast } from 'react-native-toast-notifications';
import OptionsInputField from '../components/OptionsInputField';
import CustomDatePicker from '../components/CustomDatePicker';
import LoadingAlert from '../components/LoadingAlert';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUpINIT = ({route, navigation}) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const {from} = route.params;
 

  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const [empCode, setempCode] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [openOTP, setOpenOTP] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allFieldsFilled, setAllFieldsFilled] = useState(false);
  const [messageImage, setMessageImage] = useState("");
  const [check, setCheck] = useState(1);
  const [storName, setstorName] = useState({id: '', title: ''});
  const [storList, setstorList] = useState([]);
  const [showLoading, setShowLoading] = useState(false);
  const [DateofJoin, setDateofJoin] = useState('');
  const [otpInfo, setotpInfo] = useState('');

  useEffect(() => {
    getStoreList();
  }, []);

  
  

  function resetFields() {
    setCheck(1);
    setempCode('');
    setMobile('');
    setEmail('');
    
  }

   

  function ValidatePhoneNumber(num) {
    let contactPetrn = new RegExp(/^(\+\d{1,3}[- ]?)?\d{10}$/);
    let numS = num+""
    console.log(parseInt(numS.charAt(0)))
    if (contactPetrn.test(num) && parseInt(numS.charAt(0))>5) {
      return true;
    }
    return false;
  }

  function ValidateEmail(email) {
    let emailPetrn = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
    if (!emailPetrn.test(email)) {
      console.log('emailid false');
      return false;
    }
    console.log('emailid true');
    return true;
  }

  

  function submitHandler() {
   // setLoading(true);
  // setOpenOTP(true);
  if(!storName.id){
    Alert.alert(  
      '',  
      'Please select store name',  
      [  
           
          {text: 'OK', onPress: () =>''},  
      ]  
  );
  }else if(!empCode){
    Alert.alert(  
      '',  
      'Please enter employee code',  
      [  
           
          {text: 'OK', onPress: () =>''},  
      ]  
  );
  }else if(!DateofJoin){
    Alert.alert(  
      '',  
      'Please select date',  
      [  
           
          {text: 'OK', onPress: () =>''},  
      ]  
  );
  }else if(!mobile){
    Alert.alert(  
      '',  
      'Please enter mobile no',  
      [  
           
          {text: 'OK', onPress: () =>''},  
      ]  
  );
  }else{
    setShowLoading(true);
    console.log('DateofJoin',DateofJoin);
    const formData = new FormData();
    //formData.append('Stotrname', storName.title);
    formData.append('StoreCode',storName.id);
    formData.append('EmpCode', empCode);
    formData.append('DateofJoin',DateofJoin);
    formData.append('Mobile', mobile);
    console.log('formData',formData);
    RegistrationService.saveUser(formData)
                .then(result => {
                  const res=result[0];
                  console.log('reg res', res);
                  setShowLoading(false);
                  if(res.Status==1){
                    setotpInfo(res);
                     
                    
                    setTimeout(() => {
                      setOpenOTP(true);
                    }, 400);
                  }else{
                    setotpInfo('');
                    toast.show('', {
                      data: {
                          isSuccess: false,
                          heading: res.Msg,
                          describe: '',
                        },
                    });
                    
                  }
                  
                }).catch(err=>{
                  setShowLoading(false);
                })
  }

  }

  const verifyOtp = () => {
    setOpenOTP(true);
  };
  
  

  function onlyAlphabetHandler(text){
    const alphaRegex = new RegExp(/^[a-zA-Z ][0-9]*$/)
    if(alphaRegex.test(text)){
      setempCode(text)
    }
  }

  
const getStoreList=()=>{
  const formData = new FormData();
  //formData.append('file_type', " ");
  RegistrationService.getStores('')
              .then(res => {
               // console.log('getStores res', res);
                const get_data = res.map(item => {
                  return {
                    id: item.StoreCode,
                    title: item.Name,
                     
                  };
                });
                 setstorList(get_data);
              }).catch(err=>{

              })
}
function mobileHandler(no) {
  let regPattern = new RegExp(/^[0-9]{0,10}$/);
  if(regPattern.test(no)){
    setMobile(no);
  }
   
}
const storeData = async (
  accessToken,
  userId,
  username,
  fullName,
  storeID,
  rating,
  mobileNo,
  designation,
  storeCode,
  storeName,
  storeState,
  profilePhotoURL,
  dateOfJoining,
  roleId
) => {
  let lastLoggedInMonth = new Date().getMonth()+1
  try {
    await AsyncStorage.setItem('my-key', accessToken);
    await AsyncStorage.setItem('user-id', userId + '');
    await AsyncStorage.setItem('user-name', username + '');
    await AsyncStorage.setItem('fullName', fullName + '');
    await AsyncStorage.setItem('storeID', storeID + '');
    await AsyncStorage.setItem('rating', rating + '');
    await AsyncStorage.setItem('mobileNo', mobileNo + '');
    await AsyncStorage.setItem('designation', designation + '');
    await AsyncStorage.setItem('storeCode', storeCode + '');
    await AsyncStorage.setItem('storeName', storeName + '');
    await AsyncStorage.setItem('storeState', storeState + '');
    await AsyncStorage.setItem('profilePhotoURL', profilePhotoURL + '');
    await AsyncStorage.setItem('dateOfJoining', dateOfJoining + '');
    await AsyncStorage.setItem('roleId', roleId + '');
    await AsyncStorage.setItem('lastLoginMonth', lastLoggedInMonth + '');
    const userData = {
      mykey: accessToken,
      userid: userId,
      username: username,
      fullName: fullName,
      storeID: storeID,
      rating: rating,
      mobileNo: mobileNo,
      designation: designation,
      storeCode:storeCode,
      storeName:storeName,
      storeState:storeState,
      profilePhotoURL:profilePhotoURL,
      dateOfJoining:dateOfJoining,
      roleId:roleId,

    };
    await AsyncStorage.setItem('userData', JSON.stringify(userData)).then(
      setTimeout(() => {
        navigation.replace('Dashboard');
      }, 300)
    )
  } catch (e) {
    // saving error
  }
};

const getToday=()=>{
  const date  = new Date();
 //console.log('today',date);
 const year = date.getFullYear();
const month = ('0' + (date.getMonth() + 1)).slice(-2);
const day = ('0' + date.getDate()).slice(-2);
const hours = ('0' + date.getHours()).slice(-2);
const minutes = ('0' + date.getMinutes()).slice(-2);
const seconds = ('0' + date.getSeconds()).slice(-2);
const milliseconds = ('00' + date.getMilliseconds()).slice(-3);

const formattedDateTimeString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;

console.log(formattedDateTimeString);
return formattedDateTimeString;
}
const signInHandler = (no) => {
  console.log('otp',no);
  if(!empCode){
    Alert.alert(  
      '',  
      'Please enter employee code',  
      [  
           
          {text: 'OK', onPress: () =>''},  
      ]  
  );
  }else{
    setShowLoading(true);
          // console.log('getToday',getToday());
          const formData = new FormData();
          formData.append('EmpCode', empCode);
          formData.append('DateTime', getToday());
          formData.append('OTP', no);
          console.log(formData,'reg sign ip formdata')
          RegistrationService.login(formData)
            .then(result => {
              const res=result;
              console.log('login res amb', res);
            
              if (res.Status==1) {
                 
                setotpInfo('');
                setShowLoading(false);
                dispatch(updateLoginStatus({isLoggedIn: true}))
                 
                storeData(
                  res.User[0].EmpCode,
                  res.User[0].UserID,
                  res.User[0].EmpCode,
                  res.User[0].Name,
                  res.User[0].StoreID,
                  res.User[0].Rating,
                  Math.floor(+res.User[0].MobileNo),
                  res.User[0].Designation,
                  res.User[0].StoreCode,
                  res.User[0].StoreName,
                  res.User[0].State,
                  res.User[0].profilePhtotoUrl,
                  res.User[0].DateOfJoining,
                  res.User[0].RoleID,
                 
                );
                console.log("reading toast")
                toast.show('', {
                  data: {
                    isSuccess: true,
                    heading: 'Login Successful',
                    describe:
                      'You have successfully logged in',
                  },
                });

                setTimeout(() => {
                  navigation.replace('Dashboard');
                }, 1000);
              } else {
                setShowLoading(false);
                
                  toast.show('', {
                      data: {
                          isSuccess: false,
                          heading: 'Login failed!',
                          describe: res.Msg,
                        },
                    });
                 
                
              }
            })
            .catch(err => {
              setShowLoading(false);
            });
        }
      
    
};
const otpHandler = () => {
  if(!empCode){
    Alert.alert(  
      '',  
      'Please enter employee code',  
      [  
           
          {text: 'OK', onPress: () =>''},  
      ]  
  );
  }else{
  setShowLoading(true);
  
  const formData = new FormData();

  formData.append('EmpCode', empCode);
  
  RegistrationService.getOTP(formData)
              .then(result => {
                const res=result[0];
                console.log(formData,'otp reg form data');
                console.log('otp reg res', res);
                setShowLoading(false);
                if(res.Status==1){
                  setotpInfo(res);
                  setOpenOTP(true);
                }else{
                  setotpInfo('');
                  toast.show('', {
                    data: {
                        isSuccess: false,
                        heading: res.Msg,
                        describe: '',
                      },
                  });
                  
                }
                
              }).catch(err=>{
                setShowLoading(false);
              })
            }
}
  return (
    <ScrollView className="relative">
      <FormBackground bgImage={require('./../assets/Images/bg_reg_bg.png')}>
        <View className="flex-1 w-full bg-white m-4  mt-[3px] p-5 shadow" style={{borderRadius:20}}>
          <View className="flex-1">
          <View>
          <Text className="text-[#181D28] font-bold text-[24px] mb-[2px]">Welcome!</Text>
          <Text className="text-[#738088] font-semibold text-[16px] ">Let's get started with a free account now</Text>
        </View>
            
        <View className="flex flex-col space-y-5 justify-start items-start w-full mt-[40px]">
                 
        <View className="w-full">
                  <OptionsInputField
                    data={storList}
                    fieldName="Store Name"
                    selectItem='Select Store'
                    value={storName}
                    setValue={setstorName}
                    required={true}
                    
                    modalHeading="Select your store"
                    modalIcon={''}
                  />
                </View>

                <View className="w-full">
                  <InputField
                    fieldName="Store Code"
                    required={true}
                    value={storName.id}
                    setValue={onlyAlphabetHandler}
                    editable={false}
                  />
                </View>
                <View className="w-full">
                  <InputField
                    fieldName="Employee Code"
                    required={true}
                    value={empCode}
                    setValue={setempCode}
                     
                  />
                </View>
                 
                <View className="w-full">
              <CustomDatePicker
                isDob={true}
                fieldText="Date of Joining"
                value={DateofJoin}
                setValue={setDateofJoin}
                required={true}
                //check={check}
                 
              />
            </View>
                <View className="w-full">
                  <InputField
                    fieldName="Mobile Number"
                    required={true}
                    value={mobile}
                    setValue={mobileHandler}
                    keyboardType="number-pad"
                  />
                </View>
                
                
                
              </View>
           
          
            
            
              <View className="w-full pt-10">
                <ButtonGradient loading={loading} onPress={submitHandler}>
                  Get OTP
                </ButtonGradient>
              </View>
        
          </View>
          
          <View className="flex-row pt-2   justify-center items-center">
            <Text className="text-center font-semibold text-[#000000] text-[17px]">
            Already have an account?
            </Text>
            <Pressable onPress={() => navigation.replace('SignIn')}>
              <Text className="text-[#FF1933] font-bold text-[17px]"> Login</Text>
            </Pressable>
          </View>
          <OTPModal
            className="absolute"
            setOpenOTP={setOpenOTP}
            openOTP={openOTP}
            heading="OTP Verification"
            data={otpInfo}
            onPress={signInHandler}
            resendOtp={otpHandler}
          /> 
         
          
        </View>
        {/* <LoadingAlert visible={showLoading} /> */}
      </FormBackground>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  headingText: {
    fontFamily: 'Adani-Regular',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1E1E1E',
  },
  fontFamily: {
    fontFamily: 'Adani-Regular',
    color: '#111',
    letterSpacing: 0.3,
    fontSize: 16,
  },
  adaniBold: {
    fontFamily: 'Adani-Bold',
  },
});

export default SignUpINIT;
