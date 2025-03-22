import React, {useState, useEffect, useLayoutEffect, useCallback} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Pressable,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const PointsAccordion=({ children, title })=>{
    const [ expanded, setExpanded ] = useState(false);
  
    const toggleItem=() =>{
      setExpanded(!expanded);
    }
  
    const body = <View style={styles.accordBody}  >{ children }</View>;
    useEffect(() => {
      console.log('acc hit');
       
        
    },[title]);
    return (
      <View style={styles.accordContainer} >
        <TouchableOpacity style={styles.accordHeader} onPress={ toggleItem }  className=" mt-1 mb-1 border-b-[1.5px] border-t-[1.5px] border-[#CECECE] bg-[#EDECEC]">
          
          <Text style={styles.accordTitle}>{ title }</Text>
           
          
         <Icon name={ expanded ? 'chevron-up' : 'chevron-down' }  size={14} color="#1E1E1E" />
         
          
              
        </TouchableOpacity>
        { expanded && body }
        
      </View>
    );
  }
  export default PointsAccordion;
  const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    accordContainer: {
      paddingBottom: 4
    },
    accordHeader: {
      padding: 12,
      //backgroundColor: '#666',
      color: '#eee',
      flex: 1,
      flexDirection: 'row',
      justifyContent:'space-between'
    },
    accordTitle: {
      fontSize: 14,
      fontWeight:'600',
      color:'#000000'
    },
    accordBody: {
     // padding: 12,
      //backgroundColor:'rgba(165, 162, 162, 0.05)'
      paddingVertical:1,
      paddingBottom:15
    },
    textSmall: {
      fontSize: 16
    },
    seperator: {
      height: 12
    }
  });