import * as ImagePicker from 'expo-image-picker';
import { useCallback } from 'react';
import { Alert } from 'react-native';

export default function usePhotoPicker() {
  const pickPhoto = useCallback(async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(
        'Izin Akses Diperlukan',
        'Perizinan akses ke penyimpanan diperlukan untuk mengambil gambar',
        [{ text: 'OK' }]
      );
      return null;
    }

    const pickResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
      base64: true,
    });
    if (!pickResult.cancelled) {
      return `data:image;base64, ${pickResult.base64}`;
    } else {
      return null;
    }
  }, []);

  return {
    pickPhoto,
  };
}
