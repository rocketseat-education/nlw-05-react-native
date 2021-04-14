import React from 'react';
import { StyleSheet, Text, Image, View } from 'react-native';

import userImg from '../assets/rodrigo.png';
import colors from '../styles/colors';

interface UserHeaderProps {
    userName: string;
}

export const Header = ({ userName }: UserHeaderProps) => (
    <View style={styles.container}>
        <View>
            <Text style={styles.greeting}>Olá,</Text>
            <Text style={styles.userName}>{userName}</Text>
        </View>

        <Image source={userImg} style={styles.image}/>
    </View>
  );

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    image: {
        width: 75,
        height: 75,
        borderRadius: 75
    },
    greeting: {
        fontSize: 32,
        color: colors.heading,
        fontFamily: 'Jost_400Regular',
    },
    userName: {
        fontSize: 32,
        fontFamily: 'Jost_600SemiBold',
        color: colors.heading,
        lineHeight: 40
    }
});
