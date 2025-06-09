// app/(tabs)/index.tsx

import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View
} from 'react-native';
import CardProduct from '../components/card-product';

const PRODUCTS = [
  {
    id: 1,
    name: 'Fjallraven Backpack',
    price: 109.95,
    rating: 3.9,
    reviews: 120,
    image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
  },
  {
    id: 2,
    name: "Men's Casual T-Shirt",
    price: 22.3,
    rating: 4.1,
    reviews: 259,
    image: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
  },
  /* …dst… */
];

function showToast(msg: string) {
  if (Platform.OS === 'android') {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  } else {
    Alert.alert('', msg);
  }
}

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Banner */}
      <LinearGradient
        colors={['#4c6ef5', '#5c7cfa']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.banner}
      >
        <View>
          <Text style={styles.bannerTitle}>Summer Sale!</Text>
          <Text style={styles.bannerSub}>Up to 50% off selected items.</Text>
        </View>
        <TouchableOpacity
          style={styles.bannerBtn}
          onPress={() => showToast('Shop Now diklik!')}
        >
          <Text style={styles.bannerBtnText}>Shop Now</Text>
        </TouchableOpacity>
      </LinearGradient>

      {/* Section Title */}
      <Text style={styles.sectionTitle}>All Products</Text>

      {/* Grid Produk */}
      <View style={styles.grid}>
        {PRODUCTS.map((item) => (
          <CardProduct item={item} key={item.id} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f2f2f2',
  },
  banner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  bannerTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  bannerSub: { color: '#fff', marginTop: 4 },
  bannerBtn: {
    display: 'flex', 
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  bannerBtnText: { color: '#4c6ef5', fontWeight: 'bold' },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});