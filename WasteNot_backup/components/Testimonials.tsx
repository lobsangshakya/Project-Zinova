import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/styles/commonStyles';

export const Testimonials = () => {
  const testimonials = [
    {
      quote: 'Project Zinova has completely transformed how I cook at home. I waste less food and discover amazing recipes I never would have tried otherwise.',
      author: 'Sarah Johnson',
      role: 'Home Chef & Food Blogger',
      company: 'TasteExplorer',
    },
    {
      quote: 'The AI recommendations are incredibly accurate. It\'s like having a personal chef who understands exactly what I have in my kitchen.',
      author: 'Michael Chen',
      role: 'Professional Chef',
      company: 'Urban Bistro',
    },
    {
      quote: 'As a sustainability advocate, I\'m impressed by how much food waste Project Zinova helps families reduce while saving them money.',
      author: 'Emma Rodriguez',
      role: 'Environmental Consultant',
      company: 'Green Solutions Inc.',
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Partner Stories</Text>
      <Text style={styles.sectionSubtitle}>
        Hear from our community and partners
      </Text>
      
      <View style={styles.testimonialsContainer}>
        {testimonials.map((testimonial, index) => (
          <View key={index} style={styles.testimonialCard}>
            <Text style={styles.quote}>“{testimonial.quote}”</Text>
            <View style={styles.authorInfo}>
              <Text style={styles.authorName}>{testimonial.author}</Text>
              <Text style={styles.authorRole}>{testimonial.role}</Text>
              <Text style={styles.company}>{testimonial.company}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 40,
    backgroundColor: colors.backgroundAlt,
  },
  sectionTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 12,
    textAlign: 'center',
  },
  sectionSubtitle: {
    fontSize: 18,
    color: colors.textSecondary,
    marginBottom: 40,
    textAlign: 'center',
  },
  testimonialsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    maxWidth: 1200,
    alignSelf: 'center',
  },
  testimonialCard: {
    width: 350,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 30,
    margin: 15,
    shadowColor: colors.cardShadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  quote: {
    fontSize: 18,
    color: colors.text,
    lineHeight: 28,
    fontStyle: 'italic',
    marginBottom: 20,
  },
  authorInfo: {
    borderTopWidth: 1,
    borderTopColor: colors.grey,
    paddingTop: 20,
  },
  authorName: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 5,
  },
  authorRole: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 3,
  },
  company: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
});