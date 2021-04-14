import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/core';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, FlatList, SafeAreaView, Text, View} from 'react-native';
import { EnvironmentButton } from '../components/EnvironmentButton';
import { Header } from '../components/Header';
import { Load } from '../components/Load';
import { PlantCardPrimary } from '../components/PlantCardPrimary';
import api from '../services/api';
import colors from '../styles/colors';

interface EnvironmentData {
  key: string;
  title: string;
}

export interface PlantData { 
  id: string;
  name: string;
  about: string;
  water_tips: string;
  photo: string;
  environments: string[], 
  frequency: { 
    times: number; 
    repeat_every: string;
  }
}

export function PlantNew() {  
  const [userName ,setUserName] = useState('');
  const [loading, setLoading] = useState(true);
  const [plants, setPlants] = useState<PlantData[]>([]);
  const [environments, setEnvironments] = useState<EnvironmentData[]>([]);
  const [environmentSelected, setEnvironmentSelected] = useState("living_room");

  const navigation = useNavigation();

  function handleSelectPlant(plant: PlantData){    
    navigation.navigate('PlantSave', { plant });
  }

  const handleEnvironmentSelected = useCallback((environment: string) => {    
    setEnvironmentSelected(environment);
  },[environmentSelected]);

  useEffect(() => {
    async function loadStorageDate(): Promise<void> {
      const user = await AsyncStorage.getItem('@plantmanager:user');
      setUserName(user || '');
    } 

    loadStorageDate();    
  },[]);

  useEffect(() => {
    async function fetchEnvironments(){
      const response = await api.get('plants_environments');
      setEnvironments(response.data)
    }

    fetchEnvironments();
  },[]);

  useEffect(() => {
    async function fetchEnvironments(){
      const response = await api.get('plants');

      const plantsByEnvironment = (response.data as PlantData[])
      .filter(plant => plant.environments
      .includes(environmentSelected));

      setPlants(plantsByEnvironment)
    }
    
    fetchEnvironments();
    setLoading(false);
  },[environmentSelected]);


  if(loading)
  return <Load />

  return (    
    <SafeAreaView style={styles.container}>
      <Header userName={userName} />

      <View style={styles.header}>
        <Text style={styles.title}>Em qual hambiente</Text>
        <Text style={styles.subtitle}>você quer colocar sua planta?</Text>
      </View>

      <View>
        <FlatList 
            data={environments} 
            renderItem={({ item }) => (
              <EnvironmentButton 
                title={item.title} 
                active={item.key === environmentSelected}
                onPress={() => handleEnvironmentSelected(item.key)}/>)}
            keyExtractor={item => item.key}
            horizontal    
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.environmentList}
        />
      </View>

      <FlatList 
        data={plants} 
        renderItem={({ item }) => (
          <PlantCardPrimary 
            data={ item } 
            onPress={() => handleSelectPlant(item)} />
            )
          }
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapperStyle}
        showsVerticalScrollIndicator={false}        
      />  
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({  
  container: {
    flex: 1,    
    justifyContent: 'flex-start',
    backgroundColor: colors.background
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    color: colors.heading,
    fontFamily: 'Jost_600SemiBold',
    lineHeight: 20,
    marginTop: 15,
  },
  subtitle: {
    fontFamily: 'Jost_400Regular',
    fontSize: 17,
    lineHeight: 20,
    color: colors.heading,
  },
  header: {
    padding: 20
  },
  environmentList: {    
    width: "100%",
    justifyContent: 'center',   
    paddingBottom: 5 
  }, 
  columnWrapperStyle: {
    justifyContent: "space-between",
  }
});
