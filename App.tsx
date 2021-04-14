import React, { useEffect, useState } from 'react';
import AppLoading from 'expo-app-loading';
import { 
  Jost_400Regular, 
  Jost_600SemiBold, 
  useFonts 
} from '@expo-google-fonts/jost';

import Routes from './src/routes';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {

  const [fontsLoaded] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold
  });

  if(!fontsLoaded){
    // keep splash screen visible.
    return <AppLoading />
  }

  return (
    <Routes />
  )
}

