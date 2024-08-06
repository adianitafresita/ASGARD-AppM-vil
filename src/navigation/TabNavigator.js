// Navigation.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Screens
import HomeScreen from '../screens/HomeScreen';
import CreditoFiscal from '../screens/CreditoFiscal';
import Empleados from '../screens/Empleados';
import FacturaConsumidorFinal from '../screens/FacturaConsumidorFinal';
import FacturaSujetoExcluido from '../screens/FacturaSujetoExcluido';
import Clientes from '../screens/Clientes';
import Perfil from '../screens/Perfil';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false, // Oculta el header
        tabBarActiveTintColor: '#D87A22', // Color de los íconos activos
        tabBarInactiveTintColor: '#a69794', // Color de los íconos inactivos
        tabBarStyle: { backgroundColor: '#FFF', height: 60, borderTopWidth: 0 }, // Estilo de la barra de pestañas
        tabBarIcon: ({ focused, color, size }) => { // Función que define el ícono de la pestaña
          let iconName;
          let iconSize = focused ? 28 : 24; // Tamaño del ícono dependiendo del estado de la pestaña
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Credito Fiscal') {
            iconName = focused ? 'wallet' : 'wallet-outline';
          } else if (route.name === 'Empleados') {
            iconName = focused ? 'briefcase' : 'briefcase';
          } else if (route.name === 'FacturaConsumidorFinal') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'Clientes') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'Perfil') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'FacturaSujetoExcluido') {
            iconName = focused ? 'documents' : 'documents-outline';
          }
          return <Ionicons name={iconName} color={color} size={iconSize} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: '' }}
      />
      <Tab.Screen
        name="Credito Fiscal"
        component={CreditoFiscal}
        options={{ title: '' }}
      />
      <Tab.Screen
        name="Empleados"
        component={Empleados}
        options={{ title: '' }}
      />
      <Tab.Screen
        name="FacturaConsumidorFinal"
        component={FacturaConsumidorFinal}
        options={{ title: '' }}
      />
      <Tab.Screen
        name="FacturaSujetoExcluido"
        component={FacturaSujetoExcluido}
        options={{ title: '' }}
      />
      <Tab.Screen
        name="Clientes"
        component={Clientes}
        options={{ title: '' }}
      />
  
      <Tab.Screen
        name="Perfil"
        component={Perfil}
        options={{ title: '' }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;