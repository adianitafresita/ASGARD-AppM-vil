import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, Alert } from 'react-native';
import fetchData from '../utils/fetchdata';
import Card from '../components/Card/CardC';

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const data = await fetchData('clientes', 'readAll');
        if (data && data.dataset) {
          setClientes(data.dataset);
          setFilteredData(data.dataset);
          console.log('Data set to clientes:', data.dataset);
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
        setFilteredData(clientes);
      } else {
        const filtered = clientes.filter(item =>
          item.nombre_cliente.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.apellido_cliente.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredData(filtered);
      }
    };

    filterData();
  }, [searchQuery, clientes]);

  // Función para manejar el cambio en el campo de búsqueda
  const handleSearchChange = (text) => {
    // Validar que el texto de búsqueda no esté vacío y no contenga números
    if (text.trim() === ' ') {
      Alert.alert("Error", "El campo de búsqueda no puede estar vacío.");
    } else if (/\d/.test(text)) {
      Alert.alert("Error", "El campo de búsqueda no debe contener números.");
    } else {
      setSearchQuery(text);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Clientes</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar por nombre o apellido"
        value={searchQuery}
        onChangeText={handleSearchChange}
      />
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id_cliente.toString()}
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

export default Clientes;