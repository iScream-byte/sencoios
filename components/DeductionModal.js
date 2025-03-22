import {StyleSheet, Text, View, Pressable, Modal} from 'react-native';
import React, {useState} from 'react';
import ButtonGradient from './ButtonGradient';

import {CheckCircleIcon, XCircleIcon} from 'react-native-heroicons/outline';

const DeductionModal = ({modalSt, setModalSt, data}) => {
  // console.log(data,"heleooooooooo");
  const deductionData = [
    {title: 'Statuary Compliance Audit Score', value: data.StatuaryComplainDeduction},
    {title: 'Store Audit Score', value: data.StoreAuditDeduction},
    {title: 'Training Evaluation Score', value: data.TrainingEvolutionDeduction},
    {title: 'MC AOP Achievement', value: data.MCAOPDeduction},
  ];

  return (
    <Modal transparent={true} visible={modalSt} animationType="slide" 
    >
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.65)',
          opacity: 1,
          justifyContent: 'center',
        }}>
        <View
          style={{
            width: '95%',
            opacity: 1,
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
            backgroundColor: '#fff',
            alignSelf: 'center',
            margin: 10,
          }}>
          <View style={{padding: 2, borderRadius: 5, backgroundColor: 'white'}}>
            <View className="flex-row p-2 ">
              <View style={{flex: 1}}>
                <Text
                  className="text-[#000000]  font-semibold text-[18px]  "
                  style={styles.fontFamily}>
                  Deduction
                </Text>
              </View>
              <View style={{}}>
                <Text className="text-right">
                  <Pressable onPress={() => setModalSt(false)}>
                    <XCircleIcon color="#000000" />
                  </Pressable>
                </Text>
              </View>
            </View>

            <View className="pl-1 pb-[40px] mt-2">
              {deductionData.length > 0 &&
                deductionData.map((item, index) => {
                  return (
                    <View
                      key={index}
                      className="flex-row pr-2 pl-2 mb-[0px] mt-[0px] bg-[#FCFCFC]">
                      <View className="  w-[70%] bg-[#FAF5F4]">
                        <View className="p-2 border-[1px] border-[#E5E5E5]  rounded-[0px]">
                          <Text className="text-[#000000] font-sans text-[12px] font-semibold ml-1">
                            {item.title}
                          </Text>
                        </View>
                      </View>

                      <View className="  w-[29%] ml-[0px] ">
                        <View className="p-2 border-[1px] border-[#E5E5E5] rounded-[0px]">
                          <Text className="text-[#555555] font-sans text-[12px] font-normal ml-2">
                            {item.value}
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                })}
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DeductionModal;

const styles = StyleSheet.create({});
