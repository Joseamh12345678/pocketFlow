import React, { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { StatTab } from '../..';
import { Colors } from '../constants/colors';

const TABS: { id: StatTab; label: string }[] = [
  { id: 'day',   label: 'Día' },
  { id: 'week',  label: 'Semana' },
  { id: 'month', label: 'Mes' },
];

const LEGEND = [
  { color: Colors.cyan,   label: 'Comida',     pct: '40%' },
  { color: Colors.orange, label: 'Transporte',  pct: '20%' },
  { color: Colors.purple, label: 'Compras',     pct: '25%' },
  { color: Colors.green,  label: 'Servicios',   pct: '10%' },
  { color: Colors.red,    label: 'Ocio',        pct: '5%'  },
];

// Simple donut chart using nested views
function DonutChart() {
  // Rendered as a CSS conic-gradient equivalent using a decorative circular view
  // In production, use react-native-svg or victory-native for real charts
  const segments = [
    { color: Colors.cyan,   flex: 40 },
    { color: Colors.orange, flex: 25 },
    { color: Colors.purple, flex: 20 },
    { color: Colors.green,  flex: 10 },
    { color: Colors.red,    flex: 5  },
  ];

  return (
    <View style={donut.container}>
      {/* Fake donut using stacked arcs approximation with colored rings */}
      <View style={donut.outer}>
        <View style={[donut.segment, { backgroundColor: Colors.cyan, transform: [{ rotate: '0deg' }] }]} />
        <View style={donut.inner} />
      </View>
      {/* Color indicator strips around the circle */}
      <View style={donut.colorRing}>
        {segments.map((seg, i) => (
          <View
            key={i}
            style={[
              donut.strip,
              { backgroundColor: seg.color, flex: seg.flex },
            ]}
          />
        ))}
      </View>
      <View style={donut.hole} />
    </View>
  );
}

export default function StatsScreen() {
  const [activeTab, setActiveTab] = useState<StatTab>('week');

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Estadísticas</Text>

      {/* Tabs */}
      <View style={styles.tabs}>
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tab, activeTab === tab.id && styles.tabActive]}
            onPress={() => setActiveTab(tab.id)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab.id && styles.tabTextActive,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Stats card with donut */}
      <View style={styles.statsCard}>
        <View style={styles.donutWrap}>
          <View style={styles.donutOuter}>
            <View style={styles.donutInner} />
          </View>
        </View>
        <View style={styles.statsTotal}>
          <Text style={styles.statsTotalLabel}>TOTAL</Text>
          <Text style={styles.statsTotalAmount}>$3,120</Text>
        </View>
      </View>

      {/* Legend */}
      <View style={styles.legend}>
        {LEGEND.map((item) => (
          <View key={item.label} style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: item.color }]} />
            <Text style={styles.legendText}>
              {item.label} {item.pct}
            </Text>
          </View>
        ))}
      </View>

      {/* Line chart card */}
      <View style={styles.lineCard}>
        <Text style={styles.lineTitle}>Evolución de gastos</Text>
        <View style={styles.lineChart}>
          {/* Fake line chart rows */}
          {[0, 1, 2, 3, 4].map((i) => (
            <View key={i} style={styles.chartLine} />
          ))}
          {/* Fake trend line */}
          <View style={styles.trendLine} />
        </View>
      </View>
    </ScrollView>
  );
}

const donut = StyleSheet.create({
  container: { width: 220, height: 220, position: 'relative', alignItems: 'center', justifyContent: 'center' },
  outer: {},
  segment: {},
  inner: {},
  colorRing: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  strip: { height: 220 },
  hole: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.bgCard,
  },
});

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { padding: 25, paddingBottom: 110 },

  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 25,
  },

  tabs: {
    backgroundColor: Colors.bgCard,
    borderRadius: 18,
    padding: 8,
    flexDirection: 'row',
    marginBottom: 25,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  tabActive: { backgroundColor: Colors.cyanBtn },
  tabText: { color: Colors.white, fontSize: 14 },
  tabTextActive: { color: Colors.bgDeep, fontWeight: 'bold' },

  statsCard: {
    backgroundColor: Colors.bgCard,
    borderRadius: 25,
    padding: 25,
    marginBottom: 20,
    alignItems: 'center',
  },
  donutWrap: {
    width: 220,
    height: 220,
    borderRadius: 110,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    // Approximation of conic-gradient using background trick
    backgroundColor: Colors.red,
    // In production use react-native-svg
  },
  donutOuter: {
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: Colors.cyan,
    // Shadow of segments – very rough. Use SVG for proper charts.
  },
  donutInner: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.bgCard,
  },
  statsTotal: { marginTop: 20, alignItems: 'center' },
  statsTotalLabel: { color: Colors.textMuted, fontSize: 13, letterSpacing: 1 },
  statsTotalAmount: { color: Colors.white, fontSize: 30, fontWeight: 'bold' },

  legend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 25,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '47%',
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: { color: Colors.white, fontSize: 14 },

  lineCard: {
    backgroundColor: Colors.bgCard,
    borderRadius: 25,
    padding: 20,
  },
  lineTitle: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 20,
  },
  lineChart: {
    height: 180,
    borderRadius: 15,
    backgroundColor: Colors.bgCardAlt,
    overflow: 'hidden',
    justifyContent: 'space-around',
    paddingVertical: 10,
    position: 'relative',
  },
  chartLine: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.06)',
    marginHorizontal: 10,
  },
  trendLine: {
    position: 'absolute',
    bottom: 40,
    left: 10,
    right: 10,
    height: 2,
    backgroundColor: Colors.cyan,
    borderRadius: 1,
    opacity: 0.7,
  },
});
