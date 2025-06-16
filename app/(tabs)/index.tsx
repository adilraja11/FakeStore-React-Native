// app/(tabs)/index.tsx

import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
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

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number
  }
}

function showToast(msg: string) {
  if (Platform.OS === 'android') {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  } else {
    Alert.alert('', msg);
  }
}

export default function HomeScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log('Failed to fetch products: ', error)
        showToast('Failed to load products');
        setLoading(false);
      })
  }, []);

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
      {loading ? (
        <ActivityIndicator size={'large'} color={'#4c6ef5'} />
      ) : (
        <View style={styles.grid}>
          {products.map((item) => (
            <CardProduct
              id={item.id}
              image={item.image}
              title={item.title}
              price={item.price}
              rating={item.rating}
              key={item.id}
            />
          ))}
        </View>
      )}
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