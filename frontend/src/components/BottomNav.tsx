import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Screen } from '../..';
import { Colors } from '../constants/colors';

interface NavItem {
  screen: Screen;
  icon: string;
}

const NAV_ITEMS: NavItem[] = [
  { screen: 'expense',  icon: '⌂' },
  { screen: 'history',  icon: '≡' },
  { screen: 'stats',    icon: '▦' },
  { screen: 'settings', icon: '⚙' },
];

interface BottomNavProps {
  active: Screen;
  onNavigate: (screen: Screen) => void;
}

export default function BottomNav({ active, onNavigate }: BottomNavProps) {
  return (
    <View style={styles.container}>
      {NAV_ITEMS.map(({ screen, icon }) => (
        <TouchableOpacity
          key={screen}
          style={styles.btn}
          onPress={() => onNavigate(screen)}
          activeOpacity={0.7}
        >
          <Text style={[styles.icon, active === screen && styles.iconActive]}>
            {icon}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 75,
    backgroundColor: Colors.navBg,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: Colors.navBorder,
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  icon: {
    fontSize: 24,
    color: Colors.textNav,
  },
  iconActive: {
    color: Colors.cyanBtn,
  },
});
