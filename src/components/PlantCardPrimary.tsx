import React from 'react';
import { StyleSheet, Text, Image, TouchableOpacity, TouchableOpacityProps } from 'react-native';

import colors from '../styles/colors';
import img from '../assets/plants/aningapara.png'

interface PlantProps extends TouchableOpacityProps{
    data: {
        name: string;
        photo: string;
    }
}

export const PlantCardPrimary = ({ data, ...rest }: PlantProps) => {
    return(
    <TouchableOpacity style={styles.container} {...rest}> 
        <Image source={img} style={styles.image} />
        <Text style={styles.text}>{data.name}</Text>
    </TouchableOpacity>
  )};

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
