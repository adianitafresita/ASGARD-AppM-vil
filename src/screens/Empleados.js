import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, FlatList, ScrollView, StyleSheet } from 'react-native';
import Input from '../components/Inputs/Input';
import Buttons from '../components/Buttons/Button';
import * as Constantes from '../utils/constantes';
import Card from '../components/Card/CardA';

// Función para manejar las solicitudes a la API
const fetchData = async (endpoint, action, formData = null) => {
  try {
    const response = await fetch(`${Constantes.IP}/ASGARD-web/api/services/admin/administrador.php?action=${action}`, {
      method: formData ? 'POST' : 'GET',
      body: formData,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return { status: false, message: 'Error al comunicarse con el servidor' };
  }
};

const App = () => {
  const [view, setView] = useState('list');
  const [administrators, setAdministrators] = useState([]);
  const [form, setForm] = useState({
    id_administrador: '',
    nombre_administrador: '',
    apellido_administrador: '',
    correo_administrador: '',
    clave_administrador: '',
    confirmarClave: ''
  });

  const initialFormState = {
    id_administrador: '',
    nombre_administrador: '',
    apellido_administrador: '',
    correo_administrador: '',
    clave_administrador: '',
    confirmarClave: ''
  };

  useEffect(() => {
    const fetchDataFromApi = async () => {
      const response = await fetchData('administrador', 'readAll');
      if (response.status) {
        setAdministrators(response.dataset);
      } else {
        console.error('Error fetching administrators:', response.message);
      }
    };

    fetchDataFromApi();
  }, []);

  useEffect(() => {
    if (view === 'create') {
      setForm(initialFormState);
    }
  }, [view]);

  const handleCreate = async () => {
    const formData = new FormData();
    formData.append('nombre_administrador', form.nombre_administrador);
    formData.append('apellido_administrador', form.apellido_administrador);
    formData.append('correo_administrador', form.correo_administrador);
    formData.append('clave_administrador', form.clave_administrador);

    const response = await fetchData('administrador', 'createRow', formData);
    if (response.status) {
      setView('list');
      refreshList();
    } else {
      Alert.alert('Error', response.message);
    }
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append('id_administrador', form.id_administrador);
    formData.append('nombre_administrador', form.nombre_administrador);
    formData.append('apellido_administrador', form.apellido_administrador);
    formData.append('correo_administrador', form.correo_administrador);
    formData.append('clave_administrador', form.clave_administrador);

    const response = await fetchData('administrador', 'updateRow', formData);
    if (response.status) {
      setView('list');
      refreshList();
    } else {
      Alert.alert('Error', response.message);
    }
  };

  const handleDelete = async (id) => {
    const formData = new FormData();
    formData.append('id_administrador', id);

    const response = await fetchData('administrador', 'deleteRow', formData);
    if (response.status) {
      refreshList();
    } else {
      Alert.alert('Error', response.message);
    }
  };

  const refreshList = async () => {
    const response = await fetchData('administrador', 'readAll');
    if (response.status) {
      setAdministrators(response.dataset);
    } else {
      console.error('Error fetching administrators:', response.message);
    }
  };

  const handleEdit = async (id) => {
    const formData = new FormData();
    formData.append('id_administrador', id);

    const response = await fetchData('administrador', 'readOne', formData);
    if (response.status) {
      setForm({
        id_administrador: response.dataset.id_administrador,
        nombre_administrador: response.dataset.nombre_administrador,
        apellido_administrador: response.dataset.apellido_administrador,
        correo_administrador: response.dataset.correo_administrador,
        clave_administrador: '',
        confirmarClave: ''
      });
      setView('edit');
    } else {
      Alert.alert('Error', response.message);
    }
  };

  const renderView = () => {
    switch (view) {
      case 'list':
        return (
          <View style={styles.listContainer}>
            <Text style={styles.texto}>Administradores</Text>
            <Input
              placeHolder='Buscar...'
              setValor={''} // Implementar lógica de búsqueda si es necesario
              setTextChange={() => {}}
            />
            <Buttons textoBoton="Agregar Administrador" accionBoton={() => setView('create')} />
            <FlatList
              data={administrators}
              keyExtractor={item => item.id_administrador.toString()}
              renderItem={({ item }) => (
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
              )}
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
              placeHolder='Correo'
              setValor={form.correo_administrador}
              setTextChange={(text) => setForm({ ...form, correo_administrador: text })}
            />
            <Input
              placeHolder='Clave'
              setValor={form.clave_administrador}
              setTextChange={(text) => setForm({ ...form, clave_administrador: text })}
              contra={true}
            />
            <Input
              placeHolder='Confirmar Clave'
              setValor={form.confirmarClave}
              setTextChange={(text) => setForm({ ...form, confirmarClave: text })}
              contra={true}
            />
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
        return null;
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
    backgroundColor: '#EAD8C0',
    padding: 10,
  },
  listContainer: {
    flex: 1,
    alignItems: 'center',
  },
  formContainer: {
    alignItems: 'center',
  },
  texto: {
    color: '#322C2B',
    fontWeight: '900',
    fontSize: 20,
    marginVertical: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
    width: '100%',
  },
  itemText: {
    color: '#322C2B',
    fontSize: 16,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#6f4e37',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default App;
