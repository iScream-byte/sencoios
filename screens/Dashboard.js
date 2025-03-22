import React, {useState, useEffect, useCallback} from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  SafeAreaView,
  Dimensions,
  Modal,
  TouchableOpacity,
  Platform,
  TouchableWithoutFeedback,
  Button,
  Alert,
  BackHandler
} from 'react-native';
import {XCircleIcon} from 'react-native-heroicons/outline';

import FormBackground from '../components/FormBackground';
import Feather from 'react-native-vector-icons/Feather';
import FastImage from 'react-native-fast-image';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CircularProfile from '../components/CircularProfile';
import {
  ArrowRightIcon,
  CameraIcon,
  HomeIcon,
} from 'react-native-heroicons/outline';
import FooterTab from '../components/FooterTab';
import StorePerformModal from '../components/StorePerformModal';
import DeductionModal from '../components/DeductionModal';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RegistrationService from '../services/registration';
import LoadingAlert from '../components/LoadingAlert';
import OpenCameraModal from '../components/OpenCameraModal';

import { API_BASE_URL } from './../constants/common';


const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('screen').width;

const Dashboard = ({navigation}) => {
  const [currentTab, setCurrentTab] = useState('Performance');
  const [currentFilterTab, setcurrentFilterTab] = useState('MTD');
  const [modalSt, setModalSt] = useState(false);
  const [modalStd, setModalStd] = useState(false);
  const [fullName, setFullName] = useState('');
  const [userId, setuserId] = useState('');
  const [empCode, setempCode] = useState('');
  const [storeID, setstoreID] = useState('');
  const [storeCode, setstoreCode] = useState('');
  const [rating, setrating] = useState(null);
  const [myDp, setMyDp] = useState('null');
  const [roleId, setRoleId] = useState(0);
  const [modeonoff, setModelOnoff] = useState(false);
  const [monthlyPerformanceData, setmonthlyPerformanceData] = useState('');
  const [showLoading, setShowLoading] = useState(false);
  const [storePerformance, setstorePerformance] = useState('');
  const [totalIncentiveMonthly, setTotalIncentiveMonthly] = useState(0);
  const [prorataMonthly, setProrataMonthly] = useState(0);
  const [incentiveQTD, setIncentiveQTD] = useState(0);
  const [incentiveYTD, setIncentiveYTD] = useState(0);
  const [deductionData, setDeductionData] = useState(null);
  const [beforeDeductionIncentive, setBeforeDeductionIncentive] = useState(0);
  const [leaderBoardCandidates, setLeaderBoardCandidates] = useState([]);
  const [leaderBoardCandidatesTopThree, setLeaderBoardCandidatesTopThree] = useState([]);
  const [myRankRating, setMyRankRating] = useState([]);
  const [cameraModalVisible, setCameraModalVisible] = useState(false);
  const [reloadDashboardFlag, setReloadDashboardFlag] = useState(false);
  
  const [staticMonth, setStaticMonth] = useState(3);
  const [staticYear, setStaticYear] = useState(2024);



  const openModal = () => {
    setCameraModalVisible(true);
  };

  const changeTab = () => {
    setCurrentTab('Performance');
  };




  useFocusEffect(
    React.useCallback(() => {
      // setCurrentTab('Performance')
      AsyncStorage.getItem('fullName').then(name => {
        setFullName(name);
      });
      AsyncStorage.getItem('rating').then(rating => {
        setrating(+rating);
      });
      AsyncStorage.getItem('roleId').then(roleId => {
        setRoleId(+roleId);
      });
      AsyncStorage.getItem('userData').then(item => {
        const ud = JSON.parse(item);
        setstoreID(ud.storeID);
        setstoreCode(ud.storeCode);
        setuserId(ud.userid);
        setempCode(ud.username);
        // getMonthlyPerformanceList();
        // getStorePerformanceList();
        // getMonthlyIncentiveAmount();
      });
      AsyncStorage.getItem('lastLoginMonth').then(llm => {      
        if(llm){
          console.log(llm,"sidebarrrrrrrrr");
          let currentMonth=new Date().getMonth()+1
          console.log(currentMonth,"helooooooo");
          if(llm!=currentMonth){
            Alert.alert(
              'Your session has expired!',
              'Please log in again to continue.',
              [              
                {
                  text: 'Ok',
                  onPress: () => {
                    logoutHandler(navigation);
                    // console.log("heloooooooooooooooo");
                  },
                },
              ],
              {cancelable: false},
            );
          }
        }  
      });
    }, []),
  );




  useEffect(() => {
    if (empCode && userId) {
      getMonthlyPerformanceList();
      getStorePerformanceList();
      getMonthlyIncentiveAmount();
      getDeductionData();
      getLeaderboardData()

    }
  }, [empCode, userId]);


  useEffect(() => {
    const backAction = () => {
      if(!navigation.canGoBack()){
        console.log(navigation.canGoBack());
        Alert.alert(
          "Confirm Exit!",
          "Are you sure you want to exit the app?",
          [
            {
              text: "Cancel",
              onPress: () => null,
              style: "cancel"
            },
            { text: "YES", onPress: () => {
              setTimeout(() => {
                BackHandler.exitApp()
              }, 200);
              } }
          ]
        );
        return true;
      }

    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => {backHandler.remove()}
  }, []);



  // useEffect(() => {
  //   if (storeID) {
  //     // getStorePerformanceList();
  //   }
  // }, [storeID]);

  useEffect(() => {
    console.log('dashboard reloaded');
    AsyncStorage.getItem('profilePhotoURL').then(dp => {
      setMyDp(dp);
    });

  }, [reloadDashboardFlag,myDp,currentTab]);

  useEffect(() => {
    console.log('tab changed',roleId);
    if(empCode&&storeID){
      getLeaderboardData()
    }
  }, [currentFilterTab]);


  const logoutHandler = navigation => {
    AsyncStorage.clear().then(res=>{
      navigation.navigate('SignIn');
    })
  };


  const getMonthlyPerformanceList = () => {
    setShowLoading(true);
    let currentYear = new Date().getFullYear();    
    let currentMonthDigit = new Date().getMonth();
    
    if (currentMonthDigit==0) {
      currentYear=currentYear-1    
      currentMonthDigit=12  
    }
    //console.log(currentYear,currentMonthDigit);
    // empcode(string) = E3757,
    // month(string) = 11,
    // year(string) = 2023,
    // UserID(string) = 2
    const formData = new FormData();
    formData.append('empcode', empCode);
    formData.append('UserID', userId);
    formData.append('month', staticMonth);
    formData.append('year', staticYear);
    RegistrationService.MonthlyPerformanceList(formData)
      .then(res => {
        // console.log(res,'monthlyyyyyyyy');
        setShowLoading(false);
        // console.log('MonthlyPerformanceList res', res);
        if (res != null) {
          if (res.Status == 1) {
            setmonthlyPerformanceData(res.Performance[0]);
          } else {
            setmonthlyPerformanceData('');
          }
          //setstorList(get_data);
        } else {
          setmonthlyPerformanceData('');
        }
      })
      .catch(err => {
        //console.log('MonthlyPerformanceList catch', res);
        setmonthlyPerformanceData('');
        // setShowLoading(false);
      });
  };




  const getMonthlyIncentiveAmount = () => {
    setShowLoading(true);
    let currentYear = new Date().getFullYear();    
    let currentMonthDigit = new Date().getMonth();
    
    if (currentMonthDigit==0) {
      currentYear=currentYear-1    
      currentMonthDigit=12  
    }
    const formData = new FormData();
    formData.append('empid', empCode);
    formData.append('storeid', storeID);
    formData.append('month', staticMonth);
    formData.append('year', staticYear);
    // console.log(formData, 'leeesdsd');
    RegistrationService.GetTotalIncentive(formData).then(res => {
      console.log(res, 'MONTHLY INCENTIVE');
      setShowLoading(false);
      if(res==null){
        console.error('Performance data not found')
        return
      }
      if (res.Msg == 'Success') {
        if (res.EmpIncentive.MTD.length > 0) {
          setTotalIncentiveMonthly(+res.EmpIncentive.MTD[0].IncentiveAmount);
          setBeforeDeductionIncentive(+res.EmpIncentive.MTD[0].IncentiveAmount);
          setProrataMonthly(+res.EmpIncentive.MTD[0].Prorata);
        } else {
          // console.error('Incentive data MTD not found');
        }
        if (res.EmpIncentive.QTD.length > 0) {
          setIncentiveQTD(+res.EmpIncentive.QTD[0].IncentiveAmount);          
        } else {
          // console.error('Incentive data QTD not found');
        }
        if (res.EmpIncentive.YTD.length > 0) {
          setIncentiveYTD(+res.EmpIncentive.YTD[0].IncentiveAmount);          
        } else {
          setIncentiveYTD(+res.EmpIncentive.QTD[0].IncentiveAmount);
          // console.error('Incentive data YTD not found');
        }
      }
    });
  };



  const getDeductionData = () => {
    setShowLoading(true);
    let currentYear = new Date().getFullYear();    
    let currentMonthDigit = new Date().getMonth();
    
    if (currentMonthDigit==0) {
      currentYear=currentYear-1    
      currentMonthDigit=12  
    }
    const formData = new FormData();
    formData.append('empcode', empCode);
    formData.append('storecode', storeCode);
    formData.append('month', staticMonth);
    formData.append('year', staticYear);
    console.log(formData, 'DEDUCTION DATA');
    RegistrationService.GetDeductionData(formData).then(res => {
      console.log(res, 'DEDUCTION');
      if (res.Status == 1) {
        // console.log(res.EmpDeduction[0],'poop');
        if(res.EmpDeduction.length>0){
          setDeductionData(res.EmpDeduction[0]);
        }else{
          setDeductionData({
            StatuaryComplainDeduction:'0.00',
            StoreAuditDeduction:'0.00',
            TrainingEvolutionDeduction:'0.00',
            MCAOPDeduction:'0.00',
          });
        }
      } else {
        // console.error('Deduction data not found');
        setDeductionData({
          StatuaryComplainDeduction:'0.00',
          StoreAuditDeduction:'0.00',
          TrainingEvolutionDeduction:'0.00',
          MCAOPDeduction:'0.00',
        });
      }
      setShowLoading(false);
    });
  };


  const getLeaderboardData = () =>{
    setShowLoading(true)
    let currentYear = new Date().getFullYear();    
    let currentMonthDigit = new Date().getMonth();
    
    if (currentMonthDigit==0) {
      currentYear=currentYear-1    
      currentMonthDigit=12  
    }
    let formData= new FormData()
    // formData.append('year', currentYear)
    formData.append('year', staticYear)
    // formData.append('month', currentMonthDigit)
    formData.append('month', staticMonth)
    formData.append('storeid',storeID)
    formData.append('empcode',empCode)
    formData.append('type',currentFilterTab=="MTD"?'M':currentFilterTab=="QTD"?'Q':currentFilterTab=="YTD"?'Y':'M')
    console.log(formData,'leaderboard req');
    RegistrationService.Leaderboard(formData).then(
      res=>{        
        console.log(res,'Leaderboard');
        if(res.Status==1){
          setLeaderBoardCandidates(res.scoreboardmodel.ScoreboardResultsall)
          setLeaderBoardCandidatesTopThree(res.scoreboardmodel.ScoreboardResulttopthree)
          setMyRankRating(res.scoreboardmodel.UserScoreboardResult)
          setShowLoading(false)
        }
      }
    )
  }

  
  const getQuaterlyPerformanceList = () => {
    let currentYear = new Date().getFullYear();    
    let currentMonthDigit = new Date().getMonth();
    
    if (currentMonthDigit==0) {
      currentYear=currentYear-1    
      currentMonthDigit=12  
    }
    //console.log(currentYear,currentMonthDigit);
    //     empcode(string) = E3757,
    // month(string) = 11,
    // year(string) = 2023,
    // UserID(string) = 2
    const formData = new FormData();
    formData.append('empcode', empCode);
    formData.append('UserID', userId);
    formData.append('month', staticMonth);
    formData.append('year', staticYear);
    setShowLoading(true);

    RegistrationService.QuaterlyPerformanceList(formData)
      .then(res => {
        setShowLoading(false);
        // console.log('QuaterlyPerformanceList res', res);
        if (res != null) {
          if (res.Status == 1) {
            setmonthlyPerformanceData(res.Performance[0]);
          } else {
            setmonthlyPerformanceData('');
          }
          // setstorList(get_data);
        } else {
          setmonthlyPerformanceData('');
        }
        //setstorList(get_data);
      })
      .catch(err => {
        setShowLoading(false);
      });
  };


  const getYearlylyPerformanceList = () => {
    let currentYear = new Date().getFullYear();    
    let currentMonthDigit = new Date().getMonth();
    
    if (currentMonthDigit==0) {
      currentYear=currentYear-1    
      currentMonthDigit=12  
    }
    //console.log(currentYear,currentMonthDigit);
    //     empcode(string) = E3757,
    // month(string) = 11,
    // year(string) = 2023,
    // UserID(string) = 2
    const formData = new FormData();
    formData.append('empcode', empCode);
    // formData.append('UserID', '11');
    //formData.append('month', 11);
    formData.append('year', staticYear);
    setShowLoading(true);
    RegistrationService.YearlyPerformanceList(formData)
      .then(res => {
        setShowLoading(false);
        // console.log('YearlyPerformanceList res', res);
        if (res != null) {
          if (res.Status == 1) {
            setmonthlyPerformanceData(res.Performance[0]);
          } else {
            setmonthlyPerformanceData('');
          }
          //setstorList(get_data);
        } else {
          setmonthlyPerformanceData('');
        }
        //setstorList(get_data);
      })
      .catch(err => {
        setShowLoading(false);
      });
  };


  const perform_select_filter = val => {
    if (val == 'MTD') {
      getMonthlyPerformanceList();
    } else if (val == 'QTD') {
      getQuaterlyPerformanceList();
    } else if (val == 'YTD') {
      getYearlylyPerformanceList();
    }
  };

  
  const getStorePerformanceList = () => {
    let currentYear = new Date().getFullYear();    
    let currentMonthDigit = new Date().getMonth();
    
    if (currentMonthDigit==0) {
      currentYear=currentYear-1    
      currentMonthDigit=12  
    }
    //console.log(currentYear,currentMonthDigit);
    //     empcode(string) = E3757,
    // month(string) = 11,
    // year(string) = 2023,
    // UserID(string) = 2
    const formData = new FormData();
    formData.append('storeid', storeID);
    //formData.append('UserID', 11);
    formData.append('month', staticMonth);
    formData.append('year', staticYear);
    setShowLoading(true);
    RegistrationService.StorePerformance(formData)
      .then(res => {
        // setShowLoading(false);
        // console.log('StorePerformance res', res);
        if (res.Status == 1) {
          setstorePerformance(res.StorePerformance[0]);
        } else {
          setstorePerformance('');
        }
        //setstorList(get_data);
      })
      .catch(err => {
        // setShowLoading(false);
      })
      .catch(err => {
        console.log('Err', JSON.stringify(err));
      });
  };



  const performance_indicator = [
    {
      tag: 'NSV',
      title: 'NSV Performace ',
      target: 'Target',
      achievement: 'Achievement',
      color: '#E4D509',
      unit: ' (in Lakh)',
      rs: '',
    },
    {
      tag: 'SYC',
      title: 'SY(C) Performace ',
      target: 'Target',
      achievement: 'Achievement',
      color: '#EB7171',
      unit: 'pcs',
      rs: '',
    },
    {
      tag: 'SYV',
      title: 'SY(V) Performace ',
      target: 'Target',
      achievement: 'Achievement',
      color: '#2299E8',
      unit: '',
      rs: '₹',
    },
    {
      tag: 'Diamond',
      title: 'Diamond Performace ',
      target: 'Target',
      achievement: 'Achievement',
      color: '#E4D509',
      unit: 'CT',
      rs: '',
    },
    {
      tag: 'Platinum',
      title: 'Platinum Performace ',
      target: 'Target',
      achievement: 'Achievement',
      color: '#E4D509',
      unit: 'Gm',
      rs: '',
    },
    //{tag:'Gossip',title:'Gold Performace ',target:'Target',achievement:'Achievement',color:'#E4D509',unit:'Gm',rs:''},
    {
      tag: 'Silver',
      title: 'Silver Performace ',
      target: 'Target',
      achievement: 'Achievement',
      color: '#E4D509',
      unit: 'KG',
      rs: '',
    },
    //{tag:'Stone',title:'Gem stone Performace ',target:'Target',achievement:'Achievement',color:'#E4D509',unit:'',rs:'₹'},
    {
      tag: 'ATV',
      title: 'ATV Performace ',
      target: 'Target',
      achievement: 'Achievement',
      color: '#E4D509',
      unit: '',
      rs: '₹',
    },
    {
      tag: 'ASP',
      title: 'ASP Performace ',
      target: 'Target',
      achievement: 'Achievement',
      color: '#E4D509',
      unit: '',
      rs: '₹',
    },
  ];

 function reloadDashboard(){
  setReloadDashboardFlag(!reloadDashboardFlag)  
}

  const edit = () => {};

  return (
    <FormBackground bgImage={require('./../assets/Images/bg_reg_bg.png')}>
      <View
        className="flex-1 w-full bg-white m-5  mt-[3px] shadow"
        style={{borderRadius: 10}}>
        {currentTab != 'Leaderboard' && (
          <View className="flex-row  p-3">
            <View style={{flex: 1}}>
              <View>
                <Text className="text-[#191A32] text-[16px] font-semibold">
                  {fullName}
                </Text>
                <Text className="text-[#14172B] text-[14px] font-semibold mt-[3px]">
                  <MaterialCommunityIcons
                    name="star-box"
                    size={16}
                    color="red"
                  />                  
                  <Text className="text-[15px] text-[#1D2436]"> {rating ? rating.toFixed(1) : rating == 0 ? 0 : ''} Out of 5</Text>
                </Text>
              </View>
              <View
                style={{}}
                className="border border-[#000000] rounded items-center p-[4px]  mt-[12px]">
                {rating >= 2 && rating < 3 ? (
                  <Text className="text-[11px] text-[#000000] font-semibold">
                    {rating >= 4.6
                      ? 'Excellent'
                      : rating >= 4 && rating < 4.6
                      ? 'Very Good'
                      : rating >= 3 && rating < 4
                      ? 'Good'
                      : rating >= 2 && rating < 3
                      ? `Needs Improvement`
                      : rating < 2
                      ? 'Poor'
                      : 'Loading...'}
                  </Text>
                ) : (
                  <Text className="text-[13px] text-[#000000] font-semibold">
                    {rating >= 4.6
                      ? 'Excellent'
                      : rating >= 4 && rating < 4.6
                      ? 'Very Good'
                      : rating >= 3 && rating < 4
                      ? 'Good'
                      : rating >= 2 && rating < 3
                      ? `Needs Improvement`
                      : rating < 2
                      ? 'Poor'
                      : 'Loading...'}
                  </Text>
                )}
              </View>
            </View>
            <View style={{flex: 1}}>
              <View className="mt-[-27px]">
                <Pressable
                  className="rounded-full absolute p-1.5 bg-slate-400"
                  style={{left: 10}}
                  onPress={edit}>
                  <Image
                    className="rounded-full"
                    style={{
                      position: 'relative',
                      width: screenWidth * 0.22,
                      height: screenWidth * 0.22,
                    }}
                    source={
                      myDp==null||myDp=='null'
                        ? require('./../assets/Images/dp.png')
                        : {uri: API_BASE_URL + myDp.slice(1)}
                    }
                  />
                  {/* {profileImageLoader && <View style={{position: 'absolute', top: (screenWidth * 0.25/2)-11, left: (screenWidth * 0.25/2)-12 }}><ActivityIndicatorLoader/></View>} */}
                </Pressable>
                <Pressable
                  className="p-1.5 absolute rounded-full"
                  style={{
                    top: screenHeight * 0.086,
                    left: screenWidth * 0.2,
                    backgroundColor: 'red',
                  }}
                  onPress={openModal}>
                  <CameraIcon size={18} fontWeight={700} color={'#fff'} />
                </Pressable>
              </View>
            </View>

            <OpenCameraModal
              from={'dashboard'}
              setModalSt={setCameraModalVisible}
              modalSt={cameraModalVisible}
              empCode={empCode}
              reloadDashboard={reloadDashboard}
              ></OpenCameraModal>

            <View style={{flex: 1}}>
              <View className=" items-end ">
                <Text className="text-[11px] text-[#6F7074] font-semibold text-wrap">
                  Incentive:{' '}
                </Text>
                <Text className="text-[#1D2436] text-[10px]">
                  ₹{prorataMonthly.toFixed(2)} /{' '}
                  {totalIncentiveMonthly.toFixed(2)}
                </Text>

                <FastImage
                  style={{
                    width: 60,
                    height: 30,
                    marginTop: -5,
                    width: screenWidth * 0.1,
                    height: screenHeight * 0.08,
                    marginRight: 20,
                    paddingVertical: 0,
                    paddingRight: 10,
                  }}
                  source={require('../assets/Images/redboxcoin.gif')}
                />
              </View>
            </View>
          </View>
        )}

        <View
          className={
            currentTab != 'Leaderboard'
              ? 'mt-[-5px] flex-row  '
              : 'mt-[0px] flex-row '
          }
          style={{
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.3,
            shadowRadius: 3,
            elevation: 1,
          }}>
          <View
            className={
              currentTab != 'Leaderboard'
                ? 'flex-1 relative items-center border-b-[1px] border-t-[1px] border-[#E5E5E5] pt-1 pb-1'
                : 'flex-1 relative items-center border-b-[1px] border-t-[0px] border-[#E5E5E5] pt-1 pb-1'
            }>
            <Pressable
              onPress={() => {
                setShowLoading(true);
                setTimeout(() => {
                  setCurrentTab('Performance');
                  setShowLoading(false);
                }, 300);
              }}>
              <Text
                className={`text-${
                  currentTab == 'Performance' ? '[#FF1933]' : '[#000000]'
                } text-[15px] font-semibold`}>
                Performance
              </Text>
            </Pressable>
            {currentTab == 'Performance' ? (
              <View className="relative left-[0] top-[5px] w-[100%]">
                <View className="border-b-[3px]  border-[#FF1933]"></View>
              </View>
            ) : null}
          </View>

          <View className="flex-1 relative items-center border-b-[1px] border-t-[1px] pt-1 pb-1 border-l-[1px] border-r-[1px] border-[#E5E5E5]">
            <Pressable
              onPress={() => {
                setShowLoading(true);

                setTimeout(() => {
                  setCurrentTab('Incentive');
                  setShowLoading(false);
                }, 300);
              }}>
              <Text
                className={`text-${
                  currentTab == 'Incentive' ? '[#FF1933]' : '[#000000]'
                } text-[15px] font-semibold`}>
                Incentive (₹)
              </Text>
            </Pressable>
            {currentTab == 'Incentive' ? (
              <View className="relative left-[0] top-[5px] w-[100%]">
                <View className="border-b-[3px]  border-[#FF1933]"></View>
              </View>
            ) : null}
          </View>
          <View
            className={
              currentTab != 'Leaderboard'
                ? 'flex-1 items-center relative border-b-[1px] border-t-[1px] border-[#E5E5E5] pt-1 pb-1'
                : 'flex-1 items-center relative border-b-[1px] border-t-[0px] border-[#E5E5E5] pt-1 pb-1'
            }>
            <Pressable
              onPress={() => {
                setShowLoading(true);
                setTimeout(() => {
                  setShowLoading(false);
                  setCurrentTab('Leaderboard');
                }, 300);
              }}>
              <Text
                className={`text-${
                  currentTab == 'Leaderboard' ? '[#FF1933]' : '[#000000]'
                } text-[15px] font-semibold`}>
                Leaderboard
              </Text>
            </Pressable>
            {currentTab == 'Leaderboard' ? (
              <View className="relative left-[0] top-[5px] w-[100%]">
                <View className="border-b-[2px] border-[#FF1933]"></View>
              </View>
            ) : null}
          </View>
        </View>

        {(currentTab == 'Performance' || currentTab == 'Leaderboard') && (
          <View className="flex-row mt-[-5px] p-4">
            <View
              className={
                currentFilterTab == 'MTD'
                  ? 'flex-1 items-center border border-[#FF1933] rounded p-[5px] bg-[#FF1933]'
                  : 'flex-1 items-center border border-[#E5E5E5] rounded p-[5px]'
              }>
              <Pressable
                onPress={() => {
                  setcurrentFilterTab('MTD'), perform_select_filter('MTD');
                }}>
                <View>
                  <Text
                    className={
                      currentFilterTab == 'MTD'
                        ? 'text-[14px] text-[#fff] font-semibold'
                        : 'text-[14px] text-[#000000] font-semibold'
                    }>
                    MTD
                  </Text>
                </View>
              </Pressable>
            </View>
            <View
              className={
                currentFilterTab == 'QTD'
                  ? 'flex-1 items-center border border-[#FF1933] rounded p-[5px] mr-[20px] ml-[20px] bg-[#FF1933]'
                  : 'flex-1 items-center border border-[#E5E5E5] rounded p-[5px] mr-[20px] ml-[20px]'
              }>
              <Pressable
                onPress={() => {
                  setcurrentFilterTab('QTD'), perform_select_filter('QTD');
                }}>
                <View>
                  <Text
                    className={
                      currentFilterTab == 'QTD'
                        ? 'text-[14px] text-[#fff] font-semibold'
                        : 'text-[14px] text-[#000000] font-semibold'
                    }>
                    QTD
                  </Text>
                </View>
              </Pressable>
            </View>

            <View
              className={
                currentFilterTab == 'YTD'
                  ? 'flex-1 items-center border border-[#FF1933] rounded p-[5px] bg-[#FF1933]'
                  : 'flex-1 items-center border border-[#E5E5E5] rounded p-[5px]'
              }>
              <Pressable
                onPress={() => {
                  setcurrentFilterTab('YTD'), perform_select_filter('YTD');
                }}>
                <View>
                  <Text
                    className={
                      currentFilterTab == 'YTD'
                        ? 'text-[14px] text-[#fff] font-semibold'
                        : 'text-[14px] text-[#000000] font-semibold'
                    }>
                    YTD
                  </Text>
                </View>
              </Pressable>
            </View>
          </View>
        )}

<Modal visible={modeonoff} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <Text>

          
        </Text>
      </View>
    </Modal>
        {currentTab == 'Performance' && (
          <View className="flex-1 m-4 mt-[-5px] p-2 border border-[#E5E5E5] rounded">
            <Text className="text-[15px] font-semibold text-[#000000] mb-2">
              Key Performance Indicator
            </Text>
               {/* <TouchableOpacity onPress={toglefunction} style={styles.button}>
            <Text style={styles.buttonText}>Close Modal</Text>
          </TouchableOpacity> */}
            <ScrollView
              style={
                {
                  //flex: 1,
                  //padding: 20,
                  marginBottom: 60,
                }
              }>
              {monthlyPerformanceData &&
                performance_indicator &&
                performance_indicator.map((item, index) => {
                  let target = '';
                  let achievement = '';
                  let res_point = '';
                  let point = 0;
                  let rating = monthlyPerformanceData[`${item.tag}RatingScale`];
                  if (item.tag == 'SYC') {
                    target = monthlyPerformanceData.Individual_SY_Target; //monthlyPerformanceData[`Individual_SY_Target`];
                    achievement = monthlyPerformanceData.Individual_SY_Ach; //monthlyPerformanceData[`Individual_SY_Ach`];
                    res_point = ''; //(Number(achievement)/Number(target))*100;
                    point = isNaN(+achievement/+target)*100||!isFinite((+achievement/+target)*100)?0.00:((+achievement/+target)*100).toFixed(2);
                    rating = monthlyPerformanceData.IndividualSYRatingScale; //monthlyPerformanceData[`IndividualSYRatingScale`];
                  } else if (item.tag == 'SYV') {
                    target = monthlyPerformanceData.Individual_SY_Target_Amount; //monthlyPerformanceData[`Individual_SY_Target_Amount`];
                    achievement = monthlyPerformanceData.Individual_SY_Ach_Amount; //monthlyPerformanceData[`Individual_SY_Ach_Amount`];
                    res_point = '' ; //(Number(achievement)/Number(target))*100;
                    point = isNaN(+achievement/+target)*100||!isFinite((+achievement/+target)*100)?0.00:((+achievement/+target)*100).toFixed(2);
                    rating = monthlyPerformanceData.IndividualSYTargetAmtRatingScale; //monthlyPerformanceData[`IndividualSYTargetAmtRatingScale`];
                  } else if (item.tag == 'Gossip') {
                    target = ''; //monthlyPerformanceData[`Gossip_Target_Amount`];
                    achievement = ''; //monthlyPerformanceData[`Gossip_Ach_Amount`];
                    res_point = ''; //(Number(achievement)/Number(target))*100;
                    point = 0; //res_point?res_point.toFixed(2):0;
                    rating = 0; //monthlyPerformanceData[`GossipRatingScale`];
                  } else if (item.tag == 'Stone') {
                    target = monthlyPerformanceData[`Stone_Target_Amount`];
                    achievement = monthlyPerformanceData[`Stone_Ach_Amount`];
                    res_point =
                      (Number(achievement) / Number(target)) * 100 == NaN
                        ? 0
                        : (Number(achievement) / Number(target)) * 100;
                    point = res_point != Infinity ? Math.round(res_point) : 0;
                    rating = monthlyPerformanceData[`StoneRatingScale`];
                    //console.log('point',point);
                  } else {
                    target = monthlyPerformanceData[`${item.tag}_Target`];
                    achievement = monthlyPerformanceData[`${item.tag}_Ach`];
                    res_point = ''
                    // point = res_point != Infinity ? Math.round(res_point) : 0;
                    point = isNaN(+achievement/+target)*100||!isFinite((+achievement/+target)*100)?0:((+achievement/+target)*100).toFixed(2);
                    rating = monthlyPerformanceData[`${item.tag}RatingScale`];
                  }
                  let rating_img = '';
                  if (rating >= 1 && rating < 2) {
                    rating_img = require('./../assets/Images/rating1.png');
                  } else if (rating >= 2 && rating < 3) {
                    rating_img = require('./../assets/Images/rating2.png');
                  } else if (rating >= 3 && rating < 4) {
                    rating_img = require('./../assets/Images/rating3.png');
                  } else if (rating >= 4 && rating < 5) {
                    rating_img = require('./../assets/Images/rating4.png');
                  } else if (rating >= 5 && rating < 6) {
                    rating_img = require('./../assets/Images/rating5.png');
                  } else {
                    rating_img = require('./../assets/Images/rating1.png');
                  }

                  let circle_color = '';
                  if (point >= 0 && point < 21) {
                    circle_color = '#ff021a';
                  } else if (point >= 21 && point < 41) {
                    circle_color = '#ff9e42';
                  } else if (point >= 41 && point < 61) {
                    circle_color = '#f4e480';
                  } else if (point >= 61 && point < 81) {
                    circle_color = '#95dd4e';
                  } else if (point >= 81) {
                    circle_color = '#00d12e';
                  } else {
                    //circle_color=require('./../assets/Images/rating1.png');
                  }
                  //console.log('point',point,circle_color);
                  return (
                    <View
                      key={index}
                      className="flex-row border border-[#E5E5E5] rounded  bg-[#F5F6FB] p-1 mb-2">
                      <View style={{flex: 0.5}}>
                        <View className="relative">
                          <CircularProfile
                            percentage={point > 0 ? point : 0}
                            color={circle_color}
                            className="relative"
                          />
                          <View
                            style={{zIndex: 2}}
                            className="rounded-full h-[35px] w-[35px] bg-[#ffffff] justify-center items-center absolute top-[6px] left-[6px] right-0">
                            <View className="rounded-full   ">
                              <Text className="text-[7px] font-semibold text-[#000000]">
                                {point}%
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                      <View style={{flex: 2}}>
                        <View className="pt-[5px] pl-[5px]">
                          <Text className="text-[12px] font-semibold text-[#000000]">
                            {item.title}
                          </Text>
                          <Text className="text-[9px] font-semibold text-[#000000] pt-[4px]">
                            Target:{item.rs} {target} {item.unit} | Achievement:
                            {item.rs} {achievement} {item.unit}
                          </Text>
                        </View>
                      </View>
                      <View style={{flex: 0.5}}>
                        <View className="items-end relative mt-[2px]">
                          <Image source={rating_img} style={{width: 38}} />
                          <View className="absolute bottom-[-10px] right-[10px] items-center justify-center">
                            <Text className="text-[6px] font-semibold text-[#8FC53B]">
                              {rating ? Math.round(rating) : rating}
                            </Text>
                            <Text className="text-[6px] font-semibold text-[#8FC53B]">
                              Points
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  );
                })}
              {!monthlyPerformanceData && (
                <Text className="items-center self-center text-primaryColor text-[17px] mt-10">
                  No record found
                </Text>
              )}

              {/* {showLoading && monthlyPerformanceData == '' &&(
                <Text className="items-center self-center text-[17px] mt-10">
                  Loading data...
                </Text>
              )} */}
            </ScrollView>
          </View>
        )}

        {currentTab == 'Incentive' && (
          <View className="flex-1 m-4 mt-6 p-0 ">
            {/* <TouchableOpacity
              className="w-full py-3 rounded border border-[#CECECE] mt-4"
              style={{backgroundColor: 'rgba(165, 162, 162, 0.05)'}}
              onPress={() => ''}> */}
            <View className="flex-row  " style={styles.approvedIncentiveAmount}>
              <View style={{flex: 2}} className="pl-[8px]">
                <Text className="text-primaryColor text-[14px] font-bold">
                  {' '}
                  Approved Incentive Amount:
                </Text>
                <Text className="text-primaryColor text-[13px] font-regular">
                  {' '}
                  (By COCO Store)
                </Text>
              </View>
              <View style={{flex: 1}}>
                <Text
                  className="text-[#28A745] text-[16px] font-bold"
                  style={{alignSelf: 'flex-start', marginLeft: 10}}>
                  (+) {totalIncentiveMonthly.toFixed(2)}
                </Text>
              </View>
            </View>
            {/* </TouchableOpacity> */}
            <TouchableOpacity
              className="w-full py-3 rounded border border-[#CECECE] mt-4"
              style={{backgroundColor: 'rgba(165, 162, 162, 0.05)'}}
              onPress={() => setModalSt(true)}>
              <View className="flex-row  ">
                <View style={{flex: 0.5}}>
                  <HomeIcon size={25} color="black" style={{marginLeft: 12}} />
                </View>
                <View style={{flex: 2}} className="pl-[8px]">
                  <Text className="text-[#000000] text-[16px] font-normal">
                    {' '}
                    Store Performance
                  </Text>
                </View>
                <View style={{flex: 0.5}}>
                  <ArrowRightIcon
                    size={20}
                    color="black"
                    style={{alignSelf: 'flex-end', marginRight: 15}}
                  />
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              className="w-full py-3 rounded border border-[#CECECE] mt-4"
              style={{backgroundColor: 'rgba(165, 162, 162, 0.05)'}}
              onPress={() => setModalStd(true)}>
              <View className="flex-row  ">
                <View style={{flex: 0.5}}>
                  <MaterialCommunityIcons
                    name="brightness-percent"
                    size={25}
                    color="black"
                    style={{marginLeft: 12}}
                  />
                </View>
                <View style={{flex: 2}} className="pl-[8px]">
                  <Text className="text-[#000000] text-[16px] font-normal">
                    {' '}
                    Deduction
                  </Text>
                </View>
                <View style={{flex: 0.5}}>
                  <ArrowRightIcon
                    size={20}
                    color="black"
                    style={{alignSelf: 'flex-end', marginRight: 15}}
                  />
                </View>
              </View>
            </TouchableOpacity>
            <View className="flex-row  ">
              <View
                style={{flex: 1, backgroundColor: '#ededed'}}
                className="items-center pl-[1px]  py-3 rounded border border-[#CECECE]  mt-4 mr-3">
                <Text className="text-[#7D7D7D] text-[14px] font-semibold">
                  {' '}
                  QTD Amount
                </Text>
                <Text className="text-[#000000] text-[16px] font-bold">
                  {' '}
                  ₹{incentiveQTD}/-
                </Text>
              </View>
              <View
                style={{flex: 1, backgroundColor: '#ededed'}}
                className="items-center pl-[1px]  py-3 rounded border border-[#CECECE]  mt-4  ml-3">
                <Text className="text-[#7D7D7D] text-[14px] font-semibold">
                  {' '}
                  YTD Amount
                </Text>
                <Text className="text-[#000000] text-[16px] font-bold">
                  {' '}
                  ₹{incentiveYTD}/-
                </Text>
              </View>
            </View>

            <View className="" style={{marginTop: screenHeight * 0.02}}>
              <View className="h-[110px]">
                {/* <Image
                  source={require('./../assets/Images/confetti.gif')}
                  resizeMode="cover"
                /> */}

                <FastImage
                  style={{
                    alignSelf: 'center',
                    width: screenWidth * 0.8,
                    height: '100%',
                  }}
                  source={require('../assets/Images/confetti.gif')}
                />
              </View>

              <View
                style={{marginTop: screenHeight * 0.03}}
                className="absolute right-0 left-0 items-center">
                <Text className="text-[#666] text-[35px] font-bold">
                  ₹ {prorataMonthly.toFixed(2)}
                </Text>
                <Text className="text-[#666] text-[27px] font-semibold">
                  Total Amount
                </Text>
              </View>
            </View>
          </View>
        )}

        {currentTab == 'Leaderboard' && (
          <View className="flex-1 mt-4">
            <View className="flex-row ">
              <View style={{flex: 1}}>
                <View className="mt-16 items-center">
                  <View className="rounded-full relative  w-[80px] h-[80px] bg-primaryColor items-center">
                    <View className="  top-[-36px] left-0 right-0 absolute items-center">
                      <Image
                        style={{height: 58, width: 68}}
                        source={require('./../assets/Images/mukut_gold_boro.png')}
                      />
                    </View>
                    <View className="bottom-0 top-[5px] left-[5px] right-0 absolute">
                      <Image
                        className="rounded-full w-[70px] h-[70px] items-center "
                        source={
                          leaderBoardCandidatesTopThree.length>0?
                          (leaderBoardCandidatesTopThree[1].profilePhtotoUrl
                            ? {uri: API_BASE_URL + leaderBoardCandidatesTopThree[1].profilePhtotoUrl.slice(1)}
                            : require('./../assets/Images/dp.png')):require('./../assets/Images/dp.png')}/>
                    </View>
                    <View className="w-[25px] h-[25px] absolute rounded-full bg-primaryColor bottom-[-10px]  left-[30px] items-center justify-center">
                      <Text className="text-[15px] font-semibold text-white">
                      {leaderBoardCandidatesTopThree.length>0?leaderBoardCandidatesTopThree[1].Rank:2}
                      </Text>
                    </View>
                  </View>
                  <View className="items-center mt-2">
                    <Text className="text-[12px] font-semibold text-[#000000] capitalize">
                      {leaderBoardCandidatesTopThree.length>0?leaderBoardCandidatesTopThree[1].Name:'No data'}
                    </Text>

                    <View
                      className="relative px-[14px] pt-2 pb-1 rounded border border-[#FF1933] mt-3 justify-center items-center"
                      style={{backgroundColor: 'rgba(255, 25, 51, 0.1)'}}>
                      <Text className="text-[9px] font-semibold text-[#000000]">
                        Store: {leaderBoardCandidatesTopThree.length>0?leaderBoardCandidatesTopThree[1].StoreCode:'StCode'}
                      </Text>
                      <View className="absolute px-3 py-[2px] rounded-full border border-[#FF1933] bg-primaryColor items-center  top-[-9px]">
                        <Text className="text-[8px] font-extrabold text-[#FFFFFF] ">
                          Points: {leaderBoardCandidatesTopThree.length>0?+leaderBoardCandidatesTopThree[1].NSVRatingScale.toFixed(2):'rating'}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>

              <View style={{flex: 1}}>
                <View className=" items-center">
                  <View className="rounded-full relative  w-[100px] h-[100px] bg-primaryColor items-center">
                    <View className="  top-[-34px] left-0 right-0 absolute items-center">
                      <Image
                        style={{height: 41, width: 75,marginRight:4}}
                        source={require('./../assets/Images/mukut_platinum_hire.png')}
                      />
                    </View>
                    <View className="bottom-0 top-[5px] left-[5px] right-0 absolute">
                      <Image
                        className="rounded-full w-[90px] h-[90px] items-center "
                        source={
                          leaderBoardCandidatesTopThree.length>0?
                          (leaderBoardCandidatesTopThree[0].profilePhtotoUrl
                            ? {uri: API_BASE_URL + leaderBoardCandidatesTopThree[0].profilePhtotoUrl.slice(1)}
                            : require('./../assets/Images/dp.png')):require('./../assets/Images/dp.png')

                        }
                      />
                    </View>
                    <View className="w-[30px] h-[30px] absolute rounded-full bg-primaryColor bottom-[-10px]  left-[35px] items-center justify-center">
                      <Text className="text-[15px] font-semibold text-white">
                      {leaderBoardCandidatesTopThree.length>0?leaderBoardCandidatesTopThree[0].Rank:1}
                      </Text>
                    </View>
                  </View>
                  <View className="items-center mt-2">
                    <Text className="text-[12px] font-semibold text-[#000000] capitalize">
                    {leaderBoardCandidatesTopThree.length>0?leaderBoardCandidatesTopThree[0].Name:'No data'}
                    </Text>

                    <View
                      className="relative px-[14px] pt-2 pb-1 rounded border border-[#FF1933] mt-3 justify-center items-center"
                      style={{backgroundColor: 'rgba(255, 25, 51, 0.1)'}}>
                      <Text className="text-[9px] font-semibold text-[#000000]">
                      Store: {leaderBoardCandidatesTopThree.length>0?leaderBoardCandidatesTopThree[0].StoreCode:'StCode'}
                      </Text>
                      <View className="absolute px-3 py-[2px] rounded-full border border-[#FF1933] bg-primaryColor items-center  top-[-9px]">
                        <Text className="text-[8px] font-extrabold text-[#FFFFFF] ">
                        Points: {leaderBoardCandidatesTopThree.length>0?+leaderBoardCandidatesTopThree[0].NSVRatingScale.toFixed(2):'rating'}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>

              <View style={{flex: 1}}>
                <View className="mt-16 items-center">
                  <View className="rounded-full relative  w-[80px] h-[80px] bg-primaryColor items-center">
                    <View className="  top-[-33] left-0 right-0 absolute items-center">
                      <Image
                        style={{height: 50, width: 60}}
                        source={require('./../assets/Images/mukut_silver_boro.png')}
                      />
                    </View>
                    <View className="bottom-0 top-[5px] left-[5px] right-0 absolute">
                      <Image
                        className="rounded-full w-[70px] h-[70px] items-center "
                        source={
                          leaderBoardCandidatesTopThree.length>0?
                          (leaderBoardCandidatesTopThree[2].profilePhtotoUrl
                            ? {uri: API_BASE_URL + leaderBoardCandidatesTopThree[2].profilePhtotoUrl.slice(1)}
                            : require('./../assets/Images/dp.png')):require('./../assets/Images/dp.png')

                        }
                      />
                    </View>
                    <View className="w-[25px] h-[25px] absolute rounded-full bg-primaryColor bottom-[-10px]  left-[30px] items-center justify-center">
                      <Text className="text-[15px] font-semibold text-white">
                      {leaderBoardCandidatesTopThree.length>0?leaderBoardCandidatesTopThree[2].Rank:3}
                      </Text>
                    </View>
                  </View>
                  <View className="items-center mt-2">
                    <Text className="text-[12px] font-semibold text-[#000000] capitalize">
                    {leaderBoardCandidatesTopThree.length>0?leaderBoardCandidatesTopThree[2].Name:'No data'}
                    </Text>

                    <View
                      className="relative px-[14px] pt-2 pb-1 rounded border border-[#FF1933] mt-3 justify-center items-center"
                      style={{backgroundColor: 'rgba(255, 25, 51, 0.1)'}}>
                      <Text className="text-[9px] font-semibold text-[#000000]">
                      Store: {leaderBoardCandidatesTopThree.length>0?leaderBoardCandidatesTopThree[2].StoreCode:'StCode'}
                      </Text>
                      <View className="absolute px-3 py-[2px] rounded-full border border-[#FF1933] bg-primaryColor items-center  top-[-9px]">
                        <Text className="text-[8px] font-extrabold text-[#FFFFFF] ">
                        Points: {leaderBoardCandidatesTopThree.length>0?+leaderBoardCandidatesTopThree[2].NSVRatingScale.toFixed(2):'rating'}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <View>
              <View className="mt-[-20px] items-center">
                <View className="rounded-full relative  w-[80px] h-[80px] bg-primaryColor items-center">
                  <View className="bottom-0 top-[5px] left-[5px] right-0 absolute">
                    <Image
                      className="rounded-full w-[70px] h-[70px] items-center "
                      source={
                        myDp==null||myDp=='null'
                          ? require('./../assets/Images/dp.png')
                          : {uri: API_BASE_URL + myDp.slice(1)}
                      }
                    />
                  </View>
                  <View className="w-[25px] h-[25px] absolute rounded-full bg-primaryColor bottom-[-10px]  left-[30px] items-center justify-center">
                    <Text className="text-[10px] font-semibold text-white">
                      {myRankRating.length>0?myRankRating[0].Rank:0}
                    </Text>
                  </View>
                </View>
                <View className="items-center mt-2">
                  <Text className="text-[12px] font-semibold text-[#000000] capitalize">
                  {myRankRating.length>0?myRankRating[0].Name:fullName}
                  </Text>

                  <View
                    className="relative px-[14px] pt-2 pb-1 rounded border border-[#FF1933] mt-3 justify-center items-center"
                    style={{backgroundColor: 'rgba(255, 25, 51, 0.1)'}}>
                    <Text className="text-[9px] font-semibold text-[#000000]">
                      Store: {myRankRating.length>0?myRankRating[0].StoreCode:storeCode}
                    </Text>
                    <View className="absolute px-3 py-[2px] rounded-full border border-[#FF1933] bg-primaryColor items-center  top-[-9px]">
                      <Text className="text-[8px] font-extrabold text-[#FFFFFF] ">
                        Points:{' '}
                        {/* {rating ? rating.toFixed(1) : rating == 0 ? 0 : ''} */}
                        {myRankRating.length>0?+myRankRating[0].NSVRatingScale.toFixed(2):rating}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <View className="flex-1 m-4 mt-2 p-1  border border-[#E5E5E5] rounded bg-white">
              <ScrollView style={{marginBottom:60}}>
                {leaderBoardCandidates.length>0 && leaderBoardCandidates.map((item, index) => {
                  return (
                    <View
                      key={index}
                      className="flex-row border border-[#E5E5E5] rounded  bg-[#FAFAFA] p-1 pb-2">
                      <View style={{flex: 0.75}} className="items-center  pt-1">
                        <View className="rounded-full relative  w-[40px] h-[40px] bg-primaryColor ml-4 ">
                          <View className="bottom-0 top-[3.5px] left-[3.5px] right-0 absolute">
                            <Image
                              className="rounded-full w-[33px] h-[33px] items-center "
                              source={
                                item.profilePhtotoUrl
                                  ? {uri: API_BASE_URL + item.profilePhtotoUrl.slice(1)}
                                  : require('./../assets/Images/dp.png')
                              }
                            />
                          </View>
                          <View className="  absolute  top-[10px]  left-[-18px] items-center justify-center">
                            <Text className="text-[15px] font-semibold text-black">
                              {item.Rank}
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
                              {item.Username}
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
                              {+item.NSVRatingScale.toFixed(2)}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </ScrollView>
            </View>
            {/* <Shadow
        style={{
          width: '100%',
          height: 100,
          marginBottom: 16,  
        }}
        distance={5}
        startColor={'#000'}
        startOpacity={0.1}
        radius={5}
        side={'bottom'}
        shadowColor={'#000'}
        shadowOpacity={0.1}
      >
         
        <View style={styles.content}>
          
        </View>
      </Shadow> */}
          </View>
        )}
      </View>
      <StorePerformModal
        roleId={roleId}
        modalSt={modalSt}
        setModalSt={setModalSt}
        orderDetails={storePerformance}
      />

      {deductionData && (
        <DeductionModal
          data={deductionData}
          modalSt={modalStd}
          setModalSt={setModalStd}
        />
      )}
      <FooterTab currentTab={currentTab} changeTab={changeTab} />

      {/* <LoadingAlert visible={showLoading} /> */}
    </FormBackground>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    padding: 20,
  },
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
  adaniBold: {
    fontFamily: 'Adani-Bold',
  },
  sec1Container: {
    paddingHorizontal: screenWidth * 0.03,
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },

  shadowProp2: {
    shadowColor: 'rgba(0,0,0,0.12)',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 3,
  },
  icon_box: {
    width: 30,
    height: 36,
    borderRadius: 2,
  },
  box: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 4,
    margin: 5,
    marginVertical: 8,
    width: 77,
    height: 77,
    backgroundColor: 'rgba(11, 116, 176, 0.028)',
    borderWidth: 1,
    borderColor: 'rgba(11, 116, 176, 0.15)',
    borderRadius: 5,
  },
  boxImage: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // paddingVertical: 4,
    // paddingHorizontal: 4,
    margin: 5,
    marginVertical: 8,
    width: screenWidth * 0.33,
    height: screenWidth * 0.33,
    backgroundColor: 'rgba(255, 255, 255, 0.028)',
    borderWidth: 1,
    borderColor: 'rgba(11, 116, 176, 0.15)',
    borderRadius: 5,
  },

  box_text: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingBottom: 3,
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 14,
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 0.85)',

    alignItems: 'center',
  },

  image: {
    width: '100%',
    height: '100%',
  },

  horizontalScroll: {
    // // flex:1,
    // display: 'flex',
    // flexDirection: 'row',
    // width: 'auto'
  },
  approvedIncentiveAmount: {
    backgroundColor: '#ededed',
    borderRadius: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 20,
  },
});

export default Dashboard;
