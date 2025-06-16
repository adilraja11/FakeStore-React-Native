import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

export default function ProductDetail() {
    const { id } = useLocalSearchParams();
  return (
    <View>
        <Text>Detail Produk</Text>
        <Text>ID Produk: {id}</Text>
    </View>
  )
}

export const screenOptions = {
  title: 'Product Detail',
};

