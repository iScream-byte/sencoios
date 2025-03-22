import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet, Pressable, Image, Modal, FlatList, ScrollView, Dimensions} from "react-native"
import { XCircleIcon, CheckCircleIcon } from "react-native-heroicons/outline";
import ButtonRounded from './ButtonRounded';
import ButtonGradient from './ButtonGradient';
import SearchBar from './SearchBar';

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

const OptionsModal = ({open, setOpen, modalOptions=[], setSelectedItem, heading, icon, useImageForDisplay=false}) => {

    const [selected, setSelected] = useState({id:"", title:""});
    const [searchQuery, setSearchQuery] = useState("")
    const bgColor = (title) => {
      return selected.title == title?"bg-[#f7bcba]" : "bg-white"
    }

    
      modalOptions = modalOptions.filter(item =>
        item.title?.toLowerCase()?.includes(searchQuery.toLowerCase())
      );

    function modalCloseHandler(){
      setOpen((p) => !p)
      setSearchQuery("")
    }

    const Item = ({item}) => (
      <Pressable onPress={() => setSelected(item)}  className={bgColor(item.title) + " flex-row justify-start items-center py-1 border-t-2 border-gray-300"}>
        {!useImageForDisplay && <View>
          {/* {icon} */}
        </View>}
        {!useImageForDisplay && <Text className="px-4 py-2 text-black tracking-wide text-[15px]">{item.title}</Text>}
        {useImageForDisplay && <Image source={item.image} style={styles.imageOption} />}
      </Pressable>
    )

  return (
    <View style={styles.centeredView}>
        <Modal
        animationType="slide" 
        transparent={true}
        visible={open}
        onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setOpen(!open);
        
        }}>
         <View style={{flex:1, backgroundColor:'rgba(0,0,0,0.65)', paddingBottom:25}}>
          <View className="" style={{
            // height: `${(modalOptions.length*11)+15}%`,
            // height: `80%`,
            width: '98%',
            opacity:1,
            marginTop: 'auto',
            borderTopLeftRadius: 13,
            borderTopRightRadius:13,
            borderBottomLeftRadius: 13,
            borderBottomRightRadius:13,
            backgroundColor:'#fff',
            alignSelf: 'center',
            paddingVertical: 20,
            paddingBottom:60
          }}>
              <View className="px-4">
                <View className="flex-row justify-between items-center">
                  <Text className="font-semibold text-[18px] text-[#333]">{heading}</Text>
                  <Pressable onPress={modalCloseHandler}><XCircleIcon color="#ff0000" size={30} /></Pressable>
                </View>
                {/* <ScrollView></ScrollView> */}
                  <View  className="py-4 h-[400px]">
                  <SearchBar
              placeholder={"Search by store name"}
              inputText={searchQuery}
              setInputText={setSearchQuery}
              //keyboardType="number-pad"
            />
                  <FlatList 
                  data={modalOptions} 
                  renderItem={({item}) => <Item item={item} />}
                  keyExtractor={item => item.id} />
                  </View>
                
                <View className="absolute w-full -bottom-10 left-[5%]">
                  <ButtonGradient onPress={() => {
                    setSelectedItem(selected)
                    setOpen((p) => !p)}}>Continue</ButtonGradient>
                </View>
              </View>
          </View>
        </View> 
    </Modal>
  </View>
  )
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
      backgroundColor:"#000"
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
    fontFamily: {
        fontFamily: 'Adani-Regular'
      },
      imageOption: {
        width: screenWidth*0.18,
        height: screenWidth*0.08
      }
  });

export default OptionsModal