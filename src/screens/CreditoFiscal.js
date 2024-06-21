import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Modal, TextInput, TouchableOpacity, ScrollView } from 'react-native';

const CreditoFiscal = () => {
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

  const handleInputChange = (name, value) => {
    setNewRegistro({
      ...newRegistro,
      [name]: value
    });
  };

  const handleGuardar = () => {
    // lógica para guardar
    console.log('Guardando registro:', newRegistro);
    setModalVisible(false); // Cerrar el modal 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro para crédito fiscal</Text>

      <View style={styles.buttonContainer}>
        <Button
          title="Registrar"
          color="#FF790D"
          onPress={() => setModalVisible(true)}
        />
      </View>

      <ScrollView horizontal>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>Nombre</Text>
            <Text style={styles.tableHeaderText}>Apellido</Text>
            <Text style={styles.tableHeaderText}>DUI</Text>
            <Text style={styles.tableHeaderText}>NIT</Text>
            <Text style={styles.tableHeaderText}>Correo</Text>
            <Text style={styles.tableHeaderText}>Teléfono</Text>
            <Text style={styles.tableHeaderText}>Departamento</Text>
            <Text style={styles.tableHeaderText}>Municipio</Text>
          </View>
          {/* Aquí puedes iterar sobre tus registros */}
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Juan</Text>
            <Text style={styles.tableCell}>Pérez</Text>
            <Text style={styles.tableCell}>12345678-9</Text>
            <Text style={styles.tableCell}>0614-150598-101-0</Text>
            <Text style={styles.tableCell}>juan.perez@example.com</Text>
            <Text style={styles.tableCell}>555-1234</Text>
            <Text style={styles.tableCell}>San Salvador</Text>
            <Text style={styles.tableCell}>San Salvador</Text>
          </View>
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Agregar registro</Text>
            {Object.keys(newRegistro).map((key) => (
              <TextInput
                key={key}
                style={styles.input}
                placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                value={newRegistro[key]}
                onChangeText={(text) => handleInputChange(key, text)}
              />
            ))}
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: '#FF790D' }]}
                onPress={handleGuardar}
              >
                <Text style={styles.modalButtonText}>Guardar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: '#C0C0C0' }]}
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
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  table: {
    borderWidth: 1,
    borderColor: '#ddd',
    width: '100%',
    marginBottom: 20,
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
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tableCell: {
    flex: 1,
    padding: 10,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  buttonContainer: {
    alignItems: 'flex-end',
    marginBottom: 10,
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
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 15,
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

export default CreditoFiscal;