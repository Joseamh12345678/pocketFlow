import React, { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { CategoryId } from '../..';
import { CATEGORIES } from '../constants/categories';
import { Colors } from '../constants/colors';

export default function ExpenseScreen() {
  const [amount, setAmount] = useState('');
  const [activeCategory, setActiveCategory] = useState<CategoryId>('food');

  const displayAmount = amount ? `$${amount}` : '$0.00';

  function handleKey(value: string) {
    if (value === '⌫') {
      setAmount((prev) => prev.slice(0, -1));
      return;
    }
    if (value === '.' && amount.includes('.')) return;
    // Max 2 decimal places
    if (amount.includes('.')) {
      const decimals = amount.split('.')[1];
      if (decimals && decimals.length >= 2) return;
    }
    setAmount((prev) => prev + value);
  }

  function handleSave() {
    if (!amount) {
      Alert.alert('Error', 'Ingresa un monto.');
      return;
    }
    Alert.alert('Éxito', 'Gasto guardado correctamente.');
    setAmount('');
  }

  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', '⌫'];

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Top bar */}
      <View style={styles.topBar}>
        <View style={styles.avatar}>
          <Text style={styles.avatarIcon}>👤</Text>
        </View>
        <View style={styles.avatar}>
          <Text style={styles.avatarIcon}>🛡️</Text>
        </View>
      </View>

      {/* Amount display */}
      <View style={styles.amountContainer}>
        <Text style={styles.amountText} numberOfLines={1} adjustsFontSizeToFit>
          {displayAmount}
        </Text>
        <Text style={styles.amountLabel}>Ingresa el monto</Text>
      </View>

      {/* Categories */}
      <View style={styles.categories}>
        {CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            style={[
              styles.category,
              activeCategory === cat.id && styles.categoryActive,
            ]}
            onPress={() => setActiveCategory(cat.id)}
            activeOpacity={0.7}
          >
            <Text style={styles.categoryEmoji}>{cat.emoji}</Text>
            <Text style={styles.categoryLabel}>{cat.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Keyboard */}
      <View style={styles.keyboard}>
        {keys.map((key) => (
          <TouchableOpacity
            key={key}
            style={styles.key}
            onPress={() => handleKey(key)}
            activeOpacity={0.7}
          >
            <Text style={styles.keyText}>{key}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Save button */}
      <TouchableOpacity
        style={styles.saveBtn}
        onPress={handleSave}
        activeOpacity={0.85}
      >
        <Text style={styles.saveBtnText}>GUARDAR GASTO</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    padding: 25,
    paddingBottom: 110,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: Colors.bgCard,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarIcon: {
    fontSize: 20,
  },
  amountContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  amountText: {
    fontSize: 56,
    fontWeight: 'bold',
    color: Colors.cyan,
  },
  amountLabel: {
    color: Colors.textMuted,
    marginTop: 10,
    fontSize: 15,
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 25,
  },
  category: {
    width: '30%',
    backgroundColor: Colors.bgCard,
    borderRadius: 18,
    paddingVertical: 15,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  categoryActive: {
    borderColor: Colors.cyan,
  },
  categoryEmoji: {
    fontSize: 22,
    marginBottom: 8,
  },
  categoryLabel: {
    color: Colors.white,
    fontSize: 12,
  },
  keyboard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  key: {
    width: '30%',
    height: 65,
    backgroundColor: Colors.bgCard,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyText: {
    color: Colors.white,
    fontSize: 24,
  },
  saveBtn: {
    height: 60,
    marginTop: 20,
    borderRadius: 18,
    backgroundColor: Colors.cyanBtn,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveBtnText: {
    color: Colors.bgDeep,
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
  },
});
