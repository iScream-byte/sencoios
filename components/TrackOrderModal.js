import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import ButtonGradient from './ButtonGradient'
import { Modal } from 'react-native-paper'
import { CheckCircleIcon, XCircleIcon } from 'react-native-heroicons/outline'

const TrackOrderModal = ({modalSt, setModalSt, orderDetails}) => {
  return (
    <Modal transparent={true} visible={modalSt} animationType="slide">
      <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.65)', opacity: 0.75 }}>
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
          }}
        >
          <View style={{ padding: 2, borderRadius: 5, backgroundColor: 'white' }}>
           
            <View className="flex-row p-2">
              <View style={{ flex: 1 }}>
              <Text className="text-[#000000]  font-semibold text-[18px]  "
                  style={styles.fontFamily}>Track Order</Text>
              </View>
              <View style={{ flex: 1 }}>
              <Text className="text-right"><Pressable onPress={()=>setModalSt(false)}><XCircleIcon  color="#000000"  /></Pressable></Text> 
                
              </View>
            </View>
<View className="pl-4">

<View className="flex-row mb-[20px] relative">
<View style={{ flex: .08 }}>
<CheckCircleIcon size={18} color="#03A36F"  />
<View style={[styles.verticalLine, { height: 65 ,position:'absolute',top:15,left:8}]} />
</View>
<View style={{ flex: 1 }}>
  <Text className="text-[#333333]  font-semibold text-[12px] pb-[2px] " style={styles.fontFamily}>Order Placed 
</Text>
<View className="mb-[5px]">
<Text className="text-[#AAAAAA]  font-semibold text-[12px]  pb-[4px] " style={styles.fontFamily}> 
Your order has been placed. Online order id: XRT123
</Text>
<Text className="text-[#666363]  font-semibold text-[8px]  pb-[5px] " style={styles.fontFamily}> 
16 December 2023, 7:22 PM  
</Text>
</View>
</View>
</View>

<View className="flex-row mb-[20px] relative">
<View style={{ flex: .08 }}>
<CheckCircleIcon size={18} color="#03A36F"  />
<View style={[styles.verticalLine, { height: 145 ,position:'absolute',top:15,left:8}]} />
</View>
<View style={{ flex: 1 }}>
  <Text className="text-[#333333]  font-semibold text-[12px] pb-[2px] " style={styles.fontFamily}>Order Placed 
</Text>
<View className="mb-[5px]">
<Text className="text-[#AAAAAA]  font-semibold text-[12px]  pb-[4px] " style={styles.fontFamily}> 
Your order has been placed. Online order id: XRT123
</Text>
<Text className="text-[#666363]  font-semibold text-[8px]  pb-[5px] " style={styles.fontFamily}> 
16 December 2023, 7:22 PM  
</Text>
</View>
<View className="mb-[5px]">
<Text className="text-[#AAAAAA]  font-semibold text-[12px]  pb-[4px] " style={styles.fontFamily}> 
Your order has been placed. Online order id: XRT123
</Text>
<Text className="text-[#666363]  font-semibold text-[8px]  pb-[5px] " style={styles.fontFamily}> 
16 December 2023, 7:22 PM  
</Text>
</View>
<View className="mb-[5px]">
<Text className="text-[#AAAAAA]  font-semibold text-[12px]  pb-[4px] " style={styles.fontFamily}> 
Your order has been placed. Online order id: XRT123
</Text>
<Text className="text-[#666363]  font-semibold text-[8px]  pb-[5px] " style={styles.fontFamily}> 
16 December 2023, 7:22 PM  
</Text>
</View>


</View>
</View>
 

<View className="flex-row mb-[20px] relative">
<View style={{ flex: .08 }}>
<CheckCircleIcon size={18} color="#03A36F"  />
{/* <View style={[styles.verticalLine, { height: 60 ,position:'absolute',top:15,left:8}]} /> */}
</View>
<View style={{ flex: 1 }}>
  <Text className="text-[#333333]  font-semibold text-[12px] pb-[2px] " style={styles.fontFamily}>Delivered 
</Text>
 
</View>





</View>
<View className="w-full pt-[20px] pb-[40px] pr-[10px]">

                    <ButtonGradient onPress={()=>setModalSt(false)}>
                      OKAY
                    </ButtonGradient>
                  </View>

</View>



          </View>
        </View>
      </View>
                    </Modal>
  )
}

export default TrackOrderModal

const styles = StyleSheet.create({})