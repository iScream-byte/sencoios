import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
} from 'react-native';
import React from 'react';
import {useFocusEffect} from '@react-navigation/native';
import Video from 'react-native-video';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {
  updateLoginStatus,
  updateTotalCartItems,
} from '../store/redux/currentUser';
import FormBackground from '../components/FormBackground';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const SplashScreen = ({navigation}) => {
  const dispatch = useDispatch();
  useFocusEffect(
    React.useCallback(() => {
      navigation.getParent('parentDrawer').setOptions({
        headerShown: false,
      });

      AsyncStorage.getItem('my-key').then(token => {
        setTimeout(() => {
          console.log('token signup', token);
          if (token) {
            dispatch(updateLoginStatus({isLoggedIn: true}));
            navigation.replace('Dashboard');
          } else {
            dispatch(updateLoginStatus({isLoggedIn: false}));
            // navigation.replace("Dashboard")
            navigation.replace('SignIn');
          }
        }, 2000);
      });
    }),
  );

  return (
    // <Video source={require("./../assets/Videos/splash.mp4")}
    //    ref={(ref) => {
    //      player = ref

    //    }}
    //   //  onBuffer={this.onBuffer}
    //   //  onError={this.videoError}
    //    style={styles.backgroundVideo}
    //    resizeMode="cover"
    //     />

    // <FormBackground bgImage={require('./../assets/Images/bg_reg_bg.png')} />

    <ImageBackground
      className="w-screen"
      source={require('./../assets/Images/bg_reg_bg.png')}
      style={{height: screenHeight}}>
      <View
        className="flex-1 h-[100%] justify-center w-full items-center"
        >
        <Image
          source={require('./../assets/Images/rc-logo.png')}
          resizeMode="cover"
        />
      </View>
    </ImageBackground>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  backgroundVideo: {
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // bottom: 0,
    // right: 0,
    width: screenWidth,
    height: screenWidth,
    // backgroundColor:"black"
  },
});
