import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Pressable,
  Dimensions,
  Alert,
} from 'react-native';

import InputField from '../components/InputField';
import RegistrationService from '../services/registration';
import {useSelector} from 'react-redux';
import FormBackground from '../components/FormBackground';
import ButtonGradient from '../components/ButtonGradient';
import OptionsInputField from '../components/OptionsInputField';
import {useFocusEffect} from '@react-navigation/native';
import {
  CheckCircleIcon,
  LanguageIcon,
  PencilIcon,
  UserIcon,
} from 'react-native-heroicons/outline';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {
  addBrandId,
  addContactId,
  addCreatedById,
  addHierarchicalId,
  addOrganizationId,
  updateLoginStatus,
  updateToken,
} from '../store/redux/currentUser';
import CustomToast from '../components/CustomToast';
import InputFieldPassword from '../components/InputFieldPassword';
import OTPField from '../components/OTPField';
import RewardsConnectFullLogo from '../components/RewardsConnectFullLogo';
import OtherService from '../services/Other';
import {useToast} from 'react-native-toast-notifications';
import OTPModal from '../components/OTPModal';
import LoadingAlert from '../components/LoadingAlert';
import { launchCamera } from 'react-native-image-picker';
// import BottomSheet from '../components/CustomBottomSheet';
// import CustomBottomSheet from '../components/BottomSheet';
// import BottomSheet from '../components/BottomSheet';
import axios from 'axios';
import { API_BASE_URL } from '../constants/common';
import { OtpInput } from 'react-native-otp-entry';
import { DateTime as MyDT } from 'luxon';
const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;
// console.log('sh', screenHeight);

const SignIn = ({route, navigation}) => {
  const toast = useToast();
  const dispatch = useDispatch();

  const [check, setCheck] = useState(1);

  const [selectedPersona, setSelectedPersona] = useState({id: '', title: ''});
  const [sap, setSap] = useState('');
  const [mob, setMob] = useState('');
  const [password, setPassword] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState({id: '', title: ''});
  const [allLanguages, setAllLanguages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [phase1Filled, setPhase1Filled] = useState(false);
  const [passCheck, setPassCheck] = useState(1);
  const [signInUsingOtp, setSignInUsingOtp] = useState(true);
  const [personas, setPersonas] = useState([]);
  const [fullName, setFullName] = useState('');
  const [openOTP, setOpenOTP] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [empCode, setempCode] = useState('');
  const [otpInfo, setotpInfo] = useState('');

  const [isActive, setIsActive] = useState(true);
  const [otp, setOtp] = useState(true);

  useEffect(() => {
    //console.log('signup hit');
    AsyncStorage.getItem('my-key').then(token => {
      // console.log('token signup', token);
      if (token != null) {
        navigation.replace('Dashboard');
      }
    });
  }, []);

  
  const getToday = () => {
    // const date = new Date();
    // const year = date.getFullYear();
    // const month = ('0' + (date.getMonth() + 1)).slice(-2);
    // const day = ('0' + date.getDate()).slice(-2);
    // const hours = ('0' + date.getHours()).slice(-2);
    // const minutes = ('0' + date.getMinutes()).slice(-2);
    // const seconds = ('0' + date.getSeconds()).slice(-2);
    // const milliseconds = ('00' + date.getMilliseconds()).slice(-3);
    // const formattedDateTimeString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;


    const kolkataTime = MyDT.now().setZone('Asia/Kolkata');
    // console.log(kolkataTime.toFormat('MM-dd-yyyy HH:mm:ss.SSS'));
    // return formattedDateTimeString;
    return kolkataTime.toFormat('MM-dd-yyyy HH:mm:ss.SSS')
  };


  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', e => {
      // console.log('event', e.data.action.type);
      if (e.data.action.type === 'REPLACE') {
        return;
      }
      e.preventDefault();
    });
    return unsubscribe;
  }, [navigation]);

  useFocusEffect(
    React.useCallback(() => {
      navigation.getParent('parentDrawer').setOptions({
        headerShown: false,
      });
    }, []),
  );

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
        roleId:roleId

      };
      await AsyncStorage.setItem('userData', JSON.stringify(userData)).then(
        setTimeout(() => {
          navigation.navigate('Dashboard');
        }, 300)
      )
    } catch (e) {
      // saving error
    }
  };

  function resetFields() {
    setotpInfo('');
    setempCode('');
  }


  
  const otpHandler = () => {
// console.log("empCode>>>>>>99999",empCode)





    if (!empCode) {
      Alert.alert('', 'Please enter employee code', [
        {text: 'OK', onPress: () => ''},
      ]);
    } else {
      setShowLoading(true);

      const formData = new FormData();
      formData.append('EmpCode', empCode);

      // if(empCode=='9147338963'){      
      //   formData.append('EmpCode', 'TR599');
      // }else{
      //   formData.append('EmpCode', empCode);
      // }
      

      RegistrationService.getOTP(formData)
        .then(result => {
          const res = result[0];
          console.log('otp resssssssssssss', result);
          setShowLoading(false);
          if (res.Status === 1) {
            setotpInfo(res);
            // setMyFlag(res.IsApple)
            setTimeout(() => {
              setOpenOTP(true);
            }, 400);
          } else {
            setotpInfo('');
            toast.show('', {
              data: {
                isSuccess: false,
                heading: res.Msg,
                describe: '',
              },
            });
          }
        })
        .catch(err => {
          setShowLoading(false);
        });
    }
  };

  const signInHandler = no => {
     console.log('otpppppppppppppppppppppppppppppppppp', no);
    if(!no || no.length<6){
      Alert.alert('', 'Please enter valid OTP', [
        {text: 'OK', onPress: () => ''},
      ]);
      return
    }
    if (!empCode) {
      Alert.alert('', 'Please enter employee code', [
        {text: 'OK', onPress: () => ''},
      ]);
    } else {
      setShowLoading(true);
      // console.log('getToday', getToday());
      const formData = new FormData();
      // if(empCode=='9147338963'){
      //   formData.append('EmpCode', 'TR599');
      // }else{
      //   formData.append('EmpCode', empCode);
      // }
      formData.append('EmpCode', empCode);
      formData.append('DateTime', getToday());
      formData.append('OTP', no);

      // const httpClient = axios.create();
      // httpClient.defaults.timeout = 60000;
      // console.log(payload)

      // httpClient.post(API_BASE_URL + 'User/UserLogin', formData)
      //   .then(res => {
      //     console.log(res.data);
      //     if (res.data.Status == 1) {
      //       setotpInfo('');
      //       setShowLoading(false);
      //       dispatch(updateLoginStatus({ isLoggedIn: true }));
      
      //       storeData(
      //         res.data.User[0].EmpCode,
      //         res.data.User[0].UserID,
      //         res.data.User[0].EmpCode,
      //         res.data.User[0].Name,
      //         res.data.User[0].StoreID,
      //         res.data.User[0].Rating,
      //         Math.floor(+res.data.User[0].MobileNo),
      //         res.data.User[0].Designation,
      //         res.data.User[0].StoreCode,
      //         res.data.User[0].StoreName,
      //         res.data.User[0].State,
      //         res.data.User[0].profilePhtotoUrl,
      //         res.data.User[0].DateOfJoining,
      //         res.data.User[0].RoleID
      //       );
      
      //       toast.show('', {
      //         data: {
      //           isSuccess: true,
      //           heading: 'Login Successful',
      //           describe: 'You have successfully logged in',
      //         },
      //       });
      
      //     } else {
      //       setShowLoading(false);
      //       console.log('logg', res);
      
      //       toast.show('', {
      //         data: {
      //           isSuccess: false,
      //           heading: 'Login failed!',
      //           describe: res.data.Msg,
      //         },
      //       });
      //     }
      //   })
      //   .catch(err => {
      //     // Handle timeout and other errors
      //     if (err.code === 'ECONNABORTED') {
      //       toast.show('', {
      //         data: {
      //           isSuccess: false,
      //           heading: 'Network Timeout',
      //           describe: 'The request took too long to respond.',
      //         },
      //       });
      //     } else {
      //       toast.show('', {
      //         data: {
      //           isSuccess: false,
      //           heading: 'Network Timeout!',
      //           describe: 'The request took too long to respond.',
      //         },
      //       });
      //     }
      
      //     setShowLoading(false);
      //   });
      


      RegistrationService.login(formData)      
        .then(result => {
          const res = result;
          console.log('login resssssssssssss', res);
          console.log(formData);
          
          if (res.Status == 1) {
            setotpInfo('');
            setShowLoading(false);
            dispatch(updateLoginStatus({isLoggedIn: true}));
            // console.log(res,"hellooooooo");
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
            // console.log('reading toast');
            toast.show('', {
              data: {
                isSuccess: true,
                heading: 'Login Successful',
                describe: 'You have successfully logged in',
              },
            });
            
          } 
          else{

            setShowLoading(false);
              toast.show('', {
                data: {
                  isSuccess: false,
                  heading: 'Login failed!',
                  describe: "Invalid Credential",
                },
              });

          }
        })
        .catch(err => {
          setShowLoading(false);
          console.log('errrrrrrr',err);
          
        });
    }
  };

  const moveToSignUp = () => {
    navigation.navigate('SignUp', {from: 'signin'});
    resetFields();
  };

  function checkForDealerRetailer() {
    if (
      selectedPersona.title == 'Retailer' ||
      selectedPersona.title == 'Dealer'
    ) {
      return true;
    }
    return false;
  }
  const resendOtpHandler = () => {
    setIsActive(true)
    if (!empCode) {
      Alert.alert('', 'Please enter employee code', [
        {text: 'OK', onPress: () => ''},
      ]);
    } else {
      setShowLoading(true);

      const formData = new FormData();

      formData.append('EmpCode', empCode);

      RegistrationService.getOTP(formData)
        .then(result => {
          const res = result[0];
          console.log('getStores res', res);
          setShowLoading(false);
          if (res.Status == 1) {
            setotpInfo(res);
            toast.show('', {
              data: {
                isSuccess: true,
                heading: 'Otp verification code send',
                describe: '',
              },
            });
          } else {
            setotpInfo('');
            toast.show('', {
              data: {
                isSuccess: false,
                heading: res.Msg,
                describe: '',
              },
            });
          }
        })
        .catch(err => {
          setShowLoading(false);
        });
    }
  };

  const formatTime = time => {
    const minutes = Math.floor(time / 60);
    const remainingSeconds = time % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const handleRestart = () => {
    setIsActive(true);
    setSeconds(initialSeconds);
  };

  // const initialSeconds = 60;
  // const [seconds, setSeconds] = useState(initialSeconds);
  // useEffect(() => {
  //   if (isActive && seconds > 0) {
  //     const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
  //     return () => clearTimeout(timer);
  //   } else if (seconds === 0) {
  //     setIsActive(false);
  //     setSeconds(initialSeconds);
  //   }
  // }, [isActive, seconds]);



  return (
    <FormBackground bgImage={require('./../assets/Images/bg_reg_bg.png')}>
      <View
        className="flex-1 w-full bg-white  mx-4 mt-[3px] p-4 shadow rounded-t-2xl"
        style={{height: screenHeight * 0.7,paddingBottom:60}}
        >
        <View className=" flex-1">
          <View>
            <Text className="text-[#181D28] font-bold text-[24px] mb-[2px]">
              Welcome!!
            </Text>
            <Text className="text-[#738088] font-semibold text-[16px] ">
              Let’s get started with a free account now
            </Text>
          </View>          
          <View className="flex flex-col space-y-5 justify-start items-start w-full mt-[40px]">
            <View className="w-full">
              <InputField
                fieldName="Enter username"
                required={true}
                value={empCode}
                setValue={setempCode}
                check={check}                
              />
            </View>
          </View>

          <View className="w-full pt-10">
            <ButtonGradient onPress={()=>otpHandler()}>Get OTP</ButtonGradient>
          </View>
        </View>
        

        {/* <View className="flex-row pt-2   justify-center items-center">
          <Text className="text-center font-semibold text-[#000000] text-[17px]">
            Don't have an account?
          </Text>
          <Pressable onPress={moveToSignUp}>
            <Text className="text-[#FF1933] font-bold text-[17px]">
              {' '}
              Sign up
            </Text>
          </Pressable>
        </View> */}
        {openOTP &&
        <OTPModal
          className="absolute"
          setOpenOTP={setOpenOTP}
          openOTP={openOTP}
          heading="Verify OTP"
          data={otpInfo}
          onPress={signInHandler}
          resendOtp={otpHandler}
          empCode={empCode}          
        />




        // <View style={{height:'65%',alignItems:'center',gap:10,borderWidth:1,padding:10,borderRadius:10}}>
        //   <Text>  Verify OTP!</Text>
        //   <Text>Otp verification code sent to your phone number ****** {otpInfo?.MobileNo?.slice(-4)}</Text>
        //   <View className="items-center mb-[-0px]">
        //           <Image source={require('./../assets/Images/otp-lock.png')} />
        //   </View>
        //   <OtpInput
        //           numberOfDigits={6}
        //           focusColor="red"
        //           focusStickBlinkingDuration={500}
        //           onTextChange={text => {
        //             // console.log(text);
        //             setOtp(text);
        //           }}
        //           onFilled={text => {
        //             // console.log(`OTP is ${text}`);
        //             setOtp(text);
        //           }}
        //           theme={{
        //             containerStyle: 'container',
        //             inputsContainerStyle: 'inputsContainer',
        //             pinCodeContainerStyle: {
        //               borderColor: 'black', 
        //               borderWidth: 1, 
        //             },
        //             pinCodeTextStyle: styles.pinCodeText,
        //             focusStickStyle: 'focusStick',
        //             focusedPinCodeContainerStyle: 'activePinCodeContainer',
        //           }}
        //   />

        //         <Text className="text-center font-medium text-[#000000] text-[15px]">
        //           {isActive
        //             ? `Your OTP Will Expire in ${formatTime(seconds)}`
        //             : 'OTP Expired'}
        //         </Text>

        //         <View className="">
        //           {isActive ? (
        //             <Pressable onPress={()=>signInHandler("")} style={{backgroundColor:'red',width:"40%",padding:10,borderRadius:10}}>
        //               <Text style={{color:'white',fontSize:18}}>Submit</Text>
        //             </Pressable>
        //           ) : (
        //             <Pressable  onPress={()=>{otpHandler();handleRestart()}} style={{backgroundColor:'red',width:"40%",padding:10,borderRadius:10}} >
        //               <Text style={{color:'white',fontSize:18}}>Get OTP</Text>
        //             </Pressable>
        //           )}
        //         </View>

        //         <View className="  flex-row  justify-center items-center ">
        //         <Text className="text-center  text-[#000000] text-[17px]">
        //           Not your employee code?
        //         </Text>
        //         <Pressable onPress={() => setOpenOTP(p => !p)}>
        //           <Text className="text-[#FF1933] font-bold text-[17px]">
        //             {' '}
        //             Change it
        //           </Text>
        //         </Pressable>
        //       </View>


        //       <View className=" flex-row  justify-center items-center ">
        //         <Text className="text-center  text-[#000000] text-[17px]">
        //           Didn't get OTP?
        //         </Text>
        //         <Pressable onPress={() => resendOtpHandler()}>
        //           <Text className="text-[#FF1933] font-bold text-[17px]">
        //             {' '}
        //             Resend
        //           </Text>
        //         </Pressable>
        //       </View>

        // </View>
        







        }
      </View>
      <LoadingAlert visible={showLoading} />
    </FormBackground>
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
  logo: {
    width: screenWidth * 0.4,
    height: screenHeight * 0.06,
  },
  pinCodeText:{
    color:'#757574',
  }
});

export default SignIn;
