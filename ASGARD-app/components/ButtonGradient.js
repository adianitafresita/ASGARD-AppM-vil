import React from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function ButtonGradient() {
    return (
        <TouchableOpacity style={styles.container}>
            <LinearGradient
                // Button Linear Gradient
                colors={['#FF790D', '#FFA500']}
                style={styles.button}
            >
                <Text style={styles.text}>Iniciar sesión</Text>
            </LinearGradient>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        width: '80%',
        marginTop: 60,
    },
    text: {
        fontSize: 14,
        color: '#fff',
    },
    button: {
        width: '80%',
        height: 50,
        borderRadius:25,
        padding:10,
        alignItems: 'center',
    },
});