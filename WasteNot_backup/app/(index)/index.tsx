import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { colors, commonStyles } from '@/styles/commonStyles';

export default function IndexScreen() {
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        router.replace('/(tabs)');
      } else {
        router.replace('/(auth)/welcome');
      }
    }
  }, [user, isLoading]);

  if (isLoading) {
    return (
      <View style={[commonStyles.container, styles.loadingContainer]}>
        <Text style={[commonStyles.title, { color: colors.primary }]}>
          🌱 FoodSwap
        </Text>
        <Text style={commonStyles.text}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={[commonStyles.container, styles.container]}>
      <Text style={[commonStyles.title, { color: colors.primary }]}>
        🌱 FoodSwap
      </Text>
      <Text style={commonStyles.text}>Redirecting...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
