import {
  Modal,
  View,
  TouchableOpacity,
  Text,
  Image,
  Dimensions,
  StyleSheet,
} from 'react-native';
import RegistrationService from '../services/registration';
import { useToast } from 'react-native-toast-notifications';
import { useState } from 'react';
import LoadingAlert from './LoadingAlert';
import AsyncStorage from '@react-native-async-storage/async-storage';



const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

const ShowImageModal = ({modalSt, setModalSt, uri, empCode, reloadPage}) => {
  const [loading,setLoading]=useState(false)
  const toast=useToast()

  const closeModal = () => {
    setModalSt(false);
  };

  const uploadImage = () => {
    setLoading(true)
    const data = new FormData();
    data.append('imagepath', {
      name: 'photo.jpg',
      type: 'image/jpeg',
      uri: Platform.OS === 'android' ? {uri}.uri : {uri}.uri
    });
    data.append('empcode',empCode)   
    RegistrationService.UploadDp(data).then(async res=>{
      console.log(res,"UPLOAD PHOTO RES");
      setLoading(false)
      if(res.Status==200){
        await AsyncStorage.setItem('profilePhotoURL', res.Data.ImageUrl);
        toast.show('', {
          data: {
            isSuccess: true,
            heading: 'Success!',
            describe: 'Profile Photo Updated Successfully',
          },
        });
      reloadPage()
      closeModal()
      }else{
        setLoading(false)
        toast.show('', {
          data: {
            isSuccess: false,
            heading: 'Failed!',
            describe: "Couldn't Upload Profile Photo.",
          },
        });
      }
    })   
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalSt}
      onRequestClose={closeModal}>      
      <View style={styles.centeredView}>
      <LoadingAlert visible={loading} />
        <View style={styles.modalView}>
          <Image source={{uri}} style={styles.image} />
          <View style={{flexDirection:'row'}}>
            <TouchableOpacity
              style={[styles.button, {backgroundColor:'green'}]}
              onPress={uploadImage}>
              <Text style={styles.textStyle}>Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, {backgroundColor:'red'}]}
              onPress={closeModal}>
              <Text style={styles.textStyle}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ShowImageModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    marginRight:5
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    width: screenHeight*0.31,
    height: screenWidth*0.7,
    borderRadius:10,
    marginBottom: 15,
  },
});
