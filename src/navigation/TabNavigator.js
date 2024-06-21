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

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (

<Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false, // Oculta el header
      tabBarActiveTintColor: '#D87A22', // Color de los íconos activos
      tabBarInactiveTintColor: '#B99873', // Color de los íconos inactivos
      tabBarStyle: { backgroundColor: '#FFF', height: 60, borderTopWidth: 0 }, // Estilo de la barra de pestañas
      tabBarIcon: ({ focused, color, size }) => { // Función que define el ícono de la pestaña
        let iconName;
        if (route.name === 'Home') {
          iconName = focused ? 'home' : 'home-outline';
        }else if (route.name === 'Credito Fiscal') {
          iconName = focused ? 'wallet' : 'wallet-outline';
         } else if (route.name === 'Empleados') {
          iconName = focused ? 'people' : 'people-outline';
        } else if (route.name === 'FacturaConsumidorFinal') {
          iconName = focused ? 'cart' : 'cart-outline';
        }
        else if (route.name === 'FacturaSujetoExcluido') {
          iconName = focused ? 'documents' : 'documents-outline';
        }
        return <Ionicons name={iconName} color={color} size={size} />;
      },
    })}
  >
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{ title: 'Inicio' }}
    />
    <Tab.Screen
        name="Credito Fiscal"
        component={CreditoFiscal}
        options={{ title: 'Credito Fiscal' }}
      />
       <Tab.Screen
        name="Empleados"
        component={Empleados}
        options={{ title: 'Empleados' }}
      />
       <Tab.Screen
        name="FacturaConsumidorFinal"
        component={FacturaConsumidorFinal}
        options={{ title: 'ConsumidorFinal' }}
      />
      <Tab.Screen
        name="FacturaSujetoExcluido"
        component={FacturaSujetoExcluido}
        options={{ title: 'SujetoExcluido' }}
      />
  </Tab.Navigator>
  
  );
};

export default TabNavigator;