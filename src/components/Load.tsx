import React from 'react';
import { StyleSheet, ActivityIndicator, ActivityIndicatorProps } from 'react-native';

type LoadProps = ActivityIndicatorProps;

export const Load = ({ ...rest }: LoadProps ) => (
    <ActivityIndicator 
        color="red" 
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
