import { Stack } from "expo-router";
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{headerShown: false}} />
        <Stack.Screen name="product" options={{headerShown: true, headerTitle: 'Product Details', headerBackTitle: 'Back', presentation: 'card'}} />
      </Stack>
      <StatusBar barStyle={"light-content"} />
    </>
  );
}
