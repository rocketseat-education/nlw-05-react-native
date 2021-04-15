import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';

import smileImg from '../assets/illustrations/watering.png';
import colors from '../styles/colors';

export function Welcome(){
    const navigation = useNavigation();

    function handleStart(){
        navigation.navigate('UserIdentification');
    }

    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>
                Gerencie {"\n"}
                suas plantas de {"\n"}
                forma fácil
            </Text>

            <Image source={smileImg} />

            <Text style={styles.subtitle}>
                Não esqueça mais de regar suas plantas.
                Nós cuidamos de lembrar você sempre que precisar.
            </Text>

            <TouchableOpacity style={styles.button} onPress={handleStart}>
                <MaterialIcons name="chevron-right" style={styles.icon}/>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        color: colors.heading,
        fontFamily: 'Jost_600SemiBold',
        lineHeight: 38,
        marginTop: 15,
    },
    subtitle: {
        fontFamily: 'Jost_400Regular',
        textAlign: 'center',
        fontSize: 16,
        paddingHorizontal: 20
    },
    button: {
        backgroundColor: colors.green,
        padding: 17,
        borderRadius: 20,
        marginBottom: 10
    },
    icon: {
        fontSize: 32,
        color: colors.white
    }
});
