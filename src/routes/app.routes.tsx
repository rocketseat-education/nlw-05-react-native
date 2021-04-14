import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import colors from '../styles/colors';

import { Welcome } from '../pages/Welcome';
import { UserIdentification } from '../pages/UserIdentification';
import { Confirmation } from '../pages/Confirmation';
import { PlantSave } from '../pages/PlantSave';

import AuthRoutes from './auth.routes';
const AppStack = createStackNavigator();

const AppRoutes: React.FC = () => {
  return(
    <AppStack.Navigator 
    headerMode="none" 
    screenOptions={{
        cardStyle: {
            backgroundColor: colors.background
        }
    }}
    >
        <AppStack.Screen name="Welcome" component={Welcome}/>    
        <AppStack.Screen name="UserIdentification" component={UserIdentification}/>    
        <AppStack.Screen name="Confirmation" component={Confirmation}/>    
        <AppStack.Screen name="PlantNew" component={AuthRoutes}/>            
        <AppStack.Screen name="PlantSave" component={PlantSave}/>            
    </AppStack.Navigator>
  )
};

export default AppRoutes;