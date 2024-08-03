import React from 'react';
import { View, Text, Picker, StyleSheet } from 'react-native';

const ComboBox = ({ placeHolder, options, selectedValue, onValueChange }) => {
  // Verificar si options es un array y tiene elementos
  if (!Array.isArray(options) || options.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Error: No se pudieron cargar las opciones.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{placeHolder}</Text>
      <Picker
        selectedValue={selectedValue}
        style={styles.picker}
        onValueChange={(itemValue) => onValueChange(itemValue)}
      >
        <Picker.Item label={`Selecciona ${placeHolder}`} value="" />
        {options.map((option) => (
          <Picker.Item key={option.value} label={option.label} value={option.value} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    width: '100%',
  },
  label: {
    color: '#322C2B',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  picker: {
    height: 50,
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 5,
  },
});

export default ComboBox;
