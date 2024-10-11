import {View, Text} from 'react-native';
import React from 'react';
import {tw} from '../utils/utils';

export default function AppHeader() {
  return (
    <View style={tw('bg-neutral-800 mb-2 px-2 items-center  flex-row h-14')}>
      <Text style={tw('text-2xl')}>Ilur</Text>
      <View></View>
    </View>
  );
}
