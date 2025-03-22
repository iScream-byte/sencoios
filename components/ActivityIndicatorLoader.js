import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React from 'react'

const ActivityIndicatorLoader = ({size="large"}) => {
  return (
    <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size={size} color="#75479C" />
    </View>
  )
}

export default ActivityIndicatorLoader

const styles = StyleSheet.create({
    container: {
    //  flex: 1,
       justifyContent: 'center',
       alignItems:'center',
       alignSelf:'center'
    },
    horizontal: {
    //   flexDirection: 'row',
    //   justifyContent: 'space-around',
    //   padding: 10,
    },
  });
  