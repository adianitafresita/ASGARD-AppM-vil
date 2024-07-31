import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Buttons({ textoBoton, accionBoton }) {

    return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={accionBoton}>
                <Text style={styles.buttonText}>{textoBoton}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20 // Añadir padding alrededor del botón
    },
    button: {
        borderWidth: 1,
        borderColor: "#000",
        width: 200,
        borderRadius: 8,
        backgroundColor: "#000",
        padding: 10,
        marginVertical: 5
    },
    buttonText: {
        textAlign: 'center',
        color: "#FFF",
        textTransform: 'uppercase',
    }
});
