import { useNavigation, useRoute } from '@react-navigation/core';
import React, { useCallback, useEffect, useState } from 'react';
import { 
  Alert, 
  StyleSheet, 
  Text, 
  View,
  Image,
  SafeAreaView
} from 'react-native';
import { Button } from '../components/Button';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

import img from '../assets/plants/imbe.png';
import waterdrop from '../assets/waterdrop.png';
import colors from '../styles/colors';
import { PlantData } from './PlantNew';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Params {
  plant: PlantData
}

interface StoragePlants {
  [id: string]: {
    name: string;
    photo: string;
    dateTimeNofication: Date;
    frequency: { 
      times: number; 
      repeat_every: string;
    }
    notificationId: string;
  }  
}


export function PlantEdit() {   
    const [selectedDateTime, setSelectedDateTime] = useState(new Date); 

    const navigation = useNavigation();

    const route = useRoute();
    const { plant } = route.params as Params;

    // com evento explicito => (event: Event, dateTime: Date | undefined)
    const handleChangeTime = useCallback((_, dateTime: Date | undefined) => {
      if(dateTime){
        setSelectedDateTime(dateTime);
      }
    },[]);


    const handleUpdate = useCallback(async () => {  
      const { times, repeat_every } = plant.frequency; 
      const nextMoment = selectedDateTime;

      if(repeat_every === 'week'){
        const interval = Math.trunc(7 / times);        
        nextMoment.setDate(nextMoment.getDate() + interval)
      }
      // else
      //   nextMoment.setDate(nextMoment.getDate() + 1)        

      try {        
        const data = await AsyncStorage.getItem('@plantmanager:plants');
        const plants = data 
        ? JSON.parse(data) as StoragePlants
        : {};

        const newPlant = {
            name: plant.name,
            photo: plant.photo,
            dateTimeNofication: selectedDateTime,
            frequency: plant.frequency            
        }

        // Cria a notificação.
        const notificationId = await Notifications.scheduleNotificationAsync({          
          content: {
            title: `Heeey, 🌱`,            
            body: `Está na hora de cuidar da sua ${plant.name}.`,
            sound: true,
            priority: Notifications.AndroidNotificationPriority.HIGH,            
            data: { plant:  {
                id: plant.id,
                ...newPlant
              } 
            }
          },
          trigger: {
            day: nextMoment.getDate(),
            month: nextMoment.getMonth() + 1,
            year: nextMoment.getFullYear(),
            hour: nextMoment.getHours(),
            minute: nextMoment.getMinutes(),
          },
        });
        
        const storagePlant = {[plant.id]: {...newPlant, notificationId}};        

        await AsyncStorage.setItem('@plantmanager:plants', JSON.stringify({...plants, ...storagePlant}));
        navigation.navigate('Confirmation', {
          title: 'Tudo certo',
          subtitle: 'Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com bastante amor.',
          buttonTitle: 'Muito obrigado :D',
          icon: 'hug',
          nextScreen: 'MyPlants'
        });

      } catch (error) {
        console.error(error)
        Alert.alert('Não foi possível cadastrar sua plantinha. 😢')
      }      
    },[selectedDateTime]);

    async function handleRemove(){
      try {
        const data = await AsyncStorage.getItem('@plantmanager:plants');
        const plants = data 
        ? JSON.parse(data) as StoragePlants
        : {};

        await Notifications.cancelScheduledNotificationAsync(plants[plant.id].notificationId);
        delete plants[plant.id];
        await AsyncStorage.setItem('@plantmanager:plants', JSON.stringify(plants));

        navigation.navigate('MyPlants');
      } catch (error) {
        Alert.alert('Não foi possível remover.');
      }
    };

    return (
        <SafeAreaView style={styles.container}> 
          <TouchableOpacity style={styles.removeButton} onPress={handleRemove}>
            <Text style={styles.removeButtonLabel}>Remover</Text>
          </TouchableOpacity>

          <View style={styles.header}>
            <Image source={img} style={styles.image}/>
            <Text style={styles.plantName}>{plant.name}</Text>
            <Text style={styles.plantAbout}>{plant.about}</Text>
          </View>
          
          <View style={styles.footer}>
            <View style={styles.tip}>
              <Image source={waterdrop} style={styles.tipImage} />
              <Text style={styles.tipText}>{plant.water_tips}</Text>
            </View>

            <Text style={styles.alertLabel}>Ecolha o melhor horário para ser lembrado:</Text>

            <DateTimePicker
              value={selectedDateTime}
              mode="time"
              display="spinner"
              onChange={handleChangeTime}
            />

            <Button title="Confirmar alteração" onPress={handleUpdate}/>
          </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({  
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: colors.shape,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 50,
    alignItems: 'center'
  },
  image: {
    width: 155,
    height: 175,
  },
  plantName: {
    textAlign: 'center',
    fontFamily: 'Jost_600SemiBold',
    fontSize: 24,
    color: colors.heading,
    marginTop: 15
  },
  plantAbout: {
    textAlign: 'center',
    fontFamily: 'Jost_400Regular',
    color: colors.heading,
    fontSize: 14,
    marginTop: 10
  },
  tip: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tipImage: {
    width: 50,
    height: 50
  },
  tipText: {
    flex: 1,
    marginLeft: 20,
    fontFamily: 'Jost_400Regular',
    color: colors.blue,
  },
  alertLabel: {
    textAlign: 'center',
    fontFamily: 'Jost_400Regular',
    color: colors.heading,
    fontSize: 12,
    marginTop: 15
  },
  footer: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingTop: 20
  },
  removeButton: {
    alignSelf: 'center'

  },
  removeButtonLabel: {
    color: colors.green_dark,
    fontWeight: 'bold'
  }
});
