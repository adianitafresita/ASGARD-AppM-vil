import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CreditInvoiceCard = ({ data }) => {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.cardTitle}>Factura #{data.id_factura}</Text>
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>Descripción:</Text>
        <Text style={styles.fieldValue}>{data.descripcion}</Text>
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>Tipo de Servicio:</Text>
        <Text style={styles.fieldValue}>{data.tipo_servicio}</Text>
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>Monto:</Text>
        <Text style={styles.fieldValue}>${data.monto}</Text>
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>Fecha de Emisión:</Text>
        <Text style={styles.fieldValue}>{data.fecha_emision}</Text>
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>ID Cliente:</Text>
        <Text style={styles.fieldValue}>{data.id_cliente}</Text>
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>ID Servicio:</Text>
        <Text style={styles.fieldValue}>{data.id_servicio}</Text>
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>ID Empleado:</Text>
        <Text style={styles.fieldValue}>{data.id_empleado}</Text>
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>ID Administrador:</Text>
        <Text style={styles.fieldValue}>{data.id_administrador}</Text>
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
    marginBottom: 5,
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
    textAlign: 'right',
  },
});

export default CreditInvoiceCard;
