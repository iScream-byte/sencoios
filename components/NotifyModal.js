import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet, Pressable, Image, Modal, FlatList, ScrollView} from "react-native"
import { XCircleIcon } from "react-native-heroicons/outline";
import ActivityIndicatorLoader from './ActivityIndicatorLoader';

const NotifyModal = ({open, setOpen, message, heading, isSuccess, loading}) => {

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
            height: `20%`,
            width: '85%',
            opacity:1,
            marginBottom: 'auto',
            marginTop:'auto',
            borderRadius: 4,
            backgroundColor:'#fff',
            alignSelf: 'center',
            position: "relative",
            // backgroundColor:'blue'
          }}>
              {!loading ? <View className="" style={{borderTopLeftRadius: 4, borderTopRightRadius: 4}}>
                <View className="flex-row justify-between items-center border-b-[1px] py-2 px-2 overflow-hidden" style={{backgroundColor: isSuccess?"#13A180" : "#FF0000"}}>
                  <Text className="font-semibold text-[18px] text-[#fff] tracking-widest">{heading}</Text>
                  <Pressable onPress={()=>setOpen((p) => !p)}><XCircleIcon color="#fff" size={30} /></Pressable>
                </View>
               
                  <View  className="py-4 h-[400px] flex-col gap-4">
                      <Text className="text-[18px] text-center" style={{color:"#333"}}>{message}</Text>
                  </View>
              </View> : <View className="mt-[12%] flex-col">
              <ActivityIndicatorLoader />
              <Text  className="text-[18px] text-center my-2" style={{color:"#333"}}>Cancelling...</Text>
              </View>}

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

export default NotifyModal