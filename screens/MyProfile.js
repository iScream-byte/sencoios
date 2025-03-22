import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  useWindowDimensions,
  Pressable,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import HeaderGradient from '../components/HeaderGradient';
import InsideFormBg from '../components/InsideFormBg';
import OtherService from '../services/Other';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator} from 'react-native-paper';
import RenderHTML from 'react-native-render-html';
import FooterTab from '../components/FooterTab';
import {CameraIcon} from 'react-native-heroicons/outline';
import InputField from '../components/InputField';
import OpenCameraModal from './../components/OpenCameraModal';
import { API_BASE_URL } from '../constants/common';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const MyProfile = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState('');
  const [designation, setDesignation] = useState('');
  const [myDp, setMyDp] = useState('null');
  const [profileData, setProfileData] = useState([]);
  const [cameraModalVisible, setCameraModalVisible] = useState(false);

  const openModal = () => {
    setCameraModalVisible(true);
  };

  const logoutHandler = navigation => {
    // AsyncStorage.removeItem('my-key').then(res => {
    //   console.log('my-key storage data', res);
    //   navigation.navigate('SignIn');
    // });
    // AsyncStorage.multiRemove(['user-name', 'fullName']).then(res => {
    //   console.log('Removed async storage data', res);
    // });
    
    AsyncStorage.clear().then(res=>{
      // console.log(res, 'logged out');
      navigation.navigate('SignIn');
    })
  };

  useEffect(() => {
    setLoading(true);
    AsyncStorage.getItem('profilePhotoURL').then(dp => {
      setMyDp(dp);
    });
    AsyncStorage.getItem('userData').then(userData => {
      userData = JSON.parse(userData);
      setFullName(userData.fullName);
      setDesignation(
        // userData.designation.length > 19
        //   ? userData.designation.slice(0, 19) +
        //       '\n' +
        //       userData.designation.slice(19)
        //   : userData.designation,
        userData.designation
      );
      setProfileData([
        {fieldName: 'EMP Code', value: userData.username},
        {fieldName: 'Mobile Number', value: userData.mobileNo.toString()},
        {fieldName: 'Store Name', value: userData.storeName},
        {fieldName: 'Store Code', value: userData.storeCode.toString()},
        {fieldName: 'State', value: userData.storeState},
        {
          fieldName: 'Date Of Joining',
          value: userData.dateOfJoining.split('T')[0],
        },
      ]);
      setLoading(false);
      // OtherService.contactUs(token)
      //   .then(res => {
      //     console.log('contact us res', JSON.stringify(res));
      //     if (JSON.stringify(res) != '{}' && !res.error) {
      //       setLoading(false);
      //       if (res.data.status) {
      //         console.log('line 20 contact us', res.data.contactDetails);
      //         setContactInfo(res.data.contactDetails);
      //       } else {
      //         setErrMsg(res.data.message);
      //         setContactInfo(null);
      //       }
      //     } else {
      //       setLoading(false);
      //     }
      //   })
      //   .catch(err => {
      //     console.log(JSON.stringify(err));
      //     setLoading(false);
      //   });
    });
  }, []);
  return (
    <InsideFormBg bgImage={require('./../assets/Images/bg_reg_bg.png')}>
      <View className="bg-white rounded-md mt-4  flex-1">
        <View>
          <View className=" w-[100%]">
            <HeaderGradient headerText="My Profile" />
          </View>
          {loading && (
            <View className="py-9">
              <ActivityIndicator />
            </View>
          )}
          {!loading && (
            <View >
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#f2f2f2',
                  margin: 10,
                  borderRadius: 12,
                  
                }}>
                <View className="mx-3 py-5" >
                  <View className="rounded-full h-[100px] w-[100px]  bg-[#9D2829] justify-center items-center  top-[10px] left-[6px]">
                    <View
                      className="rounded-full"
                      style={{
                        height: screenHeight * 0.093,
                        width: screenHeight * 0.093,
                        
                      }}>
                      <Image
                        className="h-[100%] w-[100%] rounded-full"
                        source={
                          myDp==null||myDp=='null'
                            ? require('./../assets/Images/dp.png')
                            : {uri: API_BASE_URL + myDp.slice(1)}
                        }                      />
                      {/* <Pressable
                        className="p-1.5 absolute rounded-full"
                        style={{
                          top: screenHeight * 0.0753,
                          left: screenWidth * 0.155,
                          backgroundColor: 'red',
                        }}
                        onPress={openModal}>
                        <CameraIcon size={18} fontWeight={700} color={'#fff'} />
                      </Pressable> */}
                      <OpenCameraModal
                        from={'profile'}
                        setModalSt={setCameraModalVisible}
                        modalSt={cameraModalVisible}></OpenCameraModal>
                    </View>
                  </View>
                </View>

                <View className="py-9">
                  <View style={{alignItems: 'flex-end',width:"85%", paddingRight:30}}>
                    <Text
                      style={{textAlign: 'right', color: '#575656'}}
                      className="font-extrabold text-2xl">
                      {fullName}
                    </Text>
                    <View style={{alignItems: 'flex-end', width:"100%", justifyContent:"center"}}>
                      

                    <Text
                      style={{
                        textAlign: 'right',
                        fontSize: 14,
                        color: '#575656',
                        width: '100%',
                      
                      }}>
                      {designation}
                   
                      {/* Counter Head-Product Divison */}
                    </Text>
                    </View>
                    <Pressable
                      onPress={() => {
                        Alert.alert(
                          'Are you sure?',
                          '',
                          [
                            {text: 'No', onPress: () => {}},
                            {
                              text: 'Yes',
                              onPress: () => {
                                logoutHandler(navigation);
                              },
                            },
                          ],
                          {cancelable: true},
                        );
                      }}
                      className="mt-6"
                      style={styles.logoutButton}>
                      <Feather name="log-out" size={20} color="#fff" />
                      <Text
                        style={{fontSize: 16, color: '#fff'}}
                        className="font-bold ml-1">
                        Logout
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </View>

              <View>
                <View
                  style={{
                    // backgroundColor: 'gray',
                    paddingBottom: screenHeight * 0.09,
                    margin: 10,
                    borderRadius: 5,
                    height: screenHeight * 0.45,
                  }}>
                  <ScrollView>
                    {profileData.length > 0 &&
                      profileData.map((item, index) => {
                        return (
                          <View key={index} className="w-full mt-4">
                            <InputField
                              fieldName={item.fieldName}
                              value={item.value}
                              editable={false}
                            />
                          </View>
                        );
                      })}
                  </ScrollView>
                </View>
              </View>
            </View>
          )}
        </View>
      </View>
      <FooterTab pageName="MyProfile" />
    </InsideFormBg>
  );
};

export default MyProfile;

const styles = StyleSheet.create({
  header: {
    color: '#333333',
  },
  section: {
    borderWidth: 1.5,
    borderColor: '#f0f0f0',
    width: '100%',
    fontWeight: 'bold',
    marginVertical: 8,
  },
  headerTextContainer: {
    borderBottomWidth: 1.5,
    borderBottomColor: '#f0f0f0',
  },
  contentText: {
    color: '#333',
  },
  contentTextContainer: {
    paddingVertical: 8,
  },

  logoutButton: {
    width: screenWidth * 0.25,
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 9,
    paddingVertical: 3,
    flexDirection: 'row',
    borderColor: '#9D2829',
    backgroundColor: '#9D2829',
  },
});
