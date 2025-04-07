import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { shadowStyle, lightShadowStyle, pressedStyle } from '../../styles/neumorphism';

const Calendar = () => {
  const [date, setDate] = useState(new Date());
  const [isPressed, setIsPressed] = useState(false);

  const nextDay = () => {
    setDate(new Date(date.setDate(date.getDate() + 1)));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.date}>{date.toDateString()}</Text>
      <TouchableOpacity
        style={[styles.button, isPressed && styles.pressedButton]}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
        onPress={nextDay}
      >
        <Text style={styles.buttonText}>Next Day</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e5ec',
    borderRadius: 20,
    boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.1), -5px -5px 10px rgba(255, 255, 255, 0.7)', // Updated
  },
  date: {
    fontSize: 32,
    color: '#333',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#e0e5ec',
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 30,
    boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.1), -5px -5px 10px rgba(255, 255, 255, 0.7)', // Updated
  },
  pressedButton: {
    boxShadow: 'inset 5px 5px 10px rgba(0, 0, 0, 0.2), inset -5px -5px 10px rgba(255, 255, 255, 0.5)', // Updated
  },
  buttonText: {
    fontSize: 18,
    color: '#3498db',
    fontWeight: 'bold',
  },
});

export default Calendar;