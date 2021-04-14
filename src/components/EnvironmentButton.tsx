import React from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    Text,
    TouchableOpacityProps
} from 'react-native';

import colors from '../styles/colors';

interface EnvironmentButtonProps extends TouchableOpacityProps{
    title: string;
    active?: boolean;
}

export const EnvironmentButton = ({title, active = false, ...rest } : EnvironmentButtonProps) => (
    <TouchableOpacity style={[styles.container, active && styles.containerActive ]} {...rest }>
        <Text style={[styles.text, active && styles.textActive]}>{title}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.shape,
        paddingVertical: 7,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginHorizontal: 5,
    },
    text: {
        color: colors.heading,
        fontFamily: 'Jost_400Regular'
    },
    containerActive: {
        fontWeight: 'bold',
        color: colors.green,
        backgroundColor: colors.green_light
    },
    textActive: {
        color: colors.green_dark,
        fontFamily: 'Jost_600SemiBold'
    }
});
