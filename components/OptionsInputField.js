import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  Pressable,
  StyleSheet,
} from 'react-native';
import { ChevronDownIcon, UserIcon } from 'react-native-heroicons/outline';
import OptionsModal from './OptionsModal';

const OptionsInputField = ({
  fieldName,
  required = false,
  value,
  setValue,
  check,
  errorMsg = 'Invalid Entry',
  data,
  modalHeading,
  modalIcon,
  useImageForDisplay = false,
  selectItem = 'Select item',
}) => {
  const [open, setOpen] = useState(false);
  const isRequired = () => {
    if (required === true) {
      return <Text className="text-red-600"> *</Text>;
    }
  };

  const isValid = value => {
    if (required && !value.title && check > 1) {
      return {
        borderColor: '#F21616',
        borderWidth: 1,
      };
    } else if (value.title) {
      return {
        // borderColor: '#4BB543',
        // borderWidth: 1,
      };
    }
    // else if(check > 1){
    //     return {
    //         borderColor:'#F21616',
    //         borderWidth: 1
    //     }
    // }
  };

  const modalHandler = () => {
    setOpen(p => !p);
  };

  return (
    <View className="relative mb-2">
      <View
        className="top-[-8px] absolute left-4 bg-white"
        style={{ zIndex: 99999 }}>
        <Text
          className=" pl-1 text-[#738088] font-semibold text-[13px] "
          style={styles.fontFamily}>
          {fieldName}
          {isRequired()}
        </Text>
      </View>

      {required && !value && check > 1 && (
        <Image
          source={require('./../assets/Images/warning.png')}
          className="h-6 w-6 absolute right-2 top-[53%]"
        />
      )}
      <Pressable onPress={modalHandler}>
        <View
          className="border rounded-full py-2 px-2 pl-5 relative"
          style={{
            borderColor: '#cbd5e1',
            borderWidth: 1,
            borderRadius: 9999, // rounded-full equivalent in inline style
          }}
        >
          <Text
            className="text-black text-[16px]"
            style={{
              ...isValid(value),
              color: '#333',
            }}
          >
            {value.title ? value.title : selectItem}
          </Text>
        </View>
      </Pressable>
      <View className="absolute right-5 top-3">
        <ChevronDownIcon size={16} color="gray" />
      </View>
      {required && !value.title && check > 1 && (
        <Text className="absolute text-[#ED2F2F] tracking-widest -bottom-5">
          {errorMsg}
        </Text>
      )}

      <View className="absolute">
        <OptionsModal
          useImageForDisplay={useImageForDisplay}
          open={open}
          setOpen={setOpen}
          modalOptions={data}
          selectedItem={value}
          setSelectedItem={setValue}
          heading={modalHeading}
          icon={modalIcon}
        />
      </View>
    </View>
  );
};

export default OptionsInputField;

const styles = StyleSheet.create({
  fontFamily: 'Adani-Regular',
});
