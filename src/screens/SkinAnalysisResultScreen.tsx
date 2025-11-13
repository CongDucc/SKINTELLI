import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface Product {
  id: string;
  name: string;
  price: string;
  image: any; // Changed to 'any' for require() compatibility
}

interface SkinAnalysisResultProps {
  skinType?: string;
  onContinue?: () => void;
  onNavigate?: (screen: string) => void;
}

export default function SkinAnalysisResultScreen({ 
  skinType = 'Da Dầu - Dễ Nổi Mụn',
  onContinue,
  onNavigate 
}: SkinAnalysisResultProps) {
  const products: Product[] = [
    {
      id: '1',
      name: 'Sữa rửa mặt SVR Sebiaclear',
      price: '250,000 VNĐ',
      image: require('../../assets/products/SVR.jpg'),
    },
    {
      id: '2',
      name: 'BHA OBAGI',
      price: '300,000 VNĐ',
      image: require('../../assets/products/BHA.jpg'),
    },
    
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Phân tích Da</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Skin Type Card */}
        <View style={styles.skinTypeCard}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400&h=300&fit=crop' }}
            style={styles.skinTypeImage}
            resizeMode="cover"
          />
          <View style={styles.skinTypeOverlay}>
            <Text style={styles.skinTypeTitle}>{skinType}</Text>
            <Text style={styles.skinTypeDescription}>
              Loại da của bạn có đặc điểm là sản xuất dầu thừa, dễ bắt nắng. Cần có AM & PM
            </Text>
          </View>
        </View>

        {/* Morning Routine */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quy Trình Cá Nhân Hóa Của Bạn</Text>
          
          <View style={styles.routineCard}>
            <View style={styles.routineHeader}>
              <Ionicons name="sunny-outline" size={24} color="#FFA500" />
              <Text style={styles.routineTitle}>Quy Trình Buổi Sáng</Text>
            </View>
            <Text style={styles.routineDescription}>
              Sữa rửa mặt SVR Sebiaclear, Điều Trị BHA OBAGI
            </Text>
          </View>

          {/* Evening Routine */}
          <View style={styles.routineCard}>
            <View style={styles.routineHeader}>
              <Ionicons name="moon-outline" size={24} color="#6B4EFF" />
              <Text style={styles.routineTitle}>Quy Trình Buổi Tối</Text>
            </View>
            <Text style={styles.routineDescription}>
              Tẩy Trang, Sữa Rửa Mặt Dịu Nhẹ, Điều Trị Retinol, Kem Dưỡng Ẩm Tái Tạo Trong Đêm
            </Text>
          </View>
        </View>

        {/* Recommended Products */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sản Phẩm Được Đề Xuất</Text>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.productsContainer}
          >
            {products.map((product) => (
              <View key={product.id} style={styles.productCard}>
                <View style={styles.productImageContainer}>
                  <Image
                    source={typeof product.image === 'string' ? { uri: product.image } : product.image}
                    style={styles.productImage}
                    resizeMode="contain"
                  />
                </View>
                <Text style={styles.productName} numberOfLines={2}>
                  {product.name}
                </Text>
                <Text style={styles.productPrice}>{product.price}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={onContinue}>
          <Ionicons name="home" size={24} color="#6B4EFF" />
          <Text style={styles.navLabel}>Dashboard</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem} onPress={() => onNavigate?.('routine')}>
          <Ionicons name="list-outline" size={24} color="#6B6B6B" />
          <Text style={styles.navLabelInactive}>Quy Trình</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem} onPress={() => onNavigate?.('journal')}>
          <Ionicons name="calendar-outline" size={24} color="#6B6B6B" />
          <Text style={styles.navLabelInactive}>Nhật ký</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem} onPress={() => onNavigate?.('store')}>
          <Ionicons name="storefront-outline" size={24} color="#6B6B6B" />
          <Text style={styles.navLabelInactive}>Sản Phẩm</Text>
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
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  skinTypeCard: {
    margin: 16,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#F8F9FE',
  },
  skinTypeImage: {
    width: '100%',
    height: 200,
  },
  skinTypeOverlay: {
    padding: 20,
    backgroundColor: '#FFF5F8',
  },
  skinTypeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  skinTypeDescription: {
    fontSize: 14,
    color: '#6B6B6B',
    lineHeight: 20,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  routineCard: {
    backgroundColor: '#F8F9FE',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  routineHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  routineTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginLeft: 8,
  },
  routineDescription: {
    fontSize: 14,
    color: '#6B6B6B',
    lineHeight: 20,
  },
  productsContainer: {
    paddingRight: 16,
  },
  productCard: {
    width: 140,
    marginRight: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  productImageContainer: {
    width: '100%',
    height: 120,
    backgroundColor: '#F8F9FE',
    borderRadius: 8,
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    width: '80%',
    height: '80%',
  },
  productName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
    height: 36,
  },
  productPrice: {
    fontSize: 12,
    color: '#6B4EFF',
    fontWeight: '600',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
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
