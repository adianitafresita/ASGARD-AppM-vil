import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, TextInput } from 'react-native';
import Buttons from "../components/Buttons/Button";
import fetchData from '../utils/fetchdata';

export default function PerfilAdministrador({ navigation }) {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const handleLogout = async () => {
    try {
      const data = await fetchData('administrador', 'logOut');
      console.log('Respuesta del cierre de sesión:', data);
      if (data.status) {
        Alert.alert('Éxito', 'Sesión cerrada correctamente');
        navigation.replace('Login'); // Navegar a la pantalla de inicio de sesión
      } else {
        if (data.error === 'Acción no disponible fuera de la sesión') {
          Alert.alert('Sesión expirada', 'Tu sesión ha expirado, por favor inicia sesión nuevamente.');
          navigation.replace('Login'); // Navegar a la pantalla de inicio de sesión
        } else {
          Alert.alert('Error', data.error || 'Error desconocido');
        }
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al cerrar la sesión');
    }
  };

  const getUser = async () => {
    try {
        const data = await fetchData('administrador', 'readProfile'); // Cambia 'getUser' a 'readProfile' si es necesario
        if (data.status) {
            // Asegúrate de que los nombres coincidan con los que devuelve tu API
            setEmail(data.dataset.email_administrador || '');
            setNombre(data.dataset.nombre_administrador || '');
            setApellido(data.dataset.apellido_administrador || '');
            setContraseña(data.dataset.contraseña_administrador || '');
        } else {
            Alert.alert('Error', data.message || 'No se pudo obtener la información del perfil');
        }
    } catch (error) {
        Alert.alert('Error', 'Ocurrió un error al obtener la información del perfil');
    }
};

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveChanges = async () => {
    try {
      const data = await fetchData('administrador', 'editProfile', {
        nombre_administrador: nombre,
        apellido_administrador: apellido,
        email_administrador: email,
        contraseña_administrador: contraseña,
      });
      if (data.status) {
        Alert.alert('Éxito', 'Perfil actualizado correctamente');
        setIsEditing(false);
      } else {
        Alert.alert('Error', data.message || 'No se pudo actualizar el perfil');
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al actualizar el perfil');
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi perfil</Text>
      <Text style={styles.subtitle}>En este apartado podrás editar tu perfil</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nombres: </Text>
        <TextInput
          style={styles.input}
          value={nombre}
          onChangeText={setNombre}
          editable={isEditing}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Apellidos: </Text>
        <TextInput
          style={styles.input}
          value={apellido}
          onChangeText={setApellido}
          editable={isEditing}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Correo: </Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          editable={isEditing}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Contraseña: </Text>
        <TextInput
          style={styles.input}
          value={contraseña}
          onChangeText={setContraseña}
          editable={isEditing}
          secureTextEntry
        />
      </View>

      {isEditing ? (
        <Buttons textoBoton="Guardar cambios" accionBoton={handleSaveChanges} />
      ) : (
        <Buttons textoBoton="Editar información" accionBoton={handleEditToggle} />
      )}

      <Buttons
        textoBoton='Cerrar Sesión'
        accionBoton={handleLogout}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F5F4',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  label: {
    flex: 1,
    fontWeight: 'bold',
  },
  input: {
    flex: 2,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 5,
  },
});
