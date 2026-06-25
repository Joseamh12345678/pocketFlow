import React, { useState } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import BottomNav from './src/components/BottomNav';
import { Colors } from './src/constants/colors';
import ExpenseScreen from './src/screens/ExpenseScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import LoginScreen from './src/screens/LoginScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import StatsScreen from './src/screens/StatsScreen';
import { Screen } from './src/types';

function renderScreen(screen: Screen) {
  switch (screen) {
    case 'expense':  return <ExpenseScreen />;
    case 'history':  return <HistoryScreen />;
    case 'stats':    return <StatsScreen />;
    case 'settings': return <SettingsScreen />;
  }
}

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [activeScreen, setActiveScreen] = useState<Screen>('expense');

  if (!loggedIn) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.safe}>
          <StatusBar barStyle="light-content" backgroundColor="#07173f" />
          <LoginScreen onStart={() => setLoggedIn(true)} />
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

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
