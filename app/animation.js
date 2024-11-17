import { Animated } from 'react-native';


export const startAnimation = (animatedValue, colorValue) => {
  Animated.parallel([
    Animated.timing(animatedValue, {
      toValue: 50, 
      duration: 300,
      useNativeDriver: false,
    }),
    Animated.timing(colorValue, {
      toValue: 1, 
      duration: 300,
      useNativeDriver: false,
    })
  ]).start();
};


export const resetAnimation = (animatedValue, colorValue) => {
  Animated.parallel([
    Animated.timing(animatedValue, {
      toValue: 26, 
      duration: 300,
      useNativeDriver: false,
    }),
    Animated.timing(colorValue, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    })
  ]).start();
};
