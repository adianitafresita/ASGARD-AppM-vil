import * as React from 'react';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importa tus pantallas
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import Navigator from './src/navigation/TabNavigator';
import CreditoFiscal from './src/screens/CreditoFiscal';
import Empleados from './src/screens/Empleados';
import FacturaConsumidorFinal from './src/screens/FacturaConsumidorFinal';
import FacturaSujetoExcluido from './src/screens/FacturaSujetoExcluido';
import Envio from './src/screens/Envio';
import Nueva from './src/screens/Nueva';
import confirmarCodigo from './src/screens/confirmarCodigo';
import LoadingScreen from './src/screens/LoadingScreen'; // Importa la pantalla de carga

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Ajusta el tiempo de carga según sea necesario

    return () => clearTimeout(timer);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isLoading ? "Loading" : "Login"} screenOptions={{ headerShown: false }}>
        {isLoading ? (
          <Stack.Screen name="Loading" component={LoadingScreen} />
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="CreditoFiscal" component={CreditoFiscal} />
            <Stack.Screen name="Empleados" component={Empleados} />
            <Stack.Screen name="FacturaConsumidorFinal" component={FacturaConsumidorFinal} />
            <Stack.Screen name="FacturaSujetoExcluido" component={FacturaSujetoExcluido} />
            <Stack.Screen name="Envio" component={Envio} />
            <Stack.Screen name="Nueva" component={Nueva} />
            <Stack.Screen name="confirmarCodigo" component={confirmarCodigo} />
            <Stack.Screen name="Navigator" component={Navigator} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
