// screens/FacturaSujetoExcluido.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput } from 'react-native';
import fetchData from '../utils/fetchdata';
import Card from '../components/Card/Card';

const FacturaSujetoExcluido = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const data = await fetchData('factura_sujeto_excluido', 'readAll');
        if (data && data.dataset) {
          setUsuarios(data.dataset);
          setFilteredData(data.dataset);
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

  useEffect(() => {
    const filterData = () => {
      if (searchQuery === '') {
        setFilteredData(usuarios);
      } else {
        const filtered = usuarios.filter(item =>
          item.nombre_cliente.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.apellido_cliente.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredData(filtered);
      }
    };

    filterData();
  }, [searchQuery, usuarios]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Usuarios de Sujeto Excluido Electrónico</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar por nombre o apellido"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id_factura.toString()}
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

export default FacturaSujetoExcluido;
