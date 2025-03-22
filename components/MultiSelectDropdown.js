import { MultipleSelectList } from 'react-native-dropdown-select-list'
import {useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MultiSelectDropdown = ({fieldName, required, check, value, setValue, data}) => {

  const [selected, setSelected] = useState([]);
  console.log("SELECTED", value)
  // const data = [
  //     {key:'1', value:'Mobiles', disabled:true},
  //     {key:'2', value:'Appliances'},
  //     {key:'3', value:'Cameras'},
  //     {key:'4', value:'Computers', disabled:true},
  //     {key:'5', value:'Vegetables'},
  //     {key:'6', value:'Diary Products'},
  //     {key:'7', value:'Drinks'},
  // ]

  const [isFocus, setIsFocus] = useState(false);

  const isRequired = () => {
      if(required===true){
          return (
              <Text className="text-red-600">{" "}*</Text>
        )
      }
      
  }

  const checking = (value, check) => {
    if(value){
      return {
          borderColor:'#4BB543',
          borderWidth: 1
          }
      // return " border-green-500"
      }
      console.log()
      if(check > 1){
          return {
              borderColor:'#F21616',
              borderWidth: 1
          }
          // return " border-red-500"
      }

      // return " border-slate-300"
  }

  return(
    <View style={styles.container} className="mb-3">
      <Text className="mb-2 text-sm text-[#1E1E1E] font-normal text-[16px]" style={styles.fontFamily}>{fieldName}{isRequired()}</Text>
      <MultipleSelectList 
          setSelected={(val) => setValue(val)}
          data={data} 
          save="key"
          label="Categories"
          boxStyles={styles.multiSelect}
          dropdownStyles={styles.dropSelect}
          className="relative"
      />
      {check>1 && !value && <Text className="absolute text-[#ED2F2F] tracking-widest -bottom-5">{`${fieldName} is mandatory`}</Text>}
    </View>
  )

};

const styles = StyleSheet.create({
  multiSelect: {
    position: 'relative',
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: 'rgb(203 213 225)',
    height: 'auto'
  },

  dropSelect: {
    position: 'relative',
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: 'rgb(203 213 225)',
    height: 'auto'
  },

  container: {
  
  },
  dropdown: {
  //   height: 50,
  //   borderColor: 'gray',
  //   borderWidth: 0.5,
  //   borderRadius: 8,
  //   paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },

})

export default MultiSelectDropdown;