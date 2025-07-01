import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export interface CardProductProps {
  id: number;
  title: string;
  price: number;
  image: string;
  rating: {
    rate: number;
    count: number
  }
}

export default function CardProduct({
  id,
  title,
  price,
  image,
  rating,
}: CardProductProps) {
  const router = useRouter();

  return (
    <TouchableOpacity 
      onPress={() => router.push({
        pathname: '/product/[id]',
        params: {
          id: id.toString(),
          rate: rating.rate,
          count: rating.count
        }
      })} style={styles.card}>
        <View>
          <Image
            source={{ uri: image }}
            style={styles.cardImg}
            resizeMode="cover"
          />
        </View>
      <View style={{ padding: 12 }}>
        <Text style={styles.cardName} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.cardPrice}>${price.toFixed(2)}</Text>
        <View style={styles.cardRating}>
          <Ionicons name="star" size={12} color="#FFD700" />
          <Text style={styles.cardRatingText}>
            {rating.rate} ({rating.count})
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    card: {
        width: '48%',           // dua kartu per baris
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 16,
    
        // shadow (iOS)
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        // elevation (Android)
        elevation: 2,
      },
      cardImg: {
        width: '100%',
        height: 120,
        borderRadius: 8,
        marginBottom: 8,
      },
      cardName: { fontSize: 14, fontWeight: '600', color: '#333' },
      cardPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 4,
      },
      cardRating: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      cardRatingText: {
        marginLeft: 4,
        fontSize: 12,
        color: '#666',
      },
})
