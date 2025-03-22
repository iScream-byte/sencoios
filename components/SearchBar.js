import {StyleSheet, Text, View, TextInput, Dimensions} from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
const {width} = Dimensions.get('screen');
const SearchBar = ({
  setInputText,
  inputText,
  placeholder = '',
  keyboardType = 'default',
  hideSearchIcon = false,
}) => {
  return (
    <View
      className="flex-row mb-2 py-1 items-center w-[100%]"
      style={{borderColor: '#f0f0f0', borderWidth: 1}}>
      {!hideSearchIcon && (
        <View
          className="pl-3 p-2 pr-3"
          style={{borderRightWidth: 1, borderColor: '#d2d2d2'}}>
          <Feather name="search" size={22} color="#ff0000" />
        </View>
      )}
      <TextInput
        keyboardType={keyboardType}
        placeholder={placeholder}
        value={inputText}
        onChangeText={setInputText}
        className="py-1 w-[85%] ml-1 font-medium tracking-wider text-[#333]"
        style={{fontSize: width * 0.03}}
        placeholderTextColor="#999"
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({});
