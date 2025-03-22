import {StyleSheet, Text, View, Pressable, Modal} from 'react-native';
import React from 'react';
import ButtonGradient from './ButtonGradient';

import {CheckCircleIcon, XCircleIcon} from 'react-native-heroicons/outline';

const StorePerformModal = ({modalSt, setModalSt, orderDetails, roleId}) => {
  // console.log(roleId,'yeeeeeeeeeeeeee');
  const perform_list = [
    {
      tag: 'NSVPercentage',
      title: 'NSV',
      tag2: 'NSVAchievment',
      tag3: 'NSVWeightage',
    },
    {
      tag: 'DiamondPercentage',
      title: 'Diamond',
      tag2: 'DiamondAchievment',
      tag3: 'DiamoneWeightage',
    },
    {
      tag: 'PlatinumPercentage',
      title: 'Platinum',
      tag2: 'PlatinumAchievment',
      tag3: 'PlatinumWeightage',
    },
    {
      tag: 'SilverPercentage',
      title: 'Silver',
      tag2: 'SilverAchievment',
      tag3: 'SilverWeightage',
    },
    {
      tag: 'GossipPercentage',
      title: 'Gossip',
      tag2: 'GossipAchievment',
      tag3: 'GossipWeightage',
    },

    // {tag:'GoldPercentage',title:'Gold'},
    // {tag:'GemsPercentage',title:'Gems'},
  ];
  return (
    <Modal transparent={true} visible={modalSt} animationType="slide">
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
            <View className="flex-row p-3 " style={{}}>
              <View style={{flex: 1}}>
                <Text
                  className="text-[#000000]  font-semibold text-[16px]  "
                  style={{textAlign: 'left'}}>
                  Store Incentive Distribution
                </Text>
              </View>
              <View style={{width: '6%'}}>
                <Text className="text-right">
                  <Pressable onPress={() => setModalSt(false)}>
                    <XCircleIcon color="#000000" />
                  </Pressable>
                </Text>
              </View>
            </View>
            <View className="pl-0.5 pb-[40px] mt-2">
              {perform_list &&
                perform_list.map((item, index) => {
                  const percent = orderDetails
                    ? +orderDetails[`${item.tag}`]
                    : 0;
                  const ach = orderDetails ? +orderDetails[`${item.tag2}`] : 0;
                  const wtg = orderDetails ? +orderDetails[`${item.tag3}`] : 0;
                  return (
                    <View
                      key={index}
                      className="flex-row pr-1 pl-1 mb-[0px] mt-[0px] bg-[#FCFCFC]">
                      <View style={{width:roleId!=3?'27%':'37%'}} className="mr-[0px]">
                        <View className="p-2 border-[1px] border-[#E5E5E5]  rounded-[0px] bg-[#FAF5F4]">
                          <Text className="text-[#000000] text-center font-sans text-[12px] font-semibold ml-1 tracking-wider">
                            {item.title}
                          </Text>
                        </View>
                      </View>

                      {roleId!=3 &&
                      <View className=" w-[35%] mr-[0px]">
                      <View className="p-2 border-[1px] border-[#E5E5E5]  rounded-[0px]">
                        <Text className="text-[#000000] font-sans text-left text-[12px] font-semibold">
                          {item.title == 'Silver' ? ach.toFixed(2) : ach}
                          {item.title == 'Diamond'
                            ? ' (CT)'
                            : item.title == 'Platinum'
                            ? ' (Gm)'
                            : item.title == 'Silver'
                            ? ' (Kg)'
                            : item.title == 'Gossip'
                            ? ' (Cr)'
                            : item.title == 'NSV'
                            ? ' (Cr)'
                            : ''}
                        </Text>
                      </View>
                    </View>                      
                      }
                      

                      <View style={{width:roleId!=3?'20%':'30%'}} className="ml-[0px]">
                        <View className="p-2 border-[1px] border-[#E5E5E5] rounded-[0px]">
                          <Text className="text-[#555555] font-sans text-[12px] text-left font-normal">
                            {+percent.toFixed(2)}%
                          </Text>
                        </View>
                      </View>

                      <View style={{width:roleId!=3?'18%':'31%'}} className="ml-[0px]">
                        <View className="p-2 border-[1px] border-[#E5E5E5] rounded-[0px]">
                          <Text className="text-[#555555] font-sans text-[12px] text-left font-normal">
                            {+wtg.toFixed(2)}%
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

export default StorePerformModal;

const styles = StyleSheet.create({});
