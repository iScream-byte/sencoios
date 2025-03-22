import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Modal,
  FlatList,
  TextInput,
  Alert,
  Keyboard
} from 'react-native';
import {XCircleIcon} from 'react-native-heroicons/outline';
import ButtonRounded from './ButtonRounded';
import ButtonGradient from './ButtonGradient';
import {useFocusEffect} from '@react-navigation/native';
import {OtpInput} from 'react-native-otp-entry';
import RegistrationService from '../services/registration';
import { useToast } from 'react-native-toast-notifications';

const OTPModal = ({
  openOTP,
  setOpenOTP,
  heading,
  data,
  onPress,
  resendOtp,
  empCode,
}) => {
  const [selected, setSelected] = useState('');
  const [lastFourDigits, setlastFourDigits] = useState('');
  const [showLoading, setShowLoading] = useState(false);
  const [otp, setOtp] = useState('');
  const toast = useToast();
  // console.log('my otp', appleFlag);

  const bgColor = title => {
    return selected == title ? 'bg-[#F3FFFF]' : 'bg-white';
  };

  // const pin1Ref = useRef(null);
  // const pin2Ref = useRef(null);
  // const pin3Ref = useRef(null);
  // const pin4Ref = useRef(null);
  // const pin5Ref = useRef(null);
  // const pin6Ref = useRef(null);

  // const [pin1, setPin1] = useState('');
  // const [pin2, setPin2] = useState('');
  // const [pin3, setPin3] = useState('');
  // const [pin4, setPin4] = useState('');
  // const [pin5, setPin5] = useState('');
  // const [pin6, setPin6] = useState('');
  useFocusEffect(
    React.useCallback(() => {
      // console.log("resend OTP1")
      setTimeout(() => {
        // pin1Ref.current?.focus();
      }, 1000);
    }, []),
  );

  useEffect(() => {
    handleRestart();
    console.log('resend OTP2');
    setTimeout(() => {
      // pin1Ref.current?.focus();
      if (data && data.MobileNo) {
        // console.log(Number(data.MobileNo).toString(),'lol');
        let numberStr = data.MobileNo.toString();
        numberStr=Math.floor(numberStr).toString()
        // console.log(numberStr,'helooooooooooo');

        const lastFourDigits = numberStr.slice(-4);
        // console.log('lastFourDigits',lastFourDigits);
        
        setlastFourDigits(lastFourDigits);
      }
    }, 1000);
  }, [data]);
  const resendOtpHandler = () => {
    console.log('resend OTP');
    resendOtp(); // Pass the OTP digits array to the parent component
    // Close the OTP modal or perform any other actions
    setOpenOTP(false);
  };

  const otpHandler = () => {
    if (!empCode) {
      Alert.alert('', 'Please enter employee code', [
        {text: 'OK', onPress: () => ''},
      ]);
    } else {
      setShowLoading(true);
      setIsActive(true);

      const formData = new FormData();

      formData.append('EmpCode', empCode);

      RegistrationService.getOTP(formData)
        .then(result => {
          const res = result[0];
          console.log('otp res', res);
          setShowLoading(false);
          if (res.Status == 1) {
            setotpInfo(res);
            setOpenOTP(true);
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

  const continueHandler = () => {
    // if (!pin1 ) {
    //   pin1Ref.current?.focus();
    //   Alert.alert(
    //     '',
    //     'Enter your OTP',
    //     [{text: 'OK', onPress: () => ''}],
    //     {cancelable: false},
    //   );

    // }else if (!pin2 ) {
    //   pin2Ref.current?.focus();
    //   Alert.alert(
    //     '',
    //     'Enter your OTP',
    //     [{text: 'OK', onPress: () => ''}],
    //     {cancelable: false},
    //   );

    // }else if (!pin3 ) {
    //   pin3Ref.current?.focus();
    //   Alert.alert(
    //     '',
    //     'Enter your OTP',
    //     [{text: 'OK', onPress: () => ''}],
    //     {cancelable: false},
    //   );

    // }else if (!pin4 ) {
    //   pin4Ref.current?.focus();
    //   Alert.alert(
    //     '',
    //     'Enter your OTP',
    //     [{text: 'OK', onPress: () => ''}],
    //     {cancelable: false},
    //   );

    // }else if (!pin5 ) {
    //   pin5Ref.current?.focus();
    //   Alert.alert(
    //     '',
    //     'Enter your OTP',
    //     [{text: 'OK', onPress: () => ''}],
    //     {cancelable: false},
    //   );

    // }
    // else if (!pin6 ) {
    //   pin6Ref.current?.focus();
    //   Alert.alert(
    //     '',
    //     'Enter your OTP',
    //     [{text: 'OK', onPress: () => ''}],
    //     {cancelable: false},
    //   );

    // }
    // else{

    console.log(otp,"oypppppp");
    

    if(!otp){
      Alert.alert('Please enter OTP to continue')
      return
    }

    if(otp.length<6){
      Alert.alert('Please enter valid OTP to continue')
      return
    }


    

    // const pinArray = otp;
    onPress(otp); // Pass the OTP digits array to the parent component
    // Close the OTP modal or perform any other actions
    // console.log(pinArray,'helooooooooooooooooooooooooooooooooo');
    setOpenOTP(false);
    // }
  };
  const initialSeconds = 60;
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(true);
  useEffect(() => {
    if (isActive && seconds > 0) {
      const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
      return () => clearTimeout(timer);
    } else if (seconds === 0) {
      setIsActive(false);
      setSeconds(initialSeconds);
    }
  }, [isActive, seconds]);

  const handleRestart = () => {
    setIsActive(true);
    setSeconds(initialSeconds);
  };

  const formatTime = time => {
    const minutes = Math.floor(time / 60);
    const remainingSeconds = time % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };
  return (
    <View style={styles.centeredView} className="absolute">
      <Modal
        animationType="slide"
        transparent={true}
        visible={openOTP}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setOpenOTP(!openOTP);
        }}>
        <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.65)'}}>
          <View
            className=""
            style={{
              // height: `${(modalOptions.length*11)+15}%`,
              height: `80%`,
              width: '95%',
              opacity: 1,
              marginTop: 'auto',
              borderTopLeftRadius: 13,
              borderTopRightRadius: 13,
              backgroundColor: '#fff',
              alignSelf: 'center',
              // backgroundColor:'blue'
            }}>
            <View className="pt-312 px-2">
              <View className="flex-row justify-between items-center" >
                <View>
                  <Text className="text-[#181D28] font-bold text-[24px] mb-[2px]">
                    {heading}
                  </Text>
                  <Text className="text-[#738088] font-semibold text-[16px] ">
                    Otp verification code sent to your phone number ******
                    {lastFourDigits}
                  </Text>
                </View>
                <Pressable
                  className="mt-[-35px]" 
                  onPress={() => setOpenOTP(p => !p)}>
                  <XCircleIcon color="#444" size={30} />
                </Pressable>
              </View>
              <View className="py-4">
                <View className="items-center mb-[-0px]">
                  <Image source={require('./../assets/Images/otp-lock.png')} />
                </View>


                <OtpInput
                numberOfDigits={6}
                focusColor="red"
                focusStickBlinkingDuration={500}
                onTextChange={text => {
                              // console.log(text);
                              setOtp(text);
                              text.length==6?Keyboard.dismiss():null
                }}
                onFilled={text => {
                  // console.log(`OTP is ${text}`);
                  setOtp(text);
                }}
                autoFocus={true}
                onFocus={() => console.log("Focused")}
                onBlur={() => console.log("Blurred")}
                theme={{
                  containerStyle: 'container',
                  inputsContainerStyle: 'inputsContainer',
                  pinCodeContainerStyle: 'pinCodeContainer',
                  pinCodeTextStyle: styles.pinCodeText,
                  focusStickStyle: 'focusStick',
                  focusedPinCodeContainerStyle: 'activePinCodeContainer',
                }}
              />

{/* {
  appleFlag==true &&
<TextInput 
  // placeholder="Please enter OTP" 
  value={otp} 
  secureTextEntry={true}
  onChangeText={(text) => setOtp(text)}
  keyboardType="number-pad" 
  maxLength={6}
  style={{
    height: 46,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 10,
    width: '90%',
    paddingHorizontal: 10,
    textAlign:'center'
    
  }}
/>

} */}


                {/* <View className="mt-12"> */}

                <View className="mt-10">
                  {isActive ? (
                    <ButtonGradient onPress={() => continueHandler()}>
                      Submit
                    </ButtonGradient>
                  ) : (
                    <ButtonGradient onPress={() => otpHandler()}>
                      Get OTP
                    </ButtonGradient>
                  )}
                  {/* <ButtonGradient onPress={() => continueHandler()}>Submit</ButtonGradient> */}
                  {/* <ButtonGradient onPress={() => otpHandler()}>Get OTP</ButtonGradient> */}
                </View>
              </View>

              <View className="flex-row pt-4   justify-center items-center">
                <Text className="text-center font-medium text-[#000000] text-[15px]">
                  {isActive
                    ? `Your OTP Will Expire in ${formatTime(seconds)}`
                    : 'OTP Expired'}
                </Text>
              </View>
            </View>
            {/* <View className="mt-[130px] bottom-6 left-0 right-0"> */}
            <View className="mt-[100px] bottom-6 left-0 right-0">
              <View className="  flex-row  justify-center items-center ">
                <Text className="text-center font-semibold text-[#000000] text-[17px]">
                  Not your employee code?
                </Text>
                <Pressable onPress={() => setOpenOTP(p => !p)}>
                  <Text className="text-[#FF1933] font-bold text-[17px]">
                    {' '}
                    Change it
                  </Text>
                </Pressable>
              </View>

              <View className="mt-[10px]  flex-row  justify-center items-center ">
                <Text className="text-center font-semibold text-[#000000] text-[17px]">
                  Didn't get OTP?
                </Text>
                <Pressable onPress={() => resendOtpHandler()}>
                  <Text className="text-[#FF1933] font-bold text-[17px]">
                    {' '}
                    Resend
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const stylesOTP = StyleSheet.create({
  headingText: {
    fontFamily: 'Adani-Regular',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1E1E1E',
  },
  fontFamily: {
    fontFamily: 'Adani-Regular',
  },
  otpContainer: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 40,
  },

  otpInputWrap: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: '#CECECE',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
    marginTop: 30,
  },

  textInputOtp: {
    fontSize: 30,
    color: '#292929',
    padding: 0,
    margin: 0,
  },
});

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: '#000',
  },
  inputsContainer: {
    color:'red'
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  fontFamily: {
    fontFamily: 'Adani-Regular',
  },
  pinCodeText:{
    color:'#757574',
  }
});

export default OTPModal;
