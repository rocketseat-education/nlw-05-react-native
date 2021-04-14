import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import colors from '../styles/colors';

import { PlantNew } from '../pages/PlantNew';
import { MyPlants } from '../pages/MyPlants';

const AppTab = createBottomTabNavigator();

const AuthRoutes = () => {
  return(   
    <AppTab.Navigator
        tabBarOptions={{
            activeTintColor: colors.green,
            inactiveTintColor: colors.heading,
            labelPosition: 'beside-icon',                                    
        }}
    >
        <AppTab.Screen 
            name="Nova Planta" 
            component={PlantNew}
            options={{
                tabBarIcon: ({ size, color }) => (
                    <MaterialIcons 
                        name="add-circle-outline" 
                        size={size}
                        color={color}
                    />
                )
            }}            
        /> 
        <AppTab.Screen 
            name="Minhas Plantas" 
            component={MyPlants}
            options={{
                tabBarIcon: ({ size, color }) => (
                    <MaterialIcons 
                        name="format-list-bulleted" 
                        size={size}
                        color={color}
                    />
                )
            }}
        />   
    </AppTab.Navigator>
  )
};

export default AuthRoutes;