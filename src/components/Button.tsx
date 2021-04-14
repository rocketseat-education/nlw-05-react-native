import React from 'react';
import {  
    StyleSheet, 
    Text, 
    TouchableOpacity,
    TouchableOpacityProps
} from 'react-native';

import colors from '../styles/colors';

interface ButtonProps extends TouchableOpacityProps{
    title: string;
}

export const Button = ({title, ...rest} : ButtonProps) => (
    <TouchableOpacity style={styles.container} {...rest}>
        <Text style={styles.text}>
            {title}
        </Text>
    </TouchableOpacity>
)

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.green,
        height: 55,
        width: '100%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 16,
        color: colors.white,
        fontFamily: 'Jost_600SemiBold',        
    },
})