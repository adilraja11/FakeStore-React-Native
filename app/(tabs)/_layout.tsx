import { Ionicons } from '@expo/vector-icons';
import { router, Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'blue',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: 'Awesome Store',
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="home-outline" color={color} />,
          headerRight: () => (
            <Ionicons 
              name='cart-outline'
              size={24}
              color='#000'
              style={{ marginRight: 24 }}
              onPress={() => {router.push('/cart')}}
            />
          )
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          title: 'Categories',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="grid-outline" color={color} />
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          headerTitle: 'Shopping Cart',
          tabBarLabel: 'Cart',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="cart-outline" color={color} />
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="person-circle-outline" color={color} />
        }}
      />
    </Tabs>
  );
}
