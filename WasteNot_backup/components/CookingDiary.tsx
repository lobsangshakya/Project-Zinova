import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { colors } from '@/styles/commonStyles';

export const CookingDiary = () => {
  const [activePage, setActivePage] = useState(0);

  const diaryEntries = [
    {
      date: "March 15, 2023",
      title: "The Birth of Project Zinova",
      content: "It all started with a simple idea - what if we could help people reduce food waste while creating amazing meals? Our journey began in a small kitchen with big dreams.",
      image: "👨‍🍳",
    },
    {
      date: "June 22, 2023",
      title: "Our First Recipe Collection",
      content: "We gathered over 500 recipes from home cooks around the world. Each recipe tells a story of creativity, tradition, and love for good food.",
      image: "📚",
    },
    {
      date: "September 8, 2023",
      title: "AI-Powered Innovation",
      content: "Introducing our revolutionary AI that understands your ingredients and suggests perfect recipes. Technology meets culinary artistry.",
      image: "🤖",
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Our Culinary Journey</Text>
      <Text style={styles.sectionSubtitle}>A cooking diary of passion and innovation</Text>
      
      <View style={styles.diaryContainer}>
        <View style={styles.diaryHeader}>
          <View style={styles.diaryBinding} />
          <View style={styles.diaryHole} />
          <View style={styles.diaryHole} />
          <View style={styles.diaryHole} />
        </View>
        
        <View style={styles.diaryContent}>
          <View style={styles.diaryPage}>
            <Text style={styles.diaryDate}>{diaryEntries[activePage].date}</Text>
            <Text style={styles.diaryPageTitle}>{diaryEntries[activePage].title}</Text>
            <View style={styles.diaryImageContainer}>
              <Text style={styles.diaryImage}>{diaryEntries[activePage].image}</Text>
            </View>
            <ScrollView style={styles.diaryTextContainer}>
              <Text style={styles.diaryContentText}>{diaryEntries[activePage].content}</Text>
            </ScrollView>
          </View>
        </View>
        
        <View style={styles.diaryFooter}>
          <View style={styles.pageIndicator}>
            {diaryEntries.map((_, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setActivePage(index)}
                style={[
                  styles.pageDot,
                  { backgroundColor: index === activePage ? colors.primary : colors.grey }
                ]}
              />
            ))}
          </View>
        </View>
      </View>
      
      <View style={styles.storyContent}>
        <Text style={styles.storyTitle}>From Kitchen to Community</Text>
        <Text style={styles.storyDescription}>
          Project Zinova was born from a passion for cooking and a commitment to sustainability. 
          We believe that great food shouldn't come at the cost of our planet. Our mission is to 
          empower home cooks with tools that reduce waste while maximizing flavor and creativity.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.primary,
    marginBottom: 8,
    textAlign: 'center',
  },
  sectionSubtitle: {
    fontSize: 18,
    color: colors.textSecondary,
    marginBottom: 30,
    textAlign: 'center',
  },
  diaryContainer: {
    width: '100%',
    maxWidth: 500,
    height: 400,
    backgroundColor: colors.card,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: colors.cardShadow,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 15,
    marginBottom: 30,
    position: 'relative',
  },
  diaryHeader: {
    height: 30,
    backgroundColor: '#8B4513',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  diaryBinding: {
    width: 40,
    height: 20,
    backgroundColor: '#A0522D',
    borderRadius: 3,
    marginRight: 10,
  },
  diaryHole: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#5D4037',
    marginRight: 15,
  },
  diaryContent: {
    flex: 1,
    padding: 25,
    backgroundColor: '#FFF8DC',
  },
  diaryPage: {
    flex: 1,
  },
  diaryDate: {
    fontSize: 14,
    color: colors.textLight,
    textAlign: 'right',
    marginBottom: 15,
    fontStyle: 'italic',
  },
  diaryPageTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 20,
    textAlign: 'center',
  },
  diaryImageContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  diaryImage: {
    fontSize: 60,
  },
  diaryTextContainer: {
    flex: 1,
  },
  diaryContentText: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
    textAlign: 'justify',
  },
  diaryFooter: {
    height: 50,
    backgroundColor: '#F5DEB3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageIndicator: {
    flexDirection: 'row',
  },
  pageDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  storyContent: {
    backgroundColor: colors.tertiary,
    borderRadius: 20,
    padding: 30,
    borderWidth: 1,
    borderColor: colors.border,
    maxWidth: 700,
  },
  storyTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 15,
    textAlign: 'center',
  },
  storyDescription: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 26,
    textAlign: 'center',
  },
});