import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import fetchData from '../utils/fetchdata';

const FacturaSujetoExcluido = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const data = await fetchData('factura_sujeto_excluido', 'readAll');
        if (data && data.dataset) {
          setUsuarios(data.dataset);
          console.log('Data set to usuarios:', data.dataset);
        } else {
          console.log('No se encontraron datos');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    obtenerDatos();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Usuarios de Sujeto excluido electrónico</Text>
      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.id_factura.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>Nombre: {item.nombre_cliente}</Text>
            <Text style={styles.itemText}>Apellido: {item.apellido_cliente}</Text>
            <Text style={styles.itemText}>NIT: {item.nit_cliente}</Text>
            <Text style={styles.itemText}>Dirección: {item.direccion_cliente}</Text>
            <Text style={styles.itemText}>Departamento: {item.departamento_cliente}</Text>
            <Text style={styles.itemText}>Municipio: {item.municipio_cliente}</Text>
            <Text style={styles.itemText}>Email: {item.email_cliente}</Text>
            <Text style={styles.itemText}>Teléfono: {item.telefono_cliente}</Text>
            <Text style={styles.itemText}>DUI: {item.dui_cliente}</Text>
            <Text style={styles.itemText}>Tipo de servicio: {item.tipo_servicio}</Text>
            <Text style={styles.itemText}>Monto: {item.monto}</Text>
            <Text style={styles.itemText}>Fecha de emisión: {item.fecha_emision}</Text>
          </View>
        )}
        ListEmptyComponent={<Text>No hay datos disponibles</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  texto: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 18,
  },
});

export default FacturaSujetoExcluido;
