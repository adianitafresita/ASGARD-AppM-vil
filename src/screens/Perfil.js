import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import fetchData from "../utils/fetchdata";
import Buttons from '../components/Buttons/Button';
import InputPerfil from '../components/Inputs/InputEdit';

export default function PerfilAdministrador({ navigation }) {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [contraseñaActual, setContraseñaActual] = useState("");
  const [nuevaContraseña, setNuevaContraseña] = useState("");
  const [confirmarContraseña, setConfirmarContraseña] = useState("");
  const [cambiarContraseña, setCambiarContraseña] = useState(false);

  const getPerfilData = async () => {
    try {
      const DATA = await fetchData("administrador", "readProfile");
      if (DATA.status) {
        const usuario = DATA.dataset;
        setNombre(usuario.nombre_administrador);
        setApellido(usuario.apellido_administrador);
        setCorreo(usuario.email_administrador);
      } else {
        Alert.alert("Error", DATA.error);
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Ocurrió un error al obtener los datos del perfil");
    }
  };

  const handlerEditarPerfil = async () => {
    if (cambiarContraseña && nuevaContraseña !== confirmarContraseña) {
      Alert.alert("Error", "Las nuevas contraseñas no coinciden.");
      return;
    }

    try {
      const form = new FormData();
      form.append("nombreAdministrador", nombre);
      form.append("apellidoAdministrador", apellido);
      form.append("emailAdministrador", correo);

      if (cambiarContraseña) {
        form.append("contraseñaActual", contraseñaActual);
        form.append("nuevaContraseña", nuevaContraseña);
      }

      const DATA = await fetchData("administrador", "editProfile", form);
      if (DATA.status) {
        Alert.alert("Hecho!", DATA.message);
      } else {
        Alert.alert("Error", DATA.error);
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Ocurrió un error al editar el perfil");
    }
  };

  const handleLogout = async () => {
    try {
      const DATA = await fetchData("administrador", "logOut");
      if (DATA.status) {
        navigation.navigate('Login'); 
      } else {
        Alert.alert('Error', DATA.error);
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al cerrar la sesión');
    }
  };

  const navigateCambioContra = () => {
    navigation.navigate("Envio");
  };

  useEffect(() => {
    getPerfilData();
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>Información del Administrador</Text>
        <View style={styles.mainContainer}>
          <InputPerfil
            placeHolder="Nombre"
            setValor={nombre}
            setTextChange={setNombre}
          />
          <InputPerfil
            placeHolder="Apellido"
            setValor={apellido}
            setTextChange={setApellido}
          />
          <InputPerfil
            placeHolder="Correo"
            setValor={correo}
            setTextChange={setCorreo}
          />
          {cambiarContraseña && (
            <>
              <InputPerfil
                placeHolder="Contraseña Actual"
                setValor={contraseñaActual}
                setTextChange={setContraseñaActual}
                secureTextEntry
              />
              <InputPerfil
                placeHolder="Nueva Contraseña"
                setValor={nuevaContraseña}
                setTextChange={setNuevaContraseña}
                secureTextEntry
              />
              <InputPerfil
                placeHolder="Confirmar Nueva Contraseña"
                setValor={confirmarContraseña}
                setTextChange={setConfirmarContraseña}
                secureTextEntry
              />
            </>
          )}
          <Buttons textoBoton='Editar Perfil' accionBoton={handlerEditarPerfil} />
          <Buttons textoBoton='Cambiar Contraseña' accionBoton={navigateCambioContra} />
          <Buttons textoBoton='Cerrar Sesión' accionBoton={handleLogout} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 70,
  },
  mainContainer: {
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
});
