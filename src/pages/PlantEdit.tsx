import { useNavigation, useRoute } from '@react-navigation/core';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  ScrollView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { format } from 'date-fns/esm';
import { Button } from '../components/Button';

import colors from '../styles/colors';
import img from '../assets/plants/imbe.png';
import waterdrop from '../assets/waterdrop.png';

import { PlantData } from './PlantNew';

interface Params {
  plant: PlantData;
}

interface StoragePlants {
  [id: string]: {
    name: string;
    photo: string;
    dateTimeNotification: Date;
    frequency: {
      times: number;
      repeat_every: string;
    };
    notificationId: string;
  };
}

export function PlantEdit() {
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(Platform.OS === 'ios');

  const navigation = useNavigation();
  const route = useRoute();
  const { plant } = route.params as Params;

  // com evento explicito => (event: Event, dateTime: Date | undefined)
  const handleChangeTime = useCallback((_, dateTime: Date | undefined) => {
    if (dateTime) {
      setSelectedDateTime(dateTime);
    }
  }, []);

  const handleOpenDateTimePickerForAndroid = useCallback(() => {
    setShowDatePicker((oldState) => !oldState);
  }, []);

  const handleSavePlant = useCallback(async () => {
    try {
      const data = await AsyncStorage.getItem('@plantmanager:plants');
      const plants = data ? (JSON.parse(data) as StoragePlants) : {};

      const plantNotificationAt = new Date(plants[plant.id].dateTimeNotification);

      plantNotificationAt.setHours(selectedDateTime.getHours());
      plantNotificationAt.setMinutes(selectedDateTime.getMinutes());

      plants[plant.id].dateTimeNotification = plantNotificationAt;

      await AsyncStorage.setItem(
        '@plantmanager:plants',
        JSON.stringify(plants)
      );

      navigation.navigate('MyPlants');
    } catch (error) {
      console.error(error);
      Alert.alert('Não foi possível atualizar sua plantinha. 😢');
    }
  }, [selectedDateTime]);

  function handleBack() {
    navigation.navigate('MyPlants');
  }

  useEffect(() => {
    async function loadData() {
      const data = await AsyncStorage.getItem('@plantmanager:plants');
      const plants = data ? (JSON.parse(data) as StoragePlants) : {};

      setSelectedDateTime(new Date(plants[plant.id].dateTimeNotification));
    }

    loadData();
  }, []);

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <View style={styles.plantInfo}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack}>
            <MaterialIcons
              name="chevron-left"
              size={32}
              color={colors.green_dark}
            />
          </TouchableOpacity>
        </View>

        <Image source={img} style={styles.image} />
        <Text style={styles.plantName}>{plant.name}</Text>
        <Text style={styles.plantAbout}>{plant.about}</Text>
      </View>

      <View style={styles.controller}>
        <View style={styles.tip}>
          <Image source={waterdrop} style={styles.tipImage} />
          <Text style={styles.tipText}>{plant.water_tips}</Text>
        </View>

        <Text style={styles.alertLabel}>
          Ecolha o melhor horário para ser lembrado:
        </Text>

        {showDatePicker && (
          <DateTimePicker
            value={selectedDateTime}
            mode="time"
            display="spinner"
            onChange={handleChangeTime}
          />
        )}

        {Platform.OS === 'android' && (
          <TouchableOpacity
            style={styles.OpenDateTimePickerButton}
            onPress={handleOpenDateTimePickerForAndroid}
          >
            <Text style={styles.OpenDateTimePickerText}>
              {`Mudar ${format(selectedDateTime, 'HH:mm')}`}
            </Text>
          </TouchableOpacity>
        )}

        <Button title="Confirmar alteração" onPress={handleSavePlant} />
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
    width: '100%',
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
    marginTop: 15,
  },
  plantAbout: {
    textAlign: 'center',
    fontFamily: 'Jost_400Regular',
    color: colors.heading,
    fontSize: 14,
    marginTop: 10,
  },
  tip: {
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
    marginTop: 15,
  },
  controller: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: getBottomSpace() || 20,
  },
  OpenDateTimePickerButton: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 40,
  },
  OpenDateTimePickerText: {
    color: colors.heading,
    fontSize: 24,
    fontFamily: 'Jost_400Regular',
  },
});
