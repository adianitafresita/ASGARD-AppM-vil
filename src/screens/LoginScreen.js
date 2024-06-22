import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

// imagen de logo
const logo = require('../../assets/logo.webp');

export default function LoginForm({ navigation }) {
    // Estados para almacenar el correo electrónico y la contraseña
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Función para navegar a la pantalla principal después del inicio de sesión
    const irIncio = async () => {
        navigation.navigate('Navigator');
    };

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
                <TextInput
                    style={styles.input}
                    onChangeText={setEmail}
                    value={email}
                    placeholder="ejemplo@gmail.com"
                    placeholderTextColor="#909090"
                />

                {/* Campo de entrada para la contraseña */}
                <Text style={styles.label}>Contraseña</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setPassword}
                    value={password}
                    placeholder="Digita tu contraseña"
                    secureTextEntry
                    placeholderTextColor="#909090"
                />

                {/* Botón para iniciar sesión */}
                <TouchableOpacity style={styles.button} onPress={irIncio}>
                    <Text style={styles.buttonText}>Iniciar Sesión</Text>
                </TouchableOpacity>
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
