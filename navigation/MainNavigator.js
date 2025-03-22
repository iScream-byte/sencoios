import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Dashboard from '../screens/Dashboard';
 
import SignIn from '../screens/SignIn';
import SignUpINIT from '../screens/SignUpINIT';
 
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
  ChevronLeftIcon,
  Bars3Icon,
} from 'react-native-heroicons/outline';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {DrawerItemList, createDrawerNavigator, useDrawerStatus } from '@react-navigation/drawer';
 
 
import ButtonGradient from '../components/ButtonGradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Sidebar from '../components/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import SplashScreen from '../screens/SplashScreen';
import DrawerHeaderBtn from '../components/DrawerHeaderBtn';
import { updateTotalCartItems } from '../store/redux/currentUser';
import CartService from '../services/Cart';
import AboutApp from '../screens/AboutApp';
import TermsNCondition from '../screens/TermsNCondition';
import MyProfile from '../screens/MyProfile';
 

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const screenHeight = Dimensions.get("screen").height;
const screenWidth = Dimensions.get("screen").width;

const MainNavigator = () => {
   const dispatch = useDispatch();
    const navigation = useNavigation();


useEffect(() => {
  AsyncStorage.getItem("my-key").then(token => {
    CartService.myCartItems(token).then(res => {
      const product_object = res.data.cart_data.row_items;
      const keysArray =  Object.keys(product_object);
      const formattedProducts = keysArray.map(key => ({
        id: key,
        ...product_object[key]
      }))
      let sum = 0;
      formattedProducts.map(item => {
        sum += parseInt(item.quantity)
      })
      dispatch(updateTotalCartItems({totalCartItems: sum}))
      // setTotalCartItems(sum)
    }).catch(err => {
      // setLoading(false)
      console.log("err ", err)
    })
  })
},[])

 

  const HomeScreenStack = () => {
    
    return (
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          headerTransparent: true,
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            alignItems: 'center',
            justifyContent: 'center',
          },
        }}>
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{title: 'Splash'}}
          />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{title: 'Home'}}
        />
        
         
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{title: 'SignIn'}}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpINIT}
          options={{title: 'SignUp'}}
        />
       <Stack.Screen
          name="AboutApp"
          component={AboutApp}
          options={{title: 'About'}}
        />
        <Stack.Screen
          name="TermsNCondition"
          component={TermsNCondition}
          options={{title: 'Terms & Condition'}}
        />
        <Stack.Screen
          name="MyProfile"
          component={MyProfile}
          options={{title: 'My Profile'}}
        />
      </Stack.Navigator>
    );
  };
  // SignIn
   
  function AuthorizedStack() {
    return (
      
      <Drawer.Navigator
        id="parentDrawer"
        initialRouteName="HomeScreen"
        screenOptions={{
         
          drawerStyle: {
            // backgroundColor: '#fff',
            width: '80%',
            // zIndex: 10
          },
          headerStyle: {
            backgroundColor: '#d2d2d2',
            height: screenHeight*0.08
          },
          headerTitleContainerStyle: {

          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            alignItems: 'center',
            justifyContent: 'center',
          },
          headerTransparent: true,
          drawerActiveTintColor: '#DA1D1F',
          drawerLabelStyle: {
            color: '#444',
          },
          drawerItemStyle: {
            borderColor: '#d2d2d2',
            borderBottomWidth: 1,
          },
          swipeEnabled: false,
          headerRight: () => (
            <DrawerHeaderBtn navigation={navigation} />
          ),
        }}
        drawerContent={props => {
          return <Sidebar {...props} />;
        }}
        onDrawerOpen={() => setIsDrawerOpen(true)}
      onDrawerClose={() => setIsDrawerOpen(false)}
        >
        <Drawer.Screen
          name="HomeScreen"
          component={HomeScreenStack}
          options={{
            drawerLabel: 'Home',
            title: '',
            headerShown: true,
            drawerIcon: ({color, size}) => (
              <HomeIcon size={size} color={color} />
            ),
          }}
        />
      </Drawer.Navigator>
    );
  }
  return <AuthorizedStack />;
};

export default MainNavigator;

const styles = StyleSheet.create({});
