import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, TextInput, TouchableOpacity } from 'react-native';
import Buttons from "../components/Buttons/Button";
import fetchData from '../utils/fetchdata';
import Login from "../screens/LoginScreen"

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
        if (navigation && typeof navigation.navigate === 'function') {
          navigation.navigate('LoginScreen');
        } else {
          console.error('Navegación no disponible');
        }
      } else {
        Alert.alert('Error', data.error || 'Error desconocido');
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al cerrar la sesión');
    }
  };

  const getUser = async () => {
    try {
      const data = await fetchData('administrador', 'getUser');
      if (data.status) {
        setNombre(data.nombre_administrador || '');
        setApellido(data.apellido_administrador || '');
        setEmail(data.email_administrador || '');
        setContraseña(data.contraseña_administrador || '');
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
