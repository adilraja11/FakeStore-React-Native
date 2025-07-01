import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { StatusBar } from "react-native";
import { CartProvider } from "./context/CartContext";

export default function RootLayout() {
  return (
    <CartProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{headerShown: false}} />
        <Stack.Screen name="product" 
          options={{
            headerShown: true, 
            headerTitle: 'Product Details', 
            headerBackTitle: 'Back', 
            presentation: 'card',
            headerRight: () => (
              <Ionicons
                name="cart-outline"
                size={24}
                color='#000'
                onPress={() => {router.push('/cart')}}
              />
            )
          }} 
        />
      </Stack>
      <StatusBar barStyle={"light-content"} />
    </CartProvider>
  );
}
