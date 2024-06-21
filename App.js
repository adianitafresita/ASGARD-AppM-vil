import * as React from 'react';
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

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CreditoFiscal" component={CreditoFiscal} />
        <Stack.Screen name="Empleados" component={Empleados} />
        <Stack.Screen name="FacturaConsumidorFinal" component={FacturaConsumidorFinal} />
        <Stack.Screen name="FacturaSujetoExcluido" component={FacturaSujetoExcluido} />
        <Stack.Screen name="Navigator" component={Navigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
