import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

interface Comment {
  id: string;
  userName: string;
  userAvatar: string;
  time: string;
  content: string;
}

interface Post {
  id: string;
  userName: string;
  userAvatar: string;
  time: string;
  content: string;
  likes: number;
  commentsCount: number;
  comments: Comment[];
}

interface CommunityScreenProps {
  onNavigate?: (screen: string) => void;
}

export default function CommunityScreen({ onNavigate }: CommunityScreenProps) {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      userName: 'Mẹo Chăm Sóc Da',
      userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      time: '2 ngày',
      content: 'Tôi đã sử dụng một loại serum mới với vitamin C và nó thật tuyệt vời cho làn da của tôi! Làn da của tôi trông sáng hơn và đều màu hơn. Rất khuyến khích!',
      likes: 23,
      commentsCount: 6,
      comments: [
        {
          id: '1-1',
          userName: 'Ngọc',
          userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
          time: '1 ngày',
          content: 'Tôi cũng try loại serum vitamin C tốt! Bạn dùng hãng nào vậy?',
        },
        {
          id: '1-2',
          userName: 'Trang',
          userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
          time: '2 ngày',
          content: 'Tôi đã nghĩ nhiều điều tuyệt vời về serum vitamin C. Tôi cần thử một loại!',
        },
      ],
    },
    {
      id: '2',
      userName: 'Đạt Câu Hỏi',
      userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      time: '3 ngày',
      content: 'Tôi mới bắt đầu chăm sóc da và không biết bắt đầu từ đâu. Có gợi ý nào cho quy trình cơ bản cho da nhạy cảm không?',
      likes: 15,
      commentsCount: 3,
      comments: [
        {
          id: '2-1',
          userName: 'Minh',
          userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
          time: '2 ngày',
          content: 'Bắt đầu với sữa rửa mặt dịu nhẹ, kem dưỡng ẩm và kem chống nắng. Tìm các sản phẩm dành riêng cho da nhạy cảm.',
        },
        {
          id: '2-2',
          userName: 'Hà',
          userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
          time: '3 ngày',
          content: 'Tôi đồng ý với Minh. Hãy thêm đơn giản là tốt nhất khi bạn đang làm quen với làn da của mình!',
        },
      ],
    },
    {
      id: '3',
      userName: 'Linh Chia Sẻ',
      userAvatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop',
      time: '5 ngày',
      content: 'Ai đã thử retinol chưa? Tôi quan tâm đến việc thêm nó vào quy trình của mình nhưng tôi hơi lo lắng về tác dụng phụ.',
      likes: 31,
      commentsCount: 5,
      comments: [
        {
          id: '3-1',
          userName: 'Phương',
          userAvatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop',
          time: '4 ngày',
          content: 'Tôi đã sử dụng retinol trong 6 tháng và nó thật tuyệt vời! Bắt đầu chậm, 2 lần một tuần.',
        },
        {
          id: '3-2',
          userName: 'Tuấn',
          userAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop',
          time: '5 ngày',
          content: 'Đồng ý! Và nhớ sử dụng kem chống nắng vào ban ngày vì retinol làm tăng độ nhạy cảm với ánh sáng mặt trời.',
        },
      ],
    },
  ]);

  const [expandedPosts, setExpandedPosts] = useState<string[]>([]);

  const toggleComments = (postId: string) => {
    if (expandedPosts.includes(postId)) {
      setExpandedPosts(expandedPosts.filter(id => id !== postId));
    } else {
      setExpandedPosts([...expandedPosts, postId]);
    }
  };

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => onNavigate?.('home')}>
          <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cộng đồng</Text>
        <TouchableOpacity>
          <Ionicons name="add-circle-outline" size={24} color="#1A1A1A" />
        </TouchableOpacity>
      </View>

      {/* Posts List */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {posts.map((post) => (
          <View key={post.id} style={styles.postCard}>
            {/* Post Header */}
            <View style={styles.postHeader}>
              <Image
                source={{ uri: post.userAvatar }}
                style={styles.avatar}
                resizeMode="cover"
              />
              <View style={styles.postHeaderInfo}>
                <Text style={styles.userName}>{post.userName}</Text>
                <Text style={styles.postTime}>{post.time}</Text>
              </View>
            </View>

            {/* Post Content */}
            <Text style={styles.postContent}>{post.content}</Text>

            {/* Post Actions */}
            <View style={styles.postActions}>
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => handleLike(post.id)}
              >
                <Ionicons name="heart-outline" size={20} color="#6B6B6B" />
                <Text style={styles.actionText}>{post.likes}</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => toggleComments(post.id)}
              >
                <Ionicons name="chatbubble-outline" size={20} color="#6B6B6B" />
                <Text style={styles.actionText}>{post.commentsCount}</Text>
              </TouchableOpacity>
            </View>

            {/* Comments Section */}
            {expandedPosts.includes(post.id) && (
              <View style={styles.commentsSection}>
                {post.comments.map((comment) => (
                  <View key={comment.id} style={styles.commentItem}>
                    <Image
                      source={{ uri: comment.userAvatar }}
                      style={styles.commentAvatar}
                      resizeMode="cover"
                    />
                    <View style={styles.commentContent}>
                      <View style={styles.commentHeader}>
                        <Text style={styles.commentUserName}>{comment.userName}</Text>
                        <Text style={styles.commentTime}>{comment.time}</Text>
                      </View>
                      <Text style={styles.commentText}>{comment.content}</Text>
                    </View>
                  </View>
                ))}
              </View>
            )}
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
        
        <TouchableOpacity style={styles.navItem} onPress={() => onNavigate?.('store')}>
          <Ionicons name="storefront-outline" size={24} color="#6B6B6B" />
          <Text style={styles.navLabelInactive}>Sản Phẩm</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="people" size={24} color="#6B4EFF" />
          <Text style={styles.navLabel}>Cộng đồng</Text>
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
  postCard: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    padding: 16,
  },
  postHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
  },
  postHeaderInfo: {
    marginLeft: 12,
    justifyContent: 'center',
  },
  userName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  postTime: {
    fontSize: 12,
    color: '#999999',
    marginTop: 2,
  },
  postContent: {
    fontSize: 14,
    color: '#1A1A1A',
    lineHeight: 20,
    marginBottom: 12,
  },
  postActions: {
    flexDirection: 'row',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  actionText: {
    fontSize: 14,
    color: '#6B6B6B',
    marginLeft: 6,
  },
  commentsSection: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  commentItem: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  commentAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
  },
  commentContent: {
    flex: 1,
    marginLeft: 10,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  commentUserName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    marginRight: 8,
  },
  commentTime: {
    fontSize: 12,
    color: '#999999',
  },
  commentText: {
    fontSize: 13,
    color: '#1A1A1A',
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
