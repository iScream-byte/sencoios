import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  useWindowDimensions,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import HeaderGradient from '../components/HeaderGradient';
import InsideFormBg from '../components/InsideFormBg';
import OtherService from '../services/Other';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator} from 'react-native-paper';
import RenderHTML from 'react-native-render-html';
import {IMAGE_BASE_URL} from '../constants/common';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const ContactUs = () => {
  const {width} = useWindowDimensions();
  const [loading, setLoading] = useState(false);
  const [contactInfo, setContactInfo] = useState(null);
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    setLoading(true);
    AsyncStorage.getItem('my-key').then(token => {
      OtherService.contactUs(token)
        .then(res => {
          console.log('contact us res', JSON.stringify(res));
          if (JSON.stringify(res) != '{}' && !res.error) {
            setLoading(false);
            if (res.data.status) {
              console.log('line 20 contact us', res.data.contactDetails);
              setContactInfo(res.data.contactDetails);
            } else {
              setErrMsg(res.data.message);
              setContactInfo(null);
            }
          } else {
            setLoading(false);
          }
        })
        .catch(err => {
          console.log(JSON.stringify(err));
          setLoading(false);
        });
    });
  }, []);
  console.log('info', contactInfo);
  return (
    <InsideFormBg bgImage={require('./../assets/Images/bg_reg_bg.png')}>
      <ScrollView>
        <View className="bg-white rounded-md mt-4 shadow"
         style={{
          paddingBottom: screenHeight * 0.02,
          marginBottom: screenHeight * 0.08,
        }}>
          <View className="flex-1 ">
            <View className=" w-[100%]  flex ">
              <HeaderGradient headerText="Contact Us" />
            </View>
            {loading && (
              <View className="py-4">
                <ActivityIndicator />
              </View>
            )}
            {!loading && !contactInfo && (
              <View className="mx-3 flex-col items-center py-4">
                <Text
                  className="text-center text-[#666] text-[14px]"
                  style={{color: '#666'}}>
                  {errMsg}
                </Text>
              </View>
            )}
            {!loading && contactInfo && (
              <View className="mx-3 flex-col items-center">
                <Image
                  style={{
                    height: screenHeight * 0.3,
                    width: screenWidth * 0.95,
                    resizeMode: 'contain',
                  }}
                  source={{
                    uri: IMAGE_BASE_URL + contactInfo?.Contact_Us_filepath,
                  }}
                />
                {contactInfo?.TSE_name && (
                  <View className="py-2 px-3 rounded" style={styles.section}>
                    <View>
                      <View style={styles.headerTextContainer}>
                        <Text
                          className="text-[18px] font-medium tracking-wider py-3"
                          Style={styles.header}>
                          TSE Details
                        </Text>
                      </View>
                      <View style={styles.contentTextContainer}>
                        <Text
                          className="text-[14px] tracking-wider"
                          Style={styles.contentText}>
                          {contactInfo?.TSE_name}
                        </Text>
                        {/* <Text
                          className="text-[12px] font-normal tracking-widest text-[#aaa]"
                          style={{color: '#aaa'}}>
                          Kolkata branch
                        </Text> */}
                      </View>
                      <View style={styles.contentTextContainer}>
                        <View className="flex-row gap-2 items-center">
                          <Feather name="phone" size={22} color="#333" />
                          <Text>{" "}</Text>
                          <RenderHTML
                            contentWidth={width}
                            source={{
                              html: contactInfo?.TSE_phone,
                            }}
                          />
                          {/* <Text
                            className="text-[14px] tracking-wider"
                            style={styles.contentText}>
                            {contactInfo?.TSE_phone}
                          </Text> */}
                        </View>
                      </View>
                    </View>
                  </View>
                )}
                <View className="py-2 px-3 rounded" style={styles.section}>
                  <View>
                    <View style={styles.headerTextContainer}>
                      <Text
                        className="text-[18px] font-medium tracking-wider py-3"
                        Style={styles.header}>
                        Corporate Office
                      </Text>
                    </View>
                    <View style={styles.contentTextContainer}>
                      <RenderHTML
                        contentWidth={width}
                        source={{
                          html: contactInfo?.Corporate_Office_Address,
                        }}
                      />
                    </View>
                  </View>
                </View>
                <View className="py-2 px-3 rounded" style={styles.section}>
                  <View>
                    <View style={styles.headerTextContainer}>
                      <Text
                        className="text-[18px] font-medium tracking-wider py-3"
                        Style={styles.header}>
                        Helpline Details
                      </Text>
                    </View>
                    <View style={styles.contentTextContainer}>
                      <View className="flex-row items-center gap-2">
                        <Feather name="mail" size={22} color="#333" />
                        <View>
                          <RenderHTML
                            contentWidth={width}
                            source={{
                              html: contactInfo?.Helpline_email,
                            }}
                          />
                        </View>
                      </View>
                      <View className="flex-row items-center gap-2">
                        <Feather name="phone" size={22} color="#333" />
                        <View>
                          <RenderHTML
                            contentWidth={width}
                            source={{
                              html: contactInfo?.Helpline_number,
                            }}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </InsideFormBg>
  );
};

export default ContactUs;

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
});
