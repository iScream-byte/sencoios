import React, {useEffect, useState} from 'react'
import {View, Text, Image, ImageBackground, Alert, Pressable, StatusBar} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './store/redux/store';
import { ToastProvider } from 'react-native-toast-notifications'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon
} from 'react-native-heroicons/outline';

import MainNavigator from './navigation/MainNavigator';
import CustomToast from './components/CustomToast';


const App = () => {

  return (
    <ToastProvider
    placement="bottom"
    duration={3400}
    animationType='slide-in'
    animationDuration={200}
    successColor="green"
    dangerColor="red"
    warningColor="orange"
    normalColor="gray"
    icon={<InformationCircleIcon />}
    successIcon={<CheckCircleIcon />}
    dangerIcon={<ExclamationCircleIcon />}
    warningIcon={<ExclamationTriangleIcon />}
    textStyle={{ fontSize: 20 }}
    offset={50} // offset for both top and bottom toasts
    offsetTop={30}
    offsetBottom={40}
    swipeEnabled={true}
    renderToast={(toastOptions) => {
      const {isSuccess, heading, describe=""} = toastOptions.data;
      return <CustomToast isSuccess={isSuccess} heading={heading} describe={describe} />
  }}
    >
      <StatusBar barStyle={'dark-content'} translucent backgroundColor="transparent" />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Provider store={store}>
          <NavigationContainer>
            <MainNavigator />
          </NavigationContainer>
        </Provider>
      </GestureHandlerRootView>
    </ToastProvider>
  )
}

export default App