import React from 'react';
import { StyleSheet, Text, Image, TouchableOpacity, TouchableOpacityProps } from 'react-native';

import img from '../assets/plants/imbe.png';
import colors from '../styles/colors';


interface PlantProps extends TouchableOpacityProps{
    title: string
}

export const PlantCardPrimary = ({ title, ...rest }: PlantProps) => (
    <TouchableOpacity style={styles.container} {...rest}> 
        <Image source={img} style={styles.image} />
        <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.shape,        
        width: 150,
        height: 150,
        borderRadius: 20,
        margin: 20,
        justifyContent: "space-around",
        alignItems: "center"
    },
    image: {
        height: 90,
        width: 73
    },
    text: {
        color: colors.green_dark,
        fontFamily: 'Jost_600SemiBold',
    }
});
