import React from 'react';
import { 
    SafeAreaView, 
    StyleSheet, 
    Text, 
    Image, 
    View 
} from 'react-native';

import smileImg from '../assets/emojis/smile.png';
import hugImg from '../assets/emojis/hug.png';
import colors from '../styles/colors';
import { Button } from '../components/Button';
import { useNavigation, useRoute } from '@react-navigation/core';


interface Params {
    title: string;
    subtitle: string;
    buttonTitle: string;
    icon: 'smile' | 'hug';
    nextScreen: string;
}  

const icons = {
    hug: hugImg,
    smile: smileImg
}

export function Confirmation(){ 
    const navigation = useNavigation();
    const route = useRoute();
    const { title, subtitle, buttonTitle, icon, nextScreen } = route.params as Params;

    function handleStart(){
        navigation.navigate(nextScreen);
    }   

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Image source={icons[icon]} />
                <Text style={styles.title}>
                    {title}
                </Text>
                <Text style={styles.subtitle}>
                    {subtitle}
                </Text>
            </View>

            <View style={styles.footer}>
                <Button title={buttonTitle} onPress={handleStart}/>
            </View>
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
        paddingHorizontal: 20,
        color: colors.heading
    },
    button: {
        backgroundColor: colors.green,
        padding: 17,
        borderRadius: 20
    },
    icon: {
        fontSize: 32,
        color: colors.white
    },
    footer: {
        width: '100%',
        padding: 20,
    },
    content: {
        flex: 1,
        justifyContent: 'center',  
        alignItems: 'center',  
        width: "100%",
        padding: 30
    },
})