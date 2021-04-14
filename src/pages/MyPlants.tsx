import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Alert, Image } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { PlantCardSecondary } from '../components/PlantCardSecondary';
import { Header } from '../components/Header';
import colors from '../styles/colors';
import { formatDistance } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';


import waterdrop from '../assets/waterdrop.png';
import { Load } from '../components/Load';

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
    dateTimeNotification: Date;
    frequency: {
      times: number;
      repeat_every: string;
    }
  }
}

export function MyPlants() {
  const [myplants, setMyPlants] = useState<PlantsProps[]>([])
  const [userName ,setUserName] = useState('');
  const [loading, setLoading] = useState(true);
  const [nextWatered, setNextWatered] = useState<string>();

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

      console.log(!!dataJson)


      const plantsFormatted = Object.keys(dataJson)
      .map(plant => {
        const notification = new Date(dataJson[plant].dateTimeNotification);

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
          hour,
          dateTimeNotification: dataJson[plant].dateTimeNotification
        }
      }).sort((a, b) =>
          Math.floor((new Date(a.dateTimeNotification).getTime() / 1000) - Math.floor((new Date(b.dateTimeNotification).getTime() / 1000)))
      );

      const hours =formatDistance(
        new Date(plantsFormatted[0].dateTimeNotification).getTime(),
        new Date().getTime(),
        {locale: pt}
      );

      setNextWatered(`Não esqueça de regar a ${plantsFormatted[0].name} à ${hours} horas.`);
      setMyPlants(plantsFormatted);
      setLoading(false);
    }

    loadStorageDate();
  },[]);


  if(loading)
    return <Load />

    return (
      <View style={styles.container}>
        <Header userName={userName} />

        <View style={styles.spotlight}>
            <Image source={waterdrop} style={styles.spotlightImg}/>

            <Text style={styles.spotlightTitle}>
                {nextWatered}
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
    justifyContent: 'space-between',
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
  noPlantsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  noPlantsContainerText: {
    fontFamily: 'Jost_400Regular',
    color: colors.heading
  }
});
