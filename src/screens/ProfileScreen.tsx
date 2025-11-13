import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

interface ProfileScreenProps {
  onNavigate?: (screen: string) => void;
}

export default function ProfileScreen({ onNavigate }: ProfileScreenProps) {
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  const goals = [
    { id: '1', title: 'Mục tiêu 1', subtitle: 'Điều trị mụn' },
    { id: '2', title: 'Mục tiêu 2', subtitle: 'Làm sáng' },
    { id: '3', title: 'Mục tiêu 3', subtitle: 'Dưỡng ẩm' },
  ];

  const settings = [
    { id: '1', title: 'Tài khoản', icon: 'person-outline' },
    { id: '2', title: 'Tuỳ chọn ứng dụng', icon: 'settings-outline' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => onNavigate?.('home')}>
          <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Hồ sơ</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Info */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop' }}
              style={styles.avatar}
              resizeMode="cover"
            />
          </View>
          <Text style={styles.userName}>Ngoc Anh</Text>
          <Text style={styles.userInfo}>Cấp độ 3</Text>
          <Text style={styles.userInfo}>Thành gia 2 năm trước</Text>
        </View>

        {/* Goals Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mục tiêu</Text>
          {goals.map((goal) => (
            <TouchableOpacity key={goal.id} style={styles.menuItem}>
              <View style={styles.menuItemLeft}>
                <Text style={styles.menuItemTitle}>{goal.title}</Text>
                <Text style={styles.menuItemSubtitle}>{goal.subtitle}</Text>
              </View>
              <Ionicons name="create-outline" size={20} color="#1A1A1A" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cài đặt</Text>
          
          {settings.map((setting) => (
            <TouchableOpacity key={setting.id} style={styles.menuItem}>
              <Text style={styles.menuItemTitle}>{setting.title}</Text>
              <Ionicons name="chevron-forward" size={20} color="#1A1A1A" />
            </TouchableOpacity>
          ))}
          
          {/* Dark Mode Toggle */}
          <View style={styles.menuItem}>
            <Text style={styles.menuItemTitle}>Chế độ tối</Text>
            <Switch
              value={darkModeEnabled}
              onValueChange={setDarkModeEnabled}
              trackColor={{ false: '#767577', true: '#6B4EFF' }}
              thumbColor={darkModeEnabled ? '#FFFFFF' : '#f4f3f4'}
            />
          </View>
        </View>
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
        
        <TouchableOpacity style={styles.navItem} onPress={() => onNavigate?.('store')}>
          <Ionicons name="storefront-outline" size={24} color="#6B6B6B" />
          <Text style={styles.navLabelInactive}>Sản Phẩm</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person" size={24} color="#6B4EFF" />
          <Text style={styles.navLabel}>Hồ Sơ</Text>
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
  profileSection: {
    alignItems: 'center',
    paddingVertical: 32,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    marginBottom: 16,
    backgroundColor: '#F5F5F5',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  userInfo: {
    fontSize: 14,
    color: '#6B6B6B',
    marginBottom: 2,
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  menuItemLeft: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  menuItemSubtitle: {
    fontSize: 14,
    color: '#6B6B6B',
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
