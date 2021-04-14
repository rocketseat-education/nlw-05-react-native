import React from 'react';
import { StyleSheet, ActivityIndicator, ActivityIndicatorProps } from 'react-native';
import colors from '../styles/colors';

type LoadProps = ActivityIndicatorProps;

export const Load = ({ ...rest }: LoadProps ) => (
    <ActivityIndicator 
        color={colors.green_dark}
        style={styles.load}
        {...rest}
    />
  );

const styles = StyleSheet.create({
    load: { 
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center"
    }
});
