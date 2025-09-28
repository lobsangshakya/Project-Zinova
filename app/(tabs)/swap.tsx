
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Alert } from 'react-native';
import { colors, commonStyles } from '@/styles/commonStyles';

interface SwapUser {
  id: string;
  name: string;
  distance: string;
  items: string[];
  rating: number;
  avatar: string;
}

export default function SwapScreen() {
  const [nearbyUsers, setNearbyUsers] = useState<SwapUser[]>([
    {
      id: '1',
      name: 'Sarah M.',
      distance: '0.5 km away',
      items: ['Carrots', 'Milk', 'Eggs'],
      rating: 4.8,
      avatar: '👩‍🦰',
    },
    {
      id: '2',
      name: 'Mike K.',
      distance: '1.2 km away',
      items: ['Apples', 'Cheese', 'Yogurt'],
      rating: 4.9,
      avatar: '👨‍🦱',
    },
    {
      id: '3',
      name: 'Emma L.',
      distance: '2.1 km away',
      items: ['Pasta', 'Olive Oil', 'Garlic'],
      rating: 4.7,
      avatar: '👩‍🦳',
    },
  ]);

  const handleSwapRequest = (userId: string, userName: string) => {
    Alert.alert(
      'Send Swap Request',
      `Would you like to send a swap request to ${userName}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Send Request',
          onPress: () => {
            Alert.alert('Success', 'Swap request sent! They will be notified.');
          },
        },
      ]
    );
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push('⭐');
    }
    if (hasHalfStar) {
      stars.push('⭐');
    }
    return stars.join('');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Food Swap</Text>
        <Text style={styles.subtitle}>
          Connect with nearby users to share ingredients
        </Text>
      </View>

      <View style={styles.mapPlaceholder}>
        <Text style={styles.mapText}>
          🗺️ Interactive Map
        </Text>
        <Text style={styles.mapSubtext}>
          Note: Maps are not supported in Natively web environment.
          {'\n'}In a real app, this would show nearby users on a map.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Nearby Users</Text>
        {nearbyUsers.map((user) => (
          <View key={user.id} style={styles.userCard}>
            <View style={styles.userHeader}>
              <Text style={styles.userAvatar}>{user.avatar}</Text>
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{user.name}</Text>
                <Text style={styles.userDistance}>{user.distance}</Text>
                <View style={styles.ratingContainer}>
                  <Text style={styles.rating}>{renderStars(user.rating)}</Text>
                  <Text style={styles.ratingText}>{user.rating}</Text>
                </View>
              </View>
            </View>
            
            <View style={styles.itemsContainer}>
              <Text style={styles.itemsTitle}>Available items:</Text>
              <View style={styles.itemsTags}>
                {user.items.map((item, index) => (
                  <View key={index} style={styles.itemTag}>
                    <Text style={styles.itemTagText}>{item}</Text>
                  </View>
                ))}
              </View>
            </View>
            
            <View style={styles.actionButtons}>
              <Pressable 
                style={styles.chatButton}
                onPress={() => Alert.alert('Chat', `Start a conversation with ${user.name}`)}
              >
                <Text style={styles.chatButtonText}>💬 Chat</Text>
              </Pressable>
              
              <Pressable 
                style={styles.swapButton}
                onPress={() => handleSwapRequest(user.id, user.name)}
              >
                <Text style={styles.swapButtonText}>🔄 Request Swap</Text>
              </Pressable>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>My Active Swaps</Text>
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>📦</Text>
          <Text style={styles.emptyText}>No active swaps</Text>
          <Text style={styles.emptySubtext}>
            Send swap requests to start exchanging food items!
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  mapPlaceholder: {
    backgroundColor: colors.backgroundAlt,
    borderRadius: 12,
    padding: 40,
    alignItems: 'center',
    marginBottom: 30,
    borderWidth: 1,
    borderColor: colors.border,
  },
  mapText: {
    fontSize: 24,
    marginBottom: 8,
  },
  mapSubtext: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  userCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  userHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  userAvatar: {
    fontSize: 32,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  userDistance: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 12,
    marginRight: 4,
  },
  ratingText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  itemsContainer: {
    marginBottom: 16,
  },
  itemsTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 8,
  },
  itemsTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  itemTag: {
    backgroundColor: colors.backgroundAlt,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 6,
  },
  itemTagText: {
    fontSize: 12,
    color: colors.text,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  chatButton: {
    flex: 1,
    backgroundColor: colors.backgroundAlt,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  chatButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  swapButton: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  swapButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.background,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
