import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

export default function Input({ placeHolder, setValor, contra, setTextChange }) {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder={placeHolder}
        placeholderTextColor="#999"  // Color del placeholder en gris claro
        value={setValor}
        secureTextEntry={contra}  // Para contraseñas
        onChangeText={setTextChange}  // Maneja el cambio de texto
        selectionColor="#000"  // Color del cursor negro
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    width: 380,
    marginVertical: 10,
    borderWidth: 1,  // Añade borde para que sea más visible
    borderColor: '#000',  // Borde negro
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  input: {
    color: '#000',  // Color del texto negro
    fontSize: 16,
    paddingVertical: 8,
  },
  inputFocused: {
    color: '#000'
  }
});
