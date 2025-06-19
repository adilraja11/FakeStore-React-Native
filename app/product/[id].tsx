import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

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

  return (
    <View>
        {loading ? (
          <ActivityIndicator size={'large'} color={'#4c6ef5'} />
        ) : (
          <>
            <Text>ID Produk: {id}</Text>
            <Text>Product Name: {productDetail?.title}</Text>
            <Text>Rate: {rate}</Text>
            <Text>Count Name: {count}</Text>
          </>
        )}
    </View>
  )
}


