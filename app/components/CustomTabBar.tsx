import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {colors, tw} from '../utils/utils';
import {Heart, Home, Images} from 'lucide-react-native';
import {View, Text, TouchableOpacity} from 'react-native';
import {observer} from '@legendapp/state/react';
import {selectState$} from '../store/zus';

let ICON_SIZE = 22;
let ICONS = [
  (color?: string) => (
    <Home size={ICON_SIZE} color={color || colors.neutral[200]} />
  ),
  (color?: string) => (
    <Images size={ICON_SIZE} color={color || colors.neutral[200]} />
  ),
  (color?: string) => (
    <Heart size={ICON_SIZE} color={color || colors.neutral[200]} />
  ),
];
let CustomTabBar = function CustomTabBar(props: BottomTabBarProps) {
  let onPress = (name: string) => {
    props.navigation.navigate(name);
  };
  return (
    <View
      style={tw(
        'h-16 bg-neutral-800 rounded-t-2xl absolute right-0 left-0 bottom-0 flex-row justify-evenly',
      )}>
      {props.state.routes.map((e, i) => {
        return <Pill e={e} i={i} onPress={onPress} props={props} />;
      })}
    </View>
  );
};

let Pill = observer(
  ({
    e,
    onPress,
    i,
    props,
  }: {
    onPress: (name: string) => any;
    e: any;
    i: number;
    props: any;
  }) => {
    let selectMode = selectState$.get();
    let Press = () => {
      if (selectMode) {
        return;
      }
      onPress(e.name);
    };
    return (
      <TouchableOpacity
        key={e.name}
        style={tw('flex-row gap-2 items-center ')}
        onPress={Press}>
        {ICONS[i](
          selectMode
            ? colors.neutral[700]
            : props.state.index == i
            ? colors.emerald[200]
            : undefined,
        )}
        <Text>{e.name.replace('Tab', '')}</Text>
      </TouchableOpacity>
    );
  },
);
export default CustomTabBar;
