import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';

import AppLoading from 'expo-app-loading';
import {
  Jost_400Regular,
  Jost_600SemiBold,
  useFonts
} from '@expo-google-fonts/jost';

import Routes from './src/routes';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface StoragePlants {
  [id: string]: {
    name: string;
    about: string;
    water_tips: string;
    photo: string;
    dateTimeNotification: Date;
    notificationId: string;
    frequency: {
      times: number;
      repeat_every: string;
    }
  }
}

interface Plant {
    id: string;
    dateTimeNotification: Date;
    frequency: {
      times: number;
      repeat_every: string;
    }
}

export default function App() {
  const [fontsLoaded] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold
  });

  /*
      "day": 14,
        "hour": 10,
        "isLeapMonth": false,
        "minute": 24,
        "month": 4,
   */

  useEffect(() => {
    async function notifications(){
      // const notifications = await Notifications.getAllScheduledNotificationsAsync();
      const notifications = await Notifications.cancelAllScheduledNotificationsAsync();
      console.log("NOTIFICAÇÕES SALVAS ====>");
      console.log(notifications)
    }

    notifications();

    const subscription = Notifications.addNotificationReceivedListener(async notification => {
      const { id, frequency } = notification.request.content.data.plant as Plant;

      const nextMoment = new Date();

      if(frequency.repeat_every === 'week'){
        const interval = Math.trunc(7 / frequency.times);
        nextMoment.setDate(nextMoment.getDate() + interval)
      }
      else
      nextMoment.setDate(nextMoment.getDate() + 1)

      try {
        const data = await AsyncStorage.getItem('@plantmanager:plants');
        const plants = data
        ? JSON.parse(data) as StoragePlants
        : {};

        plants[id].dateTimeNotification = nextMoment;

        const secondBetweenDates = Math.abs(Math.ceil((
          new Date().getTime() - nextMoment.getTime()) / 1000
        ));


        // const trigger = Platform.OS === "ios"
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
            title: `Heeey,`,
            body: `Está na hora de cuidar da sua ${plants[id].name}.`,
            sound: true,
            priority: Notifications.AndroidNotificationPriority.HIGH,
            data: { plant: {id, ...plants[id] }}
          },
          trigger: {
            seconds: secondBetweenDates,
          }
        });

        plants[id].notificationId = notificationId;
        await AsyncStorage.setItem('@plantmanager:plants', JSON.stringify(plants));

      } catch (error) {
        console.error(error)
      }
    });
    return () => subscription.remove();
  }, []);

  if(!fontsLoaded){
    // keep splash screen visible.
    return <AppLoading />
  }
  return (
    <Routes />
  )
}

