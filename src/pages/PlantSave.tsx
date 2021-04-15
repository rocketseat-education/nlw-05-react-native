import { useNavigation, useRoute } from '@react-navigation/core';
import React, { useCallback, useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { format, isBefore } from 'date-fns';

import { getBottomSpace } from 'react-native-iphone-x-helper';
import { Button } from '../components/Button';
import { PlantData } from './PlantNew';

import colors from '../styles/colors';
import img from '../assets/plants/imbe.png';
import waterdrop from '../assets/waterdrop.png';

interface Params {
  plant: PlantData;
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
    };
  };
}

export function PlantSave() {
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(Platform.OS === 'ios');

  const route = useRoute();
  const navigation = useNavigation();

  const { plant } = route.params as Params;

  const handleOpenDateTimePickerForAndroid = useCallback(() => {
    setShowDatePicker((oldState) => !oldState);
  }, []);

  // com evento explicito => (event: Event, dateTime: Date | undefined)
  const handleChangeTime = useCallback((_, dateTime: Date | undefined) => {
    if (Platform.OS === 'android') {
      setShowDatePicker((oldState) => !oldState);
    }

    if (dateTime && isBefore(dateTime, new Date()))
      return Alert.alert('Escolha uma hora no futuro! ⏰');

    if (dateTime) setSelectedDateTime(dateTime);
  }, []);

  const handleConfirm = useCallback(async () => {
    const { times, repeat_every } = plant.frequency;
    const nextMoment = selectedDateTime;

    if (repeat_every === 'week') {
      const interval = Math.trunc(7 / times);
      nextMoment.setDate(nextMoment.getDate() + interval);
    }
    // else
    //   nextMoment.setDate(nextMoment.getDate() + 1)

    try {
      const data = await AsyncStorage.getItem('@plantmanager:plants');
      const plants = data ? (JSON.parse(data) as StoragePlants) : {};

      const newPlant = {
        name: plant.name,
        about: plant.about,
        photo: plant.photo,
        water_tips: plant.water_tips,
        dateTimeNotification: selectedDateTime,
        frequency: plant.frequency,
      };

      const secondBetweenDates = Math.abs(
        Math.ceil((new Date().getTime() - nextMoment.getTime()) / 1000)
      );

      console.log('AGORA ===> ', new Date());
      console.log('PROXIMA DATA ===> ', nextMoment);
      console.log('SEGUNDOS SALVOS ===> ', secondBetweenDates);

      // const trigger = Platform.OS === 'ios'
      // ? {
      //   day: nextMoment.getDate(),
      //   month: nextMoment.getMonth() + 1,
      //   year: nextMoment.getFullYear(),
      //   hour: nextMoment.getHours(),
      //   minute: nextMoment.getMinutes(),
      // }
      // : {
      //   seconds: secondBetweenDates,
      // }

      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: `Heeey, 🌱`,
          body: `Está na hora de cuidar da sua ${plant.name}.`,
          sound: true,
          priority: Notifications.AndroidNotificationPriority.HIGH,
          data: {
            plant: {
              id: plant.id,
              ...newPlant,
            },
          },
        },
        trigger: {
          seconds: secondBetweenDates,
        },
      });

      const newStoragePlant = {
        [plant.id]: {
          ...newPlant,
          notificationId,
        },
      };

      await AsyncStorage.setItem(
        '@plantmanager:plants',
        JSON.stringify({ ...plants, ...newStoragePlant })
      );

      navigation.navigate('Confirmation', {
        title: 'Tudo certo',
        subtitle:
          'Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com bastante amor.',
        buttonTitle: 'Muito obrigado :D',
        icon: 'hug',
        nextScreen: 'MyPlants',
      });
    } catch (erro) {
      console.log(erro);
      Alert.alert('Não foi possível cadastrar sua plantinha. 😢');
    }
  }, [selectedDateTime]);

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <View style={styles.plantInfo}>
        <Image source={img} style={styles.image} />
        <Text style={styles.plantName}>{plant.name}</Text>
        <Text style={styles.plantAbout}>{plant.about}</Text>
      </View>

      <View style={styles.controller}>
        <View style={styles.tipContainer}>
          <Image source={waterdrop} style={styles.tipImage} />
          <Text style={styles.tipText}>
            A rega deve ser feita com 400ml a cada dois dias
          </Text>
        </View>

        <Text style={styles.alertLabel}>
          Ecolha o melhor horário para ser lembrado:
        </Text>

        {showDatePicker && (
          <DateTimePicker
            // minimumDate={new Date()}
            value={selectedDateTime}
            mode="time"
            display="spinner"
            onChange={handleChangeTime}
          />
        )}

        {Platform.OS === 'android' && (
          <TouchableOpacity
            style={styles.openAndroidDateTimePickerButton}
            onPress={handleOpenDateTimePickerForAndroid}
          >
            <Text style={styles.dateTimePickerText}>
              {`Mudar ${format(selectedDateTime, 'HH:mm')}`}
            </Text>
          </TouchableOpacity>
        )}

        <Button title="Cadastrar planta" onPress={handleConfirm} />
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
  plantInfo: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.shape,
  },
  controller: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: getBottomSpace() || 20,
  },
  image: {
    width: 100,
    height: 140,
  },
  plantName: {
    textAlign: 'center',
    fontFamily: 'Jost_600SemiBold',
    fontSize: 24,
    color: colors.heading,
    marginTop: 15,
  },
  plantAbout: {
    textAlign: 'center',
    fontFamily: 'Jost_400Regular',
    color: colors.heading,
    fontSize: 14,
    marginTop: 10,
  },
  tipContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tipImage: {
    width: 50,
    height: 50,
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
    marginVertical: 7,
  },
  openAndroidDateTimePickerButton: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 40,
  },
  dateTimePickerText: {
    color: colors.heading,
    fontSize: 24,
    fontFamily: 'Jost_400Regular',
  },
});
