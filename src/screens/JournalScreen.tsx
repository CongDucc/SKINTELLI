import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const { width } = Dimensions.get('window');

interface JournalScreenProps {
  onNavigate?: (screen: string) => void;
}

export default function JournalScreen({ onNavigate }: JournalScreenProps) {
  const [images, setImages] = useState<string[]>([]);
  const MAX_IMAGES = 7;

  const pickImage = async () => {
    if (images.length >= MAX_IMAGES) {
      Alert.alert(
        'Giới hạn ảnh',
        `Bạn chỉ có thể lưu trữ tối đa ${MAX_IMAGES} ảnh`,
        [{ text: 'OK' }]
      );
      return;
    }

    // Request permission
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert('Cần quyền truy cập', 'Vui lòng cho phép truy cập thư viện ảnh');
      return;
    }

    // Pick image
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setImages([...images, result.assets[0].uri]);
    }
  };

  const removeImage = (index: number) => {
    Alert.alert(
      'Xóa ảnh',
      'Bạn có chắc muốn xóa ảnh này?',
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Xóa',
          style: 'destructive',
          onPress: () => {
            const newImages = images.filter((_, i) => i !== index);
            setImages(newImages);
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => onNavigate?.('home')}>
          <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nhật ký</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Title Section */}
        <View style={styles.section}>
          <Text style={styles.mainTitle}>Nhật ký ảnh hằng ngày</Text>
          <Text style={styles.description}>
            Tải lên ảnh mặt của bạn để theo dõi tình trạng da của bạn
          </Text>
        </View>

        {/* Face Image Placeholder */}
        <View style={styles.faceImageContainer}>
          {images.length > 0 ? (
            <Image
              source={{ uri: images[0] }}
              style={styles.faceImage}
              resizeMode="cover"
            />
          ) : (
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1614289371518-722f2615943d?w=400&h=400&fit=crop' }}
              style={styles.faceImage}
              resizeMode="cover"
            />
          )}
        </View>

        {/* Image Gallery */}
        {images.length > 0 && (
          <View style={styles.gallerySection}>
            <Text style={styles.galleryTitle}>
              Ảnh đã lưu ({images.length}/{MAX_IMAGES})
            </Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.gallery}
            >
              {images.map((uri, index) => (
                <View key={index} style={styles.galleryItemContainer}>
                  <Image
                    source={{ uri }}
                    style={styles.galleryImage}
                    resizeMode="cover"
                  />
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => removeImage(index)}
                  >
                    <Ionicons name="close-circle" size={24} color="#FF4444" />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Upload Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[
              styles.uploadButton,
              images.length >= MAX_IMAGES && styles.uploadButtonDisabled
            ]}
            onPress={pickImage}
            disabled={images.length >= MAX_IMAGES}
          >
            <Ionicons 
              name="camera-outline" 
              size={20} 
              color={images.length >= MAX_IMAGES ? "#999" : "#FFF"} 
            />
            <Text style={[
              styles.uploadButtonText,
              images.length >= MAX_IMAGES && styles.uploadButtonTextDisabled
            ]}>
              {images.length >= MAX_IMAGES 
                ? `Đã đạt giới hạn ${MAX_IMAGES} ảnh`
                : 'So sánh 7 ngày qua'
              }
            </Text>
          </TouchableOpacity>
        </View>

        {/* Info Text */}
        <Text style={styles.infoText}>
          Lưu trữ tối đa {MAX_IMAGES} ảnh để theo dõi sự thay đổi của làn da trong 7 ngày
        </Text>
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
        
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="calendar" size={24} color="#6B4EFF" />
          <Text style={styles.navLabel}>Nhật ký</Text>
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
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
  },
  mainTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#6B6B6B',
    lineHeight: 20,
  },
  faceImageContainer: {
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#FFF5F8',
    aspectRatio: 0.75,
  },
  faceImage: {
    width: '100%',
    height: '100%',
  },
  gallerySection: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  galleryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  gallery: {
    paddingRight: 16,
  },
  galleryItemContainer: {
    position: 'relative',
    marginRight: 12,
  },
  galleryImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
  },
  deleteButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  uploadButton: {
    backgroundColor: '#FFB6D9',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 24,
    gap: 8,
  },
  uploadButtonDisabled: {
    backgroundColor: '#E0E0E0',
  },
  uploadButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  uploadButtonTextDisabled: {
    color: '#999999',
  },
  infoText: {
    fontSize: 13,
    color: '#999999',
    textAlign: 'center',
    paddingHorizontal: 32,
    marginBottom: 24,
    lineHeight: 18,
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
