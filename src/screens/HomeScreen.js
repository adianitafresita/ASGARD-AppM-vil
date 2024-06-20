import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import handshakeImage from '../../assets/handshake.png';


export default function App() {
  return (
    <View style={styles.container}>
      <Image
        source={handshakeImage} 
        style={styles.image}
      />
      <Text style={styles.title}>Nuntium</Text>
      <Text style={styles.subtitle}>
        All new in one place, be the first to know last new
      </Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: 200, // Adjust the size according to your needs
    height: 100, // Adjust the size according to your needs
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#4A90E2',
    paddingVertical: 15,
    paddingHorizontal: 100,
    borderRadius: 15,
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignContent: "center",
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
  },
});
