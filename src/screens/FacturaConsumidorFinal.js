import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, ScrollView, Modal, TextInput, TouchableOpacity } from 'react-native';

const FacturaConsumidorFinal = () => {
  // Estado para controlar la visibilidad del modal y el nuevo registro
  const [modalVisible, setModalVisible] = useState(false);
  const [newRegistro, setNewRegistro] = useState({
    nombre: '',
    apellido: '',
    dui: '',
    nit: '',
    correo: '',
    telefono: '',
    departamento: '',
    municipio: ''
  });

  // Ejemplo de datos de empleados (simulación de datos)
  const empleados = [
    { nombre: 'Karthi', apellido: 'Gomez', dui: '12345678-9', nit: '123456789', departamento: 'San Salvador', municipio: 'San Salvador', correo: 'karthi@example.com', telefono: '555-1234' },
    { nombre: 'Ana', apellido: 'López', dui: '87654321-0', nit: '0614-150598-202-1', departamento: 'Santa Ana', municipio: 'Santa Ana', correo: 'ana@example.com', telefono: '555-5678' },
    { nombre: 'Luis', apellido: 'García', dui: '11223344-5', nit: '0614-150598-303-2', departamento: 'San Miguel', municipio: 'San Miguel', correo: 'luis@example.com', telefono: '555-9101' }
  ];

  // Función para manejar cambios en los inputs del modal
  const handleInputChange = (name, value) => {
    setNewRegistro({
      ...newRegistro,
      [name]: value
    });
  };

  // Función para guardar el nuevo registro
  const handleGuardar = () => {
    console.log('Guardando registro:', newRegistro);
    setModalVisible(false); // Cerrar el modal después de guardar
  };

  return (
    <View style={styles.container}>
      {/* Título principal */}
      <Text style={styles.FCF}>Registro para Factura Consumidor Final Electrónico</Text>
      
      {/* Botón para abrir el modal */}
      <View style={styles.addButtonContainer}>
        <Button title="Registar" onPress={() => setModalVisible(true)} color="#FFD500" />
      </View>
      
      {/* ScrollView horizontal para la tabla */}
      <ScrollView horizontal>
        <View style={styles.table}>
          {/* Encabezados de la tabla */}
          <View style={styles.tableRow}>
            <Text style={[styles.tableHeader, { flex: 2 }]}>Nombre</Text>
            <Text style={[styles.tableHeader, { flex: 2 }]}>Apellido</Text>
            <Text style={[styles.tableHeader, { flex: 1.5 }]}>DUI</Text>
            <Text style={[styles.tableHeader, { flex: 2 }]}>NIT</Text>
            <Text style={[styles.tableHeader, { flex: 2.5 }]}>Departamento</Text>
            <Text style={[styles.tableHeader, { flex: 2.5 }]}>Municipio</Text>
            <Text style={[styles.tableHeader, { flex: 3 }]}>Correo</Text>
            <Text style={[styles.tableHeader, { flex: 2 }]}>Teléfono</Text>
          </View>
          
          {/* Renderizado de filas de empleados */}
          {empleados.map((empleado, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.tableCell, { flex: 2 }]}>{empleado.nombre}</Text>
              <Text style={[styles.tableCell, { flex: 2 }]}>{empleado.apellido}</Text>
              <Text style={[styles.tableCell, { flex: 1.5 }]}>{empleado.dui}</Text>
              <Text style={[styles.tableCell, { flex: 2 }]}>{empleado.nit}</Text>
              <Text style={[styles.tableCell, { flex: 2.5 }]}>{empleado.departamento}</Text>
              <Text style={[styles.tableCell, { flex: 2.5 }]}>{empleado.municipio}</Text>
              <Text style={[styles.tableCell, { flex: 3 }]}>{empleado.correo}</Text>
              <Text style={[styles.tableCell, { flex: 2 }]}>{empleado.telefono}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Modal para agregar nuevo registro */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Agregar Registro</Text>
            {/* Inputs para cada campo del nuevo registro */}
            {Object.keys(newRegistro).map((key) => (
              <TextInput
                key={key}
                style={styles.input}
                placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                value={newRegistro[key]}
                onChangeText={(text) => handleInputChange(key, text)}
              />
            ))}
            {/* Botones para guardar o cancelar */}
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: '#FFD500' }]}
                onPress={handleGuardar}
              >
                <Text style={styles.modalButtonText}>Guardar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: '#FFD500' }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: '#fff',
  },
  FCF: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000',
    alignSelf: 'center',
    marginBottom: 10,
  },
  addButtonContainer: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  table: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    minWidth: '100%',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    width: 1200, // Ancho suficiente para visualizar todos los datos
  },
  tableHeader: {
    paddingVertical: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  tableCell: {
    paddingVertical: 10,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    fontSize: 20,
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '40%',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default FacturaConsumidorFinal;
