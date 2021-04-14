import { useNavigation, useRoute } from '@react-navigation/core';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

import { Button } from '../components/Button';

import colors from '../styles/colors';
import img from '../assets/plants/imbe.png';
import waterdrop from '../assets/waterdrop.png';

import { PlantData } from './PlantNew';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { getBottomSpace } from 'react-native-iphone-x-helper';

interface Params {
  plant: PlantData
}

interface StoragePlants {
  [id: string]: {
    name: string;
    photo: string;
    dateTimeNotification: Date;
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

        const newTime = new Date(plants[plant.id].dateTimeNotification);
        newTime.setHours(selectedDateTime.getHours());
        newTime.setMinutes(selectedDateTime.getMinutes());
        plants[plant.id].dateTimeNotification = newTime;


        plants[plant.id].dateTimeNotification = newTime;
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

    function handleBack(){
      navigation.navigate('MyPlants');
    }

    useEffect(() => {
      async function loadData(){
        const data = await AsyncStorage.getItem('@plantmanager:plants');
        const plants = data
        ? JSON.parse(data) as StoragePlants
        : {};

        setSelectedDateTime(new Date(plants[plant.id].dateTimeNotification));
      }

      loadData();
    },[]);

    return (
        <ScrollView
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.container}
        >
          <View style={styles.plantInfo}>
            <View style={styles.header}>
              <TouchableOpacity onPress={handleBack}>
                <MaterialIcons name="chevron-left" size={32} color={colors.green_dark} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.removeButton} onPress={handleRemove}>
                <Feather name="trash" size={24} color={colors.green_dark}/>
              </TouchableOpacity>
            </View>

            <Image source={img} style={styles.image}/>
            <Text style={styles.plantName}>{plant.name}</Text>
            <Text style={styles.plantAbout}>{plant.about}</Text>
          </View>

          <View style={styles.controller}>
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
        </ScrollView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: colors.shape,
  },
  header: {
    width: "100%",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  plantInfo: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.shape,
  },
  image: {
    width: 145,
    height: 180,
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
  controller: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: getBottomSpace()
  },
  removeButton: {
    alignSelf: 'center',
  },
});
