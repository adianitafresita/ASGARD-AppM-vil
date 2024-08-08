import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Card = ({ data }) => {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.cardTitle}>{data.nombre_cliente} {data.apellido_cliente}</Text>
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>NIT:</Text>
        <Text style={styles.fieldValue}>{data.nit_cliente}</Text>
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>Dirección:</Text>
        <Text style={styles.fieldValue}>{data.direccion_cliente}</Text>
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>Departamento:</Text>
        <Text style={styles.fieldValue}>{data.departamento_cliente}</Text>
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>Municipio:</Text>
        <Text style={styles.fieldValue}>{data.municipio_cliente}</Text>
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>Email:</Text>
        <Text style={styles.fieldValue}>{data.email_cliente}</Text>
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>Teléfono:</Text>
        <Text style={styles.fieldValue}>{data.telefono_cliente}</Text>
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>DUI:</Text>
        <Text style={styles.fieldValue}>{data.dui_cliente}</Text>
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>Tipo de servicio:</Text>
        <Text style={styles.fieldValue}>{data.tipo_servicio}</Text>
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>Monto:</Text>
        <Text style={styles.fieldValue}>{data.monto}</Text>
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>Fecha de emisión:</Text>
        <Text style={styles.fieldValue}>{data.fecha_emision}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 15,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  fieldContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  fieldValue: {
    fontSize: 16,
    color: '#555',
    flex: 2,
    textAlign: 'right', // Align text to the right
  },
});

export default Card;
