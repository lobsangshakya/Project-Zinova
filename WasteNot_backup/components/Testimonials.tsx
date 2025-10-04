import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/styles/commonStyles';
import { AnimatedSection } from '@/components/AnimatedSection';

export const Testimonials = () => {
  const testimonials = [
    {
      quote: 'Project Zinova has transformed how we handle surplus food at our restaurant. What used to go to waste now feeds families in need, and our staff feels proud to be part of the solution.',
      author: 'Maria Rodriguez',
      role: 'Executive Chef',
      company: 'Green Bistro Restaurant',
    },
    {
      quote: 'As a food bank, Project Zinova has increased our food supply by 40% while ensuring complete transparency about food sources and safety. The blockchain verification gives our recipients confidence in what they receive.',
      author: 'James Wilson',
      role: 'Operations Director',
      company: 'Community Food Bank',
    },
    {
      quote: 'Our farm produces more than we can sell during peak seasons. Project Zinova helps us redirect this surplus to communities rather than letting it go to waste, creating value for our business and our community.',
      author: 'Sarah Thompson',
      role: 'Owner',
      company: 'Sunny Acres Farm',
    },
  ];

  return (
    <AnimatedSection style={styles.container}>
      <Text style={styles.sectionTitle}>Partner Stories</Text>
      <Text style={styles.sectionSubtitle}>
        Hear from organizations making a difference with Project Zinova
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
    </AnimatedSection>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 40,
    backgroundColor: colors.backgroundAlt,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 12,
  },
  sectionSubtitle: {
    fontSize: 18,
    color: colors.textSecondary,
    marginBottom: 40,
    textAlign: 'center',
    maxWidth: 700,
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