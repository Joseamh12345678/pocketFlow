import React, { useState } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from './src/constants/colors';
import { Screen } from './src/types';
import BottomNav from './src/components/BottomNav';
import ExpenseScreen from './src/screens/ExpenseScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import StatsScreen from './src/screens/StatsScreen';
import SettingsScreen from './src/screens/SettingsScreen';

function renderScreen(screen: Screen) {
  switch (screen) {
    case 'expense':  return <ExpenseScreen />;
    case 'history':  return <HistoryScreen />;
    case 'stats':    return <StatsScreen />;
    case 'settings': return <SettingsScreen />;
  }
}

export default function App() {
  const [activeScreen, setActiveScreen] = useState<Screen>('expense');

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safe}>
        <StatusBar barStyle="light-content" backgroundColor={Colors.bgDeep} />
        <View style={styles.container}>
          {renderScreen(activeScreen)}
          <BottomNav active={activeScreen} onNavigate={setActiveScreen} />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.bgDeep,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.bgPhone,
    position: 'relative',
  },
});
