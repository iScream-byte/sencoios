import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet, Pressable, Image, Modal, FlatList, ScrollView} from "react-native"
import { XCircleIcon } from "react-native-heroicons/outline";
import ButtonNormal from './ButtonNormal';

const YesNoModal = ({open, setOpen, question, heading, onResponse}) => {

    function responseHandler(response){
        onResponse(response)
        setOpen(false)
    }


  return (
    <View style={styles.centeredView}>
        <Modal
        animationType="fade" 
        transparent={true}
        visible={open}
        onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setOpen(!open);
        
        }}>
         <View style={{flex:1, backgroundColor:'rgba(0,0,0,0.65)'}}>
          <View className="" style={{
            // height: `${(modalOptions.length*11)+15}%`,
            height: `24%`,
            width: '98%',
            opacity:1,
            marginBottom: 'auto',
            marginTop:'auto',
            borderRadius: 4,
            backgroundColor:'#fff',
            alignSelf: 'center',
            position: "relative"
            // backgroundColor:'blue'
          }}>
              <View className="pt-4 px-4">
                <View className="flex-row justify-between items-center border-b-[1px] border-slate-100">
                  <Text className="font-semibold text-[18px] text-[#333]">{heading}</Text>
                  <Pressable onPress={()=>setOpen((p) => !p)}><XCircleIcon color="#444" size={30} /></Pressable>
                </View>
                {/* <ScrollView></ScrollView> */}
               
                  <View  className="py-4 h-[400px] flex-col gap-4">
                      <Text className="text-[16px] text-center" style={{color:"#333"}}>{question}</Text>
                  </View>

                <View className="mt-4 absolute bottom-[258px] right-[3%] rounded-md justify-between">
                    <View className="flex-row w-[80%] justify-center">
                        <View className="w-[40%] mx-4">
                            <ButtonNormal bgColor="#13A180" onPress={() => responseHandler("yes")}>Yes</ButtonNormal>
                        </View>
                        <View className="w-[40%] mx-4">
                            <ButtonNormal bgColor="#FF0000" onPress={() => responseHandler("no")}>No</ButtonNormal>
                        </View>
                    </View>
                    
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
      }
  });

export default YesNoModal