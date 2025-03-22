import {
  Modal,
  View,
  TouchableOpacity,
  Text,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
  StyleSheet,
} from 'react-native';

import {useState} from 'react';
import ShowImageModal from './ShowImageModal';
import ImagePicker from 'react-native-image-crop-picker';
import {Alert} from 'react-native';
import {Linking, Platform} from 'react-native';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('screen').width;

const OpenCameraModal = ({modalSt, setModalSt, from, empCode, reloadDashboard}) => {
  const [imageUri, setImageUri] = useState(null);
  const [showImagePreviewModal, setShowImagePreviewModal] = useState(false);

  const handleOpenSettings = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:');
    } else {
      Linking.openSettings();
    }
  };

  const openCamera = () => {
    ImagePicker.openCamera({
      width: 200,
      height: 200,
      cropping: true,
      useFrontCamera: true, // Set to true to use the front camera

    })
      .then(image => {
        closeModal();
        setImageUri(image.path);
        setShowImagePreviewModal(true);
      })
      .catch(error => {
        if (error.code === 'E_PICKER_CANCELLED') {
          console.log('User cancelled image picker');
        } else if (error.code == 'E_NO_CAMERA_PERMISSION') {
          Alert.alert('Error', 'Camera permission is required', [
            {text: 'Cancel', style: 'cancel'},
            {text: 'Open Settings', onPress: handleOpenSettings},
          ]);
        }
      });
    
  };

  function reloadPage(){
    reloadDashboard()
  }

  const chooseImageFromGallery = () => {
    ImagePicker.openPicker({
      width: 200,
      height: 200,
      cropping: true,
    })
      .then(image => {
        // console.log(image);
        closeModal();
        setImageUri(image.path);
        setShowImagePreviewModal(true);
      })
      .catch(error => {
        if (error.code === 'E_PICKER_CANCELLED') {
          // console.log('User cancelled image picker');
        }
      });
    // 
  };

  const closeModal = () => {
    setModalSt(false);
  };

  return (
    <View>
      <Modal
        transparent={true}
        animationType="fade"
        visible={modalSt}
        onRequestClose={closeModal}>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.backdrop}>
            <TouchableWithoutFeedback>
              <View
                style={
                  from == 'dashboard'
                    ? styles.modalContentDashboard
                    : from == 'profile'
                    ? styles.modalContentProfile
                    : {}
                }>
                <TouchableOpacity onPress={openCamera}>
                  <Text style={styles.modalButtons}>Open Camera</Text>
                </TouchableOpacity>
                <View
                  style={{
                    borderBottomColor: 'red',
                    borderBottomWidth: 0.9,
                    width: screenWidth * 0.20,
                    alignItems:"center"
                    // marginTop: 12,
                  }}
                />
                <TouchableOpacity onPress={chooseImageFromGallery}>
                  <Text style={styles.modalButtons}>Open Gallery</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      {showImagePreviewModal && imageUri && (
        <ShowImageModal
          setModalSt={setShowImagePreviewModal}
          modalSt={showImagePreviewModal}
          uri={imageUri}
          empCode={empCode}
          reloadPage={reloadPage}
          ></ShowImageModal>
      )}
    </View>
  );
};

export default OpenCameraModal;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  modalContentDashboard: {
    width: screenWidth * 0.22,
    paddingTop: 6,
    paddingBottom: 6,
    backgroundColor: 'white',
    marginTop: screenHeight * 0.24,
    marginLeft: screenWidth * 0.42,
    alignItems: 'center',
    borderRadius: 5,
  },
  modalContentProfile: {
    width: screenWidth * 0.20,
    paddingTop: 5,
    paddingBottom: 8,
    backgroundColor: 'white',
    marginTop: screenHeight * 0.35,
    marginLeft: -screenWidth * 0.17,
    alignItems: 'center',
    borderRadius: 5,
  },
  modalButtons: {
    fontSize: 11,
    marginVertical:5,
    fontWeight: 'bold',  
    color:'#4d4d4d'  
  },
});
