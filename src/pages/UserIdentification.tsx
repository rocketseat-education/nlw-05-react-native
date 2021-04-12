import React from 'react';
import { 
    SafeAreaView, 
    StyleSheet, 
    Text, 
    TouchableOpacity,
    TextInput,
    View,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';

import colors from '../styles/colors';

export function UserIdentification(){    
    return(
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.content}>
                        <View style={styles.form}>
                            <Text style={styles.title}>
                                Como podemos {"\n"} 
                                chamar você?
                            </Text>

                            <TextInput style={styles.input} />
                        </View>

                        <View style={styles.footer}>
                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.buttonText}>
                                    Confirmar nome
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>                
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        alignItems: 'center',
        justifyContent: 'space-between',        
    },
    content: {
        flex: 1,
        width: '100%',
    },
    form: {
        flex: 1,
        justifyContent: 'center',    
        width: "100%",
        padding: 30
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
    input: {
        borderBottomWidth: 1,
        borderColor: colors.gray,
        color: colors.heading,
        width: '100%',
        fontSize: 18,
        marginTop: 50,
        padding: 10,
        textAlign: 'center'
    },
    button: {
        backgroundColor: colors.green,
        height: 55,
        width: '100%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        color: colors.white,
        fontFamily: 'Jost_600SemiBold',        
    },
    footer: {
        width: '100%',
        padding: 20,
    }
})