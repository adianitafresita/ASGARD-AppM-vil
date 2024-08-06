import React, { useState, useRef } from 'react';
import { StyleSheet, TextInput, Animated, TouchableOpacity, Text, View } from 'react-native';

export default function Input({ placeHolder, setValor, contra, setTextChange }) {
  const [isFocused, setIsFocused] = useState(false);
  const borderColor = useRef(new Animated.Value(0)).current;

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(borderColor, {
      toValue: 1,
      duration: 500, // Reducción de la duración para una animación más rápida
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    Animated.timing(borderColor, {
      toValue: 0,
      duration: 500, // Reducción de la duración para una animación más rápida
      useNativeDriver: false,
    }).start();
  };

  const animatedBorderColor = borderColor.interpolate({
    inputRange: [0, 1],
    outputRange: ['#828181', '#FFA500'] // Cambiar a anaranjado
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.inputContainer, { borderColor: animatedBorderColor }]}>
        <TextInput
          style={[styles.input, isFocused && styles.inputFocused]} // Cambiar el estilo del texto cuando está enfocado
          placeholder={placeHolder}
          value={setValor}
          placeholderTextColor={'#828181'}
          secureTextEntry={contra}
          onChangeText={setTextChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%', // Asegura que el contenedor ocupe el ancho completo
  },
  inputContainer: {
    borderRadius: 8,
    padding: 10, // Simplificar el padding
    marginVertical: 10,
    borderStyle: 'solid',
    borderWidth: 2,
  },
  input: {
    backgroundColor: '#00000000',
    color: '#000',
    fontSize: 16,
    width: '100%', // Asegura que el campo de entrada ocupe todo el ancho disponible
  },
  inputFocused: {
    color: '#FFF' // Cambiar el color del texto a blanco cuando está enfocado
  }
});
