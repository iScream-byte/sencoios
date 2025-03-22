import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'

const ListItemTemplate = ({children, templateStatus, isDisable=false, onPress}) => {
    function bgColor(status){
        switch(status){
            case "0":
                return "#FFFBF4"
            case "1":
                return "#F2F9F6"
            case "2":
                return "#FFF0F1"
        }
    }

    function primaryColor(status){
        switch(status){
            case "0":
                return "#FFAA00"
            case "1":
                return "#02AD75"
            case "2":
                return "#DC3545"
        }
    }

  return (
    <Pressable disabled={isDisable} onPress={onPress} className="px-2 py-3 rounded-md my-2 shadow-xl" style={
        {
            backgroundColor : bgColor(templateStatus),
            borderLeftWidth: 5,
            borderLeftColor: primaryColor(templateStatus)
        }
        }>
      {children}
    </Pressable>
  )
}

export default ListItemTemplate

const styles = StyleSheet.create({})