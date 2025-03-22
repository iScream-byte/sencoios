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
  Dimensions,
  StatusBar,
  Modal,
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
  MagnifyingGlassIcon,
} from 'react-native-heroicons/outline';

import ButtonGradient from '../components/ButtonGradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CircularProfile from './CircularProfile';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import OtherService from '../services/Other';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {XCircleIcon} from 'react-native-heroicons/outline';
import {
  createBottomTabNavigator,
  BottomTabBar,
} from '@react-navigation/bottom-tabs';
import {Searchbar, Card, Button, IconButton} from 'react-native-paper';
import LoadingAlert from './LoadingAlert';
import RegistrationService from '../services/registration';
import { API_BASE_URL } from '../constants/common';

const windowHeight = Dimensions.get('window').height;
const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

const Tab = createBottomTabNavigator();
const FooterTab = ({pageName = null, currentTab, changeTab = ''}) => {
  const navigation = useNavigation();
  const [conId, setConId] = useState('');
  const [modeonoff, setModelOnoff] = useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [searchResults, setSearchResults] = React.useState([]);

  function toglefunction() {
    setTimeout(() => {
      setModelOnoff(!modeonoff);

    }, 100);
  }

  useEffect(() => {
    AsyncStorage.getItem('contactId').then(conId => {
      setConId(conId);
    });
    // console.log('Page Name:', pageName);
  }, [pageName]);

  const navigateToScreen = screenName => {
    navigation.navigate(screenName);
  };

  const navigateToScreenandata = screenNameanddata => {
    if (typeof changeTab === 'function') {
      navigateToScreen('Dashboard');
      changeTab();
    } else {
      navigateToScreen('Dashboard');
    }
  };

  const searchPressed = () => {
    setSearchResults([])
    if(searchQuery){      
      setLoading(true)
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth();
      let formData = new FormData()
      formData.append('year',year)
      // formData.append('year',year)
      formData.append('month',month+1)
      // formData.append('month',4)
      formData.append('empcode',searchQuery)
      RegistrationService.Search(formData).then(res=>{
        setLoading(false)
        if(res.Status==1){
            setSearchResults(res.User)          
        }
      })
    }
  };

  return (
    <View
      style={{
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        bottom: StatusBar.currentHeight - 4,
        left: 0,
        right: 0,
        paddingVertical: 5,
        paddingHorizontal: 10,
        paddingBottom:30,
        backgroundColor: '#FF1933',
        // shadowColor: '#000',
        // shadowOffset: {width: 0, height: 2},
        // shadowOpacity: 0.3,
        // shadowRadius: 3,
        // elevation: 9,
      }}>
      <Modal visible={modeonoff} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={{justifyContent: 'flex-end'}}>
            <Pressable
              style={{
                alignSelf: 'flex-end',
                paddingRight: '5%',
                paddingTop: '15%',
                marginBottom:10
              }}
              onPress={() =>{ 
              toglefunction()}}>
              <XCircleIcon color="#FFFFFF" size={30} />
            </Pressable>
            <View
              style={{
                width: '85%',
                justifyContent:'center',
                alignContent:'center',
                alignSelf:'center',
              }}>
              <Searchbar
                placeholder="Search by employee ID"
                onChangeText={setSearchQuery}
                value={searchQuery}
                onSubmitEditing={searchPressed}
              />
              <IconButton
                icon="magnify"
                rippleColor="#f06767"
                size={screenHeight * 0.03}
                onPress={searchPressed}
                style={{
                  position: 'absolute',
                  right: screenWidth * 0.025,
                  backgroundColor: '#f09c9c',
                }}
              />
            </View>


            {searchResults.length > 0 && (
              <ScrollView>
                <View className="flex-1 m-4 mt-2 p-1  border border-[#E5E5E5] rounded bg-white">
                  {/* <ScrollView> */}
                  {searchResults.map((item, index) => {
                    return (
                      <View
                        key={index}
                        className="flex-row border border-[#E5E5E5] rounded  bg-[#FAFAFA] p-1 pb-2">
                        <View
                          style={{flex: 0.75}}
                          className="items-center  pt-1">
                          <View className="rounded-full relative  w-[40px] h-[40px] bg-primaryColor ml-4 ">
                            <View className="bottom-0 top-[3.5px] left-[3.5px] right-0 absolute">
                              <Image
                                className="rounded-full w-[33px] h-[33px] items-center "
                                source={
                                  item.profilePhtotoUrl
                                    ? {uri: API_BASE_URL + item.profilePhtotoUrl.slice(1)}
                                    : require('./../assets/Images/dp.png')}
                              />
                            </View>
                            <View className="  absolute  top-[10px]  left-[-18px] items-center justify-center">
                              <Text className="text-[15px] font-semibold text-black">
                                {index + 1}
                              </Text>
                            </View>
                          </View>
                        </View>
                        <View style={{flex: 3}}>
                          <View className="pt-[5px] pl-[5px] relative">
                            <Text className="text-[15px] font-semibold text-[#000000]">
                              {item.Name}{' '}
                            </Text>
                            <Text
                              className="text-[11px] font-semibold   pt-[4px]"
                              style={{color: 'rgba(0, 0, 0, 0.5)'}}>
                              EMP Code:{' '}
                              <Text
                                className="font-bold"
                                style={{color: 'rgba(29, 36, 54, 0.85)'}}>
                                {item.EmpCode}
                              </Text>
                              &nbsp;&nbsp;&nbsp; ST Code:{' '}
                              <Text
                                className="font-bold"
                                style={{color: 'rgba(29, 36, 54, 0.85)'}}>
                                {item.StoreCode}
                              </Text>
                            </Text>

                            <View className="absolute items-end mt-1 right-2">
                              <Text className="text-[16px] font-medium text-[#333333]">
                                {+item.Rating.toFixed(2)}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    );
                  })}



                  {/* </ScrollView> */}
                </View>
              </ScrollView>
            )}

            {
              loading && 
              <Text style={{color:'white', textAlign:'center',fontSize:20}}>Loading...</Text>

            }

            {/* {searchQuery && searchResults.length==0 && !loading &&
             <Text style={{color:'white', textAlign:'center',fontSize:20}}>No Data Found</Text>

            } */}
          </View>
        </View>
      </Modal>

      <View
        className="flex-row  pt-[6px] pb-[6px]"
        style={{
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.3,
          shadowRadius: 3,
          elevation: 9,
        }}>
        <TouchableOpacity
          className="flex-1 relative items-center "
          onPress={() => navigateToScreenandata()}>
          {pageName == 'Home1' ? (
            <View>
              <View className="absolute mt-[-22px] ml-[-20px]">
                <View className="bg-white w-[70px] h-[70px] rounded-[35px]"></View>
              </View>
              <HomeIcon size={28} color="#BD3861" />
            </View>
          ) : (
            <MaterialCommunityIcons name="home" size={25} color="#FFFFFF" />
          )}

          <Text
            className=" text-[#FFFFFF] text-[12px] font-ralebold"
            style={styles.fontFamily}>
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-1 items-center relative"
          onPress={() => navigation.navigate('MyProfile')}>
          {pageName == 'MyProfile1' ? (
            <View>
              <View className="absolute mt-[-22px] ml-[-20px]">
                <View className="bg-white w-[70px] h-[70px] rounded-[35px]"></View>
              </View>
              <UserIcon size={28} color="#BD3861" />
            </View>
          ) : (
            <FontAwesome name="user" size={25} color="#FFFFFF" />
          )}

          <Text
            className=" text-[#FFFFFF] text-[12px] font-ralebold"
            style={styles.fontFamily}>
            Profile
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-1 items-center relative"
          onPress={() => toglefunction()}>
          <View
            className="rounded-full relative  w-[65px] h-[65px] bg-white items-center mt-[-40px]"
            style={{
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.3,
              shadowRadius: 3,
              elevation: 9,
            }}>
            <View className="bottom-0 top-[0px] left-[0px] right-0 absolute items-center justify-center">
              <View className="bg-primaryColor rounded-full w-[50px] h-[50px] items-center justify-center">
                <MaterialCommunityIcons
                  name="magnify"
                  size={30}
                  color="#FFFFFF"
                />
              </View>

              {/* <Image
                        className="rounded-full w-[70px] h-[70px] items-center "
                        source={require('./../assets/Images/image-46.png')}
                      /> */}
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-1 items-center relative"
          onPress={() => navigation.navigate('TermsNCondition')}>
          <Feather name="file-text" size={25} color="#FFFFFF" />
          <Text
            className=" text-[#FFFFFF] text-[12px] font-ralebold"
            style={styles.fontFamily}>
            Terms
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-1 items-center relative"
          onPress={() => navigation.openDrawer()}>
          {pageName == 'RewardsCatalogue1' ? (
            <View>
              <View className="absolute mt-[-22px] ml-[-20px]">
                <View className="bg-white w-[70px] h-[70px] rounded-[35px]"></View>
              </View>
              <GiftIcon size={28} color="#BD3861" />
            </View>
          ) : (
            <Feather name="menu" size={25} color="#FFFFFF" />
          )}

          <Text
            className=" text-[#FFFFFF] text-[12px] font-ralebold"
            style={styles.fontFamily}>
            Menu
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default FooterTab;

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
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'flex-start', // Align items to the start (top) of the container
  },
});
