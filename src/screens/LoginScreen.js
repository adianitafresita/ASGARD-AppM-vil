import React, { useEffect, useState } from 'react';
import { View, Text, Alert, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import fetchData from '../utils/fetchdata';
import Input from "../components/Inputs/Input";

// imagen de logo
const logo = require('../../assets/logo.webp');
const backgroundImage = require('../../assets/login-wallpaper.png'); 

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [contrasenia, setContraseña] = useState("");

    const validarSesion = async () => {
        try {
            const DATA = await fetchData("administrador", "getUser");
            if (DATA.session) {
                setContraseña("");
                setEmail("");
                navigation.replace("Navigator");
            } else {
                console.log("No hay sesión activa");
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "Ocurrió un error al validar la sesión");
        }
    };

    const handlerLogin = async () => {
        try {
            const form = new FormData();
            form.append("email", email);
            form.append("clave", contrasenia);

            const DATA = await fetchData("administrador", "logIn", form);

            if (DATA.status) {
                setContraseña("");
                setEmail("");
                navigation.replace("Navigator");
            } else {
                console.log(DATA);
                Alert.alert("Error sesión", DATA.error);
            }
        } catch (error) {
            console.error(error, "Error desde Catch");
            Alert.alert("Error", "Ocurrió un error al iniciar sesión");
        }
    };

    useEffect(() => {
        validarSesion();
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.LogoContainer}>
                <Image source={logo} style={styles.Logo} />
                <View style={styles.Hr}></View>
            </View>
            <View style={styles.MainContainer}>
                <Text style={styles.MainText}>Inicio de sesión</Text>
                <Text style={styles.SubMainText}>Bienvenido de nuevo!</Text>

                <Text style={styles.label}>Correo</Text>
                <Input
                    placeHolder="ejemplo@gmail.com"
                    setValor={email}
                    setTextChange={setEmail}
                    contra={false}
                />

                <Text style={styles.label}>Contraseña</Text>
                <Input
                    placeHolder="Digita tu contraseña"
                    setValor={contrasenia}
                    setTextChange={setContraseña}
                    contra={true}
                />

                <TouchableOpacity style={styles.button} onPress={handlerLogin}>
                    <Text style={styles.buttonText}>Iniciar Sesión</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#3D2B29',
        paddingHorizontal: 20,
        justifyContent: 'center', // Centrar verticalmente el contenido
    },
    LogoContainer: {
        alignItems: 'center',
        marginBottom: 30,
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
    },
    MainContainer: {
        marginHorizontal: 10,
    },
    MainText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: "#FF833A",
    },
    SubMainText: {
        fontSize: 18,
        marginBottom: 20,
        color: "white",
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: "white",
    },
    button: {
        backgroundColor: 'rgb(255,165,58)', // Base color for the button
        borderRadius: 20,
        paddingVertical: 12,
        paddingHorizontal: 100,
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: 'transparent', // Ensures the border is only visible on hover
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
