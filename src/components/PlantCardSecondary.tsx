import React from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, Image, View } from 'react-native';

import img from '../assets/plants/aningapara.png';
import colors from '../styles/colors';

interface PlantProps extends TouchableOpacityProps {
    name: string
    day: string;
    hour: string;
}

export const PlantCardSecondary = ({ name, day, hour, ...rest }: PlantProps) => (
    <TouchableOpacity style={styles.container} {...rest}>        
        <Image source={img} style={styles.image}/>
        <Text style={styles.title}>
            {name}
        </Text>  
        
        <View style={styles.details}>
            <Text style={styles.timeLabel}>Regar às</Text>                    
            <Text style={styles.time}>{ hour }</Text>                    
        </View>      
    </TouchableOpacity>
  );

const styles = StyleSheet.create({
    container: {
        width: "100%",
        paddingHorizontal: 10,
        paddingVertical: 20,
        borderRadius: 20,
        flexDirection: "row",  
        alignItems: "center",
        backgroundColor: colors.shape,  
        marginVertical: 5    
    },
    image: {
        width: 50,
        height: 50
    },
    title: {
        flex: 1,
        marginLeft: 10,
        fontWeight: "bold",
        fontFamily: 'Jost_600SemiBold',
        color: colors.heading,
        fontSize: 17
    },
    details: {
        alignItems: "flex-end"
    },
    timeLabel: {
        fontSize: 12,
        fontFamily: 'Jost_400Regular',
        color: colors.body_light
    },
    time: {
        marginTop: 5,
        fontSize: 16,
        fontFamily: 'Jost_600SemiBold',
        color: colors.body_dark
    }
});
