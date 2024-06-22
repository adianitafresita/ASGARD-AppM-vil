import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, Modal, TextInput, TouchableOpacity } from 'react-native';

const Empleados = () => {
  // Estado para controlar la visibilidad del modal y almacenar datos del nuevo empleado
  const [modalVisible, setModalVisible] = useState(false);
  const [newEmpleado, setNewEmpleado] = useState({
    nombre: '',
    apellido: '',
    dui: '',
    nit: '',
    correo: '',
    telefono: ''
  });

  // Datos de ejemplo para los empleados
  const empleados = [
    { nombre: 'Juan', apellido: 'Pérez', dui: '12345678-9', nit: '0614-150598-101-0', correo: 'juan.perez@example.com', telefono: '555-1234' },
    { nombre: 'Ana', apellido: 'López', dui: '87654321-0', nit: '0614-150598-202-1', correo: 'ana.lopez@example.com', telefono: '555-5678' },
    { nombre: 'Luis', apellido: 'García', dui: '11223344-5', nit: '0614-150598-303-2', correo: 'luis.garcia@example.com', telefono: '555-9101' }
  ];

  // Función para actualizar los campos del nuevo empleado
  const handleInputChange = (name, value) => {
    setNewEmpleado({
      ...newEmpleado,
      [name]: value
    });
  };

  return (
    <View style={styles.container}>
      {/* Título de la pantalla */}
      <Text style={styles.title}>Empleados</Text>
      <View style={styles.buttonContainer}>
        {/* Botón para abrir el modal de agregar empleado */}
        <Button title="Agregar Empleado" color="#FFD500" onPress={() => setModalVisible(true)} />
      </View>
      {/* ScrollView para mostrar la tabla de empleados */}
      <ScrollView horizontal>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>Nombre</Text>
            <Text style={styles.tableHeaderText}>Apellido</Text>
            <Text style={styles.tableHeaderText}>DUI</Text>
            <Text style={styles.tableHeaderText}>NIT</Text>
            <Text style={styles.tableHeaderText}>Correo</Text>
            <Text style={styles.tableHeaderText}>Teléfono</Text>
          </View>
          {/* Datos de los empleados */}
          {empleados.map((empleado, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{empleado.nombre}</Text>
              <Text style={styles.tableCell}>{empleado.apellido}</Text>
              <Text style={styles.tableCell}>{empleado.dui}</Text>
              <Text style={styles.tableCell}>{empleado.nit}</Text>
              <Text style={styles.tableCell}>{empleado.correo}</Text>
              <Text style={styles.tableCell}>{empleado.telefono}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Modal para agregar nuevo empleado */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            {/* Título del modal */}
            <Text style={styles.modalTitle}>Agregar empleado</Text>
            {/* Inputs para ingresar datos del nuevo empleado */}
            {Object.keys(newEmpleado).map((key) => (
              <TextInput
                key={key}
                style={styles.input}
                placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                value={newEmpleado[key]}
                onChangeText={(text) => handleInputChange(key, text)}
              />
            ))}
            {/* Botones de acción del modal */}
            <View style={styles.modalButtonContainer}>
              {/* Botón para cancelar */}
              <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
              {/* Botón para guardar */}
              <TouchableOpacity style={styles.modalButton} onPress={() => { /* Programacióm */ }}>
                <Text style={styles.modalButtonText}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// Estilos de la pantalla
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    marginBottom: 20,
    alignItems: 'flex-end',
  },
  table: {
    borderWidth: 1,
    borderColor: '#ddd',
    width: '100%',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
  },
  tableHeaderText: {
    flex: 1,
    padding: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCell: {
    flex: 1,
    padding: 10,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    padding: 10,
    margin: 5,
    backgroundColor: '#FFD500',
    borderRadius: 5,
    alignItems: 'center',
    width: 150,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Empleados;
