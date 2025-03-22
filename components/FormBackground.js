import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  Image,
} from 'react-native';
import React from 'react';

const windowHeight = Dimensions.get('window').height;
const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

const FormBackground = ({children, isModalOpen, bgImage}) => {
  return (
    <View>
      <ImageBackground
        className="w-screen"
        source={bgImage}
        style={{height: screenHeight}}>
        <View
          className="flex-1 h-[100%] justify-center w-full items-center"
          style={styles.container}>
          <Image
            source={require('./../assets/Images/rc-logo.png')}
            resizeMode="cover"
          />

          {children}
        </View>
      </ImageBackground>
    </View>
  );
};

export default FormBackground;

const styles = StyleSheet.create({
  container: {
    marginTop: screenHeight * 0.05,
    paddingHorizontal: screenWidth * 0.032,
    paddingBottom: screenHeight-windowHeight,
  },
  image: {
    width: '100%',
    height: '100%',
    // borderRadius: 5,
  },
});
