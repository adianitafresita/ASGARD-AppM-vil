import React, { useState, useEffect } from 'react';
import { View, Text, Alert, FlatList, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Input from '../components/Inputs/Input_crud';
import Buttons from '../components/Buttons/Button';
import * as Constantes from '../utils/constantes';

const App = () => {
  const ip = Constantes.IP;
  const [view, setView] = useState('list');
  const [administrador, setAdministrador] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [form, setForm] = useState({
    id_administrador: '',
    nombre_administrador: '',
    apellido_administrador: '',
    email_administrador: '',
    contraseña_administrador: ''
  });

  const initialFormState = {
    id_administrador: '',
    nombre_administrador: '',
    apellido_administrador: '',
    email_administrador: '',
    clave_administrador: '',
  };

  useEffect(() => {
    fetch(`${ip}services/admin/administrador.php?action=readAll`)
      .then(response => response.json())  // Corrección: usamos .json() para obtener los datos
      .then(data => {
        setAdministrador(data.dataset || []); // Asegúrate de que dataset es un array
      })
      .catch(error => {
        console.error('Error al obtener los administradores:', error);
      });
  }, []);

  useEffect(() => {
    if (view === 'create') {
      setForm(initialFormState);
    }
  }, [view]);

  const handleCreate = async () => {
    const formData = new FormData();
    formData.append('nombreAdministrador', form.nombre_administrador);
    formData.append('apellidoAdministrador', form.apellido_administrador);
    formData.append('correoAdministrador', form.email_administrador);
    formData.append('claveAdministrador', form.contraseña_administrador);
    formData.append('confirmarClave', form.contraseña_administrador);

    try {
      const response = await fetch(`${ip}services/admin/administrador.php?action=createRow`, {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      if (result.status) {
        Alert.alert('Éxito', 'Administrador creado correctamente');
        setView('list');
        refreshList();
      } else {
        Alert.alert('Error', result.error);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Ocurrió un error al crear el administrador');
    }
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append('idAdministrador', form.id_administrador);

    formData.append('nombreAdministrador', form.nombre_administrador);
    formData.append('apellidoAdministrador', form.apellido_administrador);
    formData.append('correoAdministrador', form.email_administrador);
    console.log(form.email_administrador);
    try {
      const response = await fetch(`${ip}services/admin/administrador.php?action=updateRow2`, {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      if (data.status) {
        setView('list');
        refreshList();
      } else {
        Alert.alert('Error', data.error);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Ocurrió un error al actualizar el administrador');
    }
  };

  const handleDelete = async (id) => {
    const formData = new FormData();
    formData.append('idAdmin', id);

    try {
      const response = await fetch(`${ip}services/admin/administrador.php?action=deleteRow`, {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      if (data.status) {
        refreshList();
      } else {
        Alert.alert('Error', data.error);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Ocurrió un error al eliminar el administrador');
    }
  };

  const refreshList = () => {
    fetch(`${ip}services/admin/administrador.php?action=readAll`)
      .then(response => response.json())
      .then(data => setAdministrador(data.dataset || []));  // Verificación del dataset
  };

  const handleEdit = async (id) => {
    const formData = new FormData();
    formData.append('idAdmin', id);

    try {
      const response = await fetch(`${ip}services/admin/administrador.php?action=readOne`, {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      if (data.status) {
        setForm({
          id_administrador: data.dataset.id_administrador,
          nombre_administrador: data.dataset.nombre_administrador,
          apellido_administrador: data.dataset.apellido_administrador,
          email_administrador: data.dataset.email_administrador,
          contraseña_administrador: '',
        });
        setView('edit');
      } else {
        Alert.alert('Error', data.error);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Ocurrió un error al obtener el administrador');
    }
  };

  const renderView = () => {
    switch (view) {
      case 'list':
        return (
          <View style={styles.listContainer}>
            <Text style={styles.texto}>Administradores</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar por nombre, apellido o email"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <Buttons textoBoton="Agregar administrador" accionBoton={() => setView('create')} />
            <FlatList
              data={administrador}
              keyExtractor={item => item.id_administrador.toString()}
              renderItem={({ item }) => {
                if (!item) {
                  return <Text>No se encontraron registros</Text>;
                }
                return (
                  <View style={styles.itemContainer}>
                    <Text style={styles.itemText}>{item.nombre_administrador} {item.apellido_administrador}</Text>
                    <View style={styles.buttonsContainer}>
                      <TouchableOpacity onPress={() => handleEdit(item.id_administrador)} style={styles.button}>
                        <Text style={styles.buttonText}>Editar</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => handleDelete(item.id_administrador)} style={styles.button}>
                        <Text style={styles.buttonText}>Eliminar</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              }}
              ListEmptyComponent={<Text>No hay datos disponibles</Text>}
            />
          </View>
        );
      case 'create':
      case 'edit':
        return (
          <ScrollView contentContainerStyle={styles.formContainer}>
            <Text style={styles.texto}>{view === 'create' ? 'Crear Administrador' : 'Editar Administrador'}</Text>
            <Input
              placeHolder='Nombre'
              setValor={form.nombre_administrador}
              setTextChange={(text) => setForm({ ...form, nombre_administrador: text })}
            />
            <Input
              placeHolder='Apellido'
              setValor={form.apellido_administrador}
              setTextChange={(text) => setForm({ ...form, apellido_administrador: text })}
            />
            <Input
              placeHolder='Email'
              setValor={form.email_administrador}
              setTextChange={(text) => setForm({ ...form, email_administrador: text })}
            />
            {/* Mostrar el campo de contraseña solo si se está creando un administrador */}
            {view === 'create' && (
              <Input
                placeHolder='Contraseña'
                setValor={form.contraseña_administrador}
                setTextChange={(text) => setForm({ ...form, contraseña_administrador: text })}
                secureTextEntry
              />
            )}
            <Buttons
              textoBoton={view === 'create' ? 'Crear' : 'Actualizar'}
              accionBoton={view === 'create' ? handleCreate : handleUpdate}
            />
            <Buttons
              textoBoton='Cancelar'
              accionBoton={() => setView('list')}
            />
          </ScrollView>

        );
      default:
        return <View><Text>Vista no encontrada</Text></View>;
    }
  };

  return (
    <View style={styles.container}>
      {renderView()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  listContainer: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
    padding: 20,
  },
  texto: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  searchInput: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  itemContainer: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  itemText: {
    fontSize: 16,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
  },
});

export default App;