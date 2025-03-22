import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  useWindowDimensions,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import HeaderGradient from '../components/HeaderGradient';
import InsideFormBg from '../components/InsideFormBg';
import OtherService from '../services/Other';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator} from 'react-native-paper';
import RenderHTML from 'react-native-render-html';
import FooterTab from '../components/FooterTab';
import {useFocusEffect} from '@react-navigation/native';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const TermsNCondition = () => {
  const {width} = useWindowDimensions();
  const [loading, setLoading] = useState(false);
  const [contactInfo, setContactInfo] = useState(null);
  const [errMsg, setErrMsg] = useState('');
  const [tnc, setTnc] = useState([]);

  useFocusEffect(
    useCallback(() => {
      OtherService.termsAndCondition().then(res => {
        console.log(JSON.stringify(res));
        setTnc(res.TermsAndConditionsDtl);
      });
    }, []),
  );
  return (
    <InsideFormBg bgImage={require('./../assets/Images/bg_reg_bg.png')}>
      <View
        className="bg-white rounded-md mt-4 shadow flex-1 w-full"
        style={{paddingBottom: screenHeight*0.03}}>
        <View className="flex-1 ">
          <View className="w-[100%] flex">
            <HeaderGradient headerText="Terms & Condition" />
          </View>
          {loading && (
            <View className="py-4">
              <ActivityIndicator />
            </View>
          )}
          {/* {!loading && !contactInfo && (
              <View className="mx-3 flex-col items-center py-4">
                <Text
                  className="text-center text-[#666] text-[14px]"
                  style={{color: '#666'}}>
                  {errMsg}
                </Text>
              </View>
            )} */}

          <View
            className="mx-3 flex-col items-center py-4"
            style={{paddingBottom: screenHeight * 0.1}}>
            <ScrollView style={{marginBottom:40}}>
              {tnc.map((item, index) => (
                <Text
                  key={index}
                  className="text-[#666] text-[15px] mb-4"
                  style={styles.text}>
                  {item.Details}
                </Text>
              ))}
            </ScrollView>
          </View>
        </View>
      </View>

      <FooterTab pageName="TermsNCondition" />
    </InsideFormBg>
  );
};

export default TermsNCondition;

const styles = StyleSheet.create({
  header: {
    color: '#333333',
  },
  section: {
    borderWidth: 1.5,
    borderColor: '#f0f0f0',
    width: '100%',
    fontWeight: 'bold',
    marginVertical: 8,
  },
  headerTextContainer: {
    borderBottomWidth: 1.5,
    borderBottomColor: '#f0f0f0',
  },
  contentText: {
    color: '#333',
  },
  contentTextContainer: {
    paddingVertical: 8,
  },
  text: {
    fontSize: 0.05 * screenWidth,
    // fontSize:15,
    textAlign: 'left',
  },
});
