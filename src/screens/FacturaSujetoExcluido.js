import { View, Text } from 'react-native'
import React from 'react'

export default function FacturaSujetoExcluido() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Registro para Factura Sujeto Excluido Electronico</Text>
      <Button title="Agregar Usuario" onPress={() => {}} color="#FF6F00" />
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={styles.tableHeader}>Nombre</Text>
          <Text style={styles.tableHeader}>Apellido</Text>
          <Text style={styles.tableHeader}>Dui</Text>
          <Text style={styles.tableHeader}>NIT</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Karthi</Text>
          <Text style={styles.tableCell}>Gomez</Text>
          <Text style={styles.tableCell}>12345678-9</Text>
          <Text style={styles.tableCell}>123456789</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  table: {
    marginTop: 20,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  tableHeader: {
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
  },
});