import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface LoginScreenProps {
  onStart: () => void;
}

const FREQUENCIES = ['Mensual', 'Quincenal', 'Semanal'];

function RegisterView({ onRegister, onBack }: { onRegister: () => void; onBack: () => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [income, setIncome] = useState('');
  const [payFreq, setPayFreq] = useState('Mensual');
  const [statsFreq, setStatsFreq] = useState('Mensual');
  const [showPayFreq, setShowPayFreq] = useState(false);
  const [showStatsFreq, setShowStatsFreq] = useState(false);

  function handleRegister() {
    if (!name || !email || !password) {
      Alert.alert('Error', 'Por favor completa todos los campos.');
      return;
    }
    onRegister();
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Text style={styles.logoEmoji}>💸</Text>
        <Text style={styles.logoTitle}>Pocket<Text style={styles.logoTitleAccent}>Flow</Text></Text>
        <Text style={styles.logoSub}>Fast. Private. Control.</Text>
      </View>

      <Text style={styles.sectionTitle}>PocketFlow</Text>
      <Text style={styles.sectionSub}>Fast. Private. Control.</Text>

      {/* Nombre */}
      <Text style={styles.label}>Nombre completo</Text>
      <TextInput
        style={styles.input}
        placeholder="Tu nombre"
        placeholderTextColor="#4a5a80"
        value={name}
        onChangeText={setName}
      />

      {/* Email */}
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="ejemplo@correo.com"
        placeholderTextColor="#4a5a80"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Contraseña */}
      <Text style={styles.label}>Contraseña</Text>
      <TextInput
        style={styles.input}
        placeholder="••••••••"
        placeholderTextColor="#4a5a80"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Ingreso */}
      <Text style={styles.label}>¿Cuánto es tu ingreso promedio?</Text>
      <View style={styles.inputRow}>
        <Text style={styles.inputPrefix}>$</Text>
        <TextInput
          style={styles.inputInner}
          placeholder="0.00"
          placeholderTextColor="#4a5a80"
          value={income}
          onChangeText={(t) => setIncome(t.replace(/[^0-9.]/g, ''))}
          keyboardType="decimal-pad"
        />
      </View>

      {/* Frecuencia de pago */}
      <Text style={styles.label}>¿Cada cuánto recibes este dinero?</Text>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => { setShowPayFreq(!showPayFreq); setShowStatsFreq(false); }}
        activeOpacity={0.8}
      >
        <Text style={styles.dropdownText}>{payFreq}</Text>
        <Text style={styles.dropdownArrow}>▾</Text>
      </TouchableOpacity>
      {showPayFreq && (
        <View style={styles.dropdownMenu}>
          {FREQUENCIES.map((f) => (
            <TouchableOpacity key={f} style={styles.dropdownItem} onPress={() => { setPayFreq(f); setShowPayFreq(false); }}>
              <Text style={styles.dropdownItemText}>{f}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Estadísticas */}
      <Text style={styles.label}>¿Cómo quieres ver tus estadísticas?</Text>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => { setShowStatsFreq(!showStatsFreq); setShowPayFreq(false); }}
        activeOpacity={0.8}
      >
        <Text style={styles.dropdownText}>{statsFreq}</Text>
        <Text style={styles.dropdownArrow}>▾</Text>
      </TouchableOpacity>
      {showStatsFreq && (
        <View style={styles.dropdownMenu}>
          {FREQUENCIES.map((f) => (
            <TouchableOpacity key={f} style={styles.dropdownItem} onPress={() => { setStatsFreq(f); setShowStatsFreq(false); }}>
              <Text style={styles.dropdownItemText}>{f}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Crear cuenta */}
      <TouchableOpacity style={styles.ctaBtn} onPress={handleRegister} activeOpacity={0.85}>
        <Text style={styles.ctaText}>Crear cuenta  👤+</Text>
      </TouchableOpacity>

      {/* Volver al login */}
      <TouchableOpacity onPress={onBack} style={styles.backLink}>
        <Text style={styles.backLinkText}>¿Ya tienes cuenta? <Text style={styles.backLinkAccent}>Inicia sesión</Text></Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function MainLoginView({ onStart, onRegister }: { onStart: () => void; onRegister: () => void }) {
  const [income, setIncome] = useState('');
  const [payFreq, setPayFreq] = useState('Mensual');
  const [statsFreq, setStatsFreq] = useState('Mensual');
  const [showPayFreq, setShowPayFreq] = useState(false);
  const [showStatsFreq, setShowStatsFreq] = useState(false);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Text style={styles.logoEmoji}>💸</Text>
        <Text style={styles.logoTitle}>Pocket<Text style={styles.logoTitleAccent}>Flow</Text></Text>
        <Text style={styles.logoSub}>Your Pocket Control</Text>
      </View>

      <Text style={styles.tagline}>Tu dinero, sin fricción</Text>

      {/* Google */}
      <TouchableOpacity style={styles.googleBtn} activeOpacity={0.85}>
        <Text style={styles.googleIcon}>G</Text>
        <Text style={styles.googleText}>Continuar con Google</Text>
      </TouchableOpacity>

      {/* Apple */}
      <TouchableOpacity style={styles.appleBtn} activeOpacity={0.85}>
        <Text style={styles.appleIcon}>🍎</Text>
        <Text style={styles.appleText}>Continuar con Apple</Text>
      </TouchableOpacity>

      {/* Divider */}
      <View style={styles.divider}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>o crea un perfil local</Text>
        <View style={styles.dividerLine} />
      </View>

      {/* Ingreso */}
      <Text style={styles.label}>Ingreso promedio</Text>
      <View style={styles.inputRow}>
        <Text style={styles.inputPrefix}>$</Text>
        <TextInput
          style={styles.inputInner}
          placeholder="0.00"
          placeholderTextColor="#4a5a80"
          value={income}
          onChangeText={(t) => setIncome(t.replace(/[^0-9.]/g, ''))}
          keyboardType="decimal-pad"
        />
      </View>

      {/* Pay freq */}
      <Text style={styles.label}>Frecuencia de pago</Text>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => { setShowPayFreq(!showPayFreq); setShowStatsFreq(false); }}
        activeOpacity={0.8}
      >
        <Text style={styles.dropdownText}>{payFreq}</Text>
        <Text style={styles.dropdownArrow}>▾</Text>
      </TouchableOpacity>
      {showPayFreq && (
        <View style={styles.dropdownMenu}>
          {FREQUENCIES.map((f) => (
            <TouchableOpacity key={f} style={styles.dropdownItem} onPress={() => { setPayFreq(f); setShowPayFreq(false); }}>
              <Text style={styles.dropdownItemText}>{f}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Stats freq */}
      <Text style={styles.label}>Estadísticas por defecto</Text>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => { setShowStatsFreq(!showStatsFreq); setShowPayFreq(false); }}
        activeOpacity={0.8}
      >
        <Text style={styles.dropdownText}>{statsFreq}</Text>
        <Text style={styles.dropdownArrow}>▾</Text>
      </TouchableOpacity>
      {showStatsFreq && (
        <View style={styles.dropdownMenu}>
          {FREQUENCIES.map((f) => (
            <TouchableOpacity key={f} style={styles.dropdownItem} onPress={() => { setStatsFreq(f); setShowStatsFreq(false); }}>
              <Text style={styles.dropdownItemText}>{f}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* CTA */}
      <TouchableOpacity style={styles.ctaBtn} onPress={onStart} activeOpacity={0.85}>
        <Text style={styles.ctaText}>Comenzar a fluir ✦</Text>
      </TouchableOpacity>

      {/* Ir a registro */}
      <TouchableOpacity onPress={onRegister} style={styles.backLink}>
        <Text style={styles.backLinkText}>¿No tienes cuenta? <Text style={styles.backLinkAccent}>Crear cuenta</Text></Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

export default function LoginScreen({ onStart }: LoginScreenProps) {
  const [view, setView] = useState<'main' | 'register'>('main');

  if (view === 'register') {
    return (
      <RegisterView
        onRegister={onStart}
        onBack={() => setView('main')}
      />
    );
  }

  return (
    <MainLoginView
      onStart={onStart}
      onRegister={() => setView('register')}
    />
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#07173f' },
  content: { padding: 25, paddingBottom: 40 },

  logoContainer: { alignItems: 'center', marginTop: 30, marginBottom: 10 },
  logoEmoji: { fontSize: 38 },
  logoTitle: { fontSize: 24, color: '#ffffff', fontWeight: '300', marginTop: 6 },
  logoTitleAccent: { fontWeight: 'bold', color: '#18d6ff' },
  logoSub: { color: '#8ea2cb', fontSize: 12, marginTop: 2 },

  sectionTitle: { fontSize: 28, fontWeight: 'bold', color: '#ffffff', textAlign: 'center', marginTop: 10 },
  sectionSub: { color: '#8ea2cb', textAlign: 'center', marginBottom: 24, fontSize: 14 },

  tagline: { color: '#8ea2cb', textAlign: 'center', fontSize: 15, marginVertical: 20 },

  googleBtn: {
    backgroundColor: '#ffffff', borderRadius: 14, height: 52,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    marginBottom: 12, gap: 10,
  },
  googleIcon: { fontSize: 20, fontWeight: 'bold', color: '#4285F4' },
  googleText: { color: '#000000', fontSize: 16, fontWeight: '500' },

  appleBtn: {
    backgroundColor: '#000000', borderRadius: 14, height: 52,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    marginBottom: 20, gap: 10,
  },
  appleIcon: { fontSize: 20 },
  appleText: { color: '#ffffff', fontSize: 16, fontWeight: '500' },

  divider: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, gap: 10 },
  dividerLine: { flex: 1, height: 1, backgroundColor: '#1e3060' },
  dividerText: { color: '#8ea2cb', fontSize: 13 },

  label: { color: '#8ea2cb', fontSize: 13, marginBottom: 8, fontWeight: '500' },

  input: {
    backgroundColor: '#ffffff', borderRadius: 14, height: 52,
    paddingHorizontal: 16, color: '#000000', fontSize: 15, marginBottom: 18,
  },
  inputRow: {
    backgroundColor: '#ffffff', borderRadius: 14, height: 52,
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, marginBottom: 18,
  },
  inputPrefix: { color: '#4a5a80', fontSize: 16, marginRight: 6 },
  inputInner: { flex: 1, color: '#000000', fontSize: 15 },

  dropdown: {
    backgroundColor: '#0d1f4e', borderRadius: 14, height: 52,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, marginBottom: 18,
  },
  dropdownText: { color: '#ffffff', fontSize: 15 },
  dropdownArrow: { color: '#8ea2cb', fontSize: 18 },
  dropdownMenu: {
    backgroundColor: '#0d1f4e', borderRadius: 14,
    marginTop: -14, marginBottom: 18, overflow: 'hidden',
  },
  dropdownItem: { padding: 14, borderBottomWidth: 1, borderBottomColor: '#18295d' },
  dropdownItemText: { color: '#ffffff', fontSize: 15 },

  ctaBtn: {
    height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center',
    marginTop: 10, backgroundColor: '#0ea5c9',
  },
  ctaText: { color: '#ffffff', fontSize: 17, fontWeight: 'bold' },

  backLink: { marginTop: 20, alignItems: 'center' },
  backLinkText: { color: '#8ea2cb', fontSize: 14 },
  backLinkAccent: { color: '#18d6ff', fontWeight: '600' },
});
