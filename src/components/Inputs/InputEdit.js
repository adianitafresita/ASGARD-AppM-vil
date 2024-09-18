import React, { useState, useRef } from 'react';
import { StyleSheet, TextInput, Animated } from 'react-native';

export default function InputEdit({ placeHolder, setValor, contra, setTextChange }) {
  const [isFocused, setIsFocused] = useState(false);
  const borderColor = useRef(new Animated.Value(0)).current;

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(borderColor, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    Animated.timing(borderColor, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false
    }).start();
  };

  const animatedBorderColor = borderColor.interpolate({
    inputRange: [0, 1],
    outputRange: ['#828181', '#FFA500'] // Cambia de gris a naranja cuando está enfocado
  });

  return (
    <Animated.View style={[styles.inputContainer, { borderColor: animatedBorderColor }]}>
      <TextInput
        style={[styles.input, isFocused && styles.inputFocused]} // Cambia el estilo cuando está enfocado
        placeholder={placeHolder}
        value={setValor}
        placeholderTextColor={'#828181'}
        secureTextEntry={contra} // Modo de contraseña
        onChangeText={setTextChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%', // Ocupa todo el ancho disponible
    borderRadius: 8,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    marginVertical: 10,
    borderStyle: 'solid',
    borderWidth: 2,
    backgroundColor: '#FFF', // Fondo blanco por defecto
  },
  input: {
    backgroundColor: '#00000000',
    color: '#000', // Texto en negro por defecto
    fontSize: 16,
  },
  inputFocused: {
    color: '#000', // El color del texto sigue siendo negro al enfocar
  }
});
