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
      try {        
        const data = await AsyncStorage.getItem('@plantmanager:plants');
        const plants = data 
        ? JSON.parse(data) as StoragePlants
        : {};

        const newTime = new Date(plants[plant.id].dateTimeNofication);
        newTime.setHours(selectedDateTime.getHours());
        newTime.setMinutes(selectedDateTime.getMinutes());
        plants[plant.id].dateTimeNofication = newTime;

        
        plants[plant.id].dateTimeNofication = newTime;
        await AsyncStorage.setItem('@plantmanager:plants', JSON.stringify(plants));
        navigation.navigate('MyPlants');
        
      } catch (error) {
        console.error(error)
        Alert.alert('Não foi possível atualizar sua plantinha. 😢')
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

    useEffect(() => {
      async function loadData(){
        const data = await AsyncStorage.getItem('@plantmanager:plants');
        const plants = data 
        ? JSON.parse(data) as StoragePlants
        : {};

        setSelectedDateTime(new Date(plants[plant.id].dateTimeNofication));
      }

      loadData();
    },[]);

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
