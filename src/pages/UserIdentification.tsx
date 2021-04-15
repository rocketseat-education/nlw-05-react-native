import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/core';
import React, { useCallback, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    View,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    Alert
} from 'react-native';

import { Button } from '../components/Button';
import colors from '../styles/colors';

export function UserIdentification(){
  const [name, setName] = useState("");
  const [isFilled, setIsFilled] = useState(false);
  const [inputActive, setInputActive] = useState(false);

  const navigation = useNavigation();

  const handleSubmit = useCallback(async () => {
    if(!name)
    return Alert.alert('Me diz como chamar você 🥲');

    try {
        await AsyncStorage.setItem('@plantmanager:user', name)
        navigation.navigate('Confirmation', {
            title: 'Prontinho',
            subtitle: 'Agora vamos começar a cuidar das suas plantinhas com muito cuidado.',
            buttonTitle: 'Começar',
            icon: 'smile',
            nextScreen: 'PlantNew'
        });
    } catch (e) {
      Alert.alert('Não foi possível salvar o nome. 😢')
    }
  },[name]);

  const handleInputBlur = useCallback(() => {
    setInputActive(false);
    setIsFilled(!!name);
  },[name]);

  const handleInputFocus = useCallback(() => {
    setInputActive(true);
    setIsFilled(true);
  },[]);

    return(
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.content}>
                        <View style={styles.form}>
                            <Text style={styles.emoji}>
                              {isFilled ? '😄' : '😀'}
                            </Text>
                            <Text style={styles.title}>
                                Como podemos {"\n"}
                                chamar você?
                            </Text>

                            <TextInput
                                autoCorrect={false}
                                placeholder="Digite um nome"
                                style={[
                                  styles.input,
                                  (inputActive || isFilled) && {
                                    borderBottomColor: colors.green
                                  }]
                                }
                                onChangeText={setName}
                                onBlur={handleInputBlur}
                                onFocus={handleInputFocus}
                            />
                        </View>

                        <View style={styles.footer}>
                            <Button title="Confirmar nome" onPress={handleSubmit}/>
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
        alignItems: 'center',
        width: "100%",
        padding: 30
    },
    emoji: {
      fontSize: 44
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
    footer: {
        width: '100%',
        padding: 20,
    }
})
