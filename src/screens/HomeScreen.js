import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

// Importa la imagen desde la ruta correcta de tu proyecto
const elementImage = require('../../assets/ElementC.png'); // Ajusta la ruta según la estructura de tu proyecto
const deliverdImage = require('../../assets/Empleados.png');
const FacturaImage = require('../../assets/Factura.png');

const HomeScreen = () => {
  // Números estáticos para empleados y facturas
  const numeroClientes = 50;
  const numeroEmpleados = 25;
  const numeroFacturas = 100;

  return (
    <View style={styles.container}>
      <Text style={styles.asgardText}>ASGARD</Text>

      {/* Contenedor para Clientes */}
      <View style={styles.itemContainer}>
        <Image source={elementImage} style={styles.elementImage} />
        <View style={styles.textContainer}>
          <Text style={styles.numero}>{numeroClientes}</Text>
          <Text style={styles.titulo}>Clientes</Text>
        </View>
      </View>

      {/* Contenedor para Empleados */}
      <View style={styles.itemContainer}>
        <Image source={deliverdImage} style={styles.deliverdImage} />
        <View style={styles.textContainer}>
          <Text style={styles.numero}>{numeroEmpleados}</Text>
          <Text style={styles.titulo}>Empleados</Text>
        </View>
      </View>

      {/* Contenedor para Facturas */}
      <View style={styles.itemContainer}>
        <Image source={FacturaImage} style={styles.FacturaImage} />
        <View style={styles.textContainer}>
          <Text style={styles.numero}>{numeroFacturas}</Text>
          <Text style={styles.titulo}>Facturas</Text>
        </View>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#fff',
  },
  asgardText: {
    marginTop: 10,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFD500',
    alignSelf: 'flex-start', // Alineación horizontal a la izquierda
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    paddingVertical: 25,
    paddingHorizontal: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    width: '85%',
    justifyContent: 'space-between', // Espacio entre los elementos
  },
  textContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: 25,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5,
  },
  numero: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333',
  },
  elementImage: {
    width: 90,
    height: 90,
    resizeMode: 'contain',
    marginLeft: 30,
  },
  deliverdImage: {
    width: 90,
    height: 90,
    resizeMode: 'contain',
    marginLeft: 28,
  },
  FacturaImage: {
    width: 90,
    height: 90,
    resizeMode: 'contain',
    marginLeft: 28,
  },
});

export default HomeScreen;
