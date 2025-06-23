import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

interface CartItem {
  id: number;
  title: string;
  category: string;
  price: number;
  image: string;
  quantity: number;
}

export default function CartScreen() {
  // Sample cart data - nanti bisa diganti dengan data dari state management
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      title: "Fjallraven Backpack",
      category: "Electronics",
      price: 109.95,
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      quantity: 1
    },
    {
      id: 2,
      title: "Men's Casual T-Shirt",
      category: "Men's Clothing",
      price: 22.30,
      image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
      quantity: 2
    }
  ]);

  // Function untuk menentukan warna badge berdasarkan category
  const getCategoryBadgeStyle = (category: string) => {
    switch (category.toLowerCase()) {
      case "men's clothing":
        return { backgroundColor: '#DBEAFE', color: '#1D4ED8' };
      case 'jewelery':
        return { backgroundColor: '#FEF3C7', color: '#D97706' };
      case 'electronics':
        return { backgroundColor: '#DCFCE7', color: '#16A34A' };
      case "women's clothing":
        return { backgroundColor: '#FCE7F3', color: '#BE185D' };
      default:
        return { backgroundColor: '#F3F4F6', color: '#374151' };
    }
  };

  // Function untuk update quantity
  const updateQuantity = (id: number, change: number) => {
    setCartItems(prevItems =>
      prevItems.map(item => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  // Function untuk remove item
  const removeItem = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  // Calculate subtotal
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {cartItems.map((item) => (
          <View key={item.id} style={styles.cartItem}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            
            <View style={styles.itemDetails}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              
              <Text style={{
                marginBottom: 12,
                color: '#666'
              }}>{item.category}</Text>
              
              <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
            </View>

            <View style={styles.itemActions}>
              {/* Quantity Controls */}
              <View style={styles.quantityContainer}>
                <TouchableOpacity 
                  style={styles.quantityButton}
                  onPress={() => updateQuantity(item.id, -1)}
                >
                  <Ionicons name="remove" size={18} color="#6B7280" />
                </TouchableOpacity>
                
                <Text style={styles.quantityText}>{item.quantity}</Text>
                
                <TouchableOpacity 
                  style={styles.quantityButton}
                  onPress={() => updateQuantity(item.id, 1)}
                >
                  <Ionicons name="add" size={18} color="#6B7280" />
                </TouchableOpacity>
              </View>

              {/* Remove Button */}
              <TouchableOpacity 
                style={styles.removeButton}
                onPress={() => removeItem(item.id)}
              >
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <View style={styles.subtotalContainer}>
          <Text style={styles.subtotalLabel}>
            Subtotal ({totalItems} items):
          </Text>
          <Text style={styles.subtotalAmount}>
            ${subtotal.toFixed(2)}
          </Text>
        </View>

        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },

  backButton: {
    padding: 4,
  },

  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    textAlign: 'center',
    marginLeft: -32, // Compensate for back button width
  },

  headerSpacer: {
    width: 32,
  },

  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },

  cartItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginTop: 16,
    padding: 16,
    borderRadius: 12,
    boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
    elevation: 2, // Keep elevation for Android
  },

  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
  },

  itemDetails: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },

  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },

  itemPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },

  itemActions: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  quantityContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 4,
    marginBottom: 8,
  },

  quantityButton: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
  },

  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginHorizontal: 16,
    minWidth: 20,
    textAlign: 'center',
  },

  removeButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },

  removeButtonText: {
    fontSize: 14,
    color: '#EF4444',
    fontWeight: '500',
  },

  bottomSection: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },

  subtotalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },

  subtotalLabel: {
    fontSize: 16,
    color: '#6B7280',
  },

  subtotalAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },

  checkoutButton: {
    backgroundColor: '#10B981',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    boxShadow: '0px 4px 8px rgba(16, 185, 129, 0.2)',
    elevation: 4, // Keep elevation for Android
  },

  checkoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});