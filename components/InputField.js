import React from 'react';
import {View, Text, TextInput, Image, StyleSheet} from 'react-native';
import {isEnabled} from 'react-native/Libraries/Performance/Systrace';

const InputField = ({
  fieldName,
  required,
  value,
  setValue,
  check,
  errorMsg = 'Required field',
  keyboardType = 'default',
  editable = true,
  selectTextOnFocus = false,
}) => {
  const isRequired = () => {
    // console.log("req",required)
    if (required == true) {
      return <Text className="text-red-600"> *</Text>;
    }
  };

  const isValid = (value, required) => {
    if (value) {
      return {
        //borderColor:'#4BB543',
        borderWidth: 1,
      };
    } else if (!required && !value && errorMsg == '') {
      return;
    } else if (
      (required || errorMsg !== 'Required field') &&
      !value &&
      check > 1
    ) {
      return {
        // borderColor:'#F21616',
        borderWidth: 1,
      };
    }
  };
  const isEdit = status => {
    if (!status) {
      return {
        backgroundColor: '#F6F6F6',
        borderWidth: 1,
      };
    } else
      return {
        // backgroundColor:'#F21616',
        borderWidth: 1,
      };
  };
  return (
    <View className="relative mb-2">
      <View
        className="top-[-8px] left-4 bg-white absolute"
        style={{zIndex: 99999}}>
        <Text
          className="pl-1 text-[#738088] font-semibold text-[13px] "
          style={styles.fontFamily}>
          {fieldName}
          {isRequired()}
        </Text>
      </View>

      {(required || errorMsg != '') && !value && check > 1 && (
        <Image
          source={require('./../assets/Images/warning.png')}
          className="h-6 w-6 absolute right-2 top-[53%]"
        />
      )}
      <TextInput
        editable={editable}
        selectTextOnFocus={selectTextOnFocus}
        keyboardType={keyboardType}
        className=" py-2 pt-2 px-2 pl-5 border border-[#CFD9E3] rounded-full relative font-semibold text-[15px] text-[#373E44]"
        style={{...isValid(value, required), ...isEdit(editable)}}
        onChangeText={val => setValue(val)}
        value={value}
      />
      {(required || errorMsg != '') && check > 1 && !value && (
        <Text className="absolute text-[#ED2F2F] tracking-widest -bottom-5">
          {errorMsg}
        </Text>
      )}
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  fontFamily: 'Adani-Regular',
});
