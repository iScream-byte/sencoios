import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'

const HeaderGradient = ({headerText}) => {

  function shortifyText(text){
    if(text){
      if(text.length > 30)
      return text.substring(0,30) + "...";
    return text;
  }
    }
    
  return (
    <LinearGradient
                start={{x: 0.0, y: 0.0}}
                end={{x: 0.0, y: 1.0}}
                angle={145}
                useAngle={true}
                 colors={['#DA1D1F', '#9D2829']}
               // colors={['#DA1D1F', '#503636']}
                className="py-3 rounded-tr-[5px] rounded-tl-[5px]">
                <Text
                  className="text-white text-left ml-4 font-medium text-[20px] text-base tracking-widest"
                  style={styles.fontFamily}>
                  {shortifyText(headerText)}
                </Text>
              </LinearGradient>
  )
}

export default HeaderGradient

const styles = StyleSheet.create({
  fontFamily:{
    fontSize:20
  }
})