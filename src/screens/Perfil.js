import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, TextInput, Switch } from 'react-native';
import Buttons from "../components/Buttons/Button";
import fetchData from '../utils/fetchdata';

export default function PerfilAdministrador({ navigation }) {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [contraseñaActual, setContraseñaActual] = useState('');
    const [nuevaContraseña, setNuevaContraseña] = useState('');
    const [confirmarContraseña, setConfirmarContraseña] = useState('');
    const [cambiarContraseña, setCambiarContraseña] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    // Estados para mostrar mensajes de error
    const [nombreError, setNombreError] = useState('');
    const [apellidoError, setApellidoError] = useState('');
    const [emailError, setEmailError] = useState('');

    const handleLogout = async () => {
        try {
            const data = await fetchData('administrador', 'logOut');
            if (data.status) {
                Alert.alert('Éxito', 'Sesión cerrada correctamente');
                navigation.replace('Login');
            } else {
                Alert.alert('Error', data.message || 'Error desconocido');
            }
        } catch (error) {
            Alert.alert('Error', 'Ocurrió un error al cerrar la sesión');
        }
    };

    const getUser = async () => {
        try {
            const data = await fetchData('administrador', 'readProfile');
            if (data.status) {
                setEmail(data.dataset.email_administrador || '');
                setNombre(data.dataset.nombre_administrador || '');
                setApellido(data.dataset.apellido_administrador || '');
            } else {
                Alert.alert('Error', data.message || 'No se pudo obtener la información del perfil');
            }
        } catch (error) {
            Alert.alert('Error', 'Ocurrió un error al obtener la información del perfil');
        }
    };

    const validateNombre = (text) => {
        setNombre(text);
        if (text === '') {
            setNombreError('El nombre no puede estar vacío.');
        } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(text)) {
            setNombreError('El nombre solo puede contener letras y espacios.');
        } else {
            setNombreError('');
        }
    };

    const validateApellido = (text) => {
        setApellido(text);
        if (text === '') {
            setApellidoError('El apellido no puede estar vacío.');
        } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(text)) {
            setApellidoError('El apellido solo puede contener letras y espacios.');
        } else {
            setApellidoError('');
        }
    };

    const validateEmail = (text) => {
        setEmail(text);
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (text === '') {
            setEmailError('El correo no puede estar vacío.');
        } else if (!emailPattern.test(text)) {
            setEmailError('El correo no es válido.');
        } else {
            setEmailError('');
        }
    };

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleSaveChanges = async () => {
        if (nombreError || apellidoError || emailError) {
            Alert.alert('Error', 'Por favor corrige los errores antes de guardar.');
            return;
        }

        if (!nombre || !apellido || !email) {
            Alert.alert('Error', 'Todos los campos son obligatorios.');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('nombreAdministrador', nombre);
            formData.append('apellidoAdministrador', apellido);
            formData.append('emailAdministrador', email);

            if (cambiarContraseña) {
                formData.append('contraseñaActual', contraseñaActual);
                formData.append('nuevaContraseña', nuevaContraseña);
            }

            const data = await fetchData('administrador', 'editProfile', formData);

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
                    onChangeText={validateNombre}
                    editable={isEditing}
                />
                {nombreError ? <Text style={styles.error}>{nombreError}</Text> : null}
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Apellidos: </Text>
                <TextInput
                    style={styles.input}
                    value={apellido}
                    onChangeText={validateApellido}
                    editable={isEditing}
                />
                {apellidoError ? <Text style={styles.error}>{apellidoError}</Text> : null}
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Correo: </Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={validateEmail}
                    editable={isEditing}
                />
                {emailError ? <Text style={styles.error}>{emailError}</Text> : null}
            </View>

            {isEditing && (
                <>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Contraseña actual: </Text>
                        <TextInput
                            style={styles.input}
                            value={contraseñaActual}
                            onChangeText={setContraseñaActual}
                            editable={isEditing}
                            secureTextEntry
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Nueva contraseña: </Text>
                        <TextInput
                            style={styles.input}
                            value={nuevaContraseña}
                            onChangeText={setNuevaContraseña}
                            editable={isEditing}
                            secureTextEntry
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Confirmar nueva contraseña: </Text>
                        <TextInput
                            style={styles.input}
                            value={confirmarContraseña}
                            onChangeText={setConfirmarContraseña}
                            editable={isEditing}
                            secureTextEntry
                        />
                    </View>
                </>
            )}

            <View style={styles.switchContainer}>
                <Text style={styles.label}>Cambiar contraseña:</Text>
                <Switch
                    value={cambiarContraseña}
                    onValueChange={setCambiarContraseña}
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
    error: {
        color: 'red',
        fontSize: 12,
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
});