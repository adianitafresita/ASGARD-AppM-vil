
import React, {useEffect, useState } from 'react';
import { View, 
  Text,
  ActivityIndicator,
  StyleSheet,
  Alert,
  Image} from 'react-native';

import fetchData from '../utils/fetchdata';
import Input from "../components/Inputs/Input";
import Buttons from "../components/Buttons/Button";

// imagen de logo
const logo = require('../../assets/logo.webp');

export default function LoginScreen({ navigation }) {
    // Estados para almacenar el correo electrónico y la contraseña
    const [isContra, setIsContra] = useState(true);
    const [email, setEmail] = useState("");
    const [contrasenia, setContraseña] = useState("");

    const validarSesion = async () => {
        try {
            const DATA = await fetchData("administrador", "getUser");
            if (DATA.session) {
                setContraseña("");
                setEmail("");
                navigation.replace("TabNavigator");
            } else {
                console.log("No hay sesión activa");
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "Ocurrió un error al validar la sesión");
        }
    };

    // Función para manejar el inicio de sesión
    const handlerLogin = async () => {
        try {
            // Crear un FormData con los datos de usuario y contraseña
            const form = new FormData();
            form.append("email_administrador", email);
            form.append("contraseña_administrador", contrasenia);

            // Realizar una solicitud para iniciar sesión usando fetchData
            const DATA = await fetchData("administrador", "logIn", form);

            // Verificar la respuesta del servidor
            if (DATA.status) {
                // Limpiar los campos de usuario y contraseña
                setContraseña("");
                setEmail("");
                // Navegar a la pantalla principal de la aplicación
                navigation.replace("TabNavigator");
            } else {
                // Mostrar una alerta en caso de error durante el inicio de sesión
                console.log(DATA);
                Alert.alert("Error sesión", DATA.error);
            }
        } catch (error) {
            // Manejar errores que puedan ocurrir durante la solicitud
            console.error(error, "Error desde Catch");
            Alert.alert("Error", "Ocurrió un error al iniciar sesión");
        }
    };

    useEffect(() => {
        validarSesion();
    }, []);

    return (
        <View style={styles.container}>
            {/* Contenedor del logotipo */}
            <View style={styles.LogoContainer}>
                <Image source={logo} style={styles.Logo} />
                { }
                <View style={styles.Hr}></View>
            </View>
            {/* Contenedor principal del formulario */}
            <View style={styles.MainContainer}>
                <Text style={styles.MainText}>Inicio de sesión</Text>
                <Text style={styles.SubMainText}>Bienvenido de nuevo!</Text>

                {/* Campo de entrada para el correo electrónico */}
                <Text style={styles.label}>Correo</Text>
                <Input
                    style={styles.input}
                    setValor={email}
                    setTextChange={setEmail}
                    placeholder="ejemplo@gmail.com"
                    placeholderTextColor="#909090"
                />

                {/* Campo de entrada para la contraseña */}
                <Text style={styles.label}>Contraseña</Text>
                <Input
                    style={styles.input}
                    setValor={contrasenia}
                    setTextChange={setContraseña}
                    placeholder="Digita tu contraseña"
                    secureTextEntry
                    placeholderTextColor="#909090"
                />

                {/* Botón para iniciar sesión */}
                <Buttons textoBoton= "Iniciar Sesión" accionBoton={handlerLogin} />
            </View>
        </View>
    );
}


// Estilos para los componentes de la pantalla
const styles = StyleSheet.create({
    container: {
        height: "100%",
        backgroundColor: '#3D2B29',
        justifyContent: 'start',
        paddingHorizontal: 20,
    },
    LogoContainer: {
        alignItems: 'center',
        marginTop: 50,
        height: 150
    },
    Logo: {
        width: 100,
        height: 120,
    },
    Hr: {
        width: '100%',
        height: 2,
        backgroundColor: 'white',
        marginVertical: 10,
        marginTop: 30
    },
    MainContainer: {
        marginTop: 50,
    },
    MainText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: "#FF833A"
    },
    SubMainText: {
        fontSize: 18,
        marginBottom: 20,
        color: "white"
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: "white"
    },
    input: {
        borderWidth: 2,
        borderColor: '#FF833A',
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginBottom: 10,
        fontSize: 16,
        color: '#fff',
    },
    button: {
        backgroundColor: '#FF833A',
        paddingVertical: 12,
        borderRadius: 5,
        marginTop: 30,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
