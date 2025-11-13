import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRoutine } from '../context/RoutineContext';

interface Product {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  description: string;
  image: any;
  category: string;
}

interface StoreScreenProps {
  onNavigate?: (screen: string) => void;
}

export default function StoreScreen({ onNavigate }: StoreScreenProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const { addToMorningRoutine, addToEveningRoutine } = useRoutine();

  const handleAddToRoutine = (product: Product) => {
    Alert.alert(
      'Thêm vào quy trình',
      `Bạn muốn thêm "${product.name}" vào quy trình nào?`,
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Buổi Sáng',
          onPress: () => {
            const hour = 7 + Math.floor(Math.random() * 2);
            const minute = Math.floor(Math.random() * 6) * 10;
            addToMorningRoutine({
              name: product.name,
              time: `${hour}:${minute.toString().padStart(2, '0')} AM`,
              image: product.image,
            });
            Alert.alert('Thành công', `Đã thêm "${product.name}" vào quy trình buổi sáng`);
          },
        },
        {
          text: 'Buổi Tối',
          onPress: () => {
            const hour = 9;
            const minute = Math.floor(Math.random() * 6) * 10;
            addToEveningRoutine({
              name: product.name,
              time: `${hour}:${minute.toString().padStart(2, '0')} PM`,
              image: product.image,
            });
            Alert.alert('Thành công', `Đã thêm "${product.name}" vào quy trình buổi tối`);
          },
        },
      ]
    );
  };

  const categories = [
    { id: 'all', name: 'Tất cả' },
    { id: 'cleanser', name: 'Sữa rửa mặt' },
    { id: 'serum', name: 'Serum' },
    { id: 'moisturizer', name: 'Kem dưỡng' },
  ];

  const products: Product[] = [
    {
      id: '1',
      name: 'Sữa Rửa Mặt Tạo Bọt Dịu Nhẹ',
      rating: 4.5,
      reviews: 120,
      description: 'Sữa rửa mặt tạo nhẹ giúp loại bỏ tạp chất nhưu nhiễm mà không làm mất đi lớp dầu tự nhiên của da',
      image: require('../../assets/products/SVR.jpg'),
      category: 'cleanser',
    },
    {
      id: '2',
      name: 'Serum Dưỡng Ẩm',
      rating: 4.7,
      reviews: 150,
      description: 'Serum nhẹ nhàng cung cấp độ ẩm sâu vào da giúp cân bằng sản xuất',
      image: require('../../assets/products/serum dưỡng ẫm balance HA.jpg'),
      category: 'serum',
    },
    {
      id: '3',
      name: 'Kem Dưỡng Ẩm Không Dầu',
      rating: 4.6,
      reviews: 130,
      description: 'Kem dưỡng ẩm nhẹ không dầu giúp dưỡng ẩm cho da mà không gây tắc lỗ chân lông',
      image: require('../../assets/products/kem dưỡng obagi.jpg'),
      category: 'moisturizer',
    },
    {
      id: '4',
      name: 'BHA Obagi 2%',
      rating: 4.8,
      reviews: 200,
      description: 'Tinh chất BHA giúp tẩy tế bào chết, làm sạch sâu lỗ chân lông và giảm mụn',
      image: require('../../assets/products/BHA.jpg'),
      category: 'serum',
    },
    {
      id: '5',
      name: 'Tinh Chất Paula Choices',
      rating: 4.7,
      reviews: 180,
      description: 'Tinh chất chống lão hóa giúp cải thiện kết cấu da và giảm nếp nhăn',
      image: require('../../assets/products/tinh chất paula choices.jpg'),
      category: 'serum',
    },
    {
      id: '6',
      name: 'Kem Chống Nắng Paula Choices',
      rating: 4.9,
      reviews: 250,
      description: 'Kem chống nắng SPF 50 bảo vệ da khỏi tia UV, không gây bóng nhờn',
      image: require('../../assets/products/kem chống nắng paula choices.jpg'),
      category: 'moisturizer',
    },
    {
      id: '7',
      name: 'Kem Dưỡng Obagi CLENZIderm',
      rating: 4.8,
      reviews: 165,
      description: 'Kem dưỡng ẩm điều trị với Glycerin 20% giúp phục hồi và bảo vệ hàng rào da',
      image: require('../../assets/products/kem dưỡng mềm da.jpg'),
      category: 'moisturizer',
    },
    {
      id: '8',
      name: 'BHA Paula Choices 2% Liquid',
      rating: 4.9,
      reviews: 320,
      description: 'Tinh chất tẩy tế bào chết BHA 2% giúp làm sạch lỗ chân lông và cải thiện kết cấu da',
      image: require('../../assets/products/BHA Paula choices.jpg'),
      category: 'serum',
    },
    {
      id: '9',
      name: 'La Roche-Posay Effaclar H',
      rating: 4.7,
      reviews: 210,
      description: 'Kem dưỡng ẩm phục hồi cho da mụn đang điều trị, giảm kích ứng và làm dịu da',
      image: require('../../assets/products/kem dưỡng giảm mụn.jpg'),
      category: 'moisturizer',
    },
    {
      id: '10',
      name: 'SVR Sebiaclear Gel Moussant',
      rating: 4.6,
      reviews: 185,
      description: 'Sữa rửa mặt dành cho da mụn và nhạy cảm, làm sạch nhẹ nhàng không làm khô da',
      image: require('../../assets/products/sữa rửa mặt cho da mụn, nhạy cảm.jpg'),
      category: 'cleanser',
    },
  ];

  // Filter products based on active category
  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => onNavigate?.('home')}>
          <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sản Phẩm</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Category Tabs */}
      <View style={styles.categoryContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryContent}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryTab,
                activeCategory === category.id && styles.activeCategoryTab,
              ]}
              onPress={() => setActiveCategory(category.id)}
            >
              <Text
                style={[
                  styles.categoryText,
                  activeCategory === category.id && styles.activeCategoryText,
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Products List */}
      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.productsContainer}
      >
        {filteredProducts.map((product) => (
          <View key={product.id} style={styles.productCard}>
            <View style={styles.productInfo}>
              {/* Rating */}
              <View style={styles.ratingRow}>
                <Ionicons name="star" size={14} color="#FFB800" />
                <Text style={styles.ratingText}>
                  {product.rating} • {product.reviews} đánh giá
                </Text>
              </View>

              {/* Product Name */}
              <Text style={styles.productName}>{product.name}</Text>

              {/* Description */}
              <Text style={styles.productDescription} numberOfLines={3}>
                {product.description}
              </Text>

              {/* Add to Routine Button */}
              <TouchableOpacity 
                style={styles.addButton}
                onPress={() => handleAddToRoutine(product)}
              >
                <Text style={styles.addButtonText}>Thêm vào quy trình</Text>
              </TouchableOpacity>
            </View>

            {/* Product Image */}
            <View style={styles.productImageContainer}>
              <Image
                source={typeof product.image === 'string' ? { uri: product.image } : product.image}
                style={styles.productImage}
                resizeMode="contain"
              />
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => onNavigate?.('home')}>
          <Ionicons name="home-outline" size={24} color="#6B6B6B" />
          <Text style={styles.navLabelInactive}>Dashboard</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem} onPress={() => onNavigate?.('routine')}>
          <Ionicons name="list-outline" size={24} color="#6B6B6B" />
          <Text style={styles.navLabelInactive}>Quy Trình</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem} onPress={() => onNavigate?.('journal')}>
          <Ionicons name="calendar-outline" size={24} color="#6B6B6B" />
          <Text style={styles.navLabelInactive}>Nhật ký</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="storefront" size={24} color="#6B4EFF" />
          <Text style={styles.navLabel}>Sản Phẩm</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem} onPress={() => onNavigate?.('profile')}>
          <Ionicons name="person-outline" size={24} color="#6B6B6B" />
          <Text style={styles.navLabelInactive}>Hồ Sơ</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  categoryContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    paddingVertical: 12,
  },
  categoryContent: {
    paddingHorizontal: 16,
  },
  categoryTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    marginRight: 8,
  },
  activeCategoryTab: {
    backgroundColor: '#6B4EFF',
  },
  categoryText: {
    fontSize: 14,
    color: '#6B6B6B',
    fontWeight: '500',
  },
  activeCategoryText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  productsContainer: {
    paddingVertical: 16,
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF9F0',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  productInfo: {
    flex: 1,
    marginRight: 12,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 12,
    color: '#6B6B6B',
    marginLeft: 4,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  productDescription: {
    fontSize: 13,
    color: '#6B6B6B',
    lineHeight: 18,
    marginBottom: 12,
  },
  addButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  addButtonText: {
    fontSize: 13,
    color: '#1A1A1A',
    fontWeight: '500',
  },
  productImageContainer: {
    width: 100,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    backgroundColor: '#FFFFFF',
  },
  navItem: {
    alignItems: 'center',
  },
  navLabel: {
    fontSize: 11,
    color: '#6B4EFF',
    marginTop: 4,
    fontWeight: '600',
  },
  navLabelInactive: {
    fontSize: 11,
    color: '#6B6B6B',
    marginTop: 4,
  },
});
