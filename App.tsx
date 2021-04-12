import React from 'react';
import AppLoading from 'expo-app-loading';
import { 
  Jost_400Regular, 
  Jost_600SemiBold, 
  useFonts 
} from '@expo-google-fonts/jost';

import { UserIdentification } from './src/pages/UserIdentification';

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
    <UserIdentification />
  )
}

