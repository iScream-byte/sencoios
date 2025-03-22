import { StyleSheet, Text, View, ImageBackground, Dimensions,Image } from 'react-native'
import React from 'react'

const screenHeight = Dimensions.get("screen").height;
const windowHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("screen").width;

const InsideFormBg = ({children, isModalOpen, bgImage, height="min-h-screen"}) => {
  return (
    <View> 
        
      <ImageBackground style={{height:screenHeight}} source={bgImage} resizeMode="stretch">
      <View className=" justify-center w-full items-center mt-12"><Image source={require("./../assets/Images/rc-logo.png")} resizeMode="cover" /></View>
          <View className="flex-1 w-full pb-6 " style={styles.container}>
          
              {children}
          </View>
      </ImageBackground>
    </View>
  )
}

export default InsideFormBg

const styles = StyleSheet.create({
  container : {
    //marginTop:1, //screenHeight*0.06,
    paddingHorizontal: screenWidth*0.032,
    // shadowColor: '#171717',
    // shadowOffset: {width: -2, height: 2},
    // shadowOpacity: 0.2,
    // shadowRadius: 3,
    // elevation:10,
    
    // paddingBottom: screenHeight*0.02

    paddingBottom: screenHeight-windowHeight,
  }
})