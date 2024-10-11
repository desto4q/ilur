import {View, Text, PermissionsAndroid} from 'react-native';
import React, {useEffect} from 'react';
import * as MediaLibrary from 'expo-media-library';
import Intro from './app/Intro';
import {tw} from './app/utils/utils';
export default function App() {
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

  async function getPerms() {
    if (permissionResponse?.status !== 'granted') {
      await requestPermission();
    } else {
      console.log('permissions Granted');
    }
  }

  useEffect(() => {
    getPerms();
  }, []);
  return (
    <View style={{flex: 1}}>
      {permissionResponse?.granted ? (
        <Intro />
      ) : (
        <View style={tw('flex-1 items-center justify-center gap-2')}>
          <Text style={tw('text-3xl')}>Ilur</Text>
          <Text style={tw('text-lg')}>Grant Permmissions</Text>
        </View>
      )}
    </View>
  );
}
