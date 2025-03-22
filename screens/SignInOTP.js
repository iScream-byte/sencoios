// import React, {useState} from 'react'
// import {View, Text, Image, StyleSheet, TouchableOpacity, TextInput, ScrollView, Pressable} from 'react-native';
// import { LinearTextGradient } from 'react-native-text-gradient';
// import InputField from '../components/InputField';
// import RegistrationService from '../services/registration';
// import { useSelector } from 'react-redux';
// import FormBackground from '../components/FormBackground';
// import ButtonGradient from '../components/ButtonGradient';
// import OptionsInputField from '../components/OptionsInputField';
// import { useFocusEffect } from '@react-navigation/native';
// import { LanguageIcon } from 'react-native-heroicons/outline';

// const SignInOTP = ({route, navigation}) => {

//     const [check, setCheck] = useState(1);

//     const [sap, setSap] = useState("")
//     const [selectedLanguage, setSelectedLanguage] = useState("");
//     const [allLanguages, setAllLanguages] = useState([]);


//     useFocusEffect(
//         React.useCallback(() => {
//             RegistrationService.getLanguages().then(res => {
//                 console.log(JSON.stringify(res))
//                 if(res.success == true){
//                     const langs = res.response.languageDetails.map((lang) => ({id: lang.id, title:lang.name}))
//                     setAllLanguages(langs)
//                 }
//               }).catch(err => {
//                 console.log(JSON.stringify(err))
//               });
//         }, [])
//       );


//       const loginHandler = () => {
//         setCheck((p) => p+1)
//         if(!sap || !selectedLanguage){
//             // intentionally kept blank
//         } else {
            
//         }
//       }

//   return (
//     <ScrollView className="relative">
//         <FormBackground>
//             <View className="flex-1 w-full bg-white m-4 rounded-xl p-4 shadow">
//                 <View className="items-center flex-1">
//                     <View className="w-full flex justify-center items-center py-4">
//                         {/* <Text className="text-3xl text-center font-bold text-[#1E1E1E]" style={styles.fontFamily}>Signup to explore</Text> */}
//                         <LinearTextGradient
//                         locations={[0, 1]}
//                         colors={['#2A5E9E', '#BD3881']}
//                         start={{ x: 0, y: 0 }}
//                         end={{ x: 1, y: 0 }}
//                         style={styles.headingText}
//                         >
//                             <Text className="font-bold" style={styles.adaniBold}>RewardsConnect</Text>
//                         </LinearTextGradient>
//                         <Text className="text-sm text-center w-full text[#222222] font-bold" style={styles.fontFamily}>Login to unlock unlimited rewards</Text>
//                     </View>
//                     <View className="flex flex-col space-y-5 justify-start items-start w-full">
//                         <View className="w-full">
//                             <OptionsInputField data={allLanguages} fieldName="Select Language" value={selectedLanguage} 
//                             setValue={setSelectedLanguage} required={true} check={check} modalHeading="Select your language" modalIcon={<LanguageIcon size={26} color="#000" />} />
//                         </View>
//                         <View className="w-full">
//                             <InputField fieldName="Your SAP code" required={true} value={sap} setValue={setSap} check={check}  />
//                         </View>
//                     </View>
 
//                     <View className="w-full pt-8 pb-32">
//                         <ButtonGradient onPress={loginHandler}>Request OTP</ButtonGradient>
//                     </View>

//                 </View>
//                 <View className="flex-row pt-2 border-t border-t-slate-300 justify-center items-center">
//                     <Text className="text-center text-[#333333]">Don’t have an account?{" "}</Text>
//                     <Pressable  onPress={() => navigation.navigate("SignUp", {from:"signin"})}><Text className="text-[#0D66CA]">Sign up</Text></Pressable>
//                 </View>
//             </View>

//         </FormBackground>
//     </ScrollView>
//   )
// }

// const styles = StyleSheet.create({
//     headingText: {
//         fontFamily: 'Adani-Regular',
//         fontSize: 30,
//         fontWeight: 'bold',
//         textAlign: 'center',
//         color: '#1E1E1E'
//       },
//       fontFamily: {
//         fontFamily: 'Adani-Regular'
//       },
//       adaniBold: {
//         fontFamily: 'Adani-Bold'
//       }
// })

// export default SignInOTP;

import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity, TextInput, ScrollView, Pressable, Button, Alert} from 'react-native';
import { LinearTextGradient } from 'react-native-text-gradient';
import InputField from '../components/InputField';
import RegistrationService from '../services/registration';
import { useSelector } from 'react-redux';
import FormBackground from '../components/FormBackground';
import ButtonGradient from '../components/ButtonGradient';
import OptionsInputField from '../components/OptionsInputField';
import { useFocusEffect } from '@react-navigation/native';
import { LanguageIcon } from 'react-native-heroicons/outline';


const SignInOTP = ({route}) => {

    const {selectedLanguage, sap} = route.params;
    const loginHandler = () => {
        console.log("Login");
    }

  return (
    <ScrollView className="relative">
        <FormBackground>
            <View className="flex-1 w-full bg-white m-4 rounded-xl p-4 shadow">
                <View className="items-center flex-1">
                    <View className="w-full flex justify-center items-center py-4">
                        {/* <Text className="text-3xl text-center font-bold text-[#1E1E1E]" style={styles.fontFamily}>Signup to explore</Text> */}
                        <LinearTextGradient
                        locations={[0, 1]}
                        colors={['#2A5E9E', '#BD3881']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.headingText}
                        >
                            <Text className="font-bold" style={styles.adaniBold}>RewardsConnect</Text>
                        </LinearTextGradient>
                        <Text className="text-sm text-center w-full text[#222222] font-bold" style={styles.fontFamily}>Login to unlock unlimited rewards</Text>
                    </View>
                    <View className="flex flex-col space-y-5 justify-start items-start w-full">
                        <View className="w-full">
                            
                        </View>
                        <View className="w-full">
                           
                        </View>
                        <View className="w-full">
                            
                        </View>
                    </View>
 
                    <View className="w-full pt-8 pb-32">
                        <ButtonGradient onPress={loginHandler}>Submit</ButtonGradient>
                    </View>

                </View>
                <View className="flex-row pt-2 border-t border-t-slate-300 justify-center items-center">
                    <Text className="text-center text-[#333333]">Don’t have an account?{" "}</Text>
                    <Pressable  onPress={() => navigation.navigate("SignUp", {from:"signin"})}><Text className="text-[#0D66CA]">Sign up</Text></Pressable>
                </View>
            </View>

        </FormBackground>
    </ScrollView>
  )
}


const styles = StyleSheet.create({
    headingText: {
        fontFamily: 'Adani-Regular',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#1E1E1E'
      },
      fontFamily: {
        fontFamily: 'Adani-Regular'
      },
      adaniBold: {
        fontFamily: 'Adani-Bold'
      }
})

export default SignInOTP;