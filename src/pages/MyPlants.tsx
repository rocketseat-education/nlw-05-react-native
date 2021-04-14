import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Alert, Image } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { PlantCardSecondary } from '../components/PlantCardSecondary';
import { Header } from '../components/Header';
import colors from '../styles/colors';

import waterdrop from '../assets/waterdrop.png';

export interface PlantData {
    id: string;
    name: string;
    photo: string;
    day: string;
    hour: string;
}

interface PlantsProps {
  id: string;
  name: string;
  about: string;
  water_tips: string;
  photo: string;
  day: string;
  hour: string;
}

interface StoragePlants {
  [id: string]: {
    name: string;
    about: string;
    water_tips: string;
    photo: string;
    dateTimeNofication: Date;
    frequency: { 
      times: number; 
      repeat_every: string;
    }
  }  
}

export function MyPlants() {   
  const [myplants, setMyPlants] = useState<PlantsProps[]>([])
  const [userName ,setUserName] = useState('');

  const navigation = useNavigation();
  
  function handleOpen(plant: PlantData){
    navigation.navigate('PlantEdit', { plant });
  }

  useEffect(() => {
    async function loadStorageDate(): Promise<void> {
      const user = await AsyncStorage.getItem('@plantmanager:user');
      setUserName(user || '');
    }     

    loadStorageDate();    
  },[]);

  useEffect(() => {
    async function loadStorageDate(): Promise<void> {
      const data = await AsyncStorage.getItem('@plantmanager:plants');
      const dataJson = data 
      ? JSON.parse(data) as StoragePlants
      : {} as StoragePlants;        

      const plantsFormatted = Object.keys(dataJson).map(plant => {
        const notification = new Date(dataJson[plant].dateTimeNofication);

        const day = new Date(notification).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
        });

        const hour = new Date(notification).toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute:'2-digit'
        });
        
        return {
          id: plant,
          name: dataJson[plant].name,
          photo: dataJson[plant].photo,
          about: dataJson[plant].about,
          water_tips: dataJson[plant].water_tips,
          day,
          hour
        }
      });

      setMyPlants(plantsFormatted)
    } 

    loadStorageDate();
  },[]);


    return (
      <View style={styles.container}>
        <Header userName={userName} />
          <View style={styles.spotlight}>
              <Image source={waterdrop} style={styles.spotlightImg}/>

              <Text style={styles.spotlightTitle}>
                  Não esqueça de regar a sua plantinha daqui a 2 horas
              </Text>
          </View>

          <View style={styles.plants}>
              <Text style={styles.plantsTitle}>Próximas regadas</Text>

              <FlatList 
                  data={myplants} 
                  renderItem={({ item }) => <PlantCardSecondary name={item.name} day={item.day} hour={item.hour} onPress={() => handleOpen(item)}/>}
                  keyExtractor={item => item.id}
                  showsVerticalScrollIndicator={false}   
              />                 
          </View>
      </View>
    );
}

const styles = StyleSheet.create({  
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingTop: 50,
    backgroundColor: colors.background,  
  },
  spotlight: {
    backgroundColor: colors.blue_light,
    paddingHorizontal: 20,       
    borderRadius: 20,  
    height: 110,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',       
  },
  spotlightImg: {
    width: 60,
    height: 60
  },
  spotlightTitle: {     
    flex: 1,
    color: colors.blue,
    paddingHorizontal: 20,    
  },
  plants: {  
    flex: 1,
    width: "100%",
  },
  plantsTitle: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: 'Jost_600SemiBold',
    color: colors.heading,
    marginVertical: 20
  },
});
