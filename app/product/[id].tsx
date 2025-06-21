import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ProductDetail {
  id: number,
  title: string,
  price: number,
  description: string,
  category: string,
  image: string;
}

export default function ProductDetail() {
    const { id, rate, count } = useLocalSearchParams();
    const [productDetail, setProductDetail] = useState<ProductDetail>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      fetch(`https://fakestoreapi.com/products/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setProductDetail(data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error)
          setLoading(false);
        })
    }, []);

    // Function untuk render stars berdasarkan rating
    const renderStars = (rating: number) => {
      const stars = [];
      const fullStars = Math.floor(rating);
      const hasHalfStar = rating % 1 !== 0;
      
      // Render full stars
      for (let i = 0; i < fullStars; i++) {
          stars.push(
              <Ionicons key={i} name="star" size={16} color="#FFD700" />
          );
      }
      
      // Render half star if needed
      if (hasHalfStar) {
          stars.push(
              <Ionicons key="half" name="star-half" size={16} color="#FFD700" />
          );
      }
      
      // Render empty stars to complete 5 stars
      const remainingStars = 5 - Math.ceil(rating);
      for (let i = 0; i < remainingStars; i++) {
          stars.push(
              <Ionicons key={`empty-${i}`} name="star-outline" size={16} color="#FFD700" />
          );
      }
      
      return stars;
    };

    // Function untuk menentukan warna badge berdasarkan category
    const getCategoryBadgeStyle = (category: string) => {
      switch (category) {
        case "men's clothing":
          return { backgroundColor: '#DBEAFE', color: '#1D4ED8' }; // Light Blue bg, Dark Blue text
        case 'jewelery':
            return { backgroundColor: '#FEF3C7', color: '#D97706' }; // Light Orange bg, Dark Orange text
        case 'electronics':
            return { backgroundColor: '#DCFCE7', color: '#16A34A' }; // Light Indigo bg, Dark Indigo text
        case "women's clothing":
            return { backgroundColor: '#FCE7F3', color: '#BE185D' }; // Light Pink bg, Dark Pink text
        default:
            return { backgroundColor: '#F3F4F6', color: '#374151' }; // Light Gray bg, Dark Gray text
        }
    };

    // Function untuk format category text
    const formatCategoryText = (category: string) => {
        return category.charAt(0).toUpperCase() + category.slice(1);
    };

  return (
    <ScrollView>
        {loading ? (
          <ActivityIndicator size={'large'} color={'#4c6ef5'} />
        ) : (
          <View>
            <Image
              source={{ uri: productDetail?.image }}
              style={styles.detailImg}
              resizeMode='contain'
            />
            <View style={styles.container}>
              {/* Category Badge */}
              <View style={[
                styles.categoryBadge, 
                getCategoryBadgeStyle(productDetail?.category || '')
              ]}>
                <Text style={[
                  styles.categoryText,
                  { color: getCategoryBadgeStyle(productDetail?.category || '').color }
                ]}>
                  {formatCategoryText(productDetail?.category || '')}
                </Text>
              </View>
              <Text style={styles.detailTitle}>{productDetail?.title}</Text>
              
              {/* Star Rating */}
              <View style={styles.ratingContainer}>
                <View style={styles.starsContainer}>
                  {renderStars(parseFloat(rate as string) || 0)}
                </View>
                <Text style={styles.ratingText}>
                  {rate} ({count} Reviews)
                </Text>
              </View>

              <Text style={styles.detailPrice}>${productDetail?.price}</Text>

              <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 12 }}>Description</Text>
              <Text style={{ color: '#666', fontSize: 16 }}>{productDetail?.description}</Text>
            </View>

            <TouchableOpacity style={styles.addToCartBtn}>
              <Text style={styles.addToCartBtnText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 8
  },

  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize'
  },

  detailImg: {
    width: '100%',
    height: 250
  },

  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    padding: 16,
    backgroundColor: '#fff'
  },

  detailTitle: { fontSize: 24, fontWeight: 'semibold' },

  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },

  starsContainer: {
    flexDirection: 'row',
    marginRight: 8
  },

  ratingText: {
    fontSize: 14,
    color: '#6b7280'
  },

  detailPrice: {
    fontSize: 32,
    fontWeight: 'bold'
  },

  addToCartBtn: {
    marginVertical: 20,
    marginHorizontal: 16,
    display: 'flex', 
    justifyContent: 'center',
    backgroundColor: '#4c6ef5',
    paddingVertical: 16,
    paddingHorizontal: 14,
    borderRadius: 8,
  },

  addToCartBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold', textAlign: 'center' },
})


