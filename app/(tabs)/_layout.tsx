import { useFonts } from "expo-font";
import { router, Tabs } from "expo-router";
import { Text, TouchableOpacity, ViewStyle } from "react-native";

import CategoryIconSvg from "../../assets/images/ic-category.svg";
import CartIconSvg from "../../assets/images/ic_cart.svg";
import HomeIconSvg from "../../assets/images/ic_home.svg";
import ProfileIconSvg from "../../assets/images/ic_profile.svg";

interface IconProps {
  color: string;
  size?: number;
  onPress?: () => void;
  style?: ViewStyle;
}

const HomeIcon = ({ color, size }: { color: string; size?: number }) => (
  <HomeIconSvg width={size || 28} height={size || 28} fill={color} />
);

const CartIcon = ({ color, size, onPress, style }: IconProps) => {
  const IconComponent = (
    <CartIconSvg
      width={size || 28}
      height={size || 28}
      fill={color}
      color={color}
    />
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} style={style}>
        {IconComponent}
      </TouchableOpacity>
    );
  }

  return IconComponent;
};

const CategoryIcon = ({ color, size }: { color: string; size?: number }) => (
  <CategoryIconSvg width={size || 28} height={size || 28} fill={color} />
);

const ProfileIcon = ({ color, size }: { color: string; size?: number }) => (
  <ProfileIconSvg width={size || 28} height={size || 28} fill={color} />
);

export default function TabLayout() {

  const [fontsLoaded] = useFonts({
    Poppins_Regular: require("../../assets/fonts/poppins_regular.ttf"),
    Poppins_Bold: require("../../assets/fonts/poppins_bold.ttf"),
  });

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#1E88E5",
        tabBarInactiveTintColor: "black",
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "Awesome Store",
          tabBarLabel: ({ focused, color }) => (
            <Text
              style={{
                fontFamily: fontsLoaded
                  ? focused
                    ? "Poppins_Bold"
                    : "Poppins_Regular"
                  : "System",
                fontSize: 12,
                color: color,
              }}
            >
              Home
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <HomeIcon color={color} size={size} />
          ),
          headerRight: () => (
            <CartIcon
              color="#000"
              size={24}
              onPress={() => {
                router.push("/cart");
              }}
              style={{ marginRight: 24 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          title: "Categories",
          tabBarLabel: ({ focused, color }) => (
            <Text
              style={{
                fontFamily: fontsLoaded
                  ? focused
                    ? "Poppins_Bold"
                    : "Poppins_Regular"
                  : "System",
                fontSize: 12,
                color: color,
              }}
            >
              Categories
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <CategoryIcon color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          headerTitle: "Shopping Cart",
          tabBarLabel: ({ focused, color }) => (
            <Text
              style={{
                fontFamily: fontsLoaded
                  ? focused
                    ? "Poppins_Bold"
                    : "Poppins_Regular"
                  : "System",
                fontSize: 12,
                color: color,
              }}
            >
              Cart
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <CartIcon color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarLabel: ({ focused, color }) => (
            <Text
              style={{
                fontFamily: fontsLoaded
                  ? focused
                    ? "Poppins_Bold"
                    : "Poppins_Regular"
                  : "System",
                fontSize: 12,
                color: color,
              }}
            >
              Profile
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <ProfileIcon color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
