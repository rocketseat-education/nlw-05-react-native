import React from 'react';
import { 
  StyleSheet, 
  Text, 
  SafeAreaView
} from 'react-native';

import colors from '../styles/colors';

export function MyPlants() {   
    return (
        <SafeAreaView style={styles.container}> 
          <Text>Minhas Plantas</Text>
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
    marginVertical: 7
  },
  footer: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingTop: 20
  }
});
