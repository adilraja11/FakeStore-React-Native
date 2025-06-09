import { Ionicons } from '@expo/vector-icons';
import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export interface CardProductProps {
    item: {
        id: number;
        image: string;
        name: string;
        price: number;
        rating: number;
        reviews: number;
    };
}

export default function CardProduct({ item }: CardProductProps) {
  return (
    <>
        <View key={item.id} style={styles.card}>
            <Image
                source={{ uri: item.image }}
                style={styles.cardImg}
                resizeMode="cover"
            />
            <Text style={styles.cardName} numberOfLines={1}>
                {item.name}
            </Text>
            <Text style={styles.cardPrice}>${item.price.toFixed(2)}</Text>
            <View style={styles.cardRating}>
                <Ionicons name="star" size={12} color="#FFD700" />
                <Text style={styles.cardRatingText}>
                {item.rating} ({item.reviews})
                </Text>
            </View>
            </View>
    </>
  )
}

const styles = StyleSheet.create({
    card: {
        width: '48%',           // dua kartu per baris
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 16,
        padding: 12,
    
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
