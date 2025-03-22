import React, { useState, useEffect } from "react";
import {View, Text, StyleSheet, FlatList, Image, Dimensions} from 'react-native';
import LinearGradient from "react-native-linear-gradient";
import Animated, {interpolate, Extrapolate, useSharedValue, useAnimatedStyle} from "react-native-reanimated";

const SRC_WIDTH = Dimensions.get("window").width;
const CARD_LENGTH = SRC_WIDTH * 0.65;
const SPACING = SRC_WIDTH * 0.02;
const SIDECARD_LENGTH = (SRC_WIDTH * 0.18) / 2;
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)


function Item({index, scrollX}){

  const size = useSharedValue(0.8);

  const inputRange = [
    (index -1) * CARD_LENGTH,
    index * CARD_LENGTH,
    (index + 1) * CARD_LENGTH
  ]

  size.value = interpolate(
    scrollX,
    inputRange,
    [0.8, 1, 0.8],
    Extrapolate.CLAMP,
  )


  const opacity = useSharedValue(1);
  const opacityInputRange = [
    (index - 1) * CARD_LENGTH,
    index * CARD_LENGTH,
    (index + 1) * CARD_LENGTH,
  ];
  opacity.value = interpolate(
    scrollX,
    opacityInputRange,
    [0.5, 1, 0.5],
    Extrapolate.CLAMP
  );

  const cardStyle = useAnimatedStyle(()=>{
    return{
      transform: [{scaleY: size.value}],
      opacity: opacity.value,
    }
  })

  return(
    <Animated.View style={[styles.card, cardStyle, {
      marginLeft: index == 0 ? SIDECARD_LENGTH : SPACING,
      marginRight: index == 2 ? SIDECARD_LENGTH: SPACING,
    }]}>
      <LinearGradient start={{x: 0.0, y: 0.0}} end={{x: 0.0, y: 1.0}} colors={['#DA1D1F', '#503636']} useAngle={true} angle={45} className="justify-center rounded p-3">
        <View className="">
          <View className="px-1 py-0.5 bg-[#ee2d30c5] rounded w-16">
            <Text className="text-white text-[10px] text-center">Profile Info</Text>
          </View>
          <View className="py-3">
            <Text className="text-white text-md py-1">SAP ID: 9123456780</Text>
            <Text className="text-white text-md py-1">UHID ID: 9123456780</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-[8px] text-white">Enrollment Date:22.Aug.2017</Text>
            <Text className="text-[8px] text-white">|</Text>
            <Text className="text-[8px] text-white">Policy Expiry Date:31.Dec.2023</Text>
          </View>
        </View>
      </LinearGradient>
    </Animated.View>
  )
}
const CustomCarousel = () => {
    const [scrollX, setScrollX] = useState(0);
    
    const DATA = [
      {
        id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
        title: "First Item",
      },
      {
        id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
        title: "Second Item",
      },
      {
        id: "58694a0f-3da1-471f-bd96-145571e29d72",
        title: "Third Item",
      },
    ];
  
  
    return (
      <Animated.View >
        <AnimatedFlatList 
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          decelerationRate={0.8}
          snapToInterval={CARD_LENGTH + (SPACING * 1.5)}
          disableIntervalMomentum={true}
          disableScrollViewPanResponder={true}
          snapToAlignment={"center"}
          data={DATA}
          horizontal={true}
          renderItem={({item, index})=>{
            return(
              <Item index={index} scrollX={scrollX} />
            )
          }}
          //@ts-ignore
          keyExtractor={(item) => item.id}
          onScroll={(event)=>{
            setScrollX(event.nativeEvent.contentOffset.x);
          }}
        />
      </Animated.View>
    );

}

export default CustomCarousel

const styles = StyleSheet.create({
    card: {
      width: CARD_LENGTH,
      height: 150,
      overflow: "hidden"
    }
  });