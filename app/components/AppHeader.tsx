import {View, Text} from 'react-native';
import React from 'react';
import {tw} from '../utils/utils';

export default function AppHeader() {
  return (
    <View style={tw('')}>
      <Text style={tw('text-2xl')}>Ilur</Text>
    </View>
  );
}
