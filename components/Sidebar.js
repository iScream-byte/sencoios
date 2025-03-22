import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';

import {
  HomeIcon,
  BellIcon,
  ExclamationCircleIcon,
  UserIcon,
  ArrowUpTrayIcon,
  PhotoIcon,
  GiftIcon,
  ShoppingCartIcon,
  DocumentTextIcon,
  ArrowDownTrayIcon,
  LockClosedIcon,
  QuestionMarkCircleIcon,
  LanguageIcon,
  DocumentMagnifyingGlassIcon,
  EnvelopeOpenIcon,
  PhoneArrowDownLeftIcon,
  StarIcon,
  ArrowRightOnRectangleIcon,
} from 'react-native-heroicons/outline';

import ButtonGradient from '../components/ButtonGradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CircularProfile from './CircularProfile';
import {useFocusEffect} from '@react-navigation/native';
import OtherService from '../services/Other';
import Feather from 'react-native-vector-icons/Feather';
import {useDrawerStatus} from '@react-navigation/drawer';
import { API_BASE_URL } from '../constants/common';
import RegistrationService from '../services/registration';

const Sidebar = props => {
  const drawerStatus = useDrawerStatus();
  // console.log('drawerStatus',drawerStatus);
  const [conId, setConId] = useState('');
  const [hierId, setHierId] = useState('');
  const [hierName, setHiername] = useState('');
  const [fullName, setFullName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [designation, setDesignation] = useState('');
  const [myDp, setMyDp] = useState('null');
  const [rating, setRating] = useState('');
  const [empCode, setEmpCode] = useState('');
  
  //const navigation = useNavigation();

  const logoutHandler = navigation => {
    // AsyncStorage.removeItem('my-key').then(res => {
    //   // dispatch(updateToken({token: ""}))
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

  useFocusEffect(React.useCallback(() => {}, []));

  useEffect(() => {
    AsyncStorage.getItem('fullName').then(name => {
      setFullName(name);
    });
    AsyncStorage.getItem('user-name').then(empcode => {
      setEmpCode(empcode);
    });
    AsyncStorage.getItem('mobileNo').then(mobileNo => {
      setMobileNo(mobileNo);
    });
    AsyncStorage.getItem('profilePhotoURL').then(dp => {
      setMyDp(dp);
    });
    AsyncStorage.getItem('rating').then(rating => {
      setRating(rating);
    });
    AsyncStorage.getItem('designation').then(designation => {
      setDesignation(
        designation
        // designation.length > 25
        //   ? designation.slice(0, 25) + '\n' + designation.slice(25)
        //   : designation,
      );
    });
  }, [drawerStatus]);

  function deleteAccount() {
    // console.log(empCode);
    let formData=new FormData()
    formData.append('EmpCode',empCode)

    Alert.alert(
      'Are you sure?',
      '',
      [
        {text: 'No', onPress: () => {}},
        {
          text: 'Yes',
          onPress: () => {
                RegistrationService.DeleteProfile(formData).then(
                    response=>{
                      if(response.msg=='Success'){
                        Alert.alert('Your account is deleted')
                        logoutHandler(props.navigation)
                      }
                    }
                  )
          },
        },
      ],
      {cancelable: true},
    );



  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={{}}
        source={require('./../assets/Images/Rectangle-865.png')}>
        <View
          style={{
            width: '100%',
            // height: 150,
            // justifyContent: 'center',
            // alignItems: 'center',
            borderBottomColor: '#f4f4f4',
            borderBottomWidth: 1,
            borderBottomEndRadius: 30,
            borderBottomStartRadius: 30,
            padding: 4,
            // backgroundColor:"#000"
          }}
          className="flex-row justify-between mt-[5%]">
          <View className="relative  ml-[20px] top-10">
            <View
              style={{zIndex: 2}}
              className="rounded-full h-[83px] w-[83px] bg-[#ffffff] justify-center items-center absolute top-[6px] left-[6px]">
              <View className="rounded-full h-[80px] w-[80px] ">
                <Image
                  className="h-[100%] w-[100%] rounded-full"
                  source={
                    myDp==null||myDp=='null'
                      ? require('./../assets/Images/dp.png')
                      : {uri: API_BASE_URL + myDp.slice(1)}
                  }
                />
              </View>
            </View>

            <View
              className="rounded-full h-[100px] w-[100px] bg-[#ffffff]  justify-center items-center  top-[-2.5px] left-[-2.5px] right-0 absolute"
              style={{zIndex: 1}}></View>
          </View>
          <View className="py-10 pr-5 flex-col gap-4">
            <View style={{alignItems: 'flex-end'}}>
              <Text className="text-white font-extrabold text-xl mb-3" style={{width:'80%',textAlign:'right'}}>
                {fullName}
              </Text>
              <Text style={{color: 'white', fontSize: 11, textAlign:'right', width:'80%'}}>{designation}</Text>
              <Text className="text-white text-sm"> Mob. {mobileNo}</Text>
              <Text className="text-white text-sm">
                Available Points : {rating}
              </Text>
            </View>
            <View className="flex-row">
              {/* <Pressable>
                <Text className="text-white text-sm">My Profile</Text>
              </Pressable> */}
              {/* <Pressable>
                <Image
                  source={require('./../assets/Images/edit-2.png')}
                  className="ml-1 mt-[5px]"
                />
              </Pressable> */}
            </View>
          </View>
        </View>
      </ImageBackground>

      <ScrollView>
        <View className="flex-1 pr-4 pl-4 mt-[8px] mb-[10px]">
          <View style={styles.box}>
            <TouchableOpacity
              className="flex-row"
              onPress={() => {
                props.navigation.navigate('Dashboard');
              }}>
              <View>
                <Feather name="home" size={20} color="gray" />
              </View>
              <View>
                <Text style={styles.boxText}> Home</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.box}>
            <TouchableOpacity
              className="flex-row"
              onPress={() => {
                props.navigation.navigate('AboutApp');
              }}>
              <View>
                <Feather name="alert-circle" size={20} color="gray" />
              </View>
              <View>
                <Text style={styles.boxText}> About</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.box}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('MyProfile');
              }}
              className="flex-row">
              <View>
                <Feather name="user" size={20} color="gray" />
              </View>
              <View>
                <Text style={styles.boxText}> My Profile</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* <View style={styles.box}>
            <TouchableOpacity
              className="flex-row"
              onPress={() => {
                props.navigation.navigate("MyProfile");
              }}>
              <View>
              <Feather name="lock" size={20} color="gray" />
              </View>
              <View>
                <Text style={styles.boxText}>Change Password</Text>
              </View>
            </TouchableOpacity>
          </View> */}

          <View style={styles.box}>
            <TouchableOpacity
              className="flex-row"
              onPress={() => {
                props.navigation.navigate('TermsNCondition');
              }}>
              <View>
                <Feather name="file-text" size={20} color="gray" />
              </View>
              <View>
                <Text style={styles.boxText}>Terms & Condition</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.log_box}>
            <TouchableOpacity
              className="flex-row"
              onPress={() => {
                Alert.alert(
                  'Are you sure?',
                  '',
                  [
                    {text: 'No', onPress: () => {}},
                    {
                      text: 'Yes',
                      onPress: () => {
                        logoutHandler(props.navigation);
                      },
                    },
                  ],
                  {cancelable: true},
                );
              }}>
              <View>
                <Feather name="log-out" size={20} color="gray" />
              </View>
              <View>
                <Text style={styles.boxText}>Logout</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* <View className="w-[92%] mx-4 my-6 shadow-lg shadow-slate-500 self-center">
            <ButtonGradient onPress={() => logoutHandler(props.navigation)}>
              Logout
            </ButtonGradient>
          </View> */}
        </View>
      </ScrollView>
      <TouchableOpacity
  className="flex-row justify-center items-center"
  onPress={deleteAccount}>
  
  <View>
    <Text style={{ color: 'red', fontWeight: 'bold' }}>Press here<Text style={styles.boxText}> to delete your account</Text></Text> 
  </View>
</TouchableOpacity>

    </SafeAreaView>
  );
};
export default Sidebar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pageParents: {
    backgroundColor: '#6759FF',
    flexDirection: 'row',
    alignItems: 'center',
  },
  box: {
    borderBottomWidth: 1,
    borderBottomColor: '#CFCFCF',
    paddingTop: 10,
    paddingBottom: 10,
  },
  boxText: {
    fontSize: 13,
    color: '#000000',
    fontWeight: 'normal',
    textAlign: 'left',
    marginLeft: 12,
  },
  log_box: {
    //borderBottomWidth: 1,
    //borderBottomColor: '#CFCFCF',
    paddingTop: 10,
    paddingBottom: 10,
  },
});
