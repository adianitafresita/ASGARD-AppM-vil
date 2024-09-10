import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput } from 'react-native';
import fetchData from '../utils/fetchdata';
import Card from '../components/Card/CardE';

const Empleados = () => {
  const [empleado, setEmpleado] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const data = await fetchData('empleado', 'readAll');
        if (data && data.dataset) {
          setEmpleado(data.dataset);
          setFilteredData(data.dataset);
          console.log('Data set to empleados:', data.dataset);
        } else {
          console.log('No se encontraron datos');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    obtenerDatos();
  }, []);

  useEffect(() => {
    const filterData = () => {
      if (searchQuery === '') {
        setFilteredData(empleado);
      } else {
        const filtered = empleado.filter(item =>
          item.nombre_empleado.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.apellido_empleado.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredData(filtered);
      }
    };

    filterData();
  }, [searchQuery, empleado]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Empleados</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar por nombre o apellido"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id_empleado.toString()}
        renderItem={({ item }) => <Card data={item} />}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});

export default Empleados;
