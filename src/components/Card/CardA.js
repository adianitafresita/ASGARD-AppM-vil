import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AdminCard = ({ data }) => {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.cardTitle}>{data.nombre_administrador} {data.apellido_administrador}</Text>
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>Email:</Text>
        <Text style={styles.fieldValue}>{data.email_administrador}</Text>
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
    textAlign: 'right',
  },
});

export default AdminCard;
