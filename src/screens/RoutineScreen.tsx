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

interface RoutineScreenProps {
  onNavigate?: (screen: string) => void;
}

export default function RoutineScreen({ onNavigate }: RoutineScreenProps) {
  const [activeTab, setActiveTab] = useState<'morning' | 'evening'>('morning');
  const { morningRoutines, eveningRoutines, toggleRoutineItem, removeRoutineItem } = useRoutine();

  const toggleRoutine = (id: string) => {
    if (activeTab === 'morning') {
      toggleRoutineItem(id, 'morning');
    } else {
      toggleRoutineItem(id, 'evening');
    }
  };

  const handleRemoveItem = (id: string) => {
    Alert.alert(
      'Xóa sản phẩm',
      'Bạn có chắc muốn xóa sản phẩm này khỏi quy trình?',
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Xóa',
          style: 'destructive',
          onPress: () => {
            if (activeTab === 'morning') {
              removeRoutineItem(id, 'morning');
            } else {
              removeRoutineItem(id, 'evening');
            }
          },
        },
      ]
    );
  };

  const currentRoutines = activeTab === 'morning' ? morningRoutines : eveningRoutines;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => onNavigate?.('home')}>
          <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Quy trình</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Tab Selector */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'morning' && styles.activeTab]}
          onPress={() => setActiveTab('morning')}
        >
          <Text style={[styles.tabText, activeTab === 'morning' && styles.activeTabText]}>
            Sáng
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'evening' && styles.activeTab]}
          onPress={() => setActiveTab('evening')}
        >
          <Text style={[styles.tabText, activeTab === 'evening' && styles.activeTabText]}>
            Tối
          </Text>
        </TouchableOpacity>
      </View>

      {/* Routine List */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {currentRoutines.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.routineItem}
            onPress={() => toggleRoutine(item.id)}
          >
            <View style={styles.routineImageContainer}>
              <Image
                source={typeof item.image === 'string' ? { uri: item.image } : item.image}
                style={styles.routineImage}
                resizeMode="cover"
              />
            </View>
            <View style={styles.routineInfo}>
              <Text style={styles.routineName}>{item.name}</Text>
              <Text style={styles.routineFrequency}>{item.time}</Text>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.checkbox}
                onPress={() => toggleRoutine(item.id)}
              >
                {item.checked ? (
                  <Ionicons name="checkbox" size={24} color="#6B4EFF" />
                ) : (
                  <View style={styles.checkboxEmpty} />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleRemoveItem(item.id)}
              >
                <Ionicons name="trash-outline" size={20} color="#FF4444" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => onNavigate?.('home')}>
          <Ionicons name="home-outline" size={24} color="#6B6B6B" />
          <Text style={styles.navLabelInactive}>Dashboard</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="list" size={24} color="#6B4EFF" />
          <Text style={styles.navLabel}>Quy Trình</Text>
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
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#6B4EFF',
  },
  tabText: {
    fontSize: 16,
    color: '#6B6B6B',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#1A1A1A',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingTop: 16,
  },
  routineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  routineImageContainer: {
    width: 56,
    height: 56,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#F8F9FE',
  },
  routineImage: {
    width: '100%',
    height: '100%',
  },
  routineInfo: {
    flex: 1,
    marginLeft: 12,
  },
  routineName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  routineFrequency: {
    fontSize: 13,
    color: '#6B6B6B',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxEmpty: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#D0D0D0',
  },
  deleteButton: {
    padding: 4,
    marginLeft: 12,
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
