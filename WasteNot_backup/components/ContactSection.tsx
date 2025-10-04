import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { colors } from '@/styles/commonStyles';

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    // Form submission logic would go here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Ready to Transform Your Kitchen?</Text>
          <Text style={styles.description}>
            Join thousands of home cooks reducing waste and creating amazing meals with Project Zinova.
          </Text>
          <View style={styles.contactInfo}>
            <Text style={styles.contactLabel}>Contact Us</Text>
            <Text style={styles.contactDetail}>hello@projectzinova.com</Text>
            <Text style={styles.contactDetail}>+1 (555) 123-4567</Text>
          </View>
        </View>
        
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Get Started Today</Text>
          <TextInput
            style={styles.input}
            placeholder="Your Name"
            value={formData.name}
            onChangeText={(value) => handleChange('name', value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Your Email"
            keyboardType="email-address"
            value={formData.email}
            onChangeText={(value) => handleChange('email', value)}
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Your Message"
            multiline
            numberOfLines={4}
            value={formData.message}
            onChangeText={(value) => handleChange('message', value)}
          />
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Send Message</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 40,
  },
  content: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    maxWidth: 1200,
    alignSelf: 'center',
  },
  textContainer: {
    flex: 1,
    minWidth: 300,
    paddingRight: 40,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 20,
  },
  description: {
    fontSize: 18,
    color: colors.textSecondary,
    lineHeight: 28,
    marginBottom: 30,
  },
  contactInfo: {
    backgroundColor: colors.tertiary,
    borderRadius: 12,
    padding: 25,
  },
  contactLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 15,
  },
  contactDetail: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  formContainer: {
    flex: 1,
    minWidth: 300,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 30,
    shadowColor: colors.cardShadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 25,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    marginBottom: 20,
    color: colors.text,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: colors.light,
    fontSize: 16,
    fontWeight: '600',
  },
});