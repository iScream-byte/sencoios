import React from 'react'
import {Pressable, View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const ButtonNormal = ({children, onPress, disabled=false,bgColor}) => {

  const isDisabled = () => {
    return disabled?"bg-[#75b2f8]" : "bg-[#0D66CA]"
  }
  const isColor= () => {
    //console.log(bgColor);
    return bgColor?bgColor : "#0D66CA";
  }

  return (
    <TouchableOpacity disabled={disabled} className={"w-full py-3 rounded mb-[5px]"} style={{backgroundColor:isColor()}} onPress={onPress}>
        <Text className="text-white text-center font-normal tracking-widest" style={styles.fontFamily}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  fontFamily: {
      fontFamily: 'Adani-Regular'
  }
})

export default ButtonNormal