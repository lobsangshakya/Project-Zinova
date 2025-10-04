import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { colors } from '@/styles/commonStyles';
import { AppHeader } from '@/components/AppHeader';
import { ProfessionalHero } from '@/components/ProfessionalHero';
import { HowItWorks } from '@/components/HowItWorks';
import { FeaturesTech } from '@/components/FeaturesTech';
import { ImpactStats } from '@/components/ImpactStats';
import { Testimonials } from '@/components/Testimonials';
import { ContactSection } from '@/components/ContactSection';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.backgroundPattern} />
      
      <AppHeader 
        title="Project Zinova" 
        subtitle="Intelligent Kitchen Solutions"
      />

      <ProfessionalHero />
      
      <HowItWorks />
      
      <FeaturesTech />
      
      <ImpactStats />
      
      <Testimonials />
      
      <ContactSection />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    position: 'relative',
  },
  content: {
    paddingBottom: 20,
  },
  backgroundPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.background,
    opacity: 0.7,
    zIndex: 0,
  },
});