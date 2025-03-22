import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { BellIcon, HeartIcon, ShoppingCartIcon } from 'react-native-heroicons/outline'
import { useSelector } from 'react-redux'

const DrawerHeaderBtn = ({navigation}) => {
    const totalCartItems = useSelector(state => state.currentUserDetails.totalCartItems)

  return (
    <View
    className="flex-row pr-4 relative"
    style={{display: 'flex', flexDirection: 'row', paddingRight: 16}}>
      <Pressable  onPress={() => navigation.navigate('Wishlist')} className="" style={{paddingRight: 8}}>
      <HeartIcon size={24} color={'#fff'} />
    </Pressable>
    <Pressable
      onPress={() => navigation.navigate('Cart')}
      className="pr-2"
      style={{paddingRight: 8}}>
      <ShoppingCartIcon size={24} color={'#fff'} />
      {totalCartItems>0 && <View className="absolute rounded-full px-[11.5px] py-[11.5px] -top-[40%] right-[5%]" style={{backgroundColor:"#C21807"}}>
        
      </View>}
      {totalCartItems>0 &&<Text className="absolute -top-[25%]" style={{color: "#fff", fontWeight: 'bold', fontSize: 12, right: totalCartItems<10 ? '39%' : '27%'}}>{totalCartItems}</Text>}
    </Pressable>
    <Pressable onPress={() => {}} className="">
      <BellIcon size={24} color={'#fff'} />
    </Pressable>
  </View>
  )
}

export default DrawerHeaderBtn

const styles = StyleSheet.create({})