import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [menuOpen, setMenuOpen] = useState(true);
  const router = useRouter();

  const spinValue = useSharedValue(0);

  const spinStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${spinValue.value}deg` }],
    };
  });

  useEffect(() => {
    const interval = setInterval(() => setCurrentDate(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleMenu = () => {
    spinValue.value = withTiming(menuOpen ? 0 : 360, {
      duration: 500,
      easing: Easing.linear,
    });
    setMenuOpen(!menuOpen);
  };

  const handleIconPress = (index: number) => {
    if (index === 0) {
      router.push('/screens/NotePad');
    } else if (index === 1) {
      router.push('/components/Calendar');
    } else if (index === 2) {
      router.push('/screens/Library');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.neumorphicContainer}>
        <Text style={styles.dateText}>{currentDate.toLocaleDateString()}</Text>
        <Text style={styles.timeText}>{currentDate.toLocaleTimeString()}</Text>
      </View>

      <TouchableOpacity
        style={styles.mainButton}
        onPress={toggleMenu}
      >
        <Animated.Text style={[styles.buttonText, spinStyle]}>
          {menuOpen ? '✕' : '+'}
        </Animated.Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0e5ec',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
  },
  neumorphicContainer: {
    backgroundColor: '#e0e5ec',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    padding: 20,
  },
  mainButton: {
    position: 'absolute',
    bottom: 40,
    left: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#e0e5ec',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 30,
    color: '#3498db',
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 48,
    color: '#333',
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  timeText: {
    fontSize: 42,
    color: '#666',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});