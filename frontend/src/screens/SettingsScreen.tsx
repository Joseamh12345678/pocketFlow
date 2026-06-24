import React, { useState } from 'react';
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import { Colors } from '../constants/colors';

export default function SettingsScreen() {
  const [securityEnabled, setSecurityEnabled] = useState(false);

  function handleExportCSV() {
    Alert.alert('Exportar CSV', 'Exportación CSV disponible próximamente.');
  }

  function handleLogout() {
    Alert.alert(
      'Cerrar Sesión',
      '¿Deseas cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Cerrar Sesión',
          style: 'destructive',
          onPress: () => Alert.alert('', 'Sesión cerrada.'),
        },
      ]
    );
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Ajustes</Text>

      {/* Profile card */}
      <View style={styles.profileCard}>
        <View style={styles.profileIcon}>
          <Text style={styles.profileEmoji}>👤</Text>
        </View>
        <View>
          <Text style={styles.profileName}>Mi Perfil</Text>
          <Text style={styles.profileStatus}>Perfil Local Protegido</Text>
        </View>
      </View>

      {/* Budget */}
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>💰 Mi Presupuesto</Text>
        <Text style={styles.settingValue}>$0</Text>
      </View>

      {/* Currency */}
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>💱 Divisa</Text>
        <Text style={styles.settingValue}>USD $</Text>
      </View>

      {/* Security */}
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>🔐 Seguridad</Text>
        <Switch
          value={securityEnabled}
          onValueChange={(val) => {
            setSecurityEnabled(val);
            console.log(val ? 'Seguridad activada' : 'Seguridad desactivada');
          }}
          trackColor={{ false: Colors.switchBg, true: Colors.cyanBtn }}
          thumbColor={Colors.white}
        />
      </View>

      {/* Backup / Export */}
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>📊 Copia de Seguridad</Text>
        <TouchableOpacity style={styles.csvBtn} onPress={handleExportCSV} activeOpacity={0.8}>
          <Text style={styles.csvBtnText}>Exportar CSV</Text>
        </TouchableOpacity>
      </View>

      {/* Logout */}
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout} activeOpacity={0.8}>
        <Text style={styles.logoutText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { padding: 25, paddingBottom: 110 },

  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 25,
  },

  profileCard: {
    backgroundColor: Colors.bgCard,
    borderRadius: 25,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileIcon: {
    width: 60,
    height: 60,
    borderRadius: 18,
    backgroundColor: Colors.bgDark,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    // In production add LinearGradient from Colors.profileGradientStart to End
  },
  profileEmoji: { fontSize: 28 },
  profileName: { color: Colors.white, fontSize: 16, fontWeight: 'bold' },
  profileStatus: { color: Colors.profileGreen, marginTop: 5, fontSize: 13 },

  settingItem: {
    backgroundColor: Colors.bgCard,
    borderRadius: 18,
    padding: 18,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingLabel: { color: Colors.white, fontSize: 15 },
  settingValue: { color: Colors.white, fontSize: 15 },

  csvBtn: {
    backgroundColor: Colors.cyanDark,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
  },
  csvBtnText: { color: Colors.cyanBtn, fontSize: 14 },

  logoutBtn: {
    backgroundColor: Colors.bgCard,
    borderRadius: 18,
    padding: 20,
    alignItems: 'center',
    marginTop: 15,
  },
  logoutText: { color: Colors.red, fontSize: 16, fontWeight: '600' },
});
