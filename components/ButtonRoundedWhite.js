import React from 'react'
import {Pressable, View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const ButtonRoundedWhite = ({children, onPress}) => {
  return (
    <TouchableOpacity className="w-full py-4 bg-[#FFFFFF] rounded-full border border-[#0D66CA] mt-4" onPress={onPress}>
        <Text className="text-[#0D66CA] text-center font-medium text-base tracking-widest" style={styles.fontFamily}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    fontFamily: {
        fontFamily: 'Adani-Regular'
    }
})
export default ButtonRoundedWhite