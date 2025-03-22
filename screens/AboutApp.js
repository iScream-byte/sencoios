import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  useWindowDimensions,
  TouchableOpacity,
  Linking,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import HeaderGradient from '../components/HeaderGradient';
import InsideFormBg from '../components/InsideFormBg';
import OtherService from '../services/Other';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator} from 'react-native-paper';
import RenderHTML from 'react-native-render-html';
import FooterTab from '../components/FooterTab';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;
const socialMediaLinks = {
  facebook: 'https://www.facebook.com/SencoGoldAndDiamonds/',
  twitter: 'https://twitter.com/sencogoldindia',
  instagram: 'https://www.instagram.com/sencogoldanddiamonds',
  youtube: 'https://www.youtube.com/user/sencogoldindia',
  whatsapp:
    'https://api.whatsapp.com/send/?phone=%2B917605023222&text&app_absent=0',
};

const AboutApp = () => {
  const [loading, setLoading] = useState(false);
  const [contactInfo, setContactInfo] = useState(null);

  const openLink = url => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  return (
    <InsideFormBg bgImage={require('./../assets/Images/bg_reg_bg.png')}>
      <View className="bg-white rounded-md mt-4 shadow flex-1 w-full">
        <View className="flex-1 ">
          <View className=" w-[100%]  flex ">
            <HeaderGradient headerText="About Us" />
          </View>
          {loading && (
            <View className="py-4">
              <ActivityIndicator />
            </View>
          )}
          {!loading && !contactInfo && (
            <ScrollView>
              <View className="mx-3 flex-col items-center py-4">
                <Text
                  className="text-left text-[#666] text-[22px]"
                  style={{color: '#666'}}>
                  We believe that motivation is the key to unlocking your full
                  potential. Our mission is to help you achieve your goals by
                  providing a platform that makes it easy and fun to stay on
                  track. Whether you're looking to build new habits, reach
                  milestones, or accomplish professional objectives, we're here
                  to support you every step of the way. Our app is designed with
                  you in mind, ensuring a seamless and enjoyable experience. We
                  believe in the power of community and support. Together, we
                  can achieve more.
                </Text>
                <View style={styles.container}>
                  <TouchableOpacity
                    onPress={() => openLink(socialMediaLinks.facebook)}>
                    <Image
                      source={require('./../assets/Images/facebook.png')}
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => openLink(socialMediaLinks.youtube)}>
                    <Image
                      source={require('./../assets/Images/video.png')}
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => openLink(socialMediaLinks.twitter)}>
                    <Image
                      source={require('./../assets/Images/twitter.png')}
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => openLink(socialMediaLinks.instagram)}>
                    <Image
                      source={require('./../assets/Images/instagram.png')}
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => openLink(socialMediaLinks.whatsapp)}>
                    <Image
                      source={require('./../assets/Images/whatsapp.png')}
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          )}
        </View>
      </View>

      <FooterTab pageName="AboutApp" />
    </InsideFormBg>
  );
};

export default AboutApp;

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
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    marginTop: 20,
  },
  icon: {
    width: 40,
    height: 40,
    margin: 12,
  },
});
