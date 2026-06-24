import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { HistoryItem } from '../..';
import { Colors } from '../constants/colors';

const TODAY_ITEMS: HistoryItem[] = [
  { icon: '🚗', label: 'Transporte', time: '10:20 AM', amount: 55 },
  { icon: '🛍️', label: 'Compras',    time: '09:05 AM', amount: 295 },
  { icon: '💡', label: 'Servicios',  time: '08:30 AM', amount: 80 },
];

const YESTERDAY_ITEMS: HistoryItem[] = [
  { icon: '🎮', label: 'Ocio',    time: '08:00 PM', amount: 340 },
  { icon: '🍔', label: 'Comida',  time: '01:15 PM', amount: 65 },
];

function formatAmount(amount: number): string {
  return `-$${amount.toFixed(2)}`;
}

function HistoryGroup({
  label,
  items,
}: {
  label: string;
  items: HistoryItem[];
}) {
  return (
    <>
      <Text style={styles.sectionLabel}>{label}</Text>
      <View style={styles.list}>
        {items.map((item, i) => (
          <View key={i} style={styles.item}>
            <View style={styles.iconWrap}>
              <Text style={styles.itemIcon}>{item.icon}</Text>
            </View>
            <View style={styles.itemInfo}>
              <Text style={styles.itemLabel}>{item.label}</Text>
              <Text style={styles.itemTime}>{item.time}</Text>
            </View>
            <Text style={styles.itemPrice}>{formatAmount(item.amount)}</Text>
          </View>
        ))}
      </View>
    </>
  );
}

export default function HistoryScreen() {
  const todayTotal = TODAY_ITEMS.reduce((sum, i) => sum + i.amount, 0);

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Historial</Text>
        <TouchableOpacity style={styles.filterBtn} activeOpacity={0.7}>
          <Text style={styles.filterIcon}>⊟</Text>
        </TouchableOpacity>
      </View>

      {/* Date card */}
      <View style={styles.dateCard}>
        <Text style={styles.dateText}>Hoy, 20 de junio</Text>
      </View>

      <HistoryGroup label="HOY" items={TODAY_ITEMS} />
      <HistoryGroup label="AYER" items={YESTERDAY_ITEMS} />

      {/* Total card */}
      <View style={styles.totalCard}>
        <Text style={styles.totalLabel}>Total del día</Text>
        <Text style={styles.totalAmount}>${todayTotal.toFixed(2)}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { padding: 25, paddingBottom: 110 },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  title: { fontSize: 36, fontWeight: 'bold', color: Colors.white },
  filterBtn: {
    width: 50,
    height: 50,
    borderRadius: 15,
    backgroundColor: Colors.bgCard,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterIcon: { color: Colors.white, fontSize: 20 },

  dateCard: {
    backgroundColor: Colors.bgCard,
    padding: 16,
    borderRadius: 15,
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  dateText: { color: Colors.white },

  sectionLabel: {
    color: Colors.textLabel,
    marginBottom: 12,
    marginTop: 20,
    fontWeight: '600',
    fontSize: 13,
  },
  list: { gap: 15 },

  item: {
    backgroundColor: Colors.bgCardAlt,
    borderRadius: 18,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrap: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.bgDark,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  itemIcon: { fontSize: 22 },
  itemInfo: { flex: 1 },
  itemLabel: { color: Colors.white, fontWeight: '600', fontSize: 15 },
  itemTime: { color: Colors.textLabel, marginTop: 4, fontSize: 13 },
  itemPrice: { color: Colors.white, fontWeight: 'bold', fontSize: 16 },

  totalCard: {
    marginTop: 25,
    backgroundColor: Colors.bgTotal,
    borderWidth: 1,
    borderColor: Colors.totalBorder,
    borderRadius: 18,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: { color: Colors.totalText, fontSize: 15 },
  totalAmount: { color: Colors.totalText, fontWeight: 'bold', fontSize: 20 },
});
