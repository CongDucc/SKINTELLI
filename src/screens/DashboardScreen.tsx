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

interface DashboardScreenProps {
  onNavigate?: (screen: string) => void;
}

export default function DashboardScreen({ onNavigate }: DashboardScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dashboard</Text>
        <TouchableOpacity>
          <Ionicons name="settings-outline" size={24} color="#1A1A1A" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Bảng điều khiển */}
        <View style={styles.controlPanel}>
          <Text style={styles.controlTitle}>Bảng điều khiển</Text>
        </View>

        {/* Kiểm tra da hôm nay */}
        <View style={styles.skinCheckCard}>
          <Text style={styles.sectionTitle}>Kiểm tra da hôm nay</Text>
          
          <View style={styles.faceImageContainer}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop' }}
              style={styles.faceImage}
              resizeMode="cover"
            />
          </View>

          <Text style={styles.questionText}>Da của bạn hôm nay thế nào?</Text>
          <Text style={styles.descriptionText}>
            Nhấn để ghi lại tình trạng da và bắt ký với chủ nào.
          </Text>
          
          <TouchableOpacity style={styles.startButton}>
            <Text style={styles.startButtonText}>Bắt đầu</Text>
          </TouchableOpacity>
        </View>

        {/* Tổng quan hằng ngày */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tổng quan hằng ngày</Text>

          {/* Lịch trình chăm sóc da */}
          <TouchableOpacity style={styles.dailyItem}>
            <View style={styles.dailyItemLeft}>
              <Text style={styles.dailyItemTitle}>Lịch trình chăm sóc da</Text>
              <Text style={styles.dailyItemSubtitle}>Sáng & Tối</Text>
            </View>
            <View style={styles.dailyItemImage}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=100&h=100&fit=crop' }}
                style={styles.itemImage}
                resizeMode="cover"
              />
            </View>
          </TouchableOpacity>

          {/* Ghi chú hằng ngày */}
          <TouchableOpacity style={styles.dailyItem}>
            <View style={styles.dailyItemLeft}>
              <Text style={styles.dailyItemTitle}>Ghi chú hằng ngày</Text>
              <Text style={styles.dailyItemSubtitle}>Suy ngẫm và hành trình của da bạn</Text>
            </View>
            <View style={styles.dailyItemImage}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=100&h=100&fit=crop' }}
                style={styles.itemImage}
                resizeMode="cover"
              />
            </View>
          </TouchableOpacity>

          {/* Lời nhắc */}
          <TouchableOpacity style={styles.dailyItem}>
            <View style={styles.dailyItemLeft}>
              <Text style={styles.dailyItemTitle}>Lời nhắc</Text>
              <Text style={styles.dailyItemSubtitle}>Luôn theo dõi quy trình của bạn</Text>
            </View>
            <View style={styles.dailyItemImage}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=100&h=100&fit=crop' }}
                style={styles.itemImage}
                resizeMode="cover"
              />
            </View>
          </TouchableOpacity>

          {/* Cộng đồng */}
          <TouchableOpacity style={styles.dailyItem} onPress={() => onNavigate?.('community')}>
            <View style={styles.dailyItemLeft}>
              <Text style={styles.dailyItemTitle}>Cộng đồng</Text>
              <Text style={styles.dailyItemSubtitle}>Chia sẻ và học hỏi từ người khác</Text>
            </View>
            <View style={styles.dailyItemImage}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=100&h=100&fit=crop' }}
                style={styles.itemImage}
                resizeMode="cover"
              />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
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
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  content: {
    flex: 1,
  },
  controlPanel: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  controlTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  skinCheckCard: {
    backgroundColor: '#FFF5F8',
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  faceImageContainer: {
    width: width - 112,
    height: width - 112,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  faceImage: {
    width: '100%',
    height: '100%',
  },
  questionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
    textAlign: 'center',
  },
  descriptionText: {
    fontSize: 14,
    color: '#6B6B6B',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 20,
  },
  startButton: {
    backgroundColor: '#FFB6D9',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 20,
  },
  startButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  dailyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8F9FE',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  dailyItemLeft: {
    flex: 1,
    marginRight: 12,
  },
  dailyItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  dailyItemSubtitle: {
    fontSize: 13,
    color: '#6B6B6B',
    lineHeight: 18,
  },
  dailyItemImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
    overflow: 'hidden',
  },
  itemImage: {
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
